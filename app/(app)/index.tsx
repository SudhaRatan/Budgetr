import { useRouter } from 'expo-router';
import ThemedBackground from '@/src/components/ThemedBackground';
import { Button, Surface, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useDataStore } from '@/src/stores/dataStore';

export default function Home() {

  const router = useRouter()
  const theme = useTheme()
  const categories = useDataStore((state) => state.categories)

  return (
    <ThemedBackground style={styles.container}>
      {categories
        ?
        <>
          <Text variant='bodyLarge'>Total Balance</Text>
          <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            <Text variant='displaySmall' style={{ color: theme.colors.inversePrimary }}>$ </Text>
            <Text variant='displayMedium'>{categories.map(category => category.totalAmount).reduce((ac, x) => (ac + x), 0)}</Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {categories.map((category) => {
              return (<Surface key={category.id} style={{padding: 20}}>
                <Text>{category.name}</Text>
                <Text>{category.totalAmount}</Text>
              </Surface>)
            })}
          </View>
        </>
        :
        <Text style={styles.title}>Loading...</Text>
      }
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
