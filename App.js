import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./src/navigators";
import {
  useFonts,
  Inter_600SemiBold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { theme } from "./src/theme";
import { StatusBar } from "expo-status-bar";
import { useAppStore } from "@/stores/appStore";
import { useEffect } from "react";
import { View } from "react-native";
import "@/utils/configDayjs";
import registerNNPushToken from "native-notify";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const initializing = useAppStore((s) => s.initializing);
  const initStores = useAppStore((s) => s.initStores);
  registerNNPushToken(16830, "pfmJDM3vOB3bFiBRbbMmrk");

  useEffect(() => {
    initStores();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (initializing) {
    return <View />;
  }

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="auto" />
      <MainStack />
    </NavigationContainer>
  );
}
