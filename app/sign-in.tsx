import ThemedBackground from "@/src/components/ThemedBackground"
import { useAuthStore } from "@/src/stores/authStore"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { Redirect } from "expo-router"
import { View } from "react-native"
import { Button, Divider, Text, useTheme } from "react-native-paper"
import { firebaseAuth as auth } from "./_layout"

GoogleSignin.configure({
    webClientId: '178674599133-idkpin1nac99bd67coa452khsr7gorck.apps.googleusercontent.com',
});
async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

const SignIn = () => {

    const user = useAuthStore((state) => state.user)
    const theme = useTheme()

    if (user) {
        return <Redirect href={"/(app)"} />
    }

    return (
        <ThemedBackground>
            <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 100 }}>
                <View style={{ flex: 1 }}></View>
                <Text variant="headlineMedium" style={{ fontWeight: "bold", textAlign: "left", fontFamily: "monospace" }}>Welcome to Budgetr💸</Text>
                <View style={{ flex: 10, flexDirection: "row", flexWrap: "wrap" }}>
                    <Text variant="displayMedium" style={{ fontWeight: "bold", fontFamily: "monospace", color: theme.colors.primary }}>TAKE CONTROL </Text>
                    <Text variant="displaySmall" style={{ fontFamily: "monospace", color: theme.colors.secondary }}>OF YOUR </Text>
                    <Text variant="displayMedium" style={{ fontWeight: "bold", fontFamily: "monospace", color: theme.colors.tertiary }}>FINANCES</Text>
                </View>
                <View style={{gap:10}}>
                    <Divider />
                    <Button icon={"google"} onPress={onGoogleButtonPress} mode="contained">Sign in with google</Button>
                </View>
            </View>
        </ThemedBackground>
    )
}

export default SignIn