import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  title: string;
  onPressMenu?: () => void;
  onPressSearch?: () => void;
}

export default function Header({
  title,
  onPressMenu,
  onPressSearch,
}: HeaderProps) {
  return (
    <View className="flex-row items-center px-4 py-3 bg-zinc-950">
      {/* Left slot: burger */}
      <View className="w-10 items-start">
        {onPressMenu && (
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800"
            onPress={onPressMenu}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Ionicons name="menu" size={22} color="#e4e4e7" />
          </TouchableOpacity>
        )}
      </View>

      {/* Center: title */}
      <Text
        className="flex-1 text-center text-lg font-bold text-white tracking-tight"
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Right slot: search */}
      <View className="flex-row w-10 items-end">
        {/* {onPressSearch && (
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800"
            onPress={onPressSearch}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Ionicons name="search" size={20} color="#d4d4d8" />
          </TouchableOpacity>
        )} */}

        <ThemeToggle />
      </View>
    </View>
  );
}
