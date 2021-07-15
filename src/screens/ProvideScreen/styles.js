import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    //margin: 10,
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 120,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },

  button: {
    backgroundColor: "red",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor:
      Platform.OS === "android"
        ? "white"
        : Platform.OS === "ios"
        ? "black"
        : "white",
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },

  //Provide ->  Parking Spot List Screen

  scrollView: {
    //marginHorizontal: 10,
    backgroundColor: "white",
  },

  parkingInfoScrollView: {
    flex: 1,
    margin: 1,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
  },

  singleParkingSpot: {
    flex: 1,
    margin: 20,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#FAEDD3",
    borderRadius: 2,
  },
  parkingSpotImage: {
    flex: 1,
    width: 130,
    height: 100,
    resizeMode: "cover",
    margin: 1,
    borderRadius: 2,
  },
  parkingSpotInfo: {
    flex: 1,
    flexDirection: "row",
  },
  provideButton: {
    backgroundColor: "red",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 40,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
