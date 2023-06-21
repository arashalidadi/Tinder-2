import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
const ModalScreen = () => {
  const { userInfo } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", userInfo.uid), {
      id: userInfo.uid,
      displayName: userInfo.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <View className="flex-1 items-center pt-1">
      <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
        <Image
          source={require("../assets/Tinder-logo.png")}
          className="h-20 w-full rounded-full "
          resizeMode="contain"
        />
        <Text className="text-xl text-gray-500 p-2 font-bold">
          Wellcome {userInfo.displayName}
        </Text>

        <Text className="text-center text-red-400 p-4 font-bold">
          Step 1 : The Profile Pic
        </Text>
        <TextInput
          value={image}
          onChangeText={(text) => setImage(text)}
          placeholder="Enter a Profile Pic URL"
          className="text-center text-xl pb-2"
        />
        <Text className="text-center text-red-400 p-4 font-bold">
          Step 2 : The Job
        </Text>
        <TextInput
          value={job}
          onChangeText={(text) => setJob(text)}
          className="text-center text-xl pb-2"
          placeholder="Enter your bio"
        />
        <Text className="text-center text-red-400 p-4 font-bold">
          Step 3 : The Age
        </Text>
        <TextInput
          maxLength={2}
          value={age}
          keyboardType="numeric"
          onChangeText={(text) => setAge(text)}
          className="text-center text-xl pb-2"
          placeholder="Enter your age"
        />
      </ScrollView>

      <TouchableOpacity
        onPress={updateUserProfile}
        disabled={incompleteForm}
        className={`w-64 p-3 rounded-xl absolute 
        bottom-5 ${incompleteForm ? "bg-gray-400" : "bg-red-400"} `}
      >
        <Text className="text-center text-white text-xl">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
