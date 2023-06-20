//web 480059993256-27ds6v56k4pnepto603islgq7dlhcna1.apps.googleusercontent.com
//android 480059993256-fkr0c5n0ovcuhtpbaf6i44n54uh57eqt.apps.googleusercontent.com
//expoClient 480059993256-jgo34g2prfkj4m9nfm24c48r42d86mmc.apps.googleusercontent.com
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import React, { createContext } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();
WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [idtoken, setIdToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "480059993256-fkr0c5n0ovcuhtpbaf6i44n54uh57eqt.apps.googleusercontent.com",
    webClientId:
      "480059993256-27ds6v56k4pnepto603islgq7dlhcna1.apps.googleusercontent.com",
    expoClientId:
      "480059993256-jgo34g2prfkj4m9nfm24c48r42d86mmc.apps.googleusercontent.com",
    responseType: "id_token",
    scopes: [
      "profile",
      "email",
      "openid",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    selectAccount: true,
  });

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await promptAsync();
      if (res?.type === "success") {
        // setIdToken(res?.params.id_token);
        const creds = GoogleAuthProvider.credential(res?.params.id_token);
        await signInWithCredential(auth, creds)
          .then((result) => {
            // The signed-in user info.
            const user = result.user;
            // console.log("user idtoken:", user.getIdToken());
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          })
          .catch((err) => {
            setError(err);
          });
        // return Promise.reject();
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
    if (!userInfo) console.log("logout");
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Log in...
          setUserInfo(user);
        } else {
          //Log out
          setUserInfo({
            photoURL:
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
          });
        }
        setLoadingInitial(false);
      }),
    []
  );

  const memoedValue = useMemo(
    () => ({
      userInfo,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [userInfo, loading, error]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function () {
  return useContext(AuthContext);
}
