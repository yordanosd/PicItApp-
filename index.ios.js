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
} from 'react-native';


import Login from './app'

import Stories from './app/routes/Stories'

'use strict';



var Component2 = React.createClass({
  render: function() {
    return (
      <View style={{ flex: 1, paddingTop: 100, backgroundColor: '#ccc' }}>
        <TouchableOpacity onPress={() => this.props.immediatelyResetRouteStack(stack2) }>
          <Text>replace</Text>
        </TouchableOpacity>
      </View>
    )
  }
});


var stack = [
  // {
  //   Component: Login,
  //   title: 'Login'
  // },
  {
    Component: Stories,
    title: 'Stories'
  }
];


var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={function() {
          navigator.pop();
        }}
      >
        <View style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};


var PicItApp = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Navigator
          style={styles.navContainer}
          ref="nav"
          initialRoute={stack[0]}
          renderScene={this._renderScene}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={NavigationBarRouteMapper}
              style={styles.navBar}
            />
          }
        />
      </View>
    );
  },
  _renderScene: function(route, navigator) {
    var Component = route.Component;
    return (
      <Component
        push={navigator.push}
        navigator = {navigator}
        immediatelyResetRouteStack={navigator.immediatelyResetRouteStack}
        // stack = {this.stack}
      />
    );
  }
});

var styles = StyleSheet.create({

  container: {
    flex: 1
  },

  navContainer: {
    flex: 1
  },

  navBar: {
    backgroundColor: 'white',
  },

  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },

  navBarTitleText: {
    color: '#88888c',
    fontWeight: '500',
    marginVertical: 9,
  },

  navBarLeftButton: {
    paddingLeft: 10,
  },

  navBarRightButton: {
    paddingRight: 10,
  },

  navBarButtonText: {
    color: '#5890ff'
  },

});

AppRegistry.registerComponent('PicItApp', () => PicItApp);
