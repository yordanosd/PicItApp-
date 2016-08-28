import React, {Component} from 'react';
import { View, Text, StyleSheet, ListView, ScrollView, Image, Dimensions, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';


const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 10;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 3;
const HEIGHT = Dimensions.get('window').height - 70


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
    var API_URL = 'http://localhost:3000/users/2/userStories';
    fetch(API_URL).then((response) => response.json()).then((responseData) => {
      this.setState({
        responseData : responseData,
          userStoriesData : responseData,
               loaded : true
      });
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
        {console.log(outfitStory)}

          <Text style={styles.name}>{outfitStory.id}</Text>
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

                      {<TouchableOpacity  underlayColor="blue"  onPress={()=>self.handleImageLikeClick(outfit)} style={styles.outfitsStrip}>
                        <Image key={outfit.id} source={{uri: outfit.photo_url}} style={[{width: 100, height: 100}]} resizeMode={'cover'}>
                       </Image>
                      </TouchableOpacity>}
                    </View>
                );
              }
            })}
          </ScrollView>
          {outfitStory.event ? <Text style={styles.event}>{outfitStory.event}</Text> : <Text style={styles.event}></Text> }

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

export default Closet;
