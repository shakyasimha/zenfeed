import ArticleCard, { Article } from "@/components/ArticleCard";
import Header from "@/components/header";
import { useDrawer } from "@/context/drawer";
import { API_URL } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Function for fetching articles
async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${API_URL}/api/articles`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Server responded with ${res.status}`);

  const json = await res.json();
  // Handles both a plain array and Laravel's paginated { data: [...] } shape.
  return Array.isArray(json) ? json : (json.data ?? []);
}

export default function HomeScreen() {
  const { toggle, selectedSource } = useDrawer();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      setArticles(await fetchArticles());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openArticle = (article: Article) => {
    Linking.openURL(article.url).catch(() =>
      console.log("Could not open", article.url),
    );
  };

  // null selectedSource means "Main Feed" (all sources)
  const visibleArticles = selectedSource
    ? articles.filter((a) => a.source_id === selectedSource.id)
    : articles;

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <Header
        title={selectedSource?.name ?? "Main Feed"}
        onPressMenu={toggle}
        onPressSearch={() => console.log("Open Search")}
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#818cf8" />
        </View>
      ) : error && articles.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8 gap-3">
          <Text className="text-zinc-200 text-base font-semibold">
            Couldn't load articles
          </Text>
          <Text className="text-zinc-500 text-sm text-center">{error}</Text>
          <TouchableOpacity
            onPress={() => load()}
            className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-500"
          >
            <Text className="text-white font-semibold">Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={visibleArticles}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ArticleCard article={item} onPress={openArticle} />
          )}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(true)}
              tintColor="#818cf8"
              colors={["#818cf8"]}
            />
          }
          ListEmptyComponent={
            <Text className="text-zinc-500 text-center mt-16">
              {selectedSource
                ? `No articles from ${selectedSource.name} yet.`
                : "No articles yet."}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
