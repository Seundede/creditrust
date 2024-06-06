import { View, Text } from 'react-native'
import React from 'react'
import tw from "twrnc";

const Or = () => {
  return (
    <View style={tw`flex flex-row items-center gap-2 my-5 `}>
      <View style={tw`h-[1px] flex-1 bg-slate-300`} />
      <Text style={tw`uppercase`}>or</Text>
      <View style={tw`h-[1px] flex-1 bg-slate-300`} />
    </View>
  );
}

export default Or