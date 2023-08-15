import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { FormInput } from "../../components/Form/FormInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../../context/userContext";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FormButton } from "../../components/Form/FormButton";

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
  const [loginFailed, setLoginFailed] = useState(false);

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
          setLoginFailed(true);
          console.log("Invalid credentials");
          return;
        }
        if (rememberMe) {
          console.log("saved user on storage");
          saveUserData();
        }
        setLoginFailed(false);
        navigation.navigate("Home");
      })
      .catch((error) => {
        setLoginFailed(true);
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
        handlePress();
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
            }}
          >
            <FormInput
              placeholder={"Enter Email"}
              onChangeText={handleSetEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <AntDesign
              name="closecircleo"
              size={22}
              color="#cfcece"
              style={{ position: "absolute", right: 10 }}
              onPress={() => {
                setEmail("");
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
            }}
          >
            <FormInput
              placeholder={"Password"}
              onChangeText={handleSetPassword}
              value={password}
              secureTextEntry={visiblePassword}
              autoCapitalize="none"
            />
            <Feather
              name={visiblePassword ? "eye-off" : "eye"}
              size={22}
              color="#cfcece"
              a
              style={{ position: "absolute", right: 10 }}
              onPress={() => {
                setVisiblePassword(!visiblePassword);
              }}
            />
          </View>

          <View style={{ marginLeft: 5, alignSelf: "flex-start" }}>
            {loginFailed && (
              <Text style={{ color: "red", textAlign: "left" }}>
                Invalid credentials
              </Text>
            )}
          </View>

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

            <Pressable>
              <Text>Forgot password?</Text>
            </Pressable>
          </View>

          <FormButton
            title="Sing-In"
            text={
              loading ? (
                <ActivityIndicator color="#fff" size={24} />
              ) : (
                <Text style={styles.TextButton}>Sing-In</Text>
              )
            }
            onPress={handlePress}
          />
        </View>
      </View>

      <View style={styles.dividerLineContainer}>
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
          <Text style={styles.footerTextRegister}>Register here!</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    marginBottom: 20,
    fontWeight: "bold",
  },
  screen: {
    backgroundColor: "#F6F6F6",
    flex: 1,
    paddingTop: 20,
    paddingBottom: 25,
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
  TextButton: {
    color: "#ffffff",
    fontSize: 16,
    borderRadius: 7,
  },
  dividerLineContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
    marginBottom: 70,
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
  footerTextRegister: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "gilroy-bold",
    color: "#4461F2",
    fontWeight: "bold",
  },
});
