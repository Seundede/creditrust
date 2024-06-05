import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;
const Page = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
    const { signIn,  } = useSignIn();
    const {  signUp, setActive } = useSignUp();
  useEffect(() => {
    if (value.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, []);

  const verifyCode = async () => {
    try {
        await signUp!.attemptPhoneNumberVerification({
            code:value
        })
        await setActive!({ session: signUp?.createdSessionId})
    } catch (error) {
        console.log(error)

  };
  }
  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code: value,
      });
      await setActive!({ session: signIn?.createdSessionId });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={tw`bg-white flex-1 p-5`}>
      <Text style={[tw`text-2xl font-medium`, { color: Colors.secondary }]}>
        Enter the 6-digit code
      </Text>
      <Text style={[tw`mt-5  text-base`, { color: Colors.gray }]}>
        We've sent a verification code to your phone number {phone}. Kindly
        check your device
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
    </View>
  );
};

export default Page;

