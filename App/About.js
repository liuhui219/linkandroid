import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	BackHandler,
	Image,
	Dimensions,
} from 'react-native';
import PassState from './PassState';
import Token from './Token';
import DeviceInfo from 'react-native-device-info';
export default class About extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {id: '',uid:'',datas:{},img:''};
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }
    componentDidMount() {

    }

	componentWillUnmount() {
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);

	}



    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',}}>
           <View style={styles.card}>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity onPress={this._pressButton.bind(this)}>
								  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
										<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>返回</Text>
								  </View>
							</TouchableOpacity>
				  </View>
				  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}} allowFontScaling={false}>关于</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
			</View>

			<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
				 <View style={{paddingLeft:15,paddingRight:15,paddingTop:10,}}>

					 <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:15,}}>
					     <Image source={require('./imgs/logo.png')} style={{width: 50, height: 50,}} />
					     <View  style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20,}}>
                              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12}} allowFontScaling={false}>For Android V{DeviceInfo.getVersion()}</Text>
					     </View>
					 </View>

					 <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:35,}}>
					     <Image source={require('./imgs/link.png')} style={{width: 150, height: 150,}} />
					     <View  style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20,}}>
                              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12}} allowFontScaling={false}>扫描二维码，让你的朋友也可以下载客户端！</Text>
					     </View>
                         <View  style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20,}}>
                              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,color:'#d96464'}} allowFontScaling={false}>提示：请勿使用微信扫一扫下载！</Text>
					     </View>
					 </View>
				 </View>
				 <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',position:'absolute',bottom:30,left:0,width:Dimensions.get('window').width}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12}} allowFontScaling={false}>Copyright©2009-{new Date().getFullYear()}</Text>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginTop:5,}} allowFontScaling={false}>邻盛管家-linksame版权所有</Text>
				 </View>
			</View>
      <PassState navigator = {this.props.navigator} {...this.props}/>
	  </View>
    );
    }
}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'column',
	backgroundColor:'#fafafa',
  },
  card: {
    height:70,
    paddingTop:25,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
