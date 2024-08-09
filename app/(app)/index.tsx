import { useRouter } from 'expo-router';
import ThemedBackground from '@/components/ThemedBackground';
import { Button, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function Home() {

  const router = useRouter()

  return (
    <ThemedBackground style={styles.container}>
      <Text style={styles.title}>Home page</Text>
      <View style={styles.separator} />
    </ThemedBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
