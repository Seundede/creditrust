import { View, Text, TextInput as RNTextInput, TouchableOpacity } from "react-native";
import React, { useState } from 'react'
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface CustomTextInputProps {
  label: string;
  text: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  isPassword?: boolean;
  placeholder?: string
}
const CustomTextInput = ({
  text,
  onChangeText,
  label,
  isPassword,
  placeholder,
}: CustomTextInputProps) => {
   const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
   const togglePasswordVisibility = () => {
     setIsPasswordVisible((prevState) => !prevState);
   }
  return (
    <View style={[tw`flex flex-col gap-2 mb-4`, { color: Colors.secondary }]}>
      <Text>{label}</Text>
      <View style={tw`relative`}>
        <RNTextInput
          onChangeText={onChangeText}
          value={text}
          placeholder={placeholder}
          style={tw`border border-gray-500 rounded-md px-2 h-12`}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          secureTextEntry={isPassword ? !isPasswordVisible : false}
        />
        {isPassword && text.length > 1 && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={tw`absolute right-4 top-3`}>
            {isPasswordVisible ? (
              <Ionicons name="eye-outline" size={24} />
            ) : (
              <Ionicons name="eye-off-outline" size={24} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;