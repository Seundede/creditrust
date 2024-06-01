import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import tw from "twrnc";

type ButtonProps = {
  href: string;
  text: string;
  primary?: boolean;
};
const Button = ({ href, text, primary }: ButtonProps) => {
  return (
    <Link
      href={href}
      asChild
      style={[
        tw` w-full h-12 rounded-2xl flex items-center justify-center disabled:opacity-75`,
        { backgroundColor: primary ? Colors.primary : "white" },
      ]}
    >
      <TouchableOpacity>
        <Text
          style={[
            tw` font-medium text-xl`,
            { color: primary ? "white" : Colors.secondary },
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default Button;
