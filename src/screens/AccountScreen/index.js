import React from "react";
import { firebase } from "../../firebase/config";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AccountScreen } from "./AccountScreen";
import { UserProfileScreen } from "./UserProfileScreen";
import { VehicleScreen } from "./VehicleScreen";
import { UserProfileUpdateScreen } from "./UserProfileUpdateScreen";
import { UpdateUserCredentialScreen } from "./UpdateUserCredentialScreen";
import { UpdateVehicleScreen } from "./UpdateVehicleScreen";
const Account = createStackNavigator();

export default function App(props) {
  const { user } = props;
  return (
    <NavigationContainer independent={true}>
      <Account.Navigator
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
        <Account.Screen name="Account" component={AccountScreen} />
        <Account.Screen name="User Profile">
          {(props) => <UserProfileScreen {...props} user={user} />}
        </Account.Screen>
        <Account.Screen
          name="Update Profile"
          component={UserProfileUpdateScreen}
        />
        <Account.Screen
          name="Update Credentials"
          component={UpdateUserCredentialScreen}
        />
        <Account.Screen name="Vehicle Information">
          {(props) => <VehicleScreen {...props} user={user} />}
        </Account.Screen>
        <Account.Screen name="Update Vehicle" component={UpdateVehicleScreen} />
      </Account.Navigator>
    </NavigationContainer>
  );
}
