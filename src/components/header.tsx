import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  onPressMenu?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({
  title,
  onPressMenu,
  searchQuery = "",
  onSearchChange,
}: HeaderProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#e4e4e7" : "#3f3f46";
  const placeholderColor = colorScheme === "dark" ? "#71717a" : "#a1a1aa";

  const [searching, setSearching] = useState(false);

  const closeSearch = () => {
    onSearchChange?.("");
    setSearching(false);
  };

  if (searching) {
    return (
      <View className="flex-row items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-950">
        <View className="flex-1 flex-row items-center gap-2 h-10 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <Ionicons name="search" size={18} color={placeholderColor} />
          <TextInput
            autoFocus
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search articles"
            placeholderTextColor={placeholderColor}
            returnKeyType="search"
            autoCorrect={false}
            className="flex-1 text-base text-zinc-900 dark:text-white py-0"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => onSearchChange?.("")}
              hitSlop={8}
              accessibilityLabel="Clear search"
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={placeholderColor}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={closeSearch}
          accessibilityRole="button"
          accessibilityLabel="Close search"
          className="px-1 py-2"
        >
          <Text className="text-base text-indigo-600 dark:text-indigo-400 font-semibold">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-row items-center px-4 py-3 bg-white dark:bg-zinc-950">
      {/* Left slot: burger */}
      <View className="w-10 items-start">
        {onPressMenu && (
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            onPress={onPressMenu}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Ionicons name="menu" size={22} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center: title */}
      <Text
        className="flex-1 text-center text-lg font-bold text-zinc-900 dark:text-white tracking-tight"
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Right slot: search */}
      <View className="w-10 items-end">
        {onSearchChange && (
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            onPress={() => setSearching(true)}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Ionicons name="search" size={20} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
