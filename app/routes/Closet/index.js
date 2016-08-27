import React, {Component} from 'react';
import { View, Text, StyleSheet, ListView, ScrollView, Image, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';

var photoPics = [
  "https://s-media-cache-ak0.pinimg.com/564x/8d/02/c1/8d02c1a3aff0c490067eda5c35202313.jpg",
  "https://s-media-cache-ak0.pinimg.com/474x/c5/66/09/c566095c603fb9927fbd483a33cc7f29.jpg",
  "https://s-media-cache-ak0.pinimg.com/236x/be/5b/1f/be5b1fb075e65042b2f355d2c60b4f08.jpg",
  "https://s-media-cache-ak0.pinimg.com/564x/13/63/36/136336a0cff1d84cc4f80b047b1d954c.jpg",

]

const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 10;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 3;
const HEIGHT = Dimensions.get('window').height - 70

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
         this.data = responseData
         this.state = {change: false};
         this.likedImage = [],
         this.imageStatus = []
       }


       stories (){
         var self = this
         return this.data.map(function(outfitStory, index){
           self.likedImage[index] = null;
           return (
             <View key={index} style={[styles.story]}>
               <Text style={styles.event}>{outfitStory.user}</Text>
               <ScrollView
                  style={styles.contain}
                  automaticallyAdjustInsets={true}
                  horizontal={true}
                  decelerationRate={0}
                  snapToInterval={CARD_WIDTH + CARD_MARGIN*2}
                  snapToAlignment="start"
                  contentContainerStyle={styles.content}>
                  {outfitStory.outfits.map(function(outfit, i) {
                    console.log(outfit)
                  return (
                    <View key={i}>
                      {<TouchableOpacity  underlayColor="blue"  onPress={()=>self.handleImageLikeClick(index, outfit.id)}>
                        <Image key={outfit.id} source={{uri: outfit.photo_url}} style={[{width: 100, height: 100}]} resizeMode={'cover'}>
                       </Image>
                      </TouchableOpacity>}
                    </View>
                  );
                })}
              </ScrollView>
              <Text style={styles.event}>{outfitStory.event}</Text>
             </View>
           )
         }.bind(this));
       }

      handleImageLikeClick (index, id) {
        this.setState ({change: true})
        this.likedImage[index] = id
        this.data.pop()
        this.data.length
        console.log(this.data.length)
      }

  handleVotePress (outfit, index) {
    this.setState ({data: responseData.shift(), likedImage: false})
  }
  handlePassPress (outfit, index) {
    this.setState ({data: responseData.shift(), likedImage: false})
  }
  render () {
    return (
      <View style={[styles.container, this.border('purple')]}>
        <ScrollView style={[styles.stories, this.border('purple')]}>
          {this.stories()}
        </ScrollView>
      </View>
    );
  }
  border(color){
    return {
      borderColor: color,
      // borderWidth: 4
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 5,
    // alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: HEIGHT,
    alignItems: 'center',
    marginTop: 60,
  },
  stories:{
  },
  display: {
    borderWidth: 4,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  name: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    paddingTop: 5,
    height: 30,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  outfitsStrip: {
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'grey',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 1,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  button: {
    borderWidth: 2,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonWrapper: { // Green
    flex: 1, // takes up 3/8ths of the available space
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    paddingTop: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  voteButton: {
    backgroundColor: 'green',
    borderColor: '#00CC00',
  },
  passButton: {
    backgroundColor: 'orange',
    borderColor: '#CC0000',
  },
});

export default Stories;
