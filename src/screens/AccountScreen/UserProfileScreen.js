import React from "react";
import { Text, View } from "react-native";
// import styles from './styles';
// import { firebase } from "../../firebase/config";

export function UserProfileScreen(props) {
  // const userRef = firebase.firestore().collection("users");
  const { user } = props;
  console.log("what is user-->", user);

  // function updateUser() {
  //   return (

  //   )
  // }

  return (
    <View>
      <Text>Profile Info</Text>
      <Text>Username: {user.username}</Text>
      <Text>FullName: {user.fullName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone Number: {user.phoneNumber}</Text>
    </View>
  );
}
