import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  ProvideScreen,
  AccountScreen,
} from "./src/screens";
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }
  return (
    <>
      {user ? (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Map">
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Tab.Screen>
            <Tab.Screen name="Provide">
              {(props) => <ProvideScreen {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="Account">
              {(props) => <AccountScreen {...props} user={user} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
