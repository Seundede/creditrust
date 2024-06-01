import { View, Text } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import tw from "twrnc";
import { ResizeMode, Video } from "expo-av";
import Button from "@/components/Button";
import Toast from "react-native-toast-message";

const Page = () => {
  const [assets, error = true] = useAssets([
    require("@/assets/videos/onboarding-video.mp4"),
  ]);
  if (error) {
    Toast.show({
      type: "error",
      text1: "An error has occured",
      text2: "Kindly re-open your application",
    });
  }
  return (
    <View style={tw`flex-1 justify-between`}>
      {assets && (
        <Video
          source={{ uri: assets[0].uri }}
          style={tw`absolute w-full h-full`}
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
        />
      )}
      <View style={tw`mt-40 px-5`}>
        <Text style={tw`text-2xl font-extrabold uppercase`}>
          Ready to revolutionize your finances?
        </Text>
      </View>
      <View style={tw`flex flex-row justify-between  mb-20 px-5`}>
        <View style={tw`w-[46%]`}>
          <Button href="/signup" text="Sign Up" />
        </View>
        <View style={tw`w-[46%]`}>
            <Button href="/login" text="Login" primary />
        </View>
      
      </View>
    </View>
  );
};

export default Page;
