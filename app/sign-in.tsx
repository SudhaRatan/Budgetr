import ThemedBackground from "@/components/ThemedBackground"
import { useAuthStore } from "@/stores/authStore"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { Redirect } from "expo-router"
import { View } from "react-native"
import { Button, Divider, Text} from "react-native-paper"
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

    if (user) {
        return <Redirect href={"/(app)"} />
    }

    return (
        <ThemedBackground>
            <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 20 }}>
                <Text variant="headlineLarge" style={{ fontWeight: "bold", textAlign: "left" }}>Welcome to Budgetr 💸</Text>
                <Text variant="headlineSmall" style={{ fontWeight: "bold", textAlign: "left" }}>Get control of your money</Text>
                <Divider />
                <Button icon={"google"} onPress={onGoogleButtonPress} mode="contained">Sign in with google</Button>
            </View>
        </ThemedBackground>
    )
}

export default SignIn