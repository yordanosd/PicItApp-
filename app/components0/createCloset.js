// Create closet is the page that some will go to when they want to make a
// closet instance

// inorder to do so the user will need access to the camera and need to write what the event is FacebookTabBar
// need to have a form to accept user input and at least one picture


// first start with event details


// create class
import React, {Component} from 'react'

import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'



//
// React Native Classes
//
class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}

export default UselessTextInput;
