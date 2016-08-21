
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  ShareDialog,
  AccessToken
} = FBSDK;

class PicItApp extends Component {
  constructor(props) {
    super(props);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: "https://www.facebook.com/",
    };

    // this.state = {
    //   shareLinkContent: shareLinkContent,
    // };
  }

  render() {
    return (
      <View style={styles.container}>
          <LoginButton
            publishPermissions={["publish_actions"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      alert(data.accessToken.toString())
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => alert("logout.")}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  }
});

export default PicItApp;
