import {
  View,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { category } from "../types/dbTypes";
import { Icon, MD3Theme, Text, useTheme } from "react-native-paper";
import { deleteCategory } from "../bl/dbFunctions";
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";

interface DebitComponentType extends category {
  editPress: () => void;
  onPress: () => void;
  index: number
}

const DebitComponent = ({
  id,
  name,
  type,
  color,
  emoji,
  totalAmount,
  editPress,
  onPress,
  index
}: DebitComponentType) => {
  const { width } = Dimensions.get("screen");
  const cardPadding = 10;
  const theme = useTheme();

  // menu
  const [visible, setVisible] = useState(false);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  const animVal = useSharedValue(0)

  useEffect(() => {
    animVal.value = withDelay(index * 20, withSpring(1, {
      damping: 13,
      stiffness: 100,
      mass: 1,
    }))
  }, [])

  const animStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: interpolate(animVal.value, [0, 1], [0.5, 1]) }], opacity: animVal.value }
  })

  return (
    <AnimatedPressable
      style={[{
        padding: 10,
        width: width / 3 - 1.5 * cardPadding,
        borderRadius: 8 * theme.roundness,
        backgroundColor: color ?? theme.colors.primaryContainer,
        paddingBottom: 20,
        elevation: 1,
        gap: 10,
      }, animStyle]}
      onLongPress={() => setVisible(!visible)}
      onPress={() => {
        onPress();
        setVisible(false);
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
        }}
      >
        <Text
          variant="titleMedium"
          style={{
            backgroundColor: theme.colors.surface,
            padding: 15,
            borderRadius: 100,
            color: theme.dark ? theme.colors.background : "",
            textAlign: "left",
          }}
        >
          {emoji}
        </Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: "monospace",
            color: theme.dark ? theme.colors.background : "",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          {name}
        </Text>
        {!visible ? (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              variant="bodyLarge"
              style={{
                color: theme.dark
                  ? theme.colors.surfaceVariant
                  : theme.colors.onSurfaceDisabled,
                fontWeight: "bold",
              }}
            >
              &#8377;{" "}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "monospace",
                color: theme.dark ? theme.colors.background : "",
              }}
            >
              {totalAmount}
            </Text>
          </View>
        ) : (
          <CreditComponentActions
            categoryId={id}
            editPress={editPress}
            closeMenu={() => {
              setVisible(false);
            }}
          />
        )}
      </View>
    </AnimatedPressable>
  );
};

export default DebitComponent;

function CreditComponentActions({ closeMenu, editPress, categoryId }: any) {
  const theme = useTheme();
  const style = styles(theme);
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          editPress();
          closeMenu();
        }}
        style={style.action}
      >
        <Icon source="pencil" size={15} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          deleteCategory(categoryId);
          closeMenu();
        }}
        style={style.action}
      >
        <Icon source="delete" size={15} />
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    action: {
      padding: 5,
      backgroundColor: theme.colors.background,
      borderRadius: 100,
    },
  });
