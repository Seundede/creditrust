import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc";
import Colors from '@/constants/Colors';
import PhoneInput from '@/components/PhoneInput';
import { CountryCode } from 'libphonenumber-js';
import { PhoneValues } from './signup';
import { Ionicons } from '@expo/vector-icons';

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

type IconNames = "mail-outline" | "logo-google" | "logo-apple";

type SignInProps = {
  title: string;
  icon: IconNames;
  type: SignInType;
};
const signInMethod: SignInProps[] = [
  {
    title: "continue with email",
    icon: "mail-outline",
    type: SignInType.Email,
  },
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
const Login = () => {
 const [countryCode, setCountryCode] = useState<CountryCode>("NG");
 const [formValues, setFormValues] = useState<PhoneValues>({
   phone: ["", "NG" as CountryCode],
 });
  const handleChangeCountry = (country: { cca2: CountryCode }) => {
    setCountryCode(country.cca2);
  };

  const handleChangePhone = (phone: string) => {
    const updatedFormValues: PhoneValues = {
      phone: [phone, countryCode],
    };
    setFormValues(updatedFormValues);
  };

    const handleSignIn = async (type: SignInType) => {};
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

        <PhoneInput
          phone={formValues.phone[0]}
          onChangePhone={handleChangePhone}
          countryCode={countryCode}
          onChangeCountry={handleChangeCountry}
        />

        <TouchableOpacity
          style={[
            tw`w-full h-12 rounded-2xl mt-10 flex items-center justify-center`,
            {
              backgroundColor: Colors.primary,
              opacity: formValues.phone[0] === "" ? 0.5 : 1,
            },
          ]}
          disabled={formValues.phone[0] === ""}
          onPress={() => handleSignIn(SignInType.Phone)}
        >
          <Text style={[tw`font-medium text-base`, { color: "white" }]}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={tw`flex flex-row items-center gap-2 my-5 `}>
          <View style={tw`h-[1px] flex-1 bg-slate-300`} />
          <Text>or</Text>
          <View style={tw`h-[1px] flex-1 bg-slate-300`} />
        </View>
        {signInMethod.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              tw`w-full h-12 border rounded-2xl gap-2  mb-4 flex flex-row items-center justify-center`,
              
            ]}
            onPress={() => handleSignIn(item.type)}
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
    </KeyboardAvoidingView>
  );
}

export default Login