import { router, useRouter } from "expo-router";
import ThemedBackground from "@/src/components/ThemedBackground";
import { Icon, Portal, Text, useTheme } from "react-native-paper";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDataStore } from "@/src/stores/dataStore";
import CreditComponent from "@/src/components/CreditComponent";
import BottomSheet from "@/src/components/BottomSheet";
import { useMemo, useRef, useState } from "react";
import CategoryForm from "@/src/components/CategoryForm";
import { category } from "@/src/types/dbTypes";

export default function Home() {
  const theme = useTheme();
  const [formvisible, setformvisible] = useState(false);
  const categories = useDataStore((state) => state.categories);
  const { width, height } = Dimensions.get("window");
  const cardPadding = 10;
  const BSRef = useRef<any>();

  const onCloseForm = () => {
    setformvisible(false);
    setCategory(cat1);
  };

  const openForm = () => {
    BSRef.current.open();
    setformvisible(true);
  };

  const cat1 = useMemo<category>(
    () => ({
      name: "",
      type: "Credit",
      color: "#FF6F61",
      emoji: "💵",
      totalAmount: 0,
    }),
    []
  );
  const [cat, setCategory] = useState<category>(cat1);

  return (
    <ThemedBackground style={styles.container}>
      {categories ? (
        <ScrollView
          contentContainerStyle={{
            gap: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
              return (
                <CreditComponent
                  key={category.id}
                  editPress={() => {
                    setCategory(category);
                    openForm();
                  }}
                  {...category}
                />
              );
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
                onPress={openForm}
              >
                <Icon size={20} source="plus" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.title}>Loading...</Text>
      )}
      <Portal>
        <BottomSheet onClose={onCloseForm} ref={BSRef}>
          {formvisible && (
            <CategoryForm cat={cat} close={BSRef.current.close} />
          )}
        </BottomSheet>
      </Portal>
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
