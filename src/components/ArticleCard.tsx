// src/components/ArticleCard.tsx
import type { Article } from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ArticleCardProps {
  article: Article;
  onPress?: (article: Article) => void;
}

// The API sends "YYYY-MM-DD HH:mm:ss" in UTC with no timezone marker.
function formatPublished(value?: string | null): string {
  if (!value) return "";

  const iso = value.includes("T") ? value : value.replace(" ", "T") + "Z";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Shown when an article has no image (or it fails to load): the source's icon
function ImagePlaceholder({ article }: { article: Article }) {
  const [iconFailed, setIconFailed] = useState(false);
  const { colorScheme } = useColorScheme();
  const iconUrl = article.source?.icon_url;

  return (
    <View className="w-full aspect-video bg-paper-subtle dark:bg-zinc-800 items-center justify-center">
      {iconUrl && !iconFailed ? (
        <Image
          source={{ uri: iconUrl }}
          onError={() => setIconFailed(true)}
          className="w-16 h-16 rounded-2xl opacity-90"
        />
      ) : (
        <Ionicons
          name="newspaper-outline"
          size={32}
          color={colorScheme === "dark" ? "#52525b" : "#8C8275"}
        />
      )}
    </View>
  );
}

export default function ArticleCard({ article, onPress }: ArticleCardProps) {
  const { title, snippet, image_url, published_at, source } = article;
  const [imageFailed, setImageFailed] = useState(false);

  const hasImage = !!image_url && !imageFailed;
  const published = formatPublished(published_at);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(article)}
      className="bg-paper-surface dark:bg-zinc-900 border border-paper-border dark:border-zinc-800 rounded-2xl overflow-hidden mb-4"
    >
      {hasImage ? (
        <Image
          source={{ uri: image_url }}
          resizeMode="cover"
          onError={() => setImageFailed(true)}
          className="w-full aspect-video bg-paper-subtle dark:bg-zinc-800"
        />
      ) : (
        <ImagePlaceholder article={article} />
      )}

      <View className="p-4">
        <Text
          className="text-base font-dm-bold text-ink dark:text-zinc-100 leading-snug"
          numberOfLines={3}
        >
          {title}
        </Text>

        {!!snippet && (
          <Text
            className="text-sm font-dm text-ink-muted dark:text-zinc-400 leading-normal mt-2"
            numberOfLines={3}
          >
            {snippet}
          </Text>
        )}

        <View className="flex-row items-center gap-2 mt-3">
          {!!source?.name && (
            <Text className="text-xs font-dm-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
              {source.name}
            </Text>
          )}
          {!!published && (
            <>
              <Text className="text-xs font-dm text-ink-faint dark:text-zinc-600">
                •
              </Text>
              <Text className="text-xs font-dm text-ink-faint dark:text-zinc-500">
                {published}
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
