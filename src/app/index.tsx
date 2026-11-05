import ArticleCard from "@/components/ArticleCard";
import Header from "@/components/header";
import { useDrawer } from "@/context/drawer";
import { fetchArticles, type Article } from "@/lib/api";
import { useCallback, useEffect, useMemo, useState } from "react";
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

export default function HomeScreen() {
  const { toggle, selectedSource } = useDrawer();
  const sourceId = selectedSource?.id ?? null;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        setArticles(await fetchArticles(sourceId));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [sourceId],
  );

  // Reloads on first render and whenever a different source is selected
  useEffect(() => {
    load();
  }, [load]);

  const openArticle = (article: Article) => {
    Linking.openURL(article.url).catch(() =>
      console.log("Could not open", article.url),
    );
  };

  // Client-side search over the loaded articles (title + snippet)
  const trimmedQuery = query.trim();
  const visibleArticles = useMemo(() => {
    if (!trimmedQuery) return articles;
    const q = trimmedQuery.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.snippet ?? "").toLowerCase().includes(q),
    );
  }, [articles, trimmedQuery]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
      <Header
        title={selectedSource?.name ?? "Main Feed"}
        onPressMenu={toggle}
        searchQuery={query}
        onSearchChange={setQuery}
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#818cf8" />
        </View>
      ) : error && articles.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8 gap-3">
          <Text className="text-zinc-900 dark:text-zinc-200 text-base font-semibold">
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
          keyboardShouldPersistTaps="handled"
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
              {trimmedQuery
                ? `No results for "${trimmedQuery}".`
                : selectedSource
                  ? `No articles from ${selectedSource.name} yet.`
                  : "No articles yet."}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
