

import React from 'react';


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Navigator,
  TabBarIOS,
} from 'react-native';



import SimpleExample from './routes/Login';
import Stories from './routes/Stories';
import Camera from './components/camera.js';
import Closet from './routes/Closet';

import ScrollableTabView from 'react-native-scrollable-tab-view';



var Test = React.createClass({
	render() {
  	return (
  		<View style={styles.container}>
  			<TouchableHighlight style={styles.button} onPress={() => this.props.navigator.pop()}>
  				<Text>Close View</Text>
 				</TouchableHighlight>
  		</View>
  	);
	}
});

var PicItApp = React.createClass({

  getInitialState: function() {
    return {
      images: [1, 2, 3]
    };
  },

  updateImagesState(imagePath){
    console.log(imagePath)

    this.setState ({images: this.state.images.concat(imagePath)})
    console.log(this.state.images)
  },

   renderScene(route, navigator) {
    switch (route.id) {
      case 'tab-bar':
        return <TabBarExample navigator={navigator} images={this.state.images} />;
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

var TabBarExample = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'redTab',
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
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="Blue Tab"
          systemIcon="history"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          <Stories/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="history"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
        <Closet navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

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
  }
});


module.exports = PicItApp;

// export default React.createClass({
//   render() {
//     return <ScrollableTabView
//       style={{marginTop: 20, }}
//       initialPage={3}
//       renderTabBar={() => <FacebookTabBar />}
//       >
//       <ScrollView tabLabel="ios-paper" style={styles.tabView}>
//         <View style={styles.card}>
//           <FacebookExample/>
//         </View>
//       </ScrollView>
//       <ScrollView tabLabel="ios-people" style={styles.tabView}>
//         <View style={styles.card}>
//               <DynamicExample/>
//         </View>
//       </ScrollView>
//       <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
//         <View style={styles.card}>
//           <Text>Messenger</Text>
//         </View>
//       </ScrollView>
//       <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
//         <View style={styles.card}>
//           <OverlayExample/>
//         </View>
//       </ScrollView>
//       <ScrollView tabLabel="ios-list" style={styles.tabView}>
//         <View style={styles.card}>
//         <TouchableHighlight onPress={console.log('hi') } style={ styles.button }>
//           <Text>Create Closet</Text>
//         </TouchableHighlight>
//         </View>
//       </ScrollView>
//     </ScrollableTabView>;
//   },
// });
//
// const styles = StyleSheet.create({
//   tabView: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: 'rgba(0,0,0,0.01)',
//   },
//   card: {
//     // borderWidth: 1,
//     // backgroundColor: '#fff',
//     // borderColor: 'rgba(0,0,0,0.1)',
//     // margin: 5,
//     // height: 150,
//     // padding: 15,
//     // shadowColor: '#ccc',
//     // shadowOffset: { width: 2, height: 2, },
//     // shadowOpacity: 0.5,
//     // shadowRadius: 3,
//   },
// });
//
//
//
//
// // switch (route.id) {
// // case 'simple':
// //   return <Me />;
// // case 'scrollable':
// //   return <Stories/>;
// // case 'overlay':
// //   return <OverlayExample />;
// // case 'facebook':
// //   return <FacebookExample />;
// // case 'dynamic':
// //   return <DynamicExample />;
// // default:
// //   return
// // <View style={styles.container}>
// //   <TouchableOpacity
// //     style={styles.button}
// //     onPress={() => nav.push({id: 'simple', })}
// //   >
// //     <Text>Simple example</Text>
// //   </TouchableOpacity>
// //
// //   <TouchableOpacity
// //     style={styles.button}
// //     onPress={() => nav.push({id: 'scrollable', })}
// //   >
// //     <Text>Scrollable tabs example</Text>
// //   </TouchableOpacity>
// //
// //   <TouchableOpacity
// //     style={styles.button}
// //     onPress={() => nav.push({id: 'overlay', })}
// //   >
// //     <Text>Overlay example</Text>
// //   </TouchableOpacity>
// //
// //   <TouchableOpacity
// //     style={styles.button}
// //     onPress={() => nav.push({id: 'facebook', })}
// //   >
// //     <Text>Facebook tabs example</Text>
// //   </TouchableOpacity>
// //
// //   <TouchableOpacity
// //     style={styles.button}
// //     onPress={() => nav.push({id: 'dynamic', })}
// //   >
// //     <Text>Dynamic tabs example</Text>
// //   </TouchableOpacity>
// // </View>;
