import CustomHeader from '@/components/CustomHeader';
import ThemedBackground from '@/components/ThemedBackground';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <PaperProvider>
      <ThemedBackground>
        <Stack>
          <Stack.Screen name='index' options={{
            header: (props) => <CustomHeader title="Home" {...props} />
          }} />
          <Stack.Screen name='two' options={{
            header: (props) => <CustomHeader title="Two" {...props} />
          }} />
        </Stack>
      </ThemedBackground>
    </PaperProvider>
  );
}
