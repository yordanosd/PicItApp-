import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class Me extends Component{
	render() {
    console.log(this.props.navigator)
  	return (
    	<View style={ styles.container }>
      	<Text>Me</Text>
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
export default Me;
