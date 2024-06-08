import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import Or from "@/components/Or";
import SocialAuth from "@/components/SocialAuth";
import { ClerkAPIError } from "@clerk/types";
import CustomTextInput from "@/components/TextInput";

const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const router = useRouter();
  const isDisabled: boolean = email === "" || password === ""

  // Handle the submission of the sign-in input fields
  const handleSignIn = async () => {
    if (!isLoaded) {
      return;
    }
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
      Toast.show({
        type: "error",
        text1: "An error occured. Kindly try again",
      });
    }
  };
  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={tw`flex-1 p-5 bg-white`}>
        <Text style={[tw`text-2xl font-medium`, { color: Colors.secondary }]}>
          Welcome!
        </Text>
        <Text style={[tw`mt-5 mb-10 text-base`, { color: Colors.gray }]}>
          Enter the phone number associated with your account.
        </Text>
        <CustomTextInput
          text={email}
          onChangeText={setEmail}
          label="Email"
          placeholder="E-mail address"
        />
        <CustomTextInput
          text={password}
          onChangeText={setPassword}
          label="Password"
          placeholder="Password"
          isPassword
        />
        <TouchableOpacity
          style={[
            tw`w-full h-12 rounded-2xl mt-10 flex items-center justify-center`,
            {
              backgroundColor: Colors.primary,
              opacity: isDisabled ? 0.5 : 1,
            },
          ]}
          disabled={isDisabled}
          onPress={ handleSignIn}
        >
          <Text style={[tw`font-medium text-base`, { color: "white" }]}>
            Login
          </Text>
        </TouchableOpacity>
        <Or />
        <SocialAuth />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
