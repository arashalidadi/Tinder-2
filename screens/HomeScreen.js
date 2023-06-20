import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { userInfo, logout } = useAuth();
  const users = [
    {
      id: "1",
      firstName: "Vadim",
      lastName: "Savin",
      photoURL:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim1.JPG",
      bio: "I will be the semicolons to your code",
      age: 28,
    },
    {
      id: "2",
      firstName: "Elon",
      lastName: "Musk",
      photoURL:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
      bio: "A dude with a rocket is looking for a gal with fuel",
      age: 30,
    },
    {
      id: "3",
      firstName: "Zuck",
      lastName: "matty",
      photoURL:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
      bio: "No need to send me your nudes, I already saw them",
      age: 31,
    },
    {
      id: "4",
      firstName: "Jeffrey ",
      lastName: "Bezos",
      photoURL:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg",
      bio: "CEO, entrepreneur born in 1964, Jeffrey, Jeffrey Bezos",
      age: 33,
    },
    {
      id: "5",
      firstName: "Vadim ",
      lastName: "Savin",
      photoURL:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim1.JPG",
      bio: "Hola",
      age: 27,
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-gray-200  ">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5">
        <TouchableOpacity className="" onPress={logout}>
          <Image
            source={{
              uri: userInfo.photoURL,
            }}
            className="h-10 w-10 rounded-full "
          />
        </TouchableOpacity>
        <TouchableOpacity className="">
          <Image
            source={require("../assets/logo.png")}
            className="h-14 w-14  "
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* End of Headre */}

      {/* Cards */}
      <View className="flex-1 -mt-6 border-2 border-black">
        <Swiper
          //cards={["DO", "MORE", "OF", "WHAT", "MAKES", "YOU", "HAPPY"]}
          cards={users}
          containerStyle={{ backgroundColor: "transparent" }}
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          onSwipedLeft={() => {}}
          onSwipedRight={() => {}}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          backgroundColor={"#4FD0E9"}
          stackSize={5}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) => {
            return (
              <View className="bg-white h-3/4 rounded-3xl">
                <TouchableOpacity className="flex-1 w-full h-full absolute top-0 rounded-3xl">
                  <Image
                    source={{
                      uri: card.photoURL,
                    }}
                    className="w-full h-full  rounded-3xl "
                  />
                </TouchableOpacity>
                <View
                  className="w-full bg-white absolute bottom-0 rounded-b-xl
              justify-between content-between
                flex-row px-6 py-2 
                   shadow-xl
                   shadow-black
                "
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}
                >
                  <View>
                    <Text
                      className="text-2xl font-bold
                     text-green-500 shadow-xl"
                    >
                      {card.firstName} {card.lastName}
                    </Text>
                    <Text
                      className="text-xs font-bold
                     shadow-xl truncate"
                      numberOfLines={2}
                    >
                      {card.bio}
                    </Text>
                  </View>
                  <Text
                    className="text-xl font-bold
                  shadow-xl"
                  >
                    {card.age}
                  </Text>
                </View>
              </View>
            );
          }}
        ></Swiper>
      </View>
      {/* end of cards */}
      <Button title="Log out" onPress={() => logout()} />
      {/* <Text>In log screen</Text>
      
      <Text className="font-bold text-lg">{userInfo.displayName}</Text>
      <Text className="font-bold text-lg">{userInfo.email}</Text>
      <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} /> 
      <Button title="Log out" onPress={() => logout()} /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
