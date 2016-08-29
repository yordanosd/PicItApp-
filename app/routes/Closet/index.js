import React, {Component} from 'react';

import { View, Text, processColor, StyleSheet, ListView, ScrollView, Image, Dimensions, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';


const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 10;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 3;
const HEIGHT = Dimensions.get('window').height - 70

const APP_ICON = require('../../components/assets/picitIcon_36pt.png');

class Closet extends Component{

  constructor(props) {
    super(props);
    // responseData: whats returned from API. What is altered.
    // storiesData: Refer to responseData. What is being presented on the page
    this.state = {
               change: false,
            nextImage: false,
         responseData: [],
      userStoriesData: [],
              loaded : false};
    }

    componentWillMount() {
      this.fetchData();
    }

  fetchData () {
    var API_URL = 'https://rocky-hollows-53333.herokuapp.com//users/2/userStories';
    fetch(API_URL).then((response) => response.json()).then((responseData) => {
        this.setState({
          responseData : responseData,
            userStoriesData : responseData,
                 loaded : true
        })
      }).catch((err)=> {
              console.log('Some errors occured');
              console.log(err);
    }).done();
  }

  userStories (){
    var self = this
    var userStories = this.state.userStoriesData

    // find image with the photo with the highest vote for each closet story.
    return(
    userStories.map(function(outfitStory,index){
      return (
        <View key={index} style={[styles.story]}>
        <Text style={styles.line1}></Text>
        {outfitStory.event ? <Text style={styles.event}>{outfitStory.event}</Text> : <Text style={styles.event}>Oufit Story #{outfitStory.id}</Text> }
          <View style={styles.scrollContainer}>
          {<TouchableOpacity  underlayColor="blue"  onPress={()=>self.handleImageLikeClick(outfit)} style={styles.outfitsStrip}>

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
                      {console.log(outfit)}
                        <View style={styles.imageContainer}>
                          <Image key={outfit.id} source={{uri: outfit.photo_url}} style={[styles.imageStyle, {width: 100, height: 100}]} resizeMode={'cover'}>
                         </Image>
                         </View>
                         <View style={styles.votesContainer}>
                         <View style={[styles.button, styles.voteButton]}>
                           <View style={styles.buttonSwipeVote} >
                             <Text style={styles.buttonText}>{outfit.votes}</Text>
                           </View>
                         </View>
                         </View>
                      </View>
                  );
                }
              })}

            </ScrollView>
            </TouchableOpacity>}
            <Image source={{APP_ICON}} style={[styles.imageStyle]} resizeMode={'cover'}>
           </Image>
          </View>
          <Text style={styles.line1}></Text>

        </View>
      )
    })
  )
  }
  handleImageLikeClick (outfit) {
    this.setState ({change: !this.change})
  }
  handleVotePress (outfit, index) {
    this.setState ({storiesData: this.state.responseData.slice(1,-1), responseData: this.state.responseData.slice(1,-1)})
    // this.fetchMoreDataCheck()
  }
  handlePassPress (outfit, index) {
    this.setState ({storiesData: this.state.responseData.slice(1,-1)})
  }
  fetchMoreDataCheck(){

  }
  renderView () {
    return (
      <View style={[styles.container, this.border('purple')]}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>My Outfits</Text>
        </View>
        <ScrollView style={[styles.stories, this.border('purple')]}>
          {this.userStories()}
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
    // borderWidth: 1,
    backgroundColor: '#EFF5FA',
    // borderColor: 'rgba(0,0,0,0.1)',
    // // paddingTop: 5,
    // height: 30,
    // shadowColor: '#ccc',
    // shadowOffset: { width: 2, height: 2, },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    textAlign: 'center',
    margin: 2,
    // flexDirection: 'row',
    // justifyContent: 'stretch',
    // alignItems: 'stretch',
    // justifyContent: 'space-around',
    // fontWeight: 'bold',
    fontFamily: 'Cochin',
    // alignSelf: 'stretch',
    // marginTop: 10,
  },
  outfitsStrip: {
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    // margin: 1,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  button: {
    borderWidth: 2,
    height: 20,
    width: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonWrapper: { // Green
    flex: 1, // takes up 3/8ths of the available space
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    // paddingTop: 5,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  voteButton: {
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
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
  line1: {
   backgroundColor: '#96ADAD',
   height: 1,
   borderColor: '#96ADAD',
  //  borderWidth: 2,
   opacity: 0.3,
  },
  votesTextStyle: {
    backgroundColor: '#7A81FF',
    borderColor: '#7A81FF',
    color: 'white',
    margin: 4,
    opacity: 0.8,
    // flex: 1,
      // flexDirection: 'row',
      // flex: 1,
      //    justifyContent: 'center',
      //    alignItems: 'center',
         fontWeight: 'bold',
         textAlign: 'center',
         fontFamily: 'Cochin',

  },
  votesContainer:{
    backgroundColor: '#7A81FF',
    // borderColor: '#7A81FF',
    // borderWidth: 4,
    margin: 2,
    alignItems: 'center'
  },
  imageContainer: {
    backgroundColor: 'white',
  },
  imageStyle: {
    margin: 4,
  }
});

export default Closet;


// {index === 0 ?
//   <Text style={styles.votesTextStyle}>{outfit.votes}</Text>
//     :
//    <Text style={styles.votesTextStyle}>
//    <Image source={{APP_ICON}} style={[styles.appIcon, {width: 100, height: 100}]} resizeMode={'cover'}>
//   </Image>
//    {outfit.votes}</Text>
// }
