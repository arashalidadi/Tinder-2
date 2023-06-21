import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import useAuth from "./hooks/useAuth";
import ModalScreen from "./screens/ModalScreen";
const Stack = createNativeStackNavigator();
const StackNavigators = () => {
  const { userInfo } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {userInfo ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Group>
          <Stack.Screen
            name="ModalScreen"
            component={ModalScreen}
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
              headerBackVisible: false,
            }}
          />
          <Stack.Group></Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigators;
