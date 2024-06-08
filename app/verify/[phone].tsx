import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  isClerkAPIResponseError,
  useSignUp,
} from "@clerk/clerk-expo";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { ClerkAPIError } from "@clerk/types";
import Toast from "react-native-toast-message";

const CELL_COUNT = 6;
const Page = () => {
  const { email } = useLocalSearchParams<{
    email: string;
  }>();
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [value, setValue] = useState("");
  const [errors, setErrors] = React.useState<ClerkAPIError[]>();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Function to verify OTP when a user signs up
  const handleVerification = async () => {
    if (!isLoaded) return;
    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: value,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
        console.log("signed up");
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
const isDisabled: boolean = value.length < 6;
  return (
    <View style={tw`bg-white flex-1 p-5`}>
      <Text style={[tw`text-2xl font-medium`, { color: Colors.secondary }]}>
        Enter the 6-digit code
      </Text>
      <Text style={[tw`mt-5  text-base`, { color: Colors.gray }]}>
        We've sent a verification code to your email address: {email}.
      </Text>
      <Link href="/login" replace asChild>
        <TouchableOpacity>
          <Text style={[tw`text-base mt-5`, { color: Colors.primary }]}>
            Already have an account?
            <Text style={tw`underline`}> Log in</Text>
          </Text>
        </TouchableOpacity>
      </Link>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={tw`mt-5`}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={tw`h-10 w-10 border border-slate-700 rounded text-center text-lg leading-9 `}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <TouchableOpacity
        style={[
          tw`w-full h-12 mt-5 rounded-2xl flex items-center justify-center`,
          {
            backgroundColor: Colors.primary,
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
        disabled={isDisabled}
        onPress={handleVerification}
      >
        <Text style={[tw`font-medium text-xl`, { color: "white" }]}>
       Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
