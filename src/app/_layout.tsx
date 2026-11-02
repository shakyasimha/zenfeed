import DrawerContent from "@/components/DrawerContent";
import PushDrawer from "@/components/PushDrawer";
import { DrawerProvider } from "@/context/drawer";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <DrawerProvider>
      <PushDrawer drawer={<DrawerContent />}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#09090b" },
          }}
        />
      </PushDrawer>
    </DrawerProvider>
  );
}
