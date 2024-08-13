import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";

const BottomSheet = forwardRef(
  ({ children, className, style, onClose }: any, ref) => {

    const insets = useSafeAreaInsets();

    const [bottomBarHeight, setBottomBarHeight] = useState(1000);

    const translate = useSharedValue(bottomBarHeight + insets.bottom + 50);

    const theme = useTheme();

    const pan = Gesture.Pan()
      .onUpdate((event) => {
        if (event.translationY < 0) {
          translate.value = withSpring(0, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          translate.value = withSpring(event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd((event) => {
        if (event.translationY > bottomBarHeight / 3) {
          translate.value = withSpring(bottomBarHeight + insets.bottom + 50, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          translate.value = withSpring(0, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    const open = useCallback(() => {
      translate.value = withSpring(0, {
        damping: 100,
        stiffness: 400,
      });
    }, [translate]);

    const close = useCallback(() => {
      translate.value = withTiming(bottomBarHeight + insets.bottom + 50);
      if (onClose) onClose();
      Keyboard.dismiss();
    }, [translate]);

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
      }),
      [open, close]
    );

    const animationStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translate.value }],
      };
    });
    const visibleStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        translate.value,
        [0, bottomBarHeight + insets.bottom + 50],
        [0.5, 0],
        Extrapolation.CLAMP
      );
      const display = opacity === 0 ? "none" : "flex";
      return { display, opacity };
    });
    return (
      <>
        <TouchableWithoutFeedback onPress={close}>
          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                opacity: 0.5,
                backgroundColor: "#000000",
                display: "none",
              },
              visibleStyle,
            ]}
          />
        </TouchableWithoutFeedback>
        <GestureDetector gesture={pan}>
          {/* <ThemedBackground style={{flex: 0}}> */}
          <Animated.View
            // className={`absolute flex-row justify-center bottom-0 bg-primary-light m-[20] p-[20] rounded-2xl ${className}`}
            style={[
              animationStyle,
              styles.container,
              { backgroundColor: theme.colors.background },
            ]}
            onLayout={({ nativeEvent }) => {
              const { height } = nativeEvent.layout;
              setBottomBarHeight(height);
            }}
          >
            <View style={[style, { flex: 1 }]}>{children}</View>
            <View
              //   className="w-[50] h-[4] bg-tertiary-dark absolute mt-[8] rounded-full"
              style={[
                styles.pill,
                { backgroundColor: theme.colors.onBackground },
              ]}
            />
          </Animated.View>
          {/* </ThemedBackground> */}
        </GestureDetector>
      </>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    bottom: 0,
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },
  pill: {
    width: 50,
    height: 4,
    position: "absolute",
    marginTop: 8,
    borderRadius: 100,
  },
});
