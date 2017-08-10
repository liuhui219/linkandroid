/**
 * Sample React Native Share Extension
 * @flow
 */

import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
  Text,
  TextInput,
  StatusBar,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native'

export default class Share extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isOpen: true,
      type: '',
      value: ''
    }
  }

  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data()
      this.setState({
        type,
        value
      })
    } catch(e) {
      console.log('errrr', e)
    }
  }

  onClose() {
    ShareExtension.close()
  }

  

  render() {
    return (
	  <View style={{flex:1,backgroundColor: 'white',}}>
	   
	      <View style={{backgroundColor:'#4385f4',height:70,paddingTop:25,flexDirection:'row'}}>
		    <View style={{flex:1,justifyContent:'center'}}>
			   <TouchableOpacity onPress={this.onClose.bind(this)}>
			     <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}> 
					<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>取消</Text>
			     </View>
			   </TouchableOpacity>
    		 </View>
			 <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
				<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
					<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>邻盛管家</Text>
				</View>
			 </View>
    		 <View style={{flex:1,justifyContent:'center'}}>
				<TouchableOpacity >
				   <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
					 
				   </View>
			   </TouchableOpacity>
    		 </View>
		  </View>
       
          <ScrollView style={{backgroundColor: 'white',flex:1,}}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width,height:Dimensions.get('window').height-150}}>  
                 
				<Text style={{fontSize:22}}>正在开发中，敬请期待！</Text> 
            </View>
          </ScrollView>
      
	  </View>
    )
  }
}
