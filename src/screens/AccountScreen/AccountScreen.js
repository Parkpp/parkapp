import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./styles";
import { firebase } from "../../firebase/config";

const Stack = createStackNavigator();

export function AccountScreen(props) {
  console.log("Account Screen props-->", props);

  const onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      // .then(() => {
      //   props.navigation.navigate("Login");
      // })
      //if check if user is valid if not navigate
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      {/* <Stack.Screen name="User Profile">
        {(props) => <UserProfileScreen {...props} user={props} />}
      </Stack.Screen> */}
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("User Profile")}
        >
          <Text style={styles.buttonTitle}>Profile -&gt; </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
          <Text style={styles.buttonTitle}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
