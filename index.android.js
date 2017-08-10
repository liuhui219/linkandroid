/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Share from './Share/root'
import root from './App/App';
AppRegistry.registerComponent('linksa', () => root);
AppRegistry.registerComponent('MyShareEx', () => Share)
