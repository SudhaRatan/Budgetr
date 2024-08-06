import ThemedBackground from "@/components/ThemedBackground"
import { useAuthStore } from "@/stores/authStore"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { router } from "expo-router"
import { View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import auth from '@react-native-firebase/auth';
import { useEffect } from "react"

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

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            console.log(user)
        });
        return subscriber; // unsubscribe on unmount
    }, []);

    const logout = () => {
        auth().signOut()
    }

    return (
        <ThemedBackground>
            <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 20 }}>
                <Text variant="headlineLarge">Login </Text>
                <TextInput
                    mode="flat"
                    label="Email"
                />
                <TextInput
                    mode="flat"
                    label="Password"
                />
                <Button onPress={() => { onGoogleButtonPress() }} mode="contained">Log in</Button>
                <Button onPress={() => { logout() }} mode="contained">Log out</Button>
            </View>
        </ThemedBackground>
    )
}

export default SignIn