import { StyleSheet, View } from "react-native";
import { useMemo, useState } from "react";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

interface AnimatedTextType {
  initialValue: number;
  actualValue: number;
  showCurrency?: boolean;
  style?: any;
  variant?: VariantProp<string>;
}

const AnimatedText = ({
  initialValue,
  actualValue,
  showCurrency,
  style,
  variant,
}: AnimatedTextType) => {
  const totalAmount = actualValue;
  const [total, setTotal] = useState(initialValue);

  useMemo(() => {
    var unsub = setTimeout(() => {
      if (total >= totalAmount) {
        clearTimeout(unsub);
        setTotal(totalAmount);
      } else setTotal((prev: number) => prev + Math.floor(totalAmount / 15));
    }, 1);
  }, [total, actualValue]);

  return (
    <Text
      variant={variant ?? "headlineMedium"}
      style={[{ fontWeight: "bold", fontFamily: "monospace" }, style]}
    >
      {showCurrency && <Text>&#8377;</Text>}
      {total}
    </Text>
  );
};

export default AnimatedText;
