import { useDrawer } from "@/context/drawer";
import { fetchSources, type Source } from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { ReactNode, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DrawerItemProps {
  label: string;
  selected?: boolean;
  leading: ReactNode;
  onPress: () => void;
}

function DrawerItem({ label, selected, leading, onPress }: DrawerItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 px-3 py-2.5 rounded-xl ${
        selected
          ? "bg-paper-subtle dark:bg-paperDark-subtle"
          : "active:bg-paper-subtle/60 dark:active:bg-paperDark-subtle/60"
      }`}
    >
      {leading}
      <Text
        className={`flex-1 text-base ${
          selected
            ? "font-dm-medium text-ink dark:text-inkDark"
            : "font-dm text-ink/80 dark:text-inkDark-muted"
        }`}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// Shows the source's icon, falling back to its first letter
function SourceIcon({ source }: { source: Source }) {
  const [failed, setFailed] = useState(false);

  if (source.icon_url && !failed) {
    return (
      <Image
        source={{ uri: source.icon_url }}
        onError={() => setFailed(true)}
        resizeMode="cover"
        className="w-9 h-9 rounded-full bg-paper-surface dark:bg-paperDark-surface"
      />
    );
  }

  return (
    <View className="w-9 h-9 rounded-full bg-indigo-700/15 dark:bg-indigo-500/20 items-center justify-center">
      <Text className="font-dm-bold text-indigo-700 dark:text-indigo-300">
        {source.name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

// Loads the drawer with the sources
export default function DrawerContent() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#EDE8DF" : "#222222";
  const { isOpen, close, selectedSource, selectSource } = useDrawer();

  const [sources, setSources] = useState<Source[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  // Load sources the first time the drawer opens (and retry if that failed)
  useEffect(() => {
    if (!isOpen || sources.length > 0) return;

    setStatus("loading");
    fetchSources()
      .then((list) => {
        setSources(list);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, [isOpen, sources.length]);

  const goToFeed = (source: Source | null) => {
    selectSource(source);
    router.navigate("/");
    close();
  };

  const goToSettings = () => {
    router.navigate("/settings");
    close();
  };

  return (
    <View
      className="flex-1"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* App name */}
      <View className="px-5 py-4">
        <Text className="text-xl font-dm-bold text-ink dark:text-inkDark tracking-tight">
          ZenFeed
        </Text>
      </View>

      <ScrollView className="flex-1 px-3" showsVerticalScrollIndicator={false}>
        <DrawerItem
          label="Main Feed"
          selected={selectedSource === null}
          onPress={() => goToFeed(null)}
          leading={
            <View className="w-9 h-9 rounded-full bg-paper-surface dark:bg-paperDark-surface items-center justify-center">
              <Ionicons name="newspaper-outline" size={18} color={iconColor} />
            </View>
          }
        />

        <Text className="text-xs font-dm-bold text-ink-muted dark:text-inkDark-faint uppercase tracking-wider px-3 mt-5 mb-2">
          Sources
        </Text>

        {status === "loading" && (
          <ActivityIndicator color="#818cf8" className="mt-4" />
        )}

        {status === "error" && (
          <Text className="text-sm font-dm text-ink-muted dark:text-inkDark-muted px-3">
            Couldn't load sources. Close and reopen the menu to retry.
          </Text>
        )}

        {sources.map((source) => (
          <DrawerItem
            key={source.id}
            label={source.name}
            selected={selectedSource?.id === source.id}
            onPress={() => goToFeed(source)}
            leading={<SourceIcon source={source} />}
          />
        ))}
      </ScrollView>

      {/* Settings pinned to the bottom */}
      <View className="px-3 pt-3 border-t border-paper-border dark:border-paperDark-border">
        <DrawerItem
          label="Settings"
          onPress={goToSettings}
          leading={
            <View className="w-9 h-9 rounded-full bg-paper-surface dark:bg-paperDark-surface items-center justify-center">
              <Ionicons name="settings-outline" size={18} color={iconColor} />
            </View>
          }
        />
      </View>
    </View>
  );
}
