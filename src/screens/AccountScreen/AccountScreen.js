import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
// import UserProfileScreen from "./UserProfileScreen";

export default function AccountScreen(props) {
  console.log("Account Screen props-->", props);
  return (
    <>
      {/* <Stack.Screen name="User Profile">
        {(props) => <UserProfileScreen {...props} user={props} />}
      </Stack.Screen> */}
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("User Profile")}
        >
          <Text>Profile -> </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
