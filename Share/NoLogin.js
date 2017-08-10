import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
  Text,
  TextInput,
  View,
  Dimensions,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'
import Storage from 'react-native-storage';  
export default class NoLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
       isOpen: true,
       text:'',
    }
  }



 componentDidMount() {

  }

  onClose() {
    ShareExtension.close()
  }

  closing(){
    this.setState({
      isOpen: false
    })
  }

  render() {

      return (
        <Modal backdrop={false} backdropColor={'rgba(120, 117, 117, 0.48)'} swipeToClose={false}
               style={{ backgroundColor: 'rgba(120, 117, 117, 0.79)' }} position="center" isOpen={this.state.isOpen} onClosed={this.onClose}>
            <View style={{ alignItems: 'center', justifyContent:'center', flex: 1 ,}}>
              <View style={{backgroundColor: 'white', height: 250, width: 300,flexDirection:'column',borderRadius:5}}>
                <View style={{height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>

                    <View style={{height:50,flexDirection:'row',justifyContent:'center',alignItems:'center',width:50,paddingLeft:10}}>
                    </View>

                  <View style={{height:50,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                    <Text allowFontScaling={false} style={{fontSize:16}}>邻盛管家</Text>
                  </View>
                  <View style={{height:50,width:50,flexDirection:'row',justifyContent:'center',alignItems:'center',width:50,paddingLeft:10}}>
                  </View>
                </View>
                <View style={{height:150,flex:1,borderBottomWidth:1,borderColor:'#ddd',borderTopWidth:1,borderColor:'#ddd',justifyContent:'center',alignItems:'center',paddingLeft:10,paddingRight:10}}>
                    <Text allowFontScaling={false} style={{fontSize:16,color:'#aaa',justifyContent:'center',alignItems:'center',textAlign:'center',lineHeight:25}}>抱歉，请登录邻盛管家才能继续使用分享功能</Text>
                </View>
                <View style={{height:50}}>
                  <TouchableHighlight underlayColor="rgba(153, 153, 159, 0.29)" onPress={this.closing.bind(this)}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:50}}>
                      <Text allowFontScaling={false} style={{fontSize:14,color:'#4385f4'}}>我知道了</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
        </Modal>
      )

  }
}
