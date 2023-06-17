import { View, Text, Button, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex-col-reverse bg-gray-200  space-x-4 justify-between">
        <Text className="text-red-500">
          Open up App.js to start working on your app!
        </Text>

        <Button
          title="Go to Chat"
          onPress={() => navigation.navigate("Chat")}
        />

        <Image
          source={{
            uri: "https://dl.topnaz.com/2019/10/freind-2.jpg",
          }}
          className="h-20 w-20 rounded-full left-0 top-0"
        />
      </View>
    </View>
  );
};

export default HomeScreen;
