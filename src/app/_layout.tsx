import DrawerContent from "@/components/DrawerContent";
import PushDrawer from "@/components/PushDrawer";
import { DrawerProvider } from "@/context/drawer";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  // Follow the system theme on every launch
  useEffect(() => {
    setColorScheme("system");
  }, [setColorScheme]);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <DrawerProvider>
      <StatusBar style="auto" />
      <View className="flex-1 bg-paper dark:bg-paperDark-deep">
        <PushDrawer drawer={<DrawerContent />}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </PushDrawer>
      </View>
    </DrawerProvider>
  );
}
