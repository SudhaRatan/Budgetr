import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import { useState, useEffect } from "react";
import ThemedBackground from "@/src/components/ThemedBackground";

const data = [
  {
    label: "Mon",
    value: 8, // Total spending for Monday
  },
  {
    label: "Tue",
    value: 10, // Total spending for Tuesday
  },
  {
    label: "Wed",
    value: 17, // Total spending for Wednesday
  },
  {
    label: "Thu",
    value: 11, // Total spending for Thursday
  },
  {
    label: "Fri",
    value: 22, // Total spending for Friday
  },
  {
    label: "Sat",
    value: 9, // Total spending for Saturday
  },
  {
    label: "Sun",
    value: 12, // Total spending for Sunday
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
      <Text style={styles.title}>Weekly Spending Breakdown</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          yAxisThickness={0}
          // stackedBar={true} // Remove stackedBar as we are not grouping by category
          // groupBy="categoryId" // Remove groupBy as we are not grouping by category
          barWidth={20}
          colors={{
            food: "#FF6347",
            transport: "#4169E1",
            entertainment: "#008000",
          }}
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
