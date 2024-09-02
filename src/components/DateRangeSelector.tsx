import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Icon } from "react-native-paper";
import {
  format,
  addWeeks,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { usePreferenceStore } from "../stores/preferencesStore";
import { useShallow } from "zustand/react/shallow";
import { getDebitCategories, getTransactions } from "../bl/dbFunctions";
import { useAuthStore } from "../stores/authStore";
import { useDataStore } from "../stores/dataStore";
import { AnimatedtextContext } from "../contexts/Animatedtext";

const DateRangeSelector = () => {
  const {
    dateRangeMode,
    setDateRangeMode,
    currentDate,
    setCurrentDate,
    getDateRange,
  } = usePreferenceStore(
    useShallow((state) => ({
      dateRangeMode: state.dateRangeMode,
      setDateRangeMode: state.setDateRangeMode,
      currentDate: state.currentDate,
      setCurrentDate: state.setCurrentDate,
      getDateRange: state.getDateRange,
    }))
  );
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);
  const { start, end } = getDateRange();
  const [reset, setReset] = useState(false);

  const { setUpdate } = useContext(AnimatedtextContext);

  const debitCategories = useDataStore((state) => state.debitCategories);

  useEffect(() => {
    updateDateAndFetchTransactions(new Date());
  }, []);

  const getDateRangeHere: (
    currentDateHere: Date,
    dateRangeMode: "week" | "month"
  ) => {
    start: Date;
    end: Date;
  } = (currentDateHere: Date, dateRangeMode: "week" | "month") => {
    if (dateRangeMode === "week") {
      return {
        start: startOfWeek(currentDateHere),
        end: endOfWeek(currentDateHere),
      };
    } else {
      return {
        start: startOfMonth(currentDateHere),
        end: endOfMonth(currentDateHere),
      };
    }
  };

  const updateDateAndFetchTransactions = async (
    newDate: Date,
    newMode?: "week" | "month"
  ) => {
    const mode = newMode || dateRangeMode;
    setCurrentDate(newDate);
    if (newMode) setDateRangeMode(newMode);
    const dates = getDateRangeHere(newDate, mode);
    getTransactions(user!.uid, dates.start, dates.end, debitCategories!);
    getDebitCategories(user!.uid);
    // const debitCategories = await getDebitCategories(user!.uid);
    // getTransactions(user!.uid, start, end, debitCategories);
  };

  const handlePrevious = () => {
    const newDate =
      dateRangeMode === "week"
        ? addWeeks(currentDate, -1)
        : addMonths(currentDate, -1);
    updateDateAndFetchTransactions(newDate);
    setReset(true);
  };

  const handleNext = () => {
    const newDate =
      dateRangeMode === "week"
        ? addWeeks(currentDate, 1)
        : addMonths(currentDate, 1);
    updateDateAndFetchTransactions(newDate);
    setReset(true);
  };

  const toggleViewMode = () => {
    const newMode = dateRangeMode === "week" ? "month" : "week";
    const newDate =
      newMode === "week" ? startOfWeek(currentDate) : startOfMonth(currentDate);
    updateDateAndFetchTransactions(newDate, newMode);
    setUpdate!((p) => !p);
  };

  const handleReset = () => {
    setReset(false);
    updateDateAndFetchTransactions(new Date());
  };

  const getDateRangeText = () => {
    const { start, end } = getDateRange();
    if (dateRangeMode === "week") {
      return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
    } else {
      return format(currentDate, "MMMM yyyy");
    }
  };

  return (
    <View
      style={{
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <TouchableOpacity onPress={handlePrevious}>
        <Icon source="chevron-left" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleViewMode}>
        <Text style={{ fontSize: 16, color: theme.colors.primary }}>
          {getDateRangeText()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext}>
        <Icon source="chevron-right" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
      {reset && (
        <TouchableOpacity onPress={handleReset}>
          <Icon source="restore" size={22} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DateRangeSelector;
