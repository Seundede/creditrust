import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import tw from "twrnc";
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from './hooks/useWarmUpBrowser';
import { useRouter } from 'expo-router';

export enum SignInType {
  Google,
  Apple,
}
 type IconNames = "logo-google" | "logo-apple";

 type SignInProps = {
   title: string;
   icon: IconNames;
   type: SignInType;
 };
const SocialAuth = () => {
  const router = useRouter()
   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  // Warm up the android browser to improve UX
   useWarmUpBrowser();
  const signInMethod: SignInProps[] = [
    {
      title: "continue with google",
      icon: "logo-google",
      type: SignInType.Google,
    },
    {
      title: "continue with apple",
      icon: "logo-apple",
      type: SignInType.Apple,
    },
  ];

  const handleAuthWithGoogle = React.useCallback(async () => {
    
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push('/')
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      {signInMethod.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            tw`w-full h-12 border border-gray-500 rounded-2xl gap-2  mb-4 flex flex-row items-center justify-center`,
          ]}
          onPress={handleAuthWithGoogle}
        >
          <Ionicons name={item.icon} size={24} color={"#000"} />
          <Text
            style={[tw`font-medium text-base capitalize`, { color: "black" }]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default SocialAuth