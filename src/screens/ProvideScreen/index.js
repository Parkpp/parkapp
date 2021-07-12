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
//const Tab = create();
export default function App(props) {
  const user = props.user;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="ProvideScreen" component={ProvideScreen} />
        <Stack.Screen name="ParkingSpotList">
          {(props) => <ParkingSpotListScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="ProvideParking">
          {(props) => <ProvideParkingScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="UpdateParkingSpot">
          {(props) => <UpdateParkingSpotScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="DeleteParkingSpot">
          {(props) => <DeleteParkingSpotScreen {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="CurrentSession">
          {(props) => <CurrentSessionScreen {...props} user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
