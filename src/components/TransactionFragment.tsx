import { View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import TransactionCard from "./TransactionCard";
import { useDataStore } from "../stores/dataStore";
import { Text } from "react-native-paper";

const TransactionFragment = () => {
  const debitCategories = useDataStore((state) => state.debitCategories);
  const categories = useDataStore((state) => state.categories);

  const transactions = useDataStore((state) => state.transactions);
  const scrollY = useSharedValue(0);

  return (
    <View>
      <Animated.FlatList
        onScroll={useAnimatedScrollHandler({
          onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
          },
        })}
        data={transactions}
        contentContainerStyle={{ gap: 15, padding: 10 }}
        keyExtractor={(i, index) => i.id!}
        renderItem={({ item, index }) => {
          return (
            <TransactionCard
              index={index}
              scrollY={scrollY}
              categoryDetails={item.categoryDetails}
              ccDetails={categories?.find((i) => i.id === item.categoryFromId)!}
              {...item}
            />
          );
        }}
        ListEmptyComponent={
          <Text variant="titleLarge" style={{ fontWeight: "bold", margin: 10 }}>
            No transactions
          </Text>
        }
      />
    </View>
  );
};

export default TransactionFragment;
