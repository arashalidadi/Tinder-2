import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { userInfo, logout } = useAuth();
  const swipRef = useRef(null);
  const [fav, setFav] = useState(false);
  const [profiles, setProfiles] = useState([]);
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", userInfo.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("ModalScreen");
        }
      }),

    []
  );

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs
            .filter((doc) => doc.id !== userInfo.uid)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        );
      });
    };

    fetchCards();
    return unsub;
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-gray-200  ">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 mt-5 ">
        <TouchableOpacity className="" onPress={logout}>
          <Image
            source={{
              uri: userInfo.photoURL,
            }}
            className="h-10 w-10 rounded-full "
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ModalScreen")}>
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

      <View className="flex-1 border-2 border-black">
        <Swiper
          cards={profiles}
          containerStyle={{ backgroundColor: "transparent" }}
          onSwiped={(cardIndex) => {
            // console.log(cardIndex);
          }}
          onSwipedAll={() => {
            // console.log("onSwipedAll");
          }}
          onSwipedLeft={() => {}}
          onSwipedRight={() => {}}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          backgroundColor={"#4FD0E9"}
          stackSize={5}
          ref={swipRef}
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
          renderCard={(card) =>
            card ? (
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
                      {card.displayName}
                    </Text>
                    <Text
                      className="text-xs font-bold
                 shadow-xl truncate"
                      numberOfLines={2}
                    >
                      {card.job}
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
            ) : (
              <View
                className="relative bg-white rounded-xl
               justify-center items-center "
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
                <Text className="font-bold pb-5">No more profiles</Text>
                <Image
                  className="h-28 w-full"
                  resizeMode="center"
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        ></Swiper>
      </View>
      {/* end of cards */}
      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => {
            swipRef.current.swipeLeft();
          }}
          className="items-center justify-center
         bg-red-300 rounded-full p-5"
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setFav(!fav);
            swipRef.current.swipeRight();
          }}
          className=" rounded-full p-5 bg-green-300"
        >
          {fav ? (
            <AntDesign name="hearto" size={24} color="green" />
          ) : (
            <AntDesign name="heart" size={24} color="green" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
