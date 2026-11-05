import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type Mode = "system" | "light" | "dark";

const NEXT: Record<Mode, Mode> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const LABEL: Record<Mode, string> = {
  system: "Theme: follow system. Tap for light",
  light: "Theme: light. Tap for dark",
  dark: "Theme: dark. Tap for system",
};

// Kept at module level so the button shows the right mode after remounting
let savedMode: Mode = "system";

export default function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [mode, setMode] = useState<Mode>(savedMode);
  const isDark = colorScheme === "dark";

  const cycle = () => {
    const next = NEXT[mode];
    savedMode = next;
    setMode(next);
    setColorScheme(next);
  };

  const iconName =
    mode === "system"
      ? "phone-portrait-outline"
      : mode === "light"
        ? "sunny"
        : "moon";
  const iconColor =
    mode === "light" ? "#f59e0b" : isDark ? "#e4e4e7" : "#3f3f46";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={cycle}
      accessibilityRole="button"
      accessibilityLabel={LABEL[mode]}
      className="w-10 h-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
    >
      <Ionicons name={iconName} size={20} color={iconColor} />
    </TouchableOpacity>
  );
}
