import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SingUp } from "./src/screens/SingUp";
import { Home } from "./src/screens/Home";
import UserProvider, { UserContext } from "./src/context/userContext";
import { Register } from "./src/screens/Register";
import { useCallback, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

//SplashScreen.preventAutoHideAsync();

export default function App() {
  const { auth, singned } = useContext(UserContext);
  /* const [isLoaded] = useFonts({
    "gilroy-light": require("./src/assets/fonts/GilroyLight.otf"),
    "gilroy-bold": require("./src/assets/fonts/GilroyExtraBold.otf"),
  });
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);
  handleOnLayout();*/
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={singned ? "Home" : " SingUp"}
        >
          <Stack.Screen name="SingUp" component={SingUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
