import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Text, useTheme } from "react-native-paper";
import { category } from "../types/dbTypes";
import AnimatedText from "./AnimatedText";

interface ExpensesDonutChartType {
  data: Array<category>;
}

const ExpensesDonutChart = ({ data }: ExpensesDonutChartType) => {
  const theme = useTheme();
  const { width } = Dimensions.get("screen");
  return (
    <View>
      <View style={{ alignItems: "center", justifyContent: "center", width }}>
        {data && (
          <PieChart
            donut
            startAngle={5}
            isAnimated
            animationDuration={300}
            data={data.map((i) => ({
              value: i.totalAmount,
              color: i.color,
            }))}
            semiCircle={false}
            innerRadius={width / 4 - 20}
            radius={width / 4}
            textSize={20}
            focusOnPress
            fontWeight="800"
            backgroundColor={theme.colors.background}
            centerLabelComponent={() => (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", fontSize: 24 }}>&#8377; </Text>
                <AnimatedText
                  initialValue={0}
                  actualValue={data
                    .map((i) => i.totalAmount)
                    .reduce((acc, iniVal) => acc + iniVal, 0)}
                />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default ExpensesDonutChart;
