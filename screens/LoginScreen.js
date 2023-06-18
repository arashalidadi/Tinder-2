import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { signInWithGoogle, userInfo, loading } = useAuth();

  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: "https://tinder.com/static/tinder.png",
        }}
        className="flex-1 "
      >
        <View className="flex-row justify-center fixed w-full bottom-20">
          <TouchableOpacity
            className="p-4  rounded-2xl bg-white"
            onPress={() => signInWithGoogle()}
            disabled={loading}
          >
            <Text
              className={`text-center  font-semibold ${
                loading ? "text-green-500" : ""
              }`}
            >
              Sign in & get swiping
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
