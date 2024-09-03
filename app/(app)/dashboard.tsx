import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LineChart } from "react-native-gifted-charts";
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
        <LineChart
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chartContainer: {
    width: "80%",
    height: 200,
    marginVertical: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
