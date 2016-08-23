import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  ShareDialog,
  AccessToken
} = FBSDK;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});

class Stories extends Component{
render () {
  return (
    <View style={styles.container}>
        <LoginButton
          onLogoutFinished={() => alert("logout.")}/>
      </View>
  );
}
};

export default Stories;
