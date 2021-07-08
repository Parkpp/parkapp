<<<<<<< HEAD
import React from "react";
// import { firebase } from "../../firebase/config";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MapScreen from "./MapScreen";
import MapSingleSpotScreen from "./MapSingleSpotScreen";
=======
import React from 'react';
import { firebase } from '../../firebase/config';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from './MapScreen';
import MapSingleSpotScreen from './MapSingleSpotScreen';
>>>>>>> 6acf8203d4c18940bbd619149ee1767a87589240
//import { ReservationScreen } from "./ReservationScreen";
//import { PaymentScreen } from "./PaymentScreen";

const mapStack = createStackNavigator();

export default function App (props) {
  // const { user } = props;
  return (
    <NavigationContainer independent={true}>
      <mapStack.Navigator>
        <mapStack.Screen
          name='MapScreen'
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <mapStack.Screen
          name='MapSingleSpotScreen'
          component={MapSingleSpotScreen}
        />
        {/* <mapStack.Screen
          name="ReservationScreen"
          component={ReservationScreen}
        />
        <mapStack.Screen name="PaymentScreen" component={PaymentScreen} /> */}
      </mapStack.Navigator>
    </NavigationContainer>
  );
}
