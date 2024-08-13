import ThemedBackground from "@/src/components/ThemedBackground";
import { useAuthStore } from "@/src/stores/authStore";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { firebaseAuth } from "../_layout";

export default function Account() {
  const user = useAuthStore((state) => state.user);
  const logout = () => {
    if (user) {
      firebaseAuth().signOut();
    }
  };

  return (
    <ThemedBackground style={styles.container}>
      <Text style={styles.title}>Account page</Text>
      <Button mode="contained-tonal" onPress={logout}>
        Logout
      </Button>
    </ThemedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
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
