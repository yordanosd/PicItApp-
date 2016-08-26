// Create closet is the page that some will go to when they want to make a
// closet instance

// inorder to do so the user will need access to the camera and need to write what the event is FacebookTabBar
// need to have a form to accept user input and at least one picture


// first start with event details


// create class
import React, {Component} from 'react'

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight
} from 'react-native'



//
// React Native Classes
//


var windowWidth = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height - 70

var CreateCloset = React.createClass({
  render: function() {
    return(
    <View style={styles.container}>
      <View style={styles.headline}>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput style={[styles.input]} placeholder="Event" />
        <TextInput secureTextEntry={true} style={[styles.input]} placeholder="Message" />
        <View style={styles.submitButtonWrapper}>
          <TouchableHighlight style={[styles.fullWidthButton ]} onPress={this.buttonPressed}>
            <Text style={styles.fullWidthButtonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.takePhotoWrapper}>
        <TouchableHighlight style={[styles.photoButton ]} onPress={this.buttonPressed}>
          <Text style={styles.photoButtonText}>Photo</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
  },
  buttonPressed: function() {
    console.log('button was pressed!');
  }
});

var paddingLeft = 15;


var styles = StyleSheet.create({
  inputsContainer: {
    flex: 1
  },
  // headline: {
  //   flex: 1
  // },
  inputsContainer: {
    flex: 4
  },
  takePhotoWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButton: {
    backgroundColor: 'purple',
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 120,

  },
  fullWidthButtonText: {
  	fontSize:16,
    color: 'white'
  },
  input: {
    paddingLeft: paddingLeft,
    height: 40,
    borderColor: 'black',
    backgroundColor: 'white',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'stretch',
    height: HEIGHT,
  },
});

export default CreateCloset;
