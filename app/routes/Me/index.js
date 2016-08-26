import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  ShareDialog,
  AccessToken
} = FBSDK;

import CreateCloset from '../../components/createCloset'


class Stories extends Component{



    _navigate() {
    	this.props.navigator.push({
      	component: CreateCloset
      })
    }

  renderScene(route, navigator) {
		return <route.component navigator={navigator} {...route.passProps} />
  }

	render() {
    console.log(this.props.navigator)
  	return (
    	<View>
      	<Text style={ styles.text }>Hello From One</Text>
      	<TouchableHighlight onPress={ console.log('Hi')} style={ styles.button }>
				  <Text>Go To Two Three</Text>
      	</TouchableHighlight>
      </View>
    )
  }
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});
export default Stories;
