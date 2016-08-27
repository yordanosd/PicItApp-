/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions
} from 'react-native';


const WIDTH = Dimensions.get('window').width  ;
const HEIGHT = Dimensions.get('window').height - 70


import CreateCloset from '../../components/createCloset'




var InsideView = React.createClass({
  render: function() {
    return (
      <View>

        <TouchableOpacity onPress={() => this.props.openCreateCloset()}><Text>Open Create Closet!</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.closeCreateCloset()}><Text>Close Create Closet!</Text></TouchableOpacity>
      </View>
    );
  }
});

var ShowMyModal = React.createClass({
  render: function() {
    return (
      <View style={[styles.story]}>
        <View >
          <Text>CLOTHES THAT YOU SENT TO OTHER PEOPLE TO VOTE</Text>
        </View>
        <View >

        </View>
      </View>
    );
  }
});

var Closet = React.createClass({
  getInitialState: function() {
    return {
      isCreateClosetOpen: false
    }
  },

  _openCreateCloset: function() {
    this.setState({
      isCreateClosetOpen: true
    });
  },

  _closeCreateCloset() {
    this.setState({
      isCreateClosetOpen: false
    });
  },

  render: function() {
    return (
      <View style={{padding: 30}}>
        <InsideView openCreateCloset={this._openCreateCloset} closeCreateCloset={this._closeCreateCloset}/>
        <ShowMyModal isVisible={this.state.isCreateClosetOpen}/>
      </View>
    );
  },
});


var styles = StyleSheet.create({
  nav: {
    // flex: 1
  },
  myPage: {
    flex: 1,
    backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 300,
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 300,
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    backgroundColor: 'orange',
    // paddingTop: 800,
    flexDirection: 'column',
    alignItems: 'stretch',

    justifyContent: 'center',
  }
});

export default Closet;
