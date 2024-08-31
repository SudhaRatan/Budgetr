import { View, Text as Tt, StyleSheet, TextBase } from "react-native";
import React, { useState } from "react";
import { category, transaction } from "../types/dbTypes";
import { Text, useTheme } from "react-native-paper";
import { MD3Theme, MD3Type } from "react-native-paper/lib/typescript/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface TransactionCardType extends transaction {
  categoryDetails?: category;
  ccDetails?: category;
  scrollY: SharedValue<number>;
  index: number;
}

const TransactionCard = ({
  amount,
  categoryFromId,
  categoryToId,
  uid,
  id,
  type,
  subcategory,
  createdOn,
  categoryDetails,
  ccDetails,
  scrollY,
  index,
}: TransactionCardType) => {
  const theme = useTheme();
  const style = styles(theme);

  const [itemHeight, setItemHeight] = useState(0);

  const sy = useDerivedValue(() => {
    return scrollY.value;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            sy.value,
            [-1, 0, (itemHeight + 15) * index, (itemHeight + 15) * (index + 2)],
            [1, 1, 1, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        sy.value,
        [-1, 0, (itemHeight + 40) * index, (itemHeight + 40) * (index + 1)],
        [1, 1, 1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <Animated.View
      style={[style.mainContainer, animatedStyle]}
      onLayout={({
        nativeEvent: {
          layout: { height },
        },
      }) => {
        setItemHeight(height);
      }}
    >
      <View style={style.cont1}>
        <Text
          style={[
            style.emojiTextContainer,
            { backgroundColor: categoryDetails?.color },
          ]}
          variant="bodyLarge"
        >
          {categoryDetails?.emoji}
        </Text>
        <View style={style.baseInfo}>
          <View style={{ justifyContent: "space-between" }}>
            <Tt style={style.textBase2}>
              {type === "Debit" ? "Used for" : ""}
            </Tt>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Tt style={style.textBase1}>{categoryDetails?.name}</Tt>
              {subcategory && (
                <Text style={style.textBase3}> ({subcategory})</Text>
              )}
            </View>
          </View>
          <Tt style={style.textBase1}>&#8377;{amount}</Tt>
        </View>
      </View>
      <View style={style.cont2}>
        <Text style={style.textBase3}>
          {createdOn?.toDate().toDateString()}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Tt style={style.textBase2}>
            {type === "Debit" ? "Paid from" : ""}{" "}
          </Tt>
          <Tt
            style={{
              fontWeight: "500",
              fontSize: 12,
              color: theme.colors.secondary,
            }}
          >
            {ccDetails?.name}
          </Tt>
        </View>
      </View>
    </Animated.View>
  );
};

export default TransactionCard;

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    mainContainer: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: theme.colors.surfaceVariant,
      elevation: 4,
      borderRadius: theme.roundness * 2,
      gap: 5,
    },
    cont1: { flexDirection: "row", alignItems: "center", gap: 10 },
    cont2: { flexDirection: "row", justifyContent: "space-between" },
    emojiTextContainer: {
      padding: 10,
      borderRadius: theme.roundness * 4,
      //   backgroundColor: theme.colors.background,
    },
    baseInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
      alignItems: "flex-end",
    },
    textBase2: {
      fontWeight: "400",
      color: theme.colors.secondary,
      fontSize: 12,
    },
    textBase1: {
      fontWeight: "500",
      color: theme.colors.onSurface,
      fontSize: 16,
    },
    textBase3: {
      fontWeight: "500",
      color: theme.colors.secondary,
      fontSize: 12,
    },
  });
