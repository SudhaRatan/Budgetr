import ThemedBackground from "@/src/components/ThemedBackground";
import { useAuthStore } from "@/src/stores/authStore";
import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { Button, SegmentedButtons, Text, useTheme } from "react-native-paper";
import { firebaseAuth } from "../_layout";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { usePrefereneStore } from "@/src/stores/preferencesStore";
import { useState } from "react";

export default function Account() {
  const user = useAuthStore((state) => state.user);
  const logout = () => {
    if (user) {
      firebaseAuth().signOut();
    }
  };
  const colorScheme = useColorScheme();

  const setTheme = usePrefereneStore((state) => state.setTheme);
  const theme = usePrefereneStore((state) => state.theme);

  return (
    <ThemedBackground style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent:"flex-start", alignItems:"center", gap: 10 }}>
        <Text variant="titleMedium">Theme: </Text>
        <SegmentedButtons
        style={{flex: 1}}
          value={theme}
          onValueChange={(e) => {
            setTheme(e);
            StatusBar.setBarStyle(
              e === "dark-content"
                ? "dark-content"
                : e === "light-content"
                ? "light-content"
                : colorScheme === "dark"
                ? "light-content"
                : "dark-content"
            );
          }}
          buttons={[
            {
              value: "dark-content",
              label: "Light",
            },
            {
              value: "light-content",
              label: "Dark",
            },
            { value: "Default", label: "System" },
          ]}
        />
      </View>
      <Button mode="contained-tonal" onPress={logout}>
        Logout
      </Button>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
