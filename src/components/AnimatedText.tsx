import { StyleSheet, TextInput, View } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text, useTheme } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";
import Animated, { Easing, Extrapolation, interpolate, runOnUI, useAnimatedProps, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

interface AnimatedTextType {
  initialValue: number;
  actualValue: number;
  style?: any;
}

const AnimatedText = ({
  initialValue,
  actualValue,
  style,
}: AnimatedTextType) => {
  const animatedValue = useSharedValue(initialValue)

  const AnimatedText = Animated.createAnimatedComponent(TextInput)

  const theme = useTheme()
  useEffect(() => {
    animatedValue.value = withTiming(actualValue, { duration: 500, easing: Easing.inOut(Easing.ease) });
  }, [actualValue])

  const animStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(animatedValue.value, [0, actualValue], [0, 1], Extrapolation.CLAMP) }
  })

  return (
    <AnimatedText
      // ref={InpRef}
      editable={false}
      // variant={variant ?? "headlineMedium"}
      style={[{ fontWeight: "bold", fontFamily: "monospace", color: theme.colors.inverseSurface, fontSize: 24 }, style, animStyle]}
      value={''}
      animatedProps={useAnimatedProps(() => {
        return {
          text: `${Math.floor(animatedValue.value)}`,
        };
      })}
    />
    // {showCurrency && <Text>&#8377;</Text>}
  );
};

export default AnimatedText;
