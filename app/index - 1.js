import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Navigator,
  TabBarIOS,
  //  NativeModules
} from 'react-native';

// routes
import CreateOutfits from './routes/CreateOutfits';
import Closet from './routes/Closet';
import Stories from './routes/Stories';

import Camera from './components/camera.js';

// icons for tab
import Icon from 'react-native-vector-icons/Ionicons';


var ReadImageData = require('NativeModules').ReadImageData;



var PicItApp = React.createClass({

  getInitialState: function() {
    return {
      images: []
    };
  },

  componentWillMount() {
   Icon.getImageSource('ios-settings', 30).then((source) => this.setState({ gearIcon: source }));
  },
  updateImagesState(imagePath){
    console.log(imagePath)
    this.setState ({images: this.state.images.concat(imagePath)})
    // var imagePath = 'http://pngimg.com/upload/butterfly_PNG1041.png'
    // ReadImageData.readImage(imagePath, (imageBase64) => {
    //     this.storeImageState(imageBase64);
    //     console.log(imageBase64);
    // });
  },

  storeImageState(imageBasePath){
    this.setState ({images: this.state.images.concat(imageBasePath)})
    console.log(this.state.images)
    // console.log(this.state.images)
  },


   renderScene(route, navigator) {
    switch (route.id) {
      case 'tab-bar':
        return <PicItAppNavTab navigator={navigator} images={this.state.images} updateImagesState={this.updateImagesState}/>;
        break;
      case 'camera':
        return <Camera navigator={navigator} images={this.state.images} updateImagesState={this.updateImagesState}/>;
    }
  },
  render() {
    return (
      <Navigator
        ref="navigator"
        renderScene={this.renderScene}
    		initialRoute={{id: 'tab-bar'}}
				configureScene={(route) => {
      		return Navigator.SceneConfigs.FloatFromBottom
        }}
			/>
    );
  }
});

var PicItAppNavTab = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'viewStoreisTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
  		<View style={styles.container}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      	<TouchableHighlight style={styles.button} onPress={() => this.props.navigator.push({id: 'test'})}>
      		<Text>Push New Scene</Text>
     		</TouchableHighlight>
      </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#400080">
        <Icon.TabBarItemIOS
          title="Create"
          iconName="ios-camera-outline"
          selectedIconName="ios-camera"
          selected={this.state.selectedTab === 'createOutfitsTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'createOutfitsTab',
            });
          }}>
          <CreateOutfits navigator={this.props.navigator} images={this.props.images}/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Closet"
          iconName="ios-shirt-outline"
          selectedIconName="ios-shirt"
          selected={this.state.selectedTab === 'viewClosetTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'viewClosetTab',
              presses: this.state.presses + 1
            });
          }}>
          <Closet navigator={this.props.navigator}/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Vote"
          iconName="ios-people-outline"
          selectedIconName="ios-people"
          selected={this.state.selectedTab === 'viewStoreisTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'viewStoreisTab',
            });
          }}>
          <Stories navigator={this.props.navigator}/>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    )
  }
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
  	backgroundColor: 'red',
    padding: 10,
    margin: 20
  },


});


module.exports = PicItApp;
