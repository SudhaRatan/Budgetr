import { Dimensions, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import { useState, useEffect, useMemo } from "react";
import ThemedBackground from "@/src/components/ThemedBackground";
import { modifyColor } from "@/src/utils/analyticsUtils";
import { useDataStore } from "@/src/stores/dataStore";

export default function Dashboard() {
  const theme = useTheme();
  const debitCategories = useDataStore((state) => state.debitCategories);
  const transactions = useDataStore((state) => state.transactions);

  const calculatedTransactions = useMemo(() => {
    const groupedTransactions = transactions?.reduce((result, transaction) => {
      var idx = result.findIndex(
        (i) =>
          i.categoryToId == transaction.categoryToId &&
          i.createdOn === transaction.createdOn?.toDate().toDateString()!
      );
      if (idx === -1) {
        result.push({
          categoryToId: transaction.categoryToId,
          amount: transaction.amount,
          createdOn: transaction.createdOn?.toDate().toDateString()!,
          color: transaction.categoryDetails?.color,
        });
      } else {
        result[idx].amount += transaction.amount;
      }
      return result;
    }, []);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var transactionsCalc: any = [];
    if (groupedTransactions?.length > 0) {
      days.forEach((day) => {
        var tr = groupedTransactions
          ?.filter((t) => t.createdOn.split(" ")[0] === day)
          .map((t) => ({
            value: t.amount,
            color: t.color,
            gradientColor: modifyColor(t.color),
            marginBottom: 2,
          }));

        var d = {
          stacks: tr,
          label: day,
        };
        if (d?.stacks?.length > 0) transactionsCalc.push(d);
        else transactionsCalc.push({ stacks: [{ value: 0 }], label: day });
      });
    }
    return transactionsCalc;
  }, [transactions]);

  const { width } = Dimensions.get("screen");

  useEffect(() => {
    if (transactions === null) {
    }
  }, []);

  return (
    <ThemedBackground style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.secondary }]}>
          Total Spending
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 26, marginBottom: 20 }}>
          &#8377;
          {calculatedTransactions
            ?.flatMap((i) => i.stacks)
            .reduce((res, t) => t.value + res, 0)}
        </Text>
        <View
          style={[
            styles.chartContainer,
            { width: width - 20, paddingRight: 50 },
          ]}
        >
          {calculatedTransactions != undefined &&
            calculatedTransactions?.length > 0 && (
              <BarChart
                stackData={calculatedTransactions}
                yAxisThickness={0}
                xAxisThickness={0}
                noOfSections={4}
                barWidth={20}
                barBorderRadius={4}
                showGradient
                isAnimated
                scrollAnimation
                animationDuration={600}
                xAxisLabelTextStyle={{ color: "gray" }}
                yAxisTextStyle={{ color: "gray" }}
                xAxisColor={"gray"}
              />
            )}
        </View>
      </View>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  innerContainer: {
    elevation: 2,
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 15,
  },
  chartContainer: {},
});
