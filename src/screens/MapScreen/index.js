import React from "react";
import { firebase } from "../../firebase/config";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MapScreen from "./MapScreen";
import MapSingleSpotScreen from "./MapSingleSpotScreen";
import ReservationScreen from "../ReservationScreen/ReservationScreen";
//import { PaymentScreen } from "./PaymentScreen";

const mapStack = createStackNavigator();

export default function App(props) {
  const { user } = props;
  return (
    <NavigationContainer independent={true}>
      <mapStack.Navigator
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
        <mapStack.Screen name="MapScreen" options={{ headerShown: false }}>
          {(props) => <MapScreen {...props} user={user} />}
        </mapStack.Screen>
        <mapStack.Screen
          name="MapSingleSpotScreen"
          options={{ title: "Your Selection" }}
        >
          {(props) => <MapSingleSpotScreen {...props} user={user} />}
        </mapStack.Screen>
        <mapStack.Screen
          name="ReservationScreen"
          component={ReservationScreen}
        />
        {/* <mapStack.Screen name='PaymentScreen' component={PaymentScreen} /> */}
      </mapStack.Navigator>
    </NavigationContainer>
  );
}
