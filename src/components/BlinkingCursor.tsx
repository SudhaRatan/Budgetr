import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";

interface BlinkingCursorType {
  strokeWidth: number;
  height: number;
  frequency: number;
}

const BlinkingCursor = ({
  height,
  strokeWidth,
  frequency,
}: BlinkingCursorType) => {
  const theme = useTheme();
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setOpacity((prev) => prev + 1);
    }, frequency);
  }, []);

  return (
    <View
      style={{
        height: height,
        width: strokeWidth,
        backgroundColor: theme.colors.onSurface,
        opacity: opacity % 2 == 0 ? 0 : 1,
      }}
    />
  );
};

export default BlinkingCursor;
