import React, { useState } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Modal,
} from "react-native";
// import styles from './styles';
// import { firebase } from "../../firebase/config";

export function UserProfileScreen(props) {
  console.log("props-->", props);
  const { user } = props;
  const [username, setUsername] = useState("");
  //References specific user in users collection

  // const userRef = firebase.firestore().collect("users").doc(user.id)

  // const update = await userRef.update({reference value: new value})

  const form = () => {
    return (
      <Modal transparent={true} visibile={true}>
        <TextInput
          autofocus={true}
          // style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setUsername(text)}
          value={username}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </Modal>
    );
  };

  return (
    <View>
      <Text>Profile Info</Text>
      <Text>
        Username:
        <TouchableWithoutFeedback onPress={form}>
          <Text>{user.username}</Text>
        </TouchableWithoutFeedback>
      </Text>
      <Text>FullName: {user.fullName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone Number: {user.phoneNumber}</Text>
    </View>
  );
}
