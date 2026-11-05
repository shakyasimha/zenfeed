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
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#EDE8DF" : "#222222";
  const placeholderColor = isDark ? "#70675C" : "#8C8275";

  const [searching, setSearching] = useState(false);

  const closeSearch = () => {
    onSearchChange?.("");
    setSearching(false);
  };

  if (searching) {
    return (
      <View className="flex-row items-center gap-2 px-4 py-3 bg-paper dark:bg-paperDark">
        <View className="flex-1 flex-row items-center gap-2 h-10 px-3 rounded-xl bg-paper-subtle dark:bg-paperDark-subtle border border-paper-border dark:border-paperDark-border">
          <Ionicons name="search" size={18} color={placeholderColor} />
          <TextInput
            autoFocus
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search articles"
            placeholderTextColor={placeholderColor}
            returnKeyType="search"
            autoCorrect={false}
            className="flex-1 text-base font-dm text-ink dark:text-inkDark py-0"
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
          <Text className="text-base font-dm-medium text-indigo-700 dark:text-indigo-400">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-row items-center px-4 py-3 bg-paper dark:bg-paperDark">
      {/* Left slot: burger */}
      <View className="w-10 items-start">
        {onPressMenu && (
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center rounded-xl bg-paper-surface dark:bg-paperDark-surface border border-paper-border dark:border-paperDark-border"
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
        className="flex-1 text-center text-lg font-dm-bold text-ink dark:text-inkDark tracking-tight"
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Right slot: search */}
      <View className="w-10 items-end">
        {onSearchChange && (
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center rounded-xl bg-paper-surface dark:bg-paperDark-surface border border-paper-border dark:border-paperDark-border"
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
