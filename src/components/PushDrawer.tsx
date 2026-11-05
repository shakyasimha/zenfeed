import { useDrawer } from "@/context/drawer";
import { ReactNode, useEffect } from "react";
import {
  BackHandler,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface PushDrawerProps {
  drawer: ReactNode;
  children: ReactNode;
}

export default function PushDrawer({ drawer, children }: PushDrawerProps) {
  const { isOpen, close } = useDrawer();
  const { width } = useWindowDimensions();
  const drawerWidth = Math.min(width * 0.8, 320);

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }, [isOpen, progress]);

  // Android back button closes the drawer instead of leaving the screen
  useEffect(() => {
    if (!isOpen) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      close();
      return true;
    });
    return () => sub.remove();
  }, [isOpen, close]);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (progress.value - 1) * drawerWidth * 0.25 }],
    opacity: 0.6 + progress.value * 0.4,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * drawerWidth }],
    borderRadius: progress.value * 24,
  }));

  return (
    <View className="flex-1 bg-zinc-100 dark:bg-zinc-900">
      {/* Drawer panel, fixed behind the content */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: drawerWidth,
          },
          drawerStyle,
        ]}
      >
        {drawer}
      </Animated.View>

      {/* Main content, pushed to the right */}
      <Animated.View style={[{ flex: 1, overflow: "hidden" }, contentStyle]}>
        <View className="flex-1 bg-white dark:bg-zinc-950">
          {children}

          {/* Tap anywhere on the pushed content to close */}
          {isOpen && (
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={close}
              accessibilityLabel="Close menu"
            />
          )}
        </View>
      </Animated.View>
    </View>
  );
}
