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


import Closet from './closet.js'
import CreateCloset from '../../components/createCloset'




  var InsideView = React.createClass({
    render: function() {
      return (
        <View>
          <TouchableOpacity onPress={() => this.props.openModal()}><Text>Open modal!</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.closeModal()}><Text>Close modal!</Text></TouchableOpacity>
        </View>
      );
    }
  });

  var ShowMyModal = React.createClass({
    render: function() {
      return (
        <Text>isModalOpen = {String(this.props.isVisible)}</Text>
      );
    }
  });

  var SampleApp = React.createClass({
    getInitialState: function() {
      return {
        isModalOpen: false
      }
    },

    _openModal: function() {
      this.setState({
        isModalOpen: true
      });
    },

    _closeModal() {
      this.setState({
        isModalOpen: false
      });
    },

    render: function() {
      return (
        <View style={{padding: 30}}>
          <InsideView openModal={this._openModal} closeModal={this._closeModal}/>
          <ShowMyModal isVisible={this.state.isModalOpen}/>
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

export default SampleApp;
