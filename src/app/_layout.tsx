import DrawerContent from "@/components/DrawerContent";
import PushDrawer from "@/components/PushDrawer";
import { DrawerProvider } from "@/context/drawer";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Appearance, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();

  // Start by following the system theme on every launch
  useEffect(() => {
    setColorScheme("system");
  }, [setColorScheme]);

  // Temporary: log system theme changes to see if the OS reports them
  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) =>
      console.warn("system scheme:", colorScheme),
    );
    return () => sub.remove();
  }, []);

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
