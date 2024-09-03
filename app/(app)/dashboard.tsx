import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import { useState, useEffect } from "react";
import ThemedBackground from "@/src/components/ThemedBackground";

const data = [
  {
    value: 10,
    label: "Mon",
  },
  {
    value: 15,
    label: "Tue",
  },
  {
    value: 20,
    label: "Wed",
  },
  {
    value: 18,
    label: "Thu",
  },
  {
    value: 25,
    label: "Fri",
  },
  {
    value: 12,
    label: "Sat",
  },
  {
    value: 17,
    label: "Sun",
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
