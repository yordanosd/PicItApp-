

import React from 'react';


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';



import SimpleExample from './routes/Login';
import ScrollableTabsExample from './routes/Me';
import OverlayExample from './components/camera.js';
import FacebookExample from './routes/Stories';
import DynamicExample from './routes/Closet/';

import FacebookTabBar from './routes/Switch/FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default React.createClass({
  render() {
    return <ScrollableTabView
      style={{marginTop: 20, }}
      initialPage={3}
      renderTabBar={() => <FacebookTabBar />}
      >
      <ScrollView tabLabel="ios-paper" style={styles.tabView}>
        <View style={styles.card}>
          <FacebookExample/>
        </View>
      </ScrollView>
      <ScrollView tabLabel="ios-people" style={styles.tabView}>
        <View style={styles.card}>
              <DynamicExample/>
        </View>
      </ScrollView>
      <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
        <View style={styles.card}>
          <Text>Messenger</Text>
        </View>
      </ScrollView>
      <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
        <View style={styles.card}>
          <OverlayExample/>
        </View>
      </ScrollView>
      <ScrollView tabLabel="ios-list" style={styles.tabView}>
        <View style={styles.card}>
        <TouchableHighlight onPress={console.log('hi') } style={ styles.button }>
          <Text>Create Closet</Text>
        </TouchableHighlight>
        </View>
      </ScrollView>
    </ScrollableTabView>;
  },
});

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    // borderWidth: 1,
    // backgroundColor: '#fff',
    // borderColor: 'rgba(0,0,0,0.1)',
    // margin: 5,
    // height: 150,
    // padding: 15,
    // shadowColor: '#ccc',
    // shadowOffset: { width: 2, height: 2, },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
  },
});




// switch (route.id) {
// case 'simple':
//   return <Me />;
// case 'scrollable':
//   return <Stories/>;
// case 'overlay':
//   return <OverlayExample />;
// case 'facebook':
//   return <FacebookExample />;
// case 'dynamic':
//   return <DynamicExample />;
// default:
//   return
// <View style={styles.container}>
//   <TouchableOpacity
//     style={styles.button}
//     onPress={() => nav.push({id: 'simple', })}
//   >
//     <Text>Simple example</Text>
//   </TouchableOpacity>
//
//   <TouchableOpacity
//     style={styles.button}
//     onPress={() => nav.push({id: 'scrollable', })}
//   >
//     <Text>Scrollable tabs example</Text>
//   </TouchableOpacity>
//
//   <TouchableOpacity
//     style={styles.button}
//     onPress={() => nav.push({id: 'overlay', })}
//   >
//     <Text>Overlay example</Text>
//   </TouchableOpacity>
//
//   <TouchableOpacity
//     style={styles.button}
//     onPress={() => nav.push({id: 'facebook', })}
//   >
//     <Text>Facebook tabs example</Text>
//   </TouchableOpacity>
//
//   <TouchableOpacity
//     style={styles.button}
//     onPress={() => nav.push({id: 'dynamic', })}
//   >
//     <Text>Dynamic tabs example</Text>
//   </TouchableOpacity>
// </View>;
