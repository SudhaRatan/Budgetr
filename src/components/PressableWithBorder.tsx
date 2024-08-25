import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import React, { ReactNode, useEffect } from "react";
import { Text } from "react-native-paper";

type PressableWithBorderType = {
  children: ReactNode;
  style?: Array<ViewStyle> | ViewStyle;
  borderRadius?: number;
  ContainerStyle?: ViewStyle;
  onPress?: () => void;
};

const PressableWithBorder = ({
  children,
  onPress,
  style,
  ContainerStyle,
  borderRadius,
}: PressableWithBorderType) => {
  return (
    <View style={ContainerStyle ? ContainerStyle : { borderRadius }}>
      <Pressable
        android_ripple={{ borderless: true }}
        onPress={onPress}
        style={style}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default PressableWithBorder;
