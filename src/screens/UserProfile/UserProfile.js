import React from "react";
import { Text, View } from "react-native";
// import styles from './styles';
// import { firebase } from "../../firebase/config";

export default function UserProfile(props) {
  // const userRef = firebase.firestore().collection("users");
  const { user } = props;
  console.log("what is user-->", user);
  return (
    <View>
      <Text>Profile Info</Text>
      <Text>Username: </Text>
      <Text>FullName: {user.fullName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone Number: </Text>
    </View>
  );
}
