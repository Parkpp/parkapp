import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Modal } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { firebase } from "../../firebase/config";
import styles from "./styles";
import { VehicleScreen } from "./VehicleScreen";
// import { firebase } from "../../firebase/config";

export function UserProfileScreen(props) {
  const { user, navigation } = props;
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  let email = firebase.auth().currentUser.email;

  //References specific user in users collection
  const getUser = async () => {
    const userRef = firebase
      .firestore()
      .collection("users")
      .where("id", "==", user.id);
    const snapshot = await userRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
    }
    let singleUser = [];
    snapshot.forEach((doc) => {
      singleUser.push(doc.data());
    });
    setCurrentUser(singleUser);
  };

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [props.navigation, loading]);

  return (
    <View style={styles.container}>
      <View>
        {currentUser.map((singleUser, idx) => {
          return (
            <View key={idx} style={styles.textBackground}>
              <Text>Profile Info:</Text>
              <Text>Full Name: {singleUser.fullName}</Text>
              <Text>Username: {singleUser.username}</Text>
              <Text>Email: {email}</Text>
              <Text>Phone Number: {singleUser.phoneNumber}</Text>
            </View>
          );
        })}
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Update Profile", { user: currentUser })
          }
        >
          <Text style={styles.buttonTitle}>Update Profile -&gt; </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Update Credentials")}
        >
          <Text style={styles.buttonTitle}>Update Credentials -&gt; </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
