import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View, 
  Image,
  Dimensions,
  InteractionManager,
  TouchableHighlight,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import Pan from './Pan';
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'
import {Navigator} from 'react-native-deprecated-custom-components';
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



  shareWP(){
    var {navigator} = this.props;

            navigator.push({
              component: Pan,
              name: 'Pan',
              params: {
                data:this.props.data,
                typename:this.state.value
              },
              sceneConfig: Navigator.SceneConfigs.PushFromRight
            })



  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex:1}}>
	        
           <View style={{ backgroundColor: 'white', width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
            <View style={{height:70,paddingTop:25,flexDirection:'row',borderColor:'#ccc',borderBottomWidth:1,backgroundColor:'#4385f4'}}>
              <View style={{flex:1,justifyContent:'center'}}>
               <TouchableOpacity onPress={this.onClose.bind(this)}>
                 <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                <Text style={{color:'#fff',fontSize:16,paddingLeft:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>取消</Text>
                 </View>
               </TouchableOpacity>
               </View>
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                  <Text style={{color:'#fff',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>邻盛管家</Text>
                </View>
               </View>
               <View style={{flex:1,justifyContent:'center'}}>
                <TouchableOpacity >
                   <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>

                   </View>
                 </TouchableOpacity>
               </View>
            </View>
            <View style={{borderBottomWidth:1,borderColor:'#ccc'}}>
               {this.state.value.split(".")[this.state.value.split(".").length-1] == 'jpg' || this.state.value.split(".")[this.state.value.split(".").length-1] == 'png' || this.state.value.split(".")[this.state.value.split(".").length-1] == 'jpeg' || this.state.value.split(".")[this.state.value.split(".").length-1] == 'bmp' || this.state.value.split(".")[this.state.value.split(".").length-1] == 'gif' ?
                <View style={{width: Dimensions.get('window').width,justifyContent:'center',}}>
                     <Image resizeMode={'contain'} source={{uri:this.state.value}} style={{width: Dimensions.get('window').width-20, height: 250,marginLeft:10,marginTop:10,marginBottom:10}} />
                 </View> : null }
               {this.state.value.split(".")[this.state.value.split(".").length-1] == 'doc' || this.state.value.split(".")[this.state.value.split(".").length-1] == 'docx' ?
                <View style={{width: Dimensions.get('window').width,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#999'}}>{decodeURI(this.state.value.split("/")[this.state.value.split("/").length-1])}</Text>
                     </View>
                     <View style={{width:200,height:200,justifyContent:'center',alignItems:'center'}}>
                         <Image resizeMode={'contain'} source={require('../App/imgs/word.png')} style={{width: 100, height: 100,marginLeft:10,marginTop:10,marginBottom:10}} />
                     </View>
                 </View> : null }
               {this.state.value.split(".")[this.state.value.split(".").length-1] == 'xls' || this.state.value.split(".")[this.state.value.split(".").length-1] == 'xlsx' ?
                <View style={{width: Dimensions.get('window').width,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#999'}}>{decodeURI(this.state.value.split("/")[this.state.value.split("/").length-1])}</Text>
                     </View>
                     <View style={{width:200,height:200,justifyContent:'center',alignItems:'center'}}>
                         <Image resizeMode={'contain'} source={require('../App/imgs/xlsx.png')} style={{width: 100, height: 100,marginLeft:10,marginTop:10,marginBottom:10}} />
                     </View>
                 </View> : null }
               {this.state.value.split(".")[this.state.value.split(".").length-1] == 'ppt' || this.state.value.split(".")[this.state.value.split(".").length-1] == 'pptx' ?
                <View style={{width: Dimensions.get('window').width,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#999'}}>{decodeURI(this.state.value.split("/")[this.state.value.split("/").length-1])}</Text>
                     </View>
                     <View style={{width:200,height:200,justifyContent:'center',alignItems:'center'}}>
                         <Image resizeMode={'contain'} source={require('../App/imgs/ppt.png')} style={{width: 100, height: 100,marginLeft:10,marginTop:10,marginBottom:10}} />
                     </View>
                 </View> : null }
               {this.state.value.split(".")[this.state.value.split(".").length-1] == 'pdf' ?
                <View style={{width: Dimensions.get('window').width,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#999'}}>{decodeURI(this.state.value.split("/")[this.state.value.split("/").length-1])}</Text>
                     </View>
                     <View style={{width:200,height:200,justifyContent:'center',alignItems:'center'}}>
                         <Image resizeMode={'contain'} source={require('../App/imgs/PDF.png')} style={{width: 100, height: 100,marginLeft:10,marginTop:10,marginBottom:10}} />
                     </View>
                 </View> : null }
               {this.state.value.split(".")[this.state.value.split(".").length-1] != 'pdf' && this.state.value.split(".")[this.state.value.split(".").length-1] != 'doc' && this.state.value.split(".")[this.state.value.split(".").length-1] != 'docx' &&
               this.state.value.split(".")[this.state.value.split(".").length-1] != 'xls' && this.state.value.split(".")[this.state.value.split(".").length-1] != 'xlsx' && this.state.value.split(".")[this.state.value.split(".").length-1] != 'ppt' &&
               this.state.value.split(".")[this.state.value.split(".").length-1] != 'pptx' && this.state.value.split(".")[this.state.value.split(".").length-1] != 'jpg' && this.state.value.split(".")[this.state.value.split(".").length-1] != 'png' && this.state.value.split(".")[this.state.value.split(".").length-1] != 'jpeg' && this.state.value.split(".")[this.state.value.split(".").length-1] != 'bmp' && this.state.value.split(".")[this.state.value.split(".").length-1] != 'gif' ?
                <View style={{width: Dimensions.get('window').width,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#999'}}>{decodeURI(this.state.value.split("/")[this.state.value.split("/").length-1])}</Text>
                     </View>
                     <View style={{width:200,height:200,justifyContent:'center',alignItems:'center'}}>
                         <Image resizeMode={'contain'} source={require('../App/imgs/file.png')} style={{width: 100, height: 100,marginLeft:10,marginTop:10,marginBottom:10}} />
                     </View>
                 </View> : null }
            </View>
            <TouchableHighlight underlayColor="rgba(153, 153, 159, 0.29)" onPress={this.shareWP.bind(this)} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flex:1,marginLeft:15,paddingTop:15,paddingBottom:15,borderColor:'#ccc',borderBottomWidth:1}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{width: 30, height: 30,borderRadius:5,backgroundColor:'#3ed4ab',alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('../App/imgs/yun.png')} style={{width: 20, height: 20,}} />
                  </View>
                  <View style={{marginLeft:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#777'}}>分享到网盘</Text>
                  </View>
                </View>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                   <Image source={require('../App/imgs/right.png')}  style={{width:30,height:15,}}/>
                </View>
              </View>
            </TouchableHighlight>
          </View>
      </View>
    )
  }
}
