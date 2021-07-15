import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 90,
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
    backgroundColor: "#1A659E",
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
  profileInfo: {
    textAlign: "center",
  },
  textBackground: {
    margin: 20,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#FAEDD3",
    borderRadius: 2,
    padding: 15,
  },

  //Account screen buttons
  accountButton: {
    //margin: 60,
    flex:1,
    backgroundColor: "#FAEDD3",
   
    justifyContent: "center",
    alignItems: "center",
    color: "#FAEDD3",
    borderWidth:1,
  },

  accountButtonTitle: {
    color:"#1A659E",
    fontSize: 40,
    //fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',

  },
});

