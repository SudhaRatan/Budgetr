import "react-native-gesture-handler";
import CustomHeader from "@/src/components/CustomHeader";
import ThemedBackground from "@/src/components/ThemedBackground";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useAuthStore } from "@/src/stores/authStore";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar, useColorScheme } from "react-native";
import { usePreferenceStore } from "@/src/stores/preferencesStore";

export const firebaseAuth = auth;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const subscriber = firebaseAuth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = usePreferenceStore((state) => state.theme);
  useEffect(() => {
    StatusBar.setBarStyle(
      theme === "dark-content"
        ? "dark-content"
        : theme === "light-content"
        ? "light-content"
        : colorScheme === "dark"
        ? "light-content"
        : "dark-content"
    );
  }, []);
  return (
    <GestureHandlerRootView>
      <PaperProvider
        theme={
          theme === "dark-content"
            ? MD3LightTheme
            : theme === "light-content"
            ? MD3DarkTheme
            : undefined
        }
      >
        <ThemedBackground>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="sign-in"
              options={{
                headerShown: true,
                header: (props) => <CustomHeader {...props} />,
              }}
            />
            <Stack.Screen name="(app)" />
          </Stack>
        </ThemedBackground>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
