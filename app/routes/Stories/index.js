import React, {Component} from 'react';
import { View, Text, StyleSheet, ListView, ScrollView,
  Image, Dimensions, TouchableHighlight, TouchableOpacity,
  ActivityIndicator, Animated, } from 'react-native';

import Hearts from '../../components/hearts.js'
const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 10;
const WINDOWN_WIDTH =  Dimensions.get('window').width;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 3;
const HEIGHT = Dimensions.get('window').height - 70


class Stories extends Component{

  constructor(props) {
     super(props);
     // responseData: whats returned from API. What is altered.
     // storiesData: Refer to responseData. What is being presented on the page
     this.state = {heartsAnimation: false, change: false, nextImage: false, skipImage: false, responseData: [], storiesData: [], likedImage: false, loaded : false};
    //  this.outfitStory = storiesData[0]
   }

   componentWillMount() {
     this.fetchData();
   }

   fetchData () {
     var API_URL = 'https://rocky-hollows-53333.herokuapp.com//users/1/outfitStories';
     fetch(API_URL).then((response) => response.json()).then((responseData) => {
       this.setState({
         responseData : responseData,
          storiesData : responseData,
               loaded : true
       });
     }).done();
  }

  stories (){
    var self = this
    var outfitStory = this.state.storiesData[0]
    this.state.likedImage ? likedImage = this.state.likedImage : likedImage = outfitStory.outfits[0]
      return (
        <View style={[styles.story]}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Stories</Text>
        </View>
        <View style={[styles.picturesContainer]}>
          <Image key={likedImage.id} source={{uri: likedImage.photo_url}} style={[{width: 250, height: 250}, styles.display]} resizeMode={'cover'}>
         </Image>
         <View style={styles.scrollContainer}>
            <ScrollView
              style={styles.contain}
              automaticallyAdjustInsets={true}
              horizontal={true}
              decelerationRate={0}
              snapToInterval={CARD_WIDTH + CARD_MARGIN*2}
              snapToAlignment="start"
              contentContainerStyle={styles.content}>
              {outfitStory.outfits.map(function(outfit, index) {
                if (outfit.photo_url){
                  return (
                      <View key={index}>
                        {<TouchableOpacity  underlayColor="blue"  onPress={()=>self.handleImageLikeClick(outfit)} style={styles.outfitsStrip}>
                          <Image key={outfit.id} source={{uri: outfit.photo_url}} style={[{width: 100, height: 100}]} resizeMode={'cover'}>
                         </Image>
                        </TouchableOpacity>}
                      </View>
                  );
                }
              })}
            </ScrollView>
            </View>
            {outfitStory.event ? <Text style={styles.event}>{outfitStory.event}</Text> : <Text style={styles.event}></Text> }
            <View style={styles.buttonWrapper}>
              <TouchableOpacity underlayColor="blue" onPress={this.handlePassPress.bind(this)} style={[styles.button, styles.passButton]}>
                <Text style={styles.buttonText}>Pass</Text>
              </TouchableOpacity>
              <TouchableOpacity underlayColor="blue" onPress={this.handleVotePress.bind(this)} style={[styles.button, styles.voteButton]}>
                <View style={styles.buttonSwipeVote} >
                  <Text style={styles.buttonText} >Vote</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
         </View>
       )
     }

  handleVotePress () {
    console.log("YO")
    this.setState ({heartsAnimation: true})
    setTimeout(() => {
      this.setState ({heartsAnimation: false})
      this.setState ({storiesData: this.state.responseData.slice(1,-1), responseData: this.state.responseData.slice(1,-1),  likedImage: false})
    }, 1200);
    // this.fetchMoreDataCheck()
  }
  handleImageLikeClick (outfit) {
    this.passVotetoAPI(outfit)
    this.setState ({change: !this.change})
    this.setState ({likedImage: outfit})
  }
  handlePassPress () {
    this.setState ({storiesData: this.state.responseData.slice(1,-1), likedImage: false})
  }
  fetchMoreDataCheck(){

  }
  passVotetoAPI(outfit) {
    // have access to id and closet_id
    let closet_id = outfit.closet_id
    let photo_id = outfit.id
    var API_VOTE_URL = 'https://rocky-hollows-53333.herokuapp.com/closets/' + closet_id +'/photos/' + photo_id + '/vote';
    fetch(API_VOTE_URL, {method: 'PATCH'}).then((response) => response.json()).then((responseData) => {

    }).done();
  }

  renderView () {
    return (
      <View style={[styles.container, this.border('purple')]}>
        <ScrollView style={[styles.stories, this.border('purple')]}>
          {this.stories()}
          {this.state.heartsAnimation && <Hearts/> }
        </ScrollView>
      </View>
    );
  }
  render() {
    if (!this.state.loaded) {
        return this.renderLoadingView();
    }

    return this.renderView();
  }

  renderLoadingView() {
      return (
          <View style={styles.header}>
              <Text style={styles.headerText}>What to Wear?</Text>
              <View style={styles.container}>
                  <ActivityIndicator
                      animating={!this.state.loaded}
                      style={[styles.activityIndicator, {height: 80}]}
                      size="large"
                  />
              </View>
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




var {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

// var {
//   AppRegistry,
//   StyleSheet,
//   View,
//   Animated,
//   TouchableWithoutFeedback
// } = React;

var ANIMATION_END_Y = Math.ceil(deviceHeight * .5);
var NEGATIVE_END_Y = ANIMATION_END_Y * -1;
var startCount = 1;

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

var Heart = React.createClass({
    render: function() {
        return (
            <View {...this.props} style={[styles1.heart, this.props.style]}>
                <View style={[styles1.leftHeart, styles1.heartShape]} />
                <View style={[styles1.rightHeart, styles1.heartShape]} />
            </View>
        )
    }
});

var AnimatedHeart = React.createClass({
  getDefaultProps: function() {
    return {
      onComplete: function() {}
    };
  },
  getInitialState: function() {
    return {
      position: new Animated.Value(0)
    };
  },
  componentWillMount: function() {
    this._yAnimation = this.state.position.interpolate({
      inputRange: [NEGATIVE_END_Y, 0],
      outputRange: [ANIMATION_END_Y, 0]
    });

    this._opacityAnimation = this._yAnimation.interpolate({
      inputRange: [0, ANIMATION_END_Y],
      outputRange: [1, 0]
    });

    this._scaleAnimation = this._yAnimation.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [0, 1.2, 1],
      extrapolate: 'clamp'
    });

    this._xAnimation = this._yAnimation.interpolate({
      inputRange: [0, ANIMATION_END_Y/2, ANIMATION_END_Y],
      outputRange: [0, 15, 0]
    })

    this._rotateAnimation = this._yAnimation.interpolate({
      inputRange: [0, ANIMATION_END_Y/4, ANIMATION_END_Y/3, ANIMATION_END_Y/2, ANIMATION_END_Y],
      outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg']
    });
  },
  componentDidMount: function() {

    Animated.timing(this.state.position, {
      duration: 2000,
      toValue: NEGATIVE_END_Y
    }).start(this.props.onComplete);
  },
  getHeartAnimationStyle: function() {
    return {
      transform: [
        {translateY: this.state.position},
        {translateX: this._xAnimation},
        {scale: this._scaleAnimation},
        {rotate: this._rotateAnimation}
      ],
      opacity: this._opacityAnimation
    }
  },
  render: function() {
    return (
        <Animated.View style={[styles1.heartWrap, this.getHeartAnimationStyle(), this.props.style]}>
          <Heart />
        </Animated.View>
    )
  }
})





var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    marginTop: 60,
  },
  story:{

  },
  display: {
    borderWidth: 4,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    borderColor: 'rgba(0,0,0,0.1)',
    margin: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  picturesContainer:{
    backgroundColor: '#ffffe6',
    backgroundColor: '#e0ebeb',
  },
  event: {
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
    justifyContent: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    alignSelf: 'stretch',
    marginTop: 10,
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
    shadowOpacity: 0.5,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  voteButton: {
    backgroundColor: 'green',
    borderColor: '#d9ffb3',
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    backgroundColor: '#d9ffb3',
    borderColor: '#d9ffb3',
  },
  passButton: {
    backgroundColor: '#e6e6ff',
    borderColor: '#e6e6ff',
  },
  scrollContainer: {
    alignItems: 'center',
    borderColor: 'pink',
  },
  buttonText: {
    color: 'grey',
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

});

export default Stories;

// <Text style={styles.name}>{outfitStory.user}</Text>
