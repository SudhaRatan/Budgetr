import { View } from "react-native";
import React from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import TransactionCard from "./TransactionCard";
import { useDataStore } from "../stores/dataStore";

const TransactionFragment = () => {
  const debitCategories = useDataStore((state) => state.debitCategories);
  const categories = useDataStore((state) => state.categories);

  const transactions = useDataStore((state) => state.transactions);
  const scrollY = useSharedValue(0);

  return (
    <View>
      <Animated.FlatList
        onScroll={({
          nativeEvent: {
            contentOffset: { y },
          },
        }) => {
          scrollY.value = y;
        }}
        data={transactions}
        contentContainerStyle={{ gap: 15, padding: 10 }}
        keyExtractor={(i, index) => i.id!}
        renderItem={({ item, index }) => {
          return (
            <TransactionCard
              index={index}
              scrollY={scrollY}
              categoryDetails={
                debitCategories?.find((i) => i.id === item.categoryToId)!
              }
              ccDetails={categories?.find((i) => i.id === item.categoryFromId)!}
              {...item}
            />
          );
        }}
      />
    </View>
  );
};

export default TransactionFragment;
