import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	ActivityIndicator,
	Text,
	BackHandler,
	Image,
	Dimensions,
} from 'react-native';
import PassState from './PassState';
import Token from './Token';
import DeviceInfo from 'react-native-device-info';
import QRCode from 'react-native-qrcode';
export default class About extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {id: '',uid:'',datas:{},img:'', text: 'http://www.linksame.com/phone/android/Linksame.apk',show:true,};
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
        
		this.timer = setTimeout(
		  () => {  
		   this.Qrcode('http://www.linksame.com/phone/qrcode.php');
	    },800);
    }
	
	 
	
	Qrcode(url){
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {
                this.setState({
					text:responseData.code,
					show:false,
				})
		  })
		  .catch((error) => {
             this.setState({
				 show:false,
			 })
		  });
	}

	componentWillUnmount() {
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
      this.timer && clearTimeout(this.timer);
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
					     <View style={{width:160,height:160,justifyContent:'center',alignItems:'center'}}> 
							 <QRCode
							  value={this.state.text}
							  size={150}
							  bgColor='#000'
							  fgColor='white'/>
						 </View> 
					     <View  style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20,}}>
                              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12}} allowFontScaling={false}>扫描二维码，让你的朋友也可以下载客户端！</Text>
					     </View>
                          
					 </View>
				 </View>
				 <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',position:'absolute',bottom:30,left:0,width:Dimensions.get('window').width}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12}} allowFontScaling={false}>Copyright©2009-{new Date().getFullYear()}</Text>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginTop:5,}} allowFontScaling={false}>邻盛管家-linksame版权所有</Text>
				 </View>
			</View>
			
			{this.state.show ? <View style={{justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width, height:Dimensions.get('window').height-70,overflow:'hidden',position:'absolute',top:70,left:0, backgroundColor:'#fff'}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
						</View>
			</View> : null}
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
  loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
