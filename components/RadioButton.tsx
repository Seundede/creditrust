import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "twrnc";
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export type RadioButtonProps = {
    text: string;
    icon: typeof Ionicons.defaultProps;
    onPress?: () => void
}
const RadioButton = ({ text, icon, onPress }: RadioButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`flex gap-2 items-center`}>
      <View style={tw`w-12 h-12 rounded-full bg-gray-200  items-center justify-center`}>
        <Ionicons name={icon} size={30} color={Colors.secondary} />
      </View>
      <Text style={[tw`font-medium text-base`, {color: Colors.secondary}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton