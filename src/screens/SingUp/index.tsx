import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useState } from "react";
import { FormInput } from "../../components/Form/FormInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";

type RootStackParamList = {
  Home: { data: any };
};

export const SingUp = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState();

  async function handlePress() {
    try {
      console.log(`http://0.0.0.0:8000/user?email=${email}`);
      const response = await fetch(`http://0.0.0.0:8000/user?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const [data] = await response.json();

      if (data === null) {
        throw new Error("Email ou senha incorreto");
      }

      if (data.password !== password) {
        throw new Error("Email ou senha incorreto");
      }

      navigation.navigate("Home", { data });
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
          style={{ height: 50, width: 130, margin: 0, padding: 0 }}
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

          <Pressable onPress={handlePress} style={styles.Button}>
            <Text style={styles.TextButton}>Sing-In</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  pickerContainer: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    flex: 1,
    height: 1,
    backgroundColor: "#DFDFDF",
  },
  textOnDivider: {
    textAlign: "center",
    marginHorizontal: 10,
    color: "#ACADAC",
  },
  SocialButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  SocialButton: {
    backgroundColor: "#ffffff",
  },
});
