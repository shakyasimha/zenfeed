import Header from "@/components/header";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data to visualize the feed
interface Article {
  id: string;
  source: string;
  time: string;
  title: string;
  snippet: string;
}

const MOCK_FEED: Article[] = [
  {
    id: "1",
    source: "TechCrunch",
    time: "12m ago",
    title: "Expo SDK 58 officially drops with next-gen React Compiler support",
    snippet:
      "Exploring the newest performance boosts, simplified bundle configurations, and streamlined NativeWind integrations.",
  },
  {
    id: "2",
    source: "Hacker News",
    time: "45m ago",
    title: "Show HN: A lightning-fast local RSS reader built for Android",
    snippet:
      "Zero telemetry, instant OPML imports, and a minimalist design focused entirely on readability.",
  },
  {
    id: "3",
    source: "The Verge",
    time: "2h ago",
    title:
      "The shift toward local-first software and offline data synchronization",
    snippet:
      "Why developers and users are moving away from cloud-dependent tools in favor of resilient local databases.",
  },
];

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>(MOCK_FEED);

  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-3 active:bg-zinc-850"
      onPress={() => console.log(`Selected article: ${item.title}`)}
    >
      {/* Card Header: Source & Timestamp */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          {item.source}
        </Text>
        <Text className="text-xs text-zinc-500">{item.time}</Text>
      </View>

      {/* Article Title */}
      <Text className="text-base font-bold text-zinc-100 mb-1 leading-snug">
        {item.title}
      </Text>

      {/* Article Snippet */}
      <Text className="text-sm text-zinc-400 leading-normal" numberOfLines={2}>
        {item.snippet}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      {/* Header */}
      <Header
        title="Main Page"
        onPressMenu={() => console.log("Open Drawer")}
        onPressSearch={() => console.log("Open Search")}
      />
    </SafeAreaView>
  );
}
