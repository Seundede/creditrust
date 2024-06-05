import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as SecureStore from "expo-secure-store";


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  //Function to encrypt and securely store key-value pairs locally on the device.
  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
const router = useRouter()
const { isLoaded, isSignedIn} = useAuth()
  useEffect(() => {
   console.log(isSignedIn, "isSignedIn")
  }, [isSignedIn]);


  return (
   
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="signup"
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
              ),
              title: "",
              headerBackTitle: "",
              headerShadowVisible: true,
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerRight: () => (
                <Link href="help" asChild>
                  <TouchableOpacity>
                    <Ionicons name="help-circle-outline" size={24} />
                  </TouchableOpacity>
                </Link>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
              ),
              title: "",
              headerBackTitle: "",
              headerShadowVisible: true,
            }}
          />
          <Stack.Screen
            name="verify/[phone]"
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
              ),
              title: "",
              headerBackTitle: "",
              headerShadowVisible: true,
            }}
          />
          <Stack.Screen
            name="help"
            options={{
              title: "Help",
              presentation: "modal",
            }}
          />
        </Stack>
    
  );
}
