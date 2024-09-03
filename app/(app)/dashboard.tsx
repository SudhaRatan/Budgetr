import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import { useState, useEffect } from "react";
import ThemedBackground from "@/src/components/ThemedBackground";

const data = [
  {
    label: "Mon",
    transactions: [
      { value: 5, categoryId: "food" },
      { value: 3, categoryId: "transport" },
    ],
  },
  {
    label: "Tue",
    transactions: [
      { value: 8, categoryId: "food" },
      { value: 2, categoryId: "entertainment" },
    ],
  },
  {
    label: "Wed",
    transactions: [
      { value: 12, categoryId: "food" },
      { value: 5, categoryId: "transport" },
    ],
  },
  {
    label: "Thu",
    transactions: [
      { value: 7, categoryId: "food" },
      { value: 4, categoryId: "entertainment" },
    ],
  },
  {
    label: "Fri",
    transactions: [
      { value: 15, categoryId: "food" },
      { value: 7, categoryId: "transport" },
    ],
  },
  {
    label: "Sat",
    transactions: [
      { value: 6, categoryId: "food" },
      { value: 3, categoryId: "entertainment" },
    ],
  },
  {
    label: "Sun",
    transactions: [
      { value: 10, categoryId: "food" },
      { value: 2, categoryId: "transport" },
    ],
  },
];

export default function Dashboard() {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    // Fetch data from API or local storage
    // ...
    // Update chartData with fetched data
    // setChartData(fetchedData);
  }, []);

  return (
    <ThemedBackground style={styles.container}>
      <Text style={styles.title}>Weekly Spending</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          yAxisThickness={0}
          stackedBar={true}
          groupBy="categoryId"
          // Customize chart appearance
          // ...
        />
      </View>
      <View style={styles.separator} />
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartContainer: {
    width: "100%",
    height: 300,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
});
