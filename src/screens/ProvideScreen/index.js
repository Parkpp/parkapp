//Component will render buttons to navigate to 
// |   |   |  |--ParkingSpotListScreen.js
// |   |   |  |--SingleViewScreen.js
// |   |   |  |--CurrentSessionScreen.js
// |   |   |  |--styles.js



import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from '../../firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProvideScreen, CurrentSessionScreen, ParkingSpotListScreen, SingleSpotScreen, ProvideParkingScreen } from './src/screens'
import { ProvideScreen} from './ProvideScreen'
import { CurrentSessionScreen} from './CurrentSessionScreen'
import { ParkingSpotListScreen} from './ParkingSpotListScreen'
import { SingleSpotScreen} from './SingleSpotScreen'
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
//const Tab = create();
export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen name="ProvideScreen" component={ProvideScreen} />
            <Stack.Screen name="CurrentSession" component={CurrentSessionScreen} />
            <Stack.Screen name="ParkingSpotList" component={ParkingSpotListScreen} />
            <Stack.Screen name="SingleSpot" component={SingleSpotScreen} />
            <Stack.Screen name="ProvideParking" component={ProvideParkingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
