import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Navigator, TouchableOpacity, Dimensions, TextInput } from 'react-native';

// import CreateCloset from '../../components/createCloset'
// const WIDTH = Dimensions.get('window').width  ;
// const HEIGHT = Dimensions.get('window').height - 70

import Camera from '../../components/camera.js';
cameraIcon = require('../../components/assets/ic_photo_camera_36pt.png');

class CreateCloset extends Component{
 render () {
   return(
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text> Headline</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputsContainer}>
          <TextInput style={[styles.input]} placeholder="Event" />
          <TextInput secureTextEntry={true} style={[styles.input]} placeholder="Message" />
        </View>
        <View style={styles.submitButtonWrapper}>
          <TouchableHighlight style={[styles.fullWidthButton ]} onPress={this.buttonPressed}>
            <Text style={styles.fullWidthButtonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.cameraWrapper}>
        <TouchableOpacity style={styles.captureButton} onPress={() => this.props.navigator.push({id: 'camera'})}>
          <Image source={cameraIcon}/>
        </TouchableOpacity>
      </View>
    </View>
  )
 }
 buttonPressed () {
   console.log('button was pressed!');
 }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginBottom: 50,
    borderColor: 'red',
    borderWidth: 4,
  },
  formContainer: {
    flex: 4,
    paddingBottom: 20,
    borderColor: 'pink',
    borderWidth: 4,
  },
  fullWidthButton: {
    backgroundColor: 'purple',
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButtonText: {
  	fontSize:16,
    color: 'white'
  },
  inputsContainer: {
    flex: 4,
    borderColor: 'blue',
    borderWidth: 4,
  },
  cameraWrapper: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: 4,
    alignItems: 'center',
    // flexDirection: 'column',


  },
  headline: {
    flex: 1,

    backgroundColor: 'purple',

  }
})

export default CreateCloset;

 // inputsContainer: {
 //   flex: 4
 // },
 // takePhotoWrapper: {
 //   flex: 2,
 //   flexDirection: 'row',
 //   justifyContent: 'center',
 //   alignItems: 'center',
 // },
 // fullWidthButton: {
 //   backgroundColor: 'purple',
 //   height:40,
 //   flexDirection: 'row',
 //   justifyContent: 'center',
 //   alignItems: 'center',
 // },
 // fullWidthButtonText: {
 // 	fontSize:16,
 //   color: 'white'
 // },
 // input: {
 //   height: 40,
 //   borderColor: 'black',
 //   backgroundColor: 'white',
 //   textAlign: 'center'
 // },
 // container: {
 //   flex: 1,
 //   backgroundColor: '#f0f0f0',
 //  //  alignItems: 'stretch',
 //  //  height: HEIGHT,
 // },
 // captureButton: {
 //   flex: 1,
 //   backgroundColor: 'black',
 //   borderRadius: 40,
 // },
 // cameraWrapper: {
 //   flex: 1,
 //   backgroundColor: 'red'
 // }
// });


//
// var styles = StyleSheet.create({
//  inputsContainer: {
//    flex: 1,
//    paddingBottom: 20,
//  },
//  inputsContainer: {
//    flex: 4
//  },
//  takePhotoWrapper: {
//    flex: 2,
//    flexDirection: 'row',
//    justifyContent: 'center',
//    alignItems: 'center',
//  },
//  fullWidthButton: {
//    backgroundColor: 'purple',
//    height:40,
//    flexDirection: 'row',
//    justifyContent: 'center',
//    alignItems: 'center',
//  },
//  fullWidthButtonText: {
//  	fontSize:16,
//    color: 'white'
//  },
//  input: {
//    height: 40,
//    borderColor: 'black',
//    backgroundColor: 'white',
//    textAlign: 'center'
//  },
//  container: {
//    flex: 1,
//    backgroundColor: '#f0f0f0',
//   //  alignItems: 'stretch',
//   //  height: HEIGHT,
//  },
//  captureButton: {
//    flex: 1,
//    backgroundColor: 'black',
//    borderRadius: 40,
//  },
//  cameraWrapper: {
//    flex: 1,
//    backgroundColor: 'red'
//  }
// });
