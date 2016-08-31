import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Image,
        TouchableHighlight, Navigator, TouchableOpacity,
        Dimensions, TextInput, PixelRatio, Platform} from 'react-native';

var ReadImageData = require('NativeModules').ReadImageData;

import ImagePicker from 'react-native-image-picker';
import Camera from '../../components/camera.js';
cameraIcon = require('../../components/assets/ic_photo_camera_36pt.png');

const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 10;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 7.5;
const HEIGHT = Dimensions.get('window').height / 5;



class CreateCloset extends Component{
  constructor(props) {
    super(props);
    this.state = {
        images: []
    };
  }

 render () {
   var self = this;
   return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Create Outfits</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.flowRight}>
            <TextInput style={styles.formInput} placeholder='Event'/>
            <TextInput style={styles.formInput} placeholder='Description'/>
          </View>
        </View>
      </View>
      <View style={styles.picsWrapper}>
        <View style={styles.cameraWrapper}>
          <TouchableOpacity style={styles.captureButton} onPress={this.selectPhotoTapped.bind(this)}>
            <Image source={cameraIcon}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.line1}> line1  </Text>
        <View style={styles.scrollContainer}>
          <ScrollView
          automaticallyAdjustInsets={true}
          horizontal={true}
          scrollEnabled={ true }
          decelerationRate={0}
          snapToInterval={CARD_WIDTH + CARD_MARGIN*2}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.content}>
              {console.log(this.state.images.length)}
              {this.state.images.length > 0 ? this.displayCapturedImages() : this.imagePlaceholder()}
          </ScrollView>
        </View>
        <Text style={styles.line1}> line1  </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.buttonPressed}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
 }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    var self = this;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        self.updateImagesState(('data:image/jpeg;base64,' + response.data));
      }
    });
  }

  updateImagesState(imagePath){
    console.log(imagePath)
    this.setState ({images: this.state.images.concat(imagePath)})
  }

  imagePlaceholder() {
    return (
      <View style={[{width: 100, height: 100}, {backgroundColor: 'red'}]} resizeMode={'cover'}>
      </View>
    )
  }
  displayCapturedImages (){
    console.log(this.state.images)
    return (
      <View style={styles.contain}>
        {this.state.images.map(function(picture, index){
          return (
            <Image source={{uri: picture, isStatic: true}} style={[{width: 100, height: 100}]} resizeMode={'cover'}>
           </Image>
         )
         })
        }

      </View>
    )
  }
};


const styles = StyleSheet.create({

  // container (headline, formcontainer (inputsContainer,imagesViewContainer, submitButtonWrapper),cameraWrapper)

  container: {
    flex: 1,
    marginTop: 60,
    marginBottom: 50,
  },
  inputContainer: {
    flex: 1,
  },
  contain: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'pink',
    // borderWidth: 4,
  },
  line1: {
   backgroundColor: '#6A9DA6',
   height: 1,
   opacity: 0.3,
  },
  outfitsStrip: {
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: '#e0ebeb',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 1,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    opacity: 0.2,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#7F028C',
    borderColor: '#7F028C',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 60,
    margin: 40,
    // alignSelf: 'stretch',
    justifyContent: 'center'
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'red',
    // borderWidth: 4,
    marginTop: 40,

   },
  formInput: {
    height: 36,
    padding: 4,
    marginRight: 20,
    marginLeft: 20,
    margin: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccccff',
    borderRadius: 8,
    color: '#86b181',
  },
  headerContainer:{
    height: 40,
    backgroundColor: '#4D2B6F',
    borderColor: '#4D2B6F',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
     fontFamily: 'Cochin',
  },
  cameraWrapper:{
    marginTop: 40,
    flexDirection: 'column',
    borderColor: 'grey',
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'grey',
    opacity: 0.4,

    // marginBottom: 30,

  },
  picsWrapper:{
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'yellow',
    // borderWidth: 4,
    marginBottom: 30,
  }

})

export default CreateCloset;

// var { View, Text, Image, NativeModules } = React;

// NativeModules.ReadImageData.readImage(ourImage.node.image.uri, (image)=>{
//   console.log(image);
// });



  // placeHolderImages () {
  //   <View>
  //     {<TouchableOpacity  underlayColor="blue"  onPress={()=>self.handleImageDiscardClick()} style={styles.outfitsStrip}>
  //         <View style={[{width: 100, height: 100}]} resizeMode={'cover'}>
  //         </View>
  //     </TouchableOpacity>}
  //   </View>
  // }
  //
  // handleImageDiscardClick () {
  //   console.log('button was pressed!');
  // }
  // buttonPressed () {
  //   console.log('button was pressed!');
  // }
