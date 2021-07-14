import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { firebase } from './src/firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  LoginScreen,
  RegistrationScreen,
  ProvideScreen,
  AccountScreen,
  MapScreen,
  InfoScreen
} from './src/screens';
import { decode, encode } from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = { user: null, loading: true, userLogged: null };
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(async user => {
      this.setState(user ? { userLogged: true } : { userLogged: false });
      const usersRef = firebase.firestore().collection('users');
      try {
        const userData = (await usersRef.doc(user.uid).get()).data();
        this.setState({ loading: false });
        this.setState({ user: userData });
      } catch (error) {
        console.log(error);
        this.setState({ loading: false });
      }
    });
  }

  

  async handleUser () {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          const userData = (await usersRef.doc(user.uid).get()).data();
          this.setState({ loading: false });
          this.setState({ user: userData });
        } catch (error) {
          console.log(error);
          this.setState({ loading: false });
        }
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render () {
    if (this.state.loading) return <></>;
    const user = this.state.user;
    // console.log(user);

    return (
      <>
        {this.state.userLogged ? (
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name='Map'>
                {props => <MapScreen {...props} user={user} />}
              </Tab.Screen>
              <Tab.Screen name='Provide'>
                {props => <ProvideScreen {...props} user={user} />}
              </Tab.Screen>
              <Tab.Screen name='Account'>
                {props => <AccountScreen {...props} user={user} />}
              </Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name='Info'
                component={InfoScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name='Login'>
                {props => <LoginScreen {...props} onLogin={this.handleUser} />}
              </Stack.Screen>
              <Stack.Screen
                name='Registration'
                component={RegistrationScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </>
    );
  }
}
