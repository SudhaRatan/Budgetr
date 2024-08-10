import CustomHeader from '@/src/components/CustomHeader';
import ThemedBackground from '@/src/components/ThemedBackground';
import { useAuthStore } from '@/src/stores/authStore';
import { Redirect, Tabs } from 'expo-router';
import { firebaseAuth } from '../_layout';
import { useTheme } from 'react-native-paper';
import TabIcon from '@/src/components/TabIcon';
import TabLabel from '@/src/components/TabLabel';
import { useEffect } from 'react';
import { getCategories } from '@/src/bl/dbFunctions';

export default function AuthenticatedScreen() {

  return <AuthenticatedScreenNav />;
}

function AuthenticatedScreenNav() {

  const user = useAuthStore((state) => state.user)
  const theme = useTheme()

  const logout = () => {
    if (user) {
      firebaseAuth().signOut()
    }
  }

  if (user == null) {
    return <Redirect href={"/sign-in"} />
  }

  useEffect(() => {
    setTimeout(() => {
      getCategories(user.uid)
    }, 2000)
  }, [])

  return (
    <ThemedBackground>
      <Tabs initialRouteName='index' screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
          elevation: 0
        },
        tabBarVisibilityAnimationConfig: { show: { animation: "spring", config: {} }, hide: { animation: "spring", config: {} } },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          padding: 10
        },
      }}>
        <Tabs.Screen name='index' options={{
          header: (props) => <CustomHeader title="Home" right="logout" rightOnPress={logout} {...props} />,
          tabBarIcon: (props) => <TabIcon focusedSource='home' source='home-outline' {...props} focusedColor={theme.colors.primary} />,
          tabBarLabel: (props) => <TabLabel {...props} focusedColor={theme.colors.primary} />,
        }} />
        <Tabs.Screen name='categories' options={{
          header: (props) => <CustomHeader title="Two" {...props} />,
          tabBarIcon: (props) => <TabIcon focusedSource='view-grid' source='view-grid-outline' {...props} focusedColor={theme.colors.primary} />,
          tabBarLabel: (props) => <TabLabel {...props} focusedColor={theme.colors.primary} />,
        }} />
        <Tabs.Screen name='dashboard' options={{
          header: (props) => <CustomHeader title="Three" {...props} />,
          tabBarIcon: (props) => <TabIcon focusedSource='chart-box' source='chart-box-outline' {...props} focusedColor={theme.colors.primary} />,
          tabBarLabel: (props) => <TabLabel {...props} focusedColor={theme.colors.primary} />,
        }} />
        <Tabs.Screen name='account' options={{
          header: (props) => <CustomHeader title="Account" {...props} />,
          tabBarIcon: (props) => <TabIcon focusedSource='account' source='account-outline' {...props} focusedColor={theme.colors.primary} />,
          tabBarLabel: (props) => <TabLabel {...props} focusedColor={theme.colors.primary} />,
        }} />
      </Tabs>
    </ThemedBackground>
  );
}
