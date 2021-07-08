import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProvideScreen } from "./ProvideScreen";
//import { CurrentSessionScreen } from "./CurrentSessionScreen";
import { ParkingSpotListScreen } from "./ParkingSpotListScreen";
import { ProvideParkingScreen } from "./ProvideParkingScreen";
import { SingleSpotScreen } from "./SingleSpotScreen";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

//const Tab = create();
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="ProvideScreen" component={ProvideScreen} />
        <Stack.Screen
          name="ParkingSpotList"
          component={ParkingSpotListScreen}
        />
        <Stack.Screen name="ProvideParking" component={ProvideParkingScreen} />
        <Stack.Screen name="SingleSpot">
          {() => <SingleSpotScreen {...props} extraData={spot} />}
        </Stack.Screen>

        {/* <Stack.Screen name="CurrentSession" component={CurrentSessionScreen} />
           
           
             */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
