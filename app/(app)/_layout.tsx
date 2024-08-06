import CustomHeader from '@/components/CustomHeader';
import ThemedBackground from '@/components/ThemedBackground';
import { useAuthStore } from '@/stores/authStore';
import { Redirect, router, Stack } from 'expo-router';

export default function AuthenticatedScreen() {

  return <AuthenticatedScreenNav />;
}

function AuthenticatedScreenNav() {

  const user = useAuthStore((state: any) => state.user)

  const logout = () => {
    router.replace("/sign-in")
  }

  if(user == null){
    return <Redirect href={"/sign-in"} />
  }

  return (
    <ThemedBackground>
      <Stack>
        <Stack.Screen name='index' options={{
          header: (props) => <CustomHeader title="Home" right="logout" rightOnPress={logout} {...props} />
        }} />
        <Stack.Screen name='two' options={{
          header: (props) => <CustomHeader title="Two" {...props} />
        }} />
      </Stack>
    </ThemedBackground>
  );
}
