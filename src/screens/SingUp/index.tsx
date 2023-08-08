import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Switch,
  Button,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { FormInput } from "../../components/Form/FormInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../../context/userContext";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

export const SingUp = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const { login, singned, auth, loading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    auth();
    getUserData();
    if (!rememberMe) {
      removeUserData();
    }
    if (singned) {
      navigation.navigate("Home");
    }
  }, [singned, navigation, rememberMe]);

  async function handlePress() {
    await login(email, password)
      .then((data) => {
        if (!data) {
          console.log("Invalid credentials");
          return;
        }
        if (rememberMe) {
          console.log("saved user on storage");
          saveUserData();
        }

        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function saveUserData() {
    try {
      await AsyncStorage.setItem("@userData:email", email);
      await AsyncStorage.setItem("@userData:password", password);
    } catch (error) {
      console.log(error);
    }
  }
  async function removeUserData() {
    try {
      await AsyncStorage.removeItem("@userData:email");
      await AsyncStorage.removeItem("@userData:password");
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserData() {
    try {
      const email = await AsyncStorage.getItem("@userData:email");
      const password = await AsyncStorage.getItem("@userData:password");
      if (email && password) {
        setEmail(email);
        setPassword(password);
        setRememberMe(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSetEmail(text: string) {
    setEmail(text);
  }
  function handleSetPassword(text: string) {
    setPassword(text);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          style={{ height: 50, width: 120, margin: 0, padding: 0 }}
          mode="dropdown"
        >
          <Picker.Item label="English" value="java" />
          <Picker.Item label="Espanhol" value="espanhol" />
          <Picker.Item label="Português-BR" value="portugues-br" />
        </Picker>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Sing In to recharge Direct</Text>
        <View style={styles.inputContainer}>
          <FormInput
            placeholder={"Enter Email"}
            onChangeText={handleSetEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            placeholder={"Password"}
            onChangeText={handleSetPassword}
            value={password}
            secureTextEntry={visiblePassword}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 90,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Checkbox
                value={rememberMe}
                onValueChange={(value) => {
                  setRememberMe(value);
                }}
                color={rememberMe ? "#4461F2" : "#DFDFDF"}
              />
              <Text>Remember me</Text>
            </View>

            <Pressable onPress={() => setVisiblePassword(!visiblePassword)}>
              <Text>Forgot password?</Text>
            </Pressable>
          </View>

          <Pressable onPress={handlePress} style={styles.Button}>
            {loading ? (
              <ActivityIndicator color="#fff" size={24} />
            ) : (
              <Text style={styles.TextButton}>Sing-In</Text>
            )}
          </Pressable>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={styles.dividerLine} />
        <View>
          <Text style={styles.textOnDivider}>Or continue with</Text>
        </View>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.SocialButtonContainer}>
        <Pressable style={styles.SocialButton}>
          <Image source={require("../../../assets/Google.png")} />
        </Pressable>
        <Pressable style={styles.SocialButton}>
          <Image source={require("../../../assets/Apple.png")} />
        </Pressable>
        <Pressable style={styles.SocialButton}>
          <Image source={require("../../../assets/Facebook.png")} />
        </Pressable>
      </View>

      <View>
        <Text style={styles.footerText}>
          If you don't have an account you can{" "}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.footerText}>Register here!</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  screen: {
    backgroundColor: "#F6F6F6",
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  container: {
    alignItems: "center",
    marginTop: 80,
    gap: 20,
  },
  inputContainer: {
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    backgroundColor: "#4461F2",
    width: 350,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 7,
  },
  TextButton: {
    color: "#ffffff",
    fontSize: 16,
    borderRadius: 7,
  },
  dividerLine: {
    height: 1,
    backgroundColor: "#DFDFDF",
  },
  textOnDivider: {
    textAlign: "center",
    marginHorizontal: 10,
    color: "#ACADAC",
  },
  SocialButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 20,
  },
  SocialButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  footerText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "gilroy-bold",
  },
});
