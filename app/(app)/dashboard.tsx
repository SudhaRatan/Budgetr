import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import { useState, useEffect } from "react";
import ThemedBackground from "@/src/components/ThemedBackground";
import { modifyColor } from "@/src/utils/analyticsUtils";

const data = [
  {
    stacks: [
      { value: 10, gradientColor: "yellow", color: "green" },
      {
        value: 20,
        color: "#4ABFF4",
        marginBottom: 2,
        gradientColor: modifyColor("#4ABFF4"),
      },
    ],
    label: "Sun",
  },
  {
    stacks: [
      { value: 10, color: "#4ABFF4" },
      { value: 11, color: "orange", marginBottom: 2 },
      { value: 15, color: "#28B2B3", marginBottom: 2 },
    ],
    label: "Mon",
  },
  {
    stacks: [
      { value: 14, color: "orange" },
      { value: 18, color: "#4ABFF4", marginBottom: 2 },
    ],
    label: "Tue",
  },
  {
    stacks: [
      { value: 7, color: "#4ABFF4" },
      { value: 11, color: "orange", marginBottom: 2 },
      { value: 10, color: "#28B2B3", marginBottom: 2 },
    ],
    label: "Wed",
  },
];

export default function Dashboard() {
  const [chartData, setChartData] = useState(data);

  const { width } = Dimensions.get("screen");

  useEffect(() => {
    // Fetch data from API or local storage
    // ...
    // Update chartData with fetched data
    // setChartData(fetchedData);
  }, []);

  return (
    <ThemedBackground style={styles.container}>
      <Text style={styles.title}>Weekly Spending</Text>
      <View style={[styles.chartContainer, { width, paddingRight: 50 }]}>
        <BarChart
          stackData={chartData}
          yAxisThickness={0}
          noOfSections={4}
          barWidth={20}
          barBorderRadius={5}
          showGradient
          isAnimated
          scrollAnimation
          animationDuration={600}
          xAxisLabelTextStyle={{ color: "gray" }}
          yAxisTextStyle={{ color: "gray" }}
          xAxisColor={"gray"}
        />
      </View>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartContainer: {
    // height: 300,
    // width: "100%",
  },
});
