import DrawerContent from "@/components/DrawerContent";
import PushDrawer from "@/components/PushDrawer";
import { DrawerProvider } from "@/context/drawer";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();

  // Follow the system theme on every launch
  useEffect(() => {
    setColorScheme("system");
  }, [setColorScheme]);

  return (
    <DrawerProvider>
      <View className="flex-1 bg-white dark:bg-black">
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
