import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  ShareDialog,
  AccessToken
} = FBSDK;



import Me from '../Me'
import Stories from '../Stories'
import Menu from '../../Menu';



const SubMenu = () => (
  <Menu
    routes={[
      { component: Me, title: 'Me' },
      { component: Stories, title: 'Stories'}
    ]}
    initialIndex={0}
    horizontal={false}
  />
);

const App = () => {
  return (
    <Menu
      routes={[
        { component: Me },
        { component: SubMenu },
        { component: Stories },
      ]}
      initialIndex={0}
    />
  );
};


export default App;
