import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import tw from "twrnc";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import Or from "@/components/Or";
import SocialAuth from "@/components/SocialAuth";
import CustomTextInput from "@/components/TextInput";
import { ClerkAPIError } from "@clerk/types";

const Signup: React.FC = () => {
  const { isLoaded, signUp } = useSignUp();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const router = useRouter();
  // Function to handle submission of the sign-up input fields
  const handleSignUp = async () => {
    if (!isLoaded) return;
    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      Toast.show({
        type: "success",
        text1: "Check your e-mail for the verification",
      });
      router.push({
        pathname: "/verify/[phone]",
        params: { email: emailAddress },
      });
    } catch (err: any) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
      Toast.show({
        type: "error",
        text1: "An error occured. Kindly try again",
      });
    }
  };
  // Variable to check the disable state of the sign up button
  const isDisabled: boolean = emailAddress === "" || password === "";
  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={tw`flex-1 p-5 bg-white`}>
        <Text style={[tw`text-2xl font-medium`, { color: Colors.secondary }]}>
          Let's get started!
        </Text>
        <Text style={[tw`mt-5 mb-10 text-base`, { color: Colors.gray }]}>
          Enter your e-mail address. We will send you a confirmation code.
        </Text>
        <CustomTextInput
          text={emailAddress}
          onChangeText={setEmailAddress}
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
        <Link href="/login" replace asChild>
          <TouchableOpacity>
            <Text style={[tw`text-base mt-5`, { color: Colors.primary }]}>
              Already have an account?
              <Text style={tw`underline`}> Log in</Text>
            </Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          style={[
            tw`w-full h-12 mt-5 rounded-2xl flex items-center justify-center`,
            {
              backgroundColor: Colors.primary,
              opacity: isDisabled ? 0.5 : 1,
            },
          ]}
          disabled={isDisabled}
          onPress={handleSignUp}
        >
          <Text style={[tw`font-medium text-xl`, { color: "white" }]}>
            Sign up
          </Text>
        </TouchableOpacity>

        <Or />
        <SocialAuth />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
