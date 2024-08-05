import { useRouter } from 'expo-router';
import ThemedBackground from '@/components/ThemedBackground';
import { Button, Text } from 'react-native-paper';

export default function TabOneScreen() {

  const router = useRouter()

  return (
    <ThemedBackground style={{padding: 15}}>
      <Text>Index page</Text>
      <Button mode='contained' onPress={() => router.push("/two")} >Go to 2</Button>
    </ThemedBackground>
  );
}
