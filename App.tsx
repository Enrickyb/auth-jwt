import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SingUp } from "./src/screens/SingUp";
import { Home } from "./src/screens/Home";
import UserProvider, { UserContext } from "./src/context/userContext";
import { Register } from "./src/screens/Register";
import { useCallback, useContext } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { singned } = useContext(UserContext);
  const [isLoaded] = useFonts({
    "gilroy-light": require("./assets/fonts/GilroyLight.otf"),
    "gilroy-bold": require("./assets/fonts/GilroyExtraBold.otf"),
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UserProvider>
        <NavigationContainer>
          <StatusBar translucent />
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
    </View>
  );
}
