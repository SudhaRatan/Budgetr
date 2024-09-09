import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import TransactionCard from "./TransactionCard";
import { useDataStore } from "../stores/dataStore";
import {
  Button,
  Dialog,
  Divider,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import BottomSheet from "./BottomSheet";
import { deleteTransaction } from "../bl/dbFunctions";

const TransactionFragment = () => {
  const debitCategories = useDataStore((state) => state.debitCategories);
  const categories = useDataStore((state) => state.categories);

  const transactions = useDataStore((state) => state.transactions);
  const scrollY = useSharedValue(0);

  const BSRef = useRef<any>();
  const theme = useTheme();

  const idToDelete = useRef<string | null>(null);
  const [showDialog, setD] = useState(false);

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
              onPress={(): void => {
                BSRef.current.open();
                idToDelete.current = item.id!;
              }}
            />
          );
        }}
        ListEmptyComponent={
          <Text variant="titleLarge" style={{ fontWeight: "bold", margin: 10 }}>
            No transactions
          </Text>
        }
      />
      <Portal>
        <Dialog
          onDismiss={() => {
            runOnJS(setD)(false);
          }}
          visible={showDialog}
        >
          <Dialog.Title>
            <Text>Are you sure?</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text>Delete only if you made a transaction mistake</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                runOnJS(setD)(false);
              }}
              style={{
                backgroundColor: theme.colors.primaryContainer,
              }}
              labelStyle={{
                color: theme.colors.primary,
                paddingHorizontal: 20,
              }}
            >
              No
            </Button>
            <Button
              style={{
                backgroundColor: theme.colors.tertiaryContainer,
              }}
              labelStyle={{
                color: theme.colors.tertiary,
                paddingHorizontal: 20,
              }}
              onPress={() => {
                runOnJS(setD)(false);
                if (idToDelete.current) deleteTransaction(idToDelete.current);
              }}
            >
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
        <BottomSheet
          style={{ backgroundColor: "transaparent", padding: 0 }}
          ref={BSRef}
          hidePill
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: theme.colors.surfaceVariant,
              padding: 10,
              borderRadius: theme.roundness,
              marginTop: 20,
            }}
            onPress={() => {
              BSRef.current.close();
              setD(true);
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Delete Transaction
            </Text>
          </TouchableOpacity>
          <Divider style={{ marginVertical: 10 }} />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => BSRef.current.close()}
            style={{
              backgroundColor: theme.colors.surfaceVariant,
              padding: 10,
              borderRadius: theme.roundness,
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Close
            </Text>
          </TouchableOpacity>
        </BottomSheet>
      </Portal>
    </View>
  );
};

export default TransactionFragment;
