import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  InteractionManager,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import Storage from 'react-native-storage';
import Main from './Main';
import NoLogin from './NoLogin';
import Pan from './Pan'; 
var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true
});

export default class Share extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  componentWillMount(){
    var {navigator} = this.props;
	storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true
      }).then(ret => { 
          navigator.resetTo({
            component: Main,
            name: 'Main',
			params: {
                data:ret.data1, 
            },
          });
           
      }).catch(err => {

       if(err.message.ret==undefined){ 
          navigator.resetTo({
            component: NoLogin,
            name: 'NoLogin'
          }); 
       }
      })
   
    
  }



  render() {

       return (
         <View style={{flex:1}}>

         </View>
        )



  }
}
