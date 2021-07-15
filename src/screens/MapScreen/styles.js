import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 34
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#1A659E',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    width: 250,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16
  },
  safeArea: {
    flex: 1,
    backgroundColor:
      Platform.OS === 'android'
        ? 'white'
        : Platform.OS === 'ios'
        ? 'black'
        : 'white',
    paddingTop: Platform.OS === 'android' ? 20 : 0
  },
  searchBar: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 30 : Platform.OS === 'ios' ? 35 : 10,
    width: Platform.OS === 'ios' ? '96%' : '83%',
    left: '2%',
    zIndex: 3,
    opacity: 0.75
  },
  textInputSearchBar: {
    borderRadius: 10,
    margin: 10,
    color: '#000',
    borderColor: '#666',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18
  },
  image: {
    width: 400,
    height: 250
  },
  key: {
    position: 'absolute',
    borderRadius: 10,
    top:
      Platform.OS === 'android' ? '10%' : Platform.OS === 'ios' ? '9%' : '20%',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    zIndex: 2,
    opacity: 0.75
  },
  keyText: {
    margin: 2
  },
  refreshButton: {
    position: 'absolute',
    margin: 10,
    left: 50,
    zIndex: 2,
    opacity: 0.75,
    fontSize: 10
  },
  textContainer: {
    borderRadius: 10,
    backgroundColor: '#FAEDD3',
    margin: 10,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1
  },
  text: {
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5
  },
  textLabels: {
    fontSize: 22,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5
  }
});
