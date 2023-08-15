import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import axios from "axios";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type UserContextType = {
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<void>;
  singned: boolean;
  auth: () => Promise<void>;
  logout: () => Promise<void>;
  user?: User;
  loading: boolean;
  getOrderBydId: () => Promise<void>;
  orders: any[];
};

export const UserContext = createContext({} as UserContextType);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [singned, setSingned] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);

  const getOrderBydId = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.49:8000/userOrders?userId=${user?.id}`
      );
      const data = await response.data;
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log(email, password);
      const response = await fetch(`http://192.168.0.49:8000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setUser(data.user);
      if (data.accessToken) {
        await AsyncStorage.setItem("accessToken", data.accessToken);
        await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        setSingned(true);
        setLoading(false);
        return data;
      } else {
        setLoading(false);
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch(`http://192.168.0.49:8000/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const auth = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (user === null) {
        getUserData();
      }
      if (accessToken) {
        getUserData();
        setSingned(true);
      } else {
        setSingned(false);
      }
    } catch (error) {
      setSingned(false);
    }
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch {}
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("@userData:email");

      setSingned(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        login,
        register,
        singned,
        auth,
        logout,
        user,
        loading,
        getOrderBydId,
        orders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
