import ThemedBackground from "@/components/ThemedBackground"
import { useAuthStore } from "@/stores/authStore"
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { Redirect, router } from "expo-router"
import { View } from "react-native"
import { Button, Divider, Surface, Text, TextInput, TouchableRipple, useTheme } from "react-native-paper"
import { useEffect } from "react"
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

    const theme = useTheme()
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
                {/* <Surface> */}
                    <TouchableRipple style={{ flexDirection: "row", backgroundColor: theme.colors.background, borderWidth: 1, borderColor: theme.colors.primary, alignItems: "center", justifyContent: "space-between", borderRadius: theme.roundness }} onPress={onGoogleButtonPress}>
                        <>
                            <GoogleSigninButton size={2} style={{elevation: 0}} />
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Sign in with google</Text>
                            <View style={{ width: 30 }}></View>
                        </>
                    </TouchableRipple>
                {/* </Surface> */}
            </View>
        </ThemedBackground>
    )
}

export default SignIn