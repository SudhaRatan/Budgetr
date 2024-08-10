import { useRouter } from "expo-router";
import ThemedBackground from "@/src/components/ThemedBackground";
import { Icon, Text, useTheme } from "react-native-paper";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDataStore } from "@/src/stores/dataStore";
import CreditComponent from "@/src/components/CreditComponent";
// import Emojis from "unicode-emoji-json/data-ordered-emoji.json";

export default function Home() {
  const theme = useTheme();
  const categories = useDataStore((state) => state.categories);
  const { width } = Dimensions.get("screen");
  const cardPadding = 10;
  // console.log(Emojis);

  return (
    <ThemedBackground style={styles.container}>
      {categories ? (
        <View style={{ gap: 60 }}>
          <View style={{}}>
            <Text
              variant="bodyLarge"
              style={{
                textAlign: "center",
              }}
            >
              Total Balance
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                variant="headlineLarge"
                style={{
                  color: theme.colors.onSurfaceDisabled,
                  fontWeight: "bold",
                }}
              >
                &#8377;{" "}
              </Text>
              <Text variant="displayMedium" style={{ fontWeight: "bold" }}>
                {categories
                  .map((category) => category.totalAmount)
                  .reduce((ac, x) => ac + x, 0)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              padding: cardPadding,
              gap: cardPadding,
            }}
          >
            {categories.map((category) => {
              return <CreditComponent key={category.id} {...category} />;
            })}
            <View
              style={{
                padding: 10,
                width: width / 2 - 1.5 * cardPadding,
                height: width / 2 - 1.5 * cardPadding,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  backgroundColor: theme.colors.inverseOnSurface,
                  padding: 30,
                  borderRadius: 100,
                }}
                onPress={() => {}}
              >
                <Icon size={20} source="plus" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.title}>Loading...</Text>
      )}
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
