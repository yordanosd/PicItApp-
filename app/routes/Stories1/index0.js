import React, {Component} from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  ShareDialog,
  AccessToken
} = FBSDK;




class Stories extends Component{

  // getInitialState: function() {
  //   var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   return {
  //     dataSource: ds.cloneWithRows(['row 1', 'row 2']),
  //   };
  // },

  // <View style={[styles.stories, this.border('yellow')]}>
  // <ListView
  //      dataSource={this.state.dataSource}
  //      renderRow={(rowData) => <Text>{rowData}</Text>}
  //    />
  // </View>
  //
  render () {
    return (
      <View style={[styles.container, this.border('blue')]}>


      <View style={[styles.stories, this.border('yellow')]}>

      </View>



        <View style={[styles.exit, this.border('pink')]}>
          <LoginButton
            onLogoutFinished={() => alert("logout.")}/>
        </View>
      </View>
    );
  }
  border(color){
    return {
      borderColor: color,
      borderWidth: 4
    }
  };
}

var styles = StyleSheet.create({

  container: {
    marginTop: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAA',
  },
  stories: {
    marginTop: 60,
    flex: 12,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#AAA',
  },
  exit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAA',
  },
  //
  // navContainer: {
  //   flex: 1,
  //   borderColor: 'green',
  //   borderWidth: 4
  // },
  //
  // navBar: {
  //   backgroundColor: 'white',
  // },
  //
  // navBarText: {
  //   fontSize: 16,
  //   marginVertical: 10,
  // },
  //
  // navBarTitleText: {
  //   color: '#88888c',
  //   fontWeight: '500',
  //   marginVertical: 9,
  // },
  //
  // navBarLeftButton: {
  //   paddingLeft: 10,
  // },
  //
  // navBarRightButton: {
  //   paddingRight: 10,
  // },
  //
  // navBarButtonText: {
  //   color: '#5890ff'
  // },

});

export default Stories;
