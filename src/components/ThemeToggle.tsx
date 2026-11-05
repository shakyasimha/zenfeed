import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleColorScheme}
      accessibilityRole="button"
      accessibilityLabel={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      className="w-10 h-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
    >
      <Ionicons
        name={isDark ? "moon" : "sunny"}
        size={20}
        color={isDark ? "#e4e4e7" : "#f59e0b"}
      />
    </TouchableOpacity>
  );
}
