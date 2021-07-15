import "react-native-gesture-handler";
import React from "react";
import { firebase } from "../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProvideScreen } from "./ProvideScreen";
import { CurrentSessionScreen } from "./CurrentSessionScreen";
import { ParkingSpotListScreen } from "./ParkingSpotListScreen";
import { ProvideParkingScreen } from "./ProvideParkingScreen";
import { UpdateParkingSpotScreen } from "./UpdateParkingSpotScreen";
import { DeleteParkingSpotScreen } from "./DeleteParkingSpotScreen";

import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
const Stack = createStackNavigator();

export default function App(props) {
  const user = props.user;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1A659E",
          },
          headerTintColor: "#ff6b35",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Provide" component={ProvideScreen} />
        <Stack.Screen name="My Parking Spots">
          {(props) => <ParkingSpotListScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Provide Parking">
          {(props) => <ProvideParkingScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Update Parking Spot">
          {(props) => <UpdateParkingSpotScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Delete Parking Spot">
          {(props) => <DeleteParkingSpotScreen {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="CurrentSession">
          {(props) => <CurrentSessionScreen {...props} user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
