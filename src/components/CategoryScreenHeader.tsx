import {
  View,
  StatusBar,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/src/types";
import ThemedBackground from "./ThemedBackground";
import { Icon, Text, useTheme } from "react-native-paper";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import CategoryDropdown from "./CategoryDropdown";
import { usePreferenceStore } from "../stores/preferencesStore";
import { useShallow } from "zustand/react/shallow";
import DateRangeSelector from "./DateRangeSelector";

interface CategoryScreenHeaderType extends BottomTabHeaderProps {
  title: string;
  showToggle?: boolean;
}

const CategoryScreenHeader = ({
  layout,
  navigation,
  options,
  route,
  title,
  showToggle,
}: CategoryScreenHeaderType) => {
  const theme = useTheme();

  const { toggleType, setToggleType } = usePreferenceStore(
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
        // elevation: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text
          variant="titleLarge"
          style={{ textAlign: "center", fontWeight: "bold", flex: 1 }}
        >
          {title}
        </Text>
        <DateRangeSelector />
      </View>
      {showToggle && (
        <View style={{ flexDirection: "row", gap: 10, padding: 5 }}>
          <SegmentedControl
            values={["Categories", "Transactions"]}
            selectedIndex={toggleType === "Categories" ? 0 : 1}
            backgroundColor={theme.colors.surfaceDisabled}
            tintColor={theme.colors.primary}
            onChange={({ nativeEvent: { selectedSegmentIndex } }) => {
              switch (selectedSegmentIndex) {
                case 0:
                  setToggleType("Categories");
                  break;
                case 1:
                  setToggleType("Transactions");
                  break;
                  1;
                default:
                  break;
              }
            }}
            style={{ flex: 2, alignItems: "center" }}
            activeFontStyle={{ color: theme.colors.background }}
            fontStyle={{ color: theme.colors.onSurfaceVariant }}
          />
          {/* <CategoryDropdown
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
        /> */}
        </View>
      )}
    </View>
  );
};

export default CategoryScreenHeader;
