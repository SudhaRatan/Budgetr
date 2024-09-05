import BottomSheet from "@/src/components/BottomSheet";
import CategoryForm from "@/src/components/CategoryForm";
import DebitComponent from "@/src/components/DebitComponent";
import ExpensesDonutChart from "@/src/components/ExpensesDonutChart";
import ThemedBackground from "@/src/components/ThemedBackground";
import TransactionForm from "@/src/components/TransactionForm";
import TransactionFragment from "@/src/components/TransactionFragment";
import { AnimatedtextContext } from "@/src/contexts/Animatedtext";
import { useDataStore } from "@/src/stores/dataStore";
import { usePreferenceStore } from "@/src/stores/preferencesStore";
import { category } from "@/src/types/dbTypes";
import { useFocusEffect } from "expo-router";
import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Icon, Portal, Text, useTheme } from "react-native-paper";

export default function Categories() {
  const { width } = Dimensions.get("screen");
  const cardPadding = 10;
  const theme = useTheme();
  const BSRef = useRef<any>();
  const BSRef2 = useRef<any>();

  const [formvisible, setformvisible] = useState(false);

  const toggleType = usePreferenceStore((state) => state.toggleType);

  const debitCategories = useDataStore((state) => state.debitCategories);
  const categories = useDataStore((state) => state.categories);

  const transactions = useDataStore((state) => state.transactions);

  const [passedCategory, setPassedCategory] = useState<category>();

  const { setUpdate } = useContext(AnimatedtextContext);

  const onCloseForm = () => {
    setformvisible(false);
    setCategory(cat1);
    setUpdate!((prev) => !prev);
  };

  const openForm = () => {
    BSRef.current.open();
    setformvisible(true);
  };

  const onCloseTransactionForm = () => {};

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

  const processedCategories = useMemo(() => {
    return debitCategories?.map((c) => {
      const ta =
        transactions
          ?.filter((t) => t.categoryToId == c.id)
          ?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
      return { ...c, totalAmount: ta };
    });
  }, [debitCategories, transactions]);

  const totalTransactionAmount = useMemo(() => {
    return transactions?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  }, [transactions]);

  useFocusEffect(
    useCallback(() => {
      setUpdate!((prev) => !prev);
    }, [])
  );

  // const PagerRef = useRef<PagerView>(null);

  // useEffect(() => {
  //   PagerRef.current?.setPage(
  //     toggleType === "Categories" ? 0 : toggleType === "Transactions" ? 1 : 2
  //   );
  // }, [toggleType]);

  return (
    <ThemedBackground style={{ flex: 1 }}>
      {/* <PagerView ref={PagerRef} style={{ flex: 1 }}>
        <View key={1}>
          {debitCategories && (
            <ScrollView>
              {totalTransactionAmount != 0 ? (
                <ExpensesDonutChart data={processedCategories!} />
              ) : (
                processedCategories &&
                processedCategories.length > 0 && (
                  <Text
                    variant="titleLarge"
                    style={{ fontWeight: "bold", margin: 10 }}
                  >
                    No transactions
                  </Text>
                )
              )}
              <View
                style={{
                  flexDirection:
                    processedCategories && processedCategories?.length > 0
                      ? "row"
                      : "column",
                  flexWrap: "wrap",
                  padding: cardPadding,
                  gap: cardPadding,
                }}
              >
                {processedCategories && processedCategories?.length > 0 ? (
                  processedCategories?.map((category, index) => {
                    transactions
                      ?.filter((t) => t.categoryToId == category.id)
                      ?.reduce((acc, curr) => acc + curr.amount, 0) ??
                      category.totalAmount;
                    return (
                      <DebitComponent
                        index={index}
                        key={category.id}
                        editPress={() => {
                          setCategory(category);
                          openForm();
                        }}
                        onPress={() => {
                          if (categories && categories.length > 0) {
                            openTransactionForm();
                            setPassedCategory(category);
                          } else {
                            ToastAndroid.show(
                              "Add an income category in the home screen",
                              ToastAndroid.SHORT
                            );
                          }
                        }}
                        {...category}
                      />
                    );
                  })
                ) : (
                  <Text
                    variant="titleLarge"
                    style={{ fontWeight: "bold", margin: 10 }}
                  >
                    Add Categories
                  </Text>
                )}
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
          )}
        </View>
        <View key={2}>{transactions && <TransactionFragment />}</View>
        <Text key={3}>Analytics</Text>
      </PagerView> */}
      {toggleType === "Categories"
        ? // categories
          debitCategories && (
            <ScrollView>
              {totalTransactionAmount != 0 ? (
                <ExpensesDonutChart data={processedCategories!} />
              ) : (
                processedCategories &&
                processedCategories.length > 0 && (
                  <Text
                    variant="titleLarge"
                    style={{ fontWeight: "bold", margin: 10 }}
                  >
                    No transactions
                  </Text>
                )
              )}
              <View
                style={{
                  flexDirection:
                    processedCategories && processedCategories?.length > 0
                      ? "row"
                      : "column",
                  flexWrap: "wrap",
                  padding: cardPadding,
                  gap: cardPadding,
                }}
              >
                {processedCategories && processedCategories?.length > 0 ? (
                  processedCategories?.map((category, index) => {
                    transactions
                      ?.filter((t) => t.categoryToId == category.id)
                      ?.reduce((acc, curr) => acc + curr.amount, 0) ??
                      category.totalAmount;
                    return (
                      <DebitComponent
                        index={index}
                        key={category.id}
                        editPress={() => {
                          setCategory(category);
                          openForm();
                        }}
                        onPress={() => {
                          if (categories && categories.length > 0) {
                            openTransactionForm();
                            setPassedCategory(category);
                          } else {
                            ToastAndroid.show(
                              "Add an income category in the home screen",
                              ToastAndroid.SHORT
                            );
                          }
                        }}
                        {...category}
                      />
                    );
                  })
                ) : (
                  <Text
                    variant="titleLarge"
                    style={{ fontWeight: "bold", margin: 10 }}
                  >
                    Add Categories
                  </Text>
                )}
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
          )
        : transactions && <TransactionFragment />}
      <Portal>
        <BottomSheet onClose={onCloseForm} ref={BSRef}>
          {formvisible && (
            <CategoryForm cat={cat} close={BSRef.current.close} />
          )}
        </BottomSheet>
        <BottomSheet
          onClose={() => {
            setUpdate!((prev) => !prev);
          }}
          ref={BSRef2}
        >
          {debitCategories != null &&
            categories != null &&
            categories.length > 0 &&
            debitCategories.length > 0 && (
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
