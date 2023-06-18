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
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: "https://tinder.com/static/tinder.png",
        }}
        className="flex-1 "
      >
        <View className="flex-row justify-center absolute w-52  bg-white bottom-20 mx-20 rounded-2xl">
          <TouchableOpacity
            className="  p-4  "
            onPress={() => signInWithGoogle()}
          >
            <Text className="text-center font-semibold ">
              Sign in & get swiping
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
