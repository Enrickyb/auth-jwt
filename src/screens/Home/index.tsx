import { Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";

export const Home = ({ navigation, data }: any) => {
  const { singned, auth, logout } = useContext(UserContext);
  useEffect(() => {
    auth();
    console.log(singned);
    if (singned) {
      navigation.navigate("Home");
    }
  }, [singned]);

  async function handlePress() {
    logout();
    navigation.navigate("SingUp");
  }

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", marginTop: 100 }}
    >
      <Text>HOME</Text>
      <Pressable onPress={handlePress}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};
