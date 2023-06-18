import { View, Text, Button } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle, userInfo, loading } = useAuth();

  return (
    <View className="flex-1 bg-green-400 items-center justify-around">
      <Text>{loading ? "loading ..." : "Login to the app"}</Text>
      <Button
        title="Sign in with Google"
        // disabled={!request}
        onPress={() => signInWithGoogle()}
      />
    </View>
  );
};

export default LoginScreen;

// <>
// <Text className="font-bold text-lg">{userInfo.name}</Text>
// <Image
//   source={{
//     uri: user.picture,
//   }}
//   resizeMode="contain"
//   style={{
//     width: 70,
//     height: 70,
//   }}
//   className="rounded-full  bg-green-500"
// />
// {console.log(userInfo)}
// </>
