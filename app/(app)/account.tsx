import ThemedBackground from "@/src/components/ThemedBackground";
import { useAuthStore } from "@/src/stores/authStore";
import {
  StatusBar,
  StyleSheet,
  ToastAndroid,
  useColorScheme,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  SegmentedButtons,
  Text,
  useTheme,
} from "react-native-paper";
import { firebaseAuth } from "../_layout";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { usePreferenceStore } from "@/src/stores/preferencesStore";
import { useState } from "react";
import { reset } from "@/src/bl/dbFunctions";

export default function Account() {
  const [deleteShow, setDeleteShow] = useState(false);
  const [loadingShow, setLoadingShow] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = () => {
    if (user) {
      firebaseAuth().signOut();
    }
  };
  const colorScheme = useColorScheme();
  const th = useTheme();

  const setTheme = usePreferenceStore((state) => state.setTheme);
  const theme = usePreferenceStore((state) => state.theme);

  const resetData = () => {
    setDeleteShow(false);
    if (user) {
      setLoadingShow(true);
      reset(user.uid)
        .then(() => {
          ToastAndroid.show("Reset successful", ToastAndroid.SHORT);
          setLoadingShow(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <ThemedBackground style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text variant="titleMedium">Theme: </Text>
        <SegmentedButtons
          style={{ flex: 1 }}
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
      <View style={{ gap: 20 }}>
        <Button
          uppercase
          mode="contained-tonal"
          style={{ backgroundColor: th.colors.tertiaryContainer }}
          textColor={th.colors.tertiary}
          onPress={() => {
            setDeleteShow(true);
          }}
        >
          Reset Data
        </Button>
        <Button mode="contained-tonal" onPress={logout}>
          Logout
        </Button>
      </View>
      <Dialog visible={deleteShow} onDismiss={() => setDeleteShow(false)}>
        <Dialog.Title>
          <Text>Are you sure?</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>This action can't be undone!</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDeleteShow(false)}>No</Button>
          <Button
            style={{ backgroundColor: th.colors.tertiaryContainer }}
            textColor={th.colors.tertiary}
            onPress={resetData}
          >
            <Text style={{ color: th.colors.tertiary, paddingHorizontal: 15 }}>
              Yes
            </Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={loadingShow}>
        <Dialog.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>Please do not close the app</Text>
            <ActivityIndicator size={"small"} />
          </View>
        </Dialog.Content>
      </Dialog>
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
