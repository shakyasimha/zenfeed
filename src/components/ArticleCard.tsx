// src/components/ArticleCard.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface Article {
  id: number;
  source_id: number;
  title: string;
  url: string; // add this
  snippet: string | null;
  image_url: string | null;
  published_at: string;
  source: { name: string };
}

interface ArticleCardProps {
  article: Article;
  onPress?: (article: Article) => void;
}

// The API sends "YYYY-MM-DD HH:mm:ss" with no timezone marker.
// Your created_at values show the server is on UTC, so parse it as UTC.
function formatPublished(value: string): string {
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

export default function ArticleCard({ article, onPress }: ArticleCardProps) {
  const { title, snippet, image_url, published_at, source } = article;
  const [imageFailed, setImageFailed] = useState(false);

  const hasImage = !!image_url && !imageFailed;
  const published = formatPublished(published_at);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(article)}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-4"
    >
      {/* Image (or placeholder when missing or broken) */}
      {hasImage ? (
        <Image
          source={{ uri: image_url }}
          resizeMode="cover"
          onError={() => setImageFailed(true)}
          className="w-full aspect-video bg-zinc-800"
        />
      ) : (
        <View className="w-full aspect-video bg-zinc-800 items-center justify-center">
          <Ionicons name="image-outline" size={32} color="#52525b" />
        </View>
      )}

      <View className="p-4">
        {/* Title */}
        <Text
          className="text-base font-bold text-zinc-100 leading-snug"
          numberOfLines={3}
        >
          {title}
        </Text>

        {/* Snippet (skipped when null) */}
        {!!snippet && (
          <Text
            className="text-sm text-zinc-400 leading-normal mt-2"
            numberOfLines={3}
          >
            {snippet}
          </Text>
        )}

        {/* Source + published date */}
        <View className="flex-row items-center gap-2 mt-3">
          <Text className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            {source.name}
          </Text>
          {!!published && (
            <>
              <Text className="text-xs text-zinc-600">•</Text>
              <Text className="text-xs text-zinc-500">{published}</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
