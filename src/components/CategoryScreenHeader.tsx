import { View, StatusBar, Dimensions } from "react-native";
import React, { useState } from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/src/types";
import ThemedBackground from "./ThemedBackground";
import {
  Button,
  Icon,
  SegmentedButtons,
  Text,
  useTheme,
} from "react-native-paper";
import SegmentedControl, {
  SegmentedControlComponent,
} from "@react-native-segmented-control/segmented-control";
import CategoryDropdown from "./CategoryDropdown";
import { usePrefereneStore } from "../stores/preferencesStore";
import { useShallow } from "zustand/react/shallow";

interface CategoryScreenHeaderType extends BottomTabHeaderProps {}

const CategoryScreenHeader = ({
  layout,
  navigation,
  options,
  route,
}: CategoryScreenHeaderType) => {
  const theme = useTheme();

  const { toggleType, setToggleType } = usePrefereneStore(
    useShallow((state) => ({
      toggleType: state.toggleType,
      setToggleType: state.setToggleType,
    }))
  );

  return (
    <View
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: theme.colors.background,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, padding: 5 }}>
        <SegmentedControl
          values={["Categories", "Transactions"]}
          selectedIndex={toggleType === "Categories" ? 0 : 1}
          backgroundColor={theme.colors.surfaceDisabled}
          tintColor={theme.colors.primary}
          onChange={({ nativeEvent: { selectedSegmentIndex } }) => {
            setToggleType(selectedSegmentIndex === 0 ? "Categories" : "Transactions");
          }}
          style={{ flex: 2, alignItems: "center" }}
        />
        <CategoryDropdown
          parentStyles={{ flex: 1, alignSelf: "center" }}
          parent={
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: theme.colors.secondaryContainer,
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 100,
              }}
            >
              <Text>Weekly</Text>
              <Icon size={24} source={"chevron-down"} />
            </View>
          }
          listItems={[
            { id: "1", title: "Weekly" },
            { id: "2", title: "Monthly" },
          ]}
          itemOnPress={() => {}}
        />
      </View>
    </View>
  );
};

export default CategoryScreenHeader;
