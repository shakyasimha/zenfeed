import Header from "@/components/header";
import { useDrawer } from "@/context/drawer";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { toggle } = useDrawer();

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <Header title="Settings" onPressMenu={toggle} />
      <View className="flex-1 items-center justify-center">
        <Text className="text-zinc-500">Settings coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
