import { View, Text, Button, Image, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { userInfo, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gray-500  ">
      <Text>In log screen</Text>
      <Image
        source={{
          uri: userInfo.photoURL,
        }}
        className="h-20 w-20 rounded-full "
      />
      <Text className="font-bold text-lg">{userInfo.displayName}</Text>
      <Text className="font-bold text-lg">{userInfo.email}</Text>
      <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} />
      <Button title="Log out" onPress={() => logout()} />
    </SafeAreaView>
  );
};

export default HomeScreen;
