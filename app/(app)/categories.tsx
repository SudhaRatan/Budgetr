import BottomSheet from "@/src/components/BottomSheet";
import CategoryForm from "@/src/components/CategoryForm";
import DebitComponent from "@/src/components/DebitComponent";
import ExpensesDonutChart from "@/src/components/ExpensesDonutChart";
import ThemedBackground from "@/src/components/ThemedBackground";
import TransactionForm from "@/src/components/TransactionForm";
import TransactionFragment from "@/src/components/TransactionFragment";
import { useDataStore } from "@/src/stores/dataStore";
import { usePrefereneStore } from "@/src/stores/preferencesStore";
import { category } from "@/src/types/dbTypes";
import { Suspense, useMemo, useRef, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { Icon, Portal, Text, useTheme } from "react-native-paper";

export default function Categories() {
  const { width } = Dimensions.get("screen");
  const cardPadding = 10;
  const theme = useTheme();
  const BSRef = useRef<any>();
  const BSRef2 = useRef<any>();

  const [formvisible, setformvisible] = useState(false);

  const toggleType = usePrefereneStore((state) => state.toggleType);

  const debitCategories = useDataStore((state) => state.debitCategories);

  const transactions = useDataStore((state) => state.transactions);

  const [passedCategory, setPassedCategory] = useState<category>();

  const onCloseForm = () => {
    setformvisible(false);
    setCategory(cat1);
  };

  const openForm = () => {
    BSRef.current.open();
    setformvisible(true);
  };

  const onCloseTransactionForm = () => { };

  const openTransactionForm = () => {
    BSRef2.current.open();
  };

  const cat1 = useMemo<category>(
    () => ({
      name: "",
      type: "Debit",
      color: "#FF6F61",
      emoji: "💵",
      totalAmount: 0,
    }),
    []
  );
  const [cat, setCategory] = useState<category>(cat1);

  return (
    <ThemedBackground style={{ flex: 1 }}>
      {toggleType === "Categories" ? (
        // categories
        debitCategories ? (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            <ExpensesDonutChart data={debitCategories} />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                padding: cardPadding,
                gap: cardPadding,
              }}
            >
              {debitCategories?.map((category, index) => {
                return (
                  <DebitComponent
                    index={index}
                    key={category.id}
                    editPress={() => {
                      setCategory(category);
                      openForm();
                    }}
                    onPress={() => {
                      openTransactionForm();
                      setPassedCategory(category);
                    }}
                    {...category}
                  />
                );
              })}
              <View
                style={{
                  padding: 10,
                  width: width / 3 - 1.5 * cardPadding,
                  height: width / 3 - 1.5 * cardPadding,
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
                  onPress={() => {
                    openForm();
                  }}
                >
                  <Icon size={20} source="plus" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : null
      ) : transactions ? (
        <TransactionFragment />
      ) : null}
      <Portal>
        <BottomSheet onClose={onCloseForm} ref={BSRef}>
          {formvisible && (
            <CategoryForm cat={cat} close={BSRef.current.close} />
          )}
        </BottomSheet>
        <BottomSheet onClose={() => { }} ref={BSRef2}>
          {debitCategories && (
            <TransactionForm
              categoryToPass={passedCategory!}
              closeForm={() => {
                BSRef2.current.close();
              }}
            />
          )}
        </BottomSheet>
      </Portal>
    </ThemedBackground>
  );
}
