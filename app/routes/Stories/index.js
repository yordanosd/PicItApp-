import React, {Component} from 'react';
import { View, Text, StyleSheet, ListView, ScrollView, Image,Dimensions, TouchableHighlight } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  ShareDialog,
  AccessToken
} = FBSDK;

var photoPics = [
  "https://s-media-cache-ak0.pinimg.com/564x/8d/02/c1/8d02c1a3aff0c490067eda5c35202313.jpg",
  "https://s-media-cache-ak0.pinimg.com/474x/c5/66/09/c566095c603fb9927fbd483a33cc7f29.jpg",
  "https://s-media-cache-ak0.pinimg.com/236x/be/5b/1f/be5b1fb075e65042b2f355d2c60b4f08.jpg",
  "https://s-media-cache-ak0.pinimg.com/564x/13/63/36/136336a0cff1d84cc4f80b047b1d954c.jpg",

]

const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 5;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 2;

var responseData =
    [  // all the stories coming in // stories that need to be looped through
      { // a story
        "user": "Senhit",
        "event": "dance",
        "outfits":
        [
        { "id": 1,
         "votes": 3,
         "closet_id": 1,
         "photo_url": photoPics[0]
       },
       { "id": 2,
        "votes": 3,
        "closet_id": 1,
        "photo_url": photoPics[2]
      },
      { "id": 3,
       "votes": 3,
       "closet_id": 1,
       "photo_url": photoPics[3]
     },
     ]
     },
     { // a story
       "user": "Meron",
       "event": "Wedding",
       "outfits":
       [
       { "id": 4,
        "votes": 3,
        "closet_id": 1,
        "photo_url": photoPics[1]
      }]
     }
    ]


class Stories extends Component{

  constructor(props) {
     super(props);
     this.state = {data: responseData };
   }

   stories (){
     var self = this
     return responseData.map(function(outfitStory, index){
       return (
         <View key={index} style={[styles.story]}>
           <Text style={styles.event}>{outfitStory.user}</Text>
           <ScrollView
              style={styles.contain}
              automaticallyAdjustInsets={false}
              horizontal={true}
              decelerationRate={0}
              snapToInterval={CARD_WIDTH + CARD_MARGIN*2}
              snapToAlignment="start"
              contentContainerStyle={styles.content}>
              {outfitStory.outfits.map(function(outfit, i) {

              return (
                <View>
                  <Image  key={i} source={{uri: outfit.photo_url}} style={[{width: 100, height: 100}]} resizeMode={'cover'}>
                  </Image>
                  {<TouchableHighlight  underlayColor="blue" style={[styles.button]}  onPress={self.handleImageLikeClick}>
                    <Text>+</Text>
                  </TouchableHighlight>}
                </View>
              );
            })}
          </ScrollView>
          <Text style={styles.event}>{outfitStory.event}</Text>
         </View>
       )
     });
   }
   likeButton () {
    return <TouchableHighlight
      style={styles.button}
      underlayColor="gray"
      onPress={this.handleImageLikeClick}
      >
      <Text>  +  </Text>
        </TouchableHighlight>
    }

    handleImageLikeClick () {
      console.log(this)
    }

  render () {
    return (
      <View style={[styles.container, this.border('blue')]}>
        <ScrollView style={[styles.stories, this.border('yellow')]}>
          {this.stories()}
        </ScrollView>
        <View style={[styles.exit, this.border('pink')]}>
          <LoginButton
            onLogoutFinished={() => alert("logout.")}/>
        </View>
      </View>
    );
  }
  border(color){
    return {
      borderColor: color,
      borderWidth: 4
    }
  }

}

// renderRow(images) {
//   return images.map((uri, i) => {
//     return (
//       <Image key={i} style={[styles.image, this.calculatedSize()]} source={{uri: uri}} />
//     )
//   })
// },
//
// renderImagesInGroupsOf(count) {
//   return _.chunk(IMAGE_URLS, IMAGES_PER_ROW).map((imagesForRow) => {
//     return (
//       <View style={styles.row}>
//         {this.renderRow(imagesForRow)}
//       </View>
//     )
//   })
// },
//
// render: function() {
//   return (
//     <ScrollView onLayout={this.handleRotation} contentContainerStyle={styles.scrollView}>
//       {this.renderImagesInGroupsOf(IMAGES_PER_ROW)}
//     </ScrollView>
//   );
// }
// });

var styles = StyleSheet.create({

  container: {
    marginTop: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  stories: {
    marginTop: 60,
    flex: 12,
    alignSelf: 'stretch',

    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  button: {
  borderWidth: 2,
  height: 20,
  width: 20,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center'
},
  story: {
    borderColor: 'red',
    borderWidth: 4,

    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  event: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#FDD7E4',
  },
  exit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAA',
  },
  content: {
  marginTop: 20,
  paddingHorizontal: CARD_PREVIEW_WIDTH,
  alignItems: 'center',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#ccc',
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    height: CARD_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //
  // navContainer: {
  //   flex: 1,
  //   borderColor: 'green',
  //   borderWidth: 4
  // },
  //
  // navBar: {
  //   backgroundColor: 'white',
  // },
  //
  // navBarText: {
  //   fontSize: 16,
  //   marginVertical: 10,
  // },
  //
  // navBarTitleText: {
  //   color: '#88888c',
  //   fontWeight: '500',
  //   marginVertical: 9,
  // },
  //
  // navBarLeftButton: {
  //   paddingLeft: 10,
  // },
  //
  // navBarRightButton: {
  //   paddingRight: 10,
  // },
  //
  // navBarButtonText: {
  //   color: '#5890ff'
  // },

});

export default Stories;


// {<TouchableHighlight  underlayColor="blue" style={[styles.button]}  onPress={this.handleImageClick}>
//  <Text>+1</Text>
// </TouchableHighlight>}
