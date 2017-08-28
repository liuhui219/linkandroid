'use strict';

import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import Storage from 'react-native-storage';
import AppMain from './main';
import {Login,data} from './Login';
import welcome from './welcome';
import SplashScreen from 'react-native-splash-screen'
var {height, width} = Dimensions.get('window');
var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true
});

global.storage = storage;
class Splash extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
	 var {navigator} = this.props;
    storage.load({
      key: 'welcome',
      autoSync: true,
      syncInBackground: true
      }).then(ret => {

      if(ret.datas == '1234'){
      storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true
      }).then(ret => {
        global.data=ret.data1
		    global.PUSHDATA=ret.PUSHDATA

          InteractionManager.runAfterInteractions(() => {

          navigator.resetTo({
            component: AppMain,
            name: 'AppMain'
          });
          });
         SplashScreen.hide();

      }).catch(err => {

       if(err.message.ret==undefined){

          InteractionManager.runAfterInteractions(() => {

          navigator.resetTo({
            component: Login,
            name: 'Login'
          });
          });
         SplashScreen.hide();
       }
      })
       }else{
       	   InteractionManager.runAfterInteractions(() => {

          navigator.resetTo({
            component: welcome,
            name: 'welcome'
          });
          });
		  SplashScreen.hide();
       }

      }).catch(err => {

       if(err.message.ret==undefined){

          InteractionManager.runAfterInteractions(() => {

          navigator.resetTo({
            component: welcome,
            name: 'welcome'
          });
          });
         SplashScreen.hide();
       }
      })



  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar
         backgroundColor={'#4385f4'}
         animated = {true}
         barStyle="light-content"
         translucent={true}
        />
		
      </View>
    );
  }
}
export default Splash;
