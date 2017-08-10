import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	ActivityIndicator,
	StatusBar,
	ScrollView,
	Linking,
	BackHandler,
	InteractionManager,
	Dimensions,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ContactInfos from './ContactInfos';
import Safe from './Safety/index';
import {Login} from './Login';
import About from './About';
import Cache from './Cache';
import DeviceInfo from 'react-native-device-info';
import welcomes from './welcomes';
var arrayColor=['#54cfc7','#613ba7','#4385f4','#8fcb42','#3784b5','#ddae45'];
export default class Setting extends React.Component {

	constructor(props) {
        super(props);
		this.state = {
		  img:{uri: data.data.domain.slice(0,-6)+data.data.photo.slice(2)},
		  _update:false,
		  info:'',
		  statust:false,
		  _infos:false,
	  };
    }

	componentDidMount() {
		this.setState({
			img: {uri: data.data.domain.slice(0,-6)+data.data.photo.slice(2)}
		})

	}

	_pers() {
    var bgColor='';
    bgColor='#4385f4';
        var { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'ContactInfos',
                component: ContactInfos,
				params: {
					id: data.data.name,
					uid:data.data.uid,
          colors:bgColor,
				}
            })
        }
    }

	_exits(){
		storage.clearMap();
		storage.remove({
			key: 'loginState'
		});
		storage.remove({
		   key: 'password'
		});
		storage.remove({
		   key: 'contact'
		});
		const {navigator} = this.props;
				navigator.resetTo({
				  component: Login,
				  name: 'Login'
		    });
	}

	about(){
		var { navigator } = this.props;
        if(navigator) {

            navigator.push({
                name: 'About',
                component: About,

            })

        }
	}

  safe(){
    var { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'Safe',
                component: Safe
            })
        }
  }


	update(){
		this.setState({_update:true,})
		fetch('http://www.linksame.com/phone/update.php')
		  .then((response) => response.json())
		  .then((responseData) => {
               if(responseData.cache == DeviceInfo.getVersion()){
				   this.setState({statust:false,_update:false,_infos:true,info:'已是最新版'})
			   }else{
				   this.setState({statust:true,_update:false,_infos:false,info:'',})

			   }
			  this.Times=setInterval(() => {
				       this.setState({
						   _infos:false,
					   })
			   }, 2000);
		  })
		  .catch((error) => {

		  });
	}


	clearCache(){


		var { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'Cache',
                component: Cache
            })
        }
	}

	_cancer(){
		this.setState({
			statust:false,
		})
	}



	_yes(){
		this.setState({
			statust:false,
		})
		Linking.canOpenURL('http://www.linksame.com/phone/android/Linksame.apk').then(supported => {
				   if (supported) {
					   Linking.openURL('http://www.linksame.com/phone/android/Linksame.apk');
				   } else {

				   }
				})
	}

	newb(){
		var { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'welcomes',
                component: welcomes
            })
        }
	}

	componentWillUnmount() {
	  this.Times && clearTimeout(this.Times);
	}

	render() {
        return (
		   <View style={{flex:1,flexDirection:'column',backgroundColor:'#ececec', }}>
            <View style={{backgroundColor:'#4385f4',height:25,width:Dimensions.get('window').width}}></View>
						<View style={{flexDirection:'column',}}>
						    <TouchableOpacity
						         activeOpacity={1}
                                 onPress={this._pers.bind(this)}
								>
						       <View  style={{backgroundColor:'#4385f4',height:150,justifyContent:'center',}}  >
							       <View style={{flex:1,position:'absolute',top:0, left:0,}}>
    									  <Image
    										style={{flex:1,width:Dimensions.get('window').width,height:150,}}
    										source={require('./imgs/setbg.png')}
    										/>
    									</View>
							       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:15,paddingTop:-15,}}>
									   <View  style={{alignItems:'center',justifyContent:'flex-start',flex:1,flexDirection:'row',}}>
										   <View  style={{alignItems:'center',justifyContent:'center',height:60,backgroundColor:'#4385f4',width:60,borderRadius:40,}}>
										      <Image source={this.state.img} style={{width: 60, height: 60,borderRadius:30,}} />
										   </View>
										   <View style={{marginLeft:15,}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#fff'}}>{data.data.name}</Text></View>
									   </View>
							           <Icon name="ios-arrow-forward" color="#fff"size={27}  />
						           </View>
							   </View>

						    </TouchableOpacity>
						</View>
						<ScrollView style={{flex:1,marginBottom:5,}}>
						   <View style={{marginTop:10,flexDirection:'column', backgroundColor:'#fff',flex:1,}}>
							   <TouchableNativeFeedback onPress={this.update.bind(this)}  >
							        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
										   <View style={{backgroundColor:'rgba(78, 128, 180, 0.77)',width:34,height:34,borderRadius:17,justifyContent:'center',alignItems:'center',marginLeft:15}}>
											  <Image source={require('./imgs/set_jc.png')} style={{width: 24, height: 24,}} />
										   </View>

										<View style={{flex:1,flexDirection:'row',height:60,alignItems:'center',padding:15,paddingLeft:0,marginLeft:15, borderBottomWidth:1,borderColor:'#ececec',justifyContent:'space-between',}}>
											<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
											   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,marginLeft:5,}}>检测版本</Text>
											</View>
											<Icon name="ios-arrow-forward" color="#ccc"size={27}  />
										</View>
									</View>
							   </TouchableNativeFeedback>
							   <TouchableNativeFeedback onPress={this.clearCache.bind(this)} >
							     <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
								    <View style={{backgroundColor:'rgba(233, 38, 19, 0.89)',width:34,height:34,borderRadius:17,justifyContent:'center',alignItems:'center',marginLeft:15}}>
									   <Image source={require('./imgs/set_clear.png')} style={{width: 20, height: 20,}} />
								    </View>
									<View style={{flex:1,flexDirection:'row',height:60,alignItems:'center',padding:15,paddingLeft:0,marginLeft:15, borderBottomWidth:1,borderColor:'#ececec',justifyContent:'space-between',}}>
									    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>

										   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,marginLeft:5,}}>清除缓存</Text>
										</View>
										<Icon name="ios-arrow-forward" color="#ccc"size={27}  />
									</View>
								  </View>
							   </TouchableNativeFeedback>
							   <TouchableNativeFeedback onPress={this.about.bind(this)} >
							     <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
								    <View style={{backgroundColor:'rgba(37, 213, 202, 0.79)',width:34,height:34,borderRadius:17,justifyContent:'center',alignItems:'center',marginLeft:15}}>
									   <Image source={require('./imgs/set_about.png')} style={{width: 24, height: 24,}} />
								    </View>
									<View style={{flex:1,flexDirection:'row',height:60,alignItems:'center',padding:15,paddingLeft:0,marginLeft:15,  borderBottomWidth:1,borderColor:'#ececec',justifyContent:'space-between',}}>
									    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>

										   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,marginLeft:5,}}>关于邻盛</Text>
										</View>
										<Icon name="ios-arrow-forward" color="#ccc"size={27}  />
									</View>
								  </View>
							   </TouchableNativeFeedback>
                               <TouchableNativeFeedback onPress={this.safe.bind(this)} >
							     <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
								    <View style={{backgroundColor:'rgba(45, 175, 209, 0.81)',width:34,height:34,borderRadius:17,justifyContent:'center',alignItems:'center',marginLeft:15}}>
									   <Image source={require('./imgs/set_info.png')} style={{width: 24, height: 24,}} />
								    </View>
									<View style={{flex:1,flexDirection:'row',height:60,alignItems:'center',padding:15,paddingLeft:0,marginLeft:15, borderBottomWidth:1,borderColor:'#ececec',justifyContent:'space-between',}}>
									    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>

										   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,marginLeft:5,}}>账号与安全</Text>
										</View>
										<Icon name="ios-arrow-forward" color="#ccc"size={27}  />
									</View>
								  </View>
							   </TouchableNativeFeedback>
                               <TouchableNativeFeedback onPress={this.newb.bind(this)}  >
							     <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
								    <View style={{backgroundColor:'rgba(65, 213, 52, 0.79)',width:34,height:34,borderRadius:17,justifyContent:'center',alignItems:'center',marginLeft:15}}>
									   <Image source={require('./imgs/set_js.png')} style={{width: 24, height: 24,}} />
								    </View>
									<View style={{flex:1,flexDirection:'row',height:60,alignItems:'center',padding:15,paddingLeft:0,marginLeft:15,justifyContent:'space-between',}}>
									    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>

										   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,marginLeft:5,}}>新版本介绍</Text>
										</View>
										<Icon name="ios-arrow-forward" color="#ccc"size={27}  />
									</View>
								  </View>
							   </TouchableNativeFeedback>

                           </View>
						   <View style={{marginTop:20, }}>
						       <TouchableNativeFeedback onPress={this._exits.bind(this)}  style={{marginTop:15,}}  delayPressIn={0} >
									<View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',padding:15,backgroundColor:'#fff',justifyContent:'center',}}>
									    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18}}>退出登录</Text>
									</View>
							   </TouchableNativeFeedback>
						   </View>


						</ScrollView>
						{this.state._update ? <View style={{justifyContent: 'center',alignItems: 'center', height:Dimensions.get('window').height-120,overflow:'hidden',position:'absolute',width:Dimensions.get('window').width,}}>
							<View style={styles.loading}>
								<ActivityIndicator color="white"/>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>正在检测更新中……</Text>
							</View>
						</View> : null}
						{this.state._infos ? <View style={{justifyContent: 'center',alignItems: 'center', height:Dimensions.get('window').height-120,overflow:'hidden',position:'absolute',width:Dimensions.get('window').width,}}>
							<View style={styles.loading}>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>{this.state.info}</Text>
							</View>
						</View> : null}
						{this.state.statust ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.4)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:150,top:(Dimensions.get('window').height-180)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>
								 <View  style={{height:40,alignItems:'center',justifyContent:'center',flexDirection:'row', }}>
								 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#000'}}>操作</Text>
								 </View>
								 <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec'}}>
									 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>检测到新版本,立即下载？{this.state.output}</Text>
								 </View>
								 <View style={{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:'#ececec',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
									<TouchableOpacity onPress={this._cancer.bind(this)} style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomLeftRadius:5,backgroundColor:'#fff'}}>
									 <View ><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:16}}>取消</Text></View>
									</TouchableOpacity>
									<TouchableOpacity onPress={this._yes.bind(this)} style={{flex:1, alignItems:'center',justifyContent:'center', borderBottomRightRadius:5,marginLeft:1,backgroundColor:'#fff'}}>
									 <View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:16}}>确定</Text></View>
									</TouchableOpacity>
								 </View>
						 </View></View> : null}

		   </View>
		)
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
  loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 16,
        color: 'white'
    },
});
