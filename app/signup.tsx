import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import {  CountryCode } from "libphonenumber-js";
import tw from "twrnc";
import { Link } from "expo-router";
import PhoneInput from "@/components/PhoneInput";
import Colors from "@/constants/Colors";


export type PhoneValues = {
  phone: [string, CountryCode];
};


const Signup: React.FC = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>("NG");
  const [formValues, setFormValues] = useState<PhoneValues>({phone: ["", "NG" as CountryCode]});
  

  const handleChangeCountry = (country: { cca2: CountryCode }) => {
    setCountryCode(country.cca2);
  };

  const handleChangePhone = (phone: string) => {
    const updatedFormValues: PhoneValues = {
      phone: [phone, countryCode],
    };
    setFormValues(updatedFormValues);
  };

  const handleSignUp = async () => {
    console.log('sign up')
  };

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
          Enter your phone number. We will send you a confirmation code.
        </Text>

        <PhoneInput
          phone={formValues.phone[0]}
          onChangePhone={handleChangePhone}
          countryCode={countryCode}
          onChangeCountry={handleChangeCountry}
        />

        <Link href="/login" replace asChild>
          <TouchableOpacity>
            <Text style={[tw`text-base mt-5`, { color: Colors.primary }]}>
              Already have an account?
              <Text style={tw`underline`}> Log in</Text>
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={tw`flex-1 justify-end`}>
          <TouchableOpacity
            style={[
              tw`w-full h-12 rounded-2xl flex items-center justify-center`,
              {
                backgroundColor: Colors.primary,
                opacity: formValues.phone[0] === "" ? 0.5 : 1,
              },
            ]}
            disabled={formValues.phone[0] === ""}
            onPress={handleSignUp}
          >
            <Text style={[tw`font-medium text-xl`, { color: "white" }]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
