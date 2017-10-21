import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableNativeFeedback,
	TouchableHighlight,
	Text,
	DatePickerAndroid,
	TimePickerAndroid,
	ScrollView,
	StatusBar,
	ToastAndroid,
	InteractionManager,
	TextInput,
	ActivityIndicator,
	BackHandler,
	Dimensions,
	Image,
	Animated,
} from 'react-native';
import Calendar from './Calendar';
import Kaoqin from './Kaoqin';
import Webviews from './Webviews';
import MoreApp from './MoreApp';
import Mattendance from './Mattendance';
import Gonggao from './Gonggao';
import OperationX from './OperationX';
import Scanner from './scanner';
import pan from './pan';
import Sales from './Sales/Sales';
import Chart from './Chart/chart';
import ProjectM from './Project/ProjectM';
import cameraCard from './cameraCard';
import Netinfo from './Netinfo';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-spinkit';

export default class Application extends Component {
	constructor(props) {
        super(props);

        this.state = {
          domain:'',
		  cid:'',
		  token:'',
		  uid:'',
		  status:false,
		  datas:[],
		  imgArr:[],
		  All:[],
		  loaded: true,
		  key:'',
		  statua:false,
		  fadeAnims: new Animated.Value(0),
		  isloading:true,
		};
    }

	componentDidMount() {

	  this.setState({
		  domain:data.data.domain,
		  cid:data.data.cid,
		  token:data.data.token,
		  uid:data.data.uid,
		})
	  this._addsapp();
	}
	toQueryString(obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
				}).join('&');
			}

			return encodeURIComponent(key) + '=' + encodeURIComponent(val);
		}).join('&') : '';
	}

	_all(obj) {
        var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: obj,
                component: obj,
            })
			})
        }
    }


	_AddApp(){
		let _this = this;
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'MoreApp',
                component: MoreApp,
				params: {
                    getUser: function(user) {
                        _this.setState({
                            user: user
                        })
						if(user == true){
                            _this.setState({
							   loaded: false,
							})
							_this.timer = setTimeout(
			                  () => {_this._addsapp();},800);

						}

                    }
                }

            })
			})
        }
	}
	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
	}


	_Webview(urls){

		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Webviews',
                component: Webviews,
                params: {
					url: urls,

				}
            })
			})
        }
	}






	_addsapp(){
		var that=this;
		var imgArr = [];
		fetch('' + data.data.domain + '/index.php?app=Home&m=MobileUserApps&a=lists&access_token=' + data.data.token + '', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'cid':data.data.cid,
					'uid':data.data.uid,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {

					   that.setState({
						 datas:result.data,
						 isloading: false,
						 loaded:true, 
					   })
					  
					 
					    console.log('' + data.data.domain + '/index.php?app=Home&m=GroupMobile&a=groupList&access_token=' + data.data.token + '')
					   fetch('' + data.data.domain + '/index.php?app=Home&m=GroupMobile&a=groupList&access_token=' + data.data.token + '')
						  .then((response) => response.json())
						  .then((responseData) => { 
						      console.log(responseData)
							  
							  
						  })   
						  .catch((error) => {
							  console.log(1111)
							 that.setState({
									   isloading: false,
									   statua:true,
									   loaded:true,
								   })
								Animated.timing(
									that.state.fadeAnims,
									{
									  toValue: 1,
									  duration: 1000,
									},

								 ).start();
						  })

				})
				.catch((error) => {
					that.setState({
						   isloading: false,
						   statua:true,
						   loaded:true,
					   })
					Animated.timing(
						this.state.fadeAnims,
						{
						  toValue: 1,
						  duration: 1000,
						},

					 ).start();

				  });
	}
    _long(data){
		this.setState({
			status:true,
			key:data.key
		})
	}

	_cancer(){
		this.setState({
			status:false,
		})
	}

	_yes(){
		var that=this;
		that.setState({
		    status:false,
            loaded:false,
	    })
		fetch('' + data.data.domain + '/index.php?app=Home&m=MobileUserApps&a=del&access_token=' + data.data.token + '', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'cid': data.data.cid,
					'uid':data.data.uid,
                    'appkey':that.state.key,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {

					   that.setState({
						 loaded:true,
					   })
                       that._addsapp();

				})
				.catch((error) => {
					that.setState({
						   loaded: true,
					   })

				  });
	}

	_shuax(){
		this._addsapp();
        this.setState({
		   isloading: true,
           statua:false,
	    })
	}



	render() {
      return (
	    <View style={{flex:1,flexDirection:'column',height:Dimensions.get('window').height}}>

		 <View style={styles.card}>
		  <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
			<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>应用</Text>
			</View>
		  </View>
		</View>
		<Netinfo  {...this.props}/>
		 <ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',marginBottom:3}}>
		     <View style={{backgroundColor:'#fff'}}>
			    <View style={{borderBottomWidth:1,borderColor:'#ececec'}}>
					<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,paddingTop:10,paddingBottom:10,paddingLeft:10,}}>
					   常用应用
					</Text>
			    </View>

				<View style={{flexDirection:'row',flex:1,flexWrap:'wrap',}}>
				    <TouchableNativeFeedback  onPress={this._all.bind(this,Gonggao)}  >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#4385f4',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/xiaox.png')} style={{width: 20, height: 20,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
					      通知公告
					   </Text>
					  </View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback  onPress={this._all.bind(this,Kaoqin)} >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#F4BF43',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/dk.png')} style={{width: 22, height: 22,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
					      考勤打卡
					   </Text>
					  </View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback  onPress={this._all.bind(this,Calendar)}  >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#3BAFDA',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/rc.png')} style={{width: 24, height: 24,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
					      日程
					   </Text>
					  </View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback  onPress={this._all.bind(this,Mattendance)}  >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#35DCEF',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/kq.png')} style={{width: 26, height: 26,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
					      外勤签到
					   </Text>
					  </View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback  onPress={this._all.bind(this,pan)} >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#3ed4ab',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/yun.png')} style={{width: 26, height: 26,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
					      网盘
					   </Text>
					  </View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback  onPress={this._all.bind(this,Scanner)} >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#7595ca',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/scanner.png')} style={{width: 26, height: 26,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
					      扫一扫
					   </Text>
					  </View>
					</TouchableNativeFeedback>
                    <TouchableNativeFeedback  onPress={this._all.bind(this,cameraCard )} >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#6b9f3d',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/scannerCard.png')} style={{width: 26, height: 26,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
					      扫名片
					   </Text>
					  </View>
					</TouchableNativeFeedback>
					 
					 


				</View>
			 </View>
			 
			 {this.state.All.length>0 ? <View style={{backgroundColor:'#fff',marginTop:15,}}>
			    <View style={{borderBottomWidth:1,borderColor:'#ececec'}}>
					<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,paddingTop:10,paddingBottom:10,paddingLeft:10,}}>
					   集团应用
					</Text>
			    </View>

				<View style={{flexDirection:'row',flex:1,flexWrap:'wrap',}}>
                    {this.state.isloading ? <View style={{flexDirection:'row',flex:1,height:150,alignItems:'center',justifyContent:'center',}}><Spinner  isVisible={true} size={50} type={'ThreeBounce'} color={'#4385f4'}/></View> : null}
				    {!this.state.isloading ? <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',}}>
						{this.state.All.length>0 ? this.state.All.map((data, i) => {
							return <TouchableNativeFeedback key={i}   >
							  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
							   <View style={{width: 35, height: 35,borderRadius:7,overflow:'hidden',backgroundColor:'#fff',alignItems:'center', justifyContent:'center'}}>
								  <Image source={this.state.imgArr[i]} style={{width: 35, height: 35,borderRadius:7,}} />
							   </View>
							   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
								   {data.name}
							   </Text>
							  </View>
							</TouchableNativeFeedback>
						}) : null}
					 
					</View>	: null}

				</View>
			 </View> : null}


			 <View style={{backgroundColor:'#fff',marginTop:15,}}>
			    <View style={{borderBottomWidth:1,borderColor:'#ececec'}}>
					<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,paddingTop:10,paddingBottom:10,paddingLeft:10,}}>
					   其它应用
					</Text>
			    </View>

				<View style={{flexDirection:'row',flex:1,flexWrap:'wrap',}}>
                    {this.state.isloading ? <View style={{flexDirection:'row',flex:1,height:150,alignItems:'center',justifyContent:'center',}}><Spinner  isVisible={true} size={50} type={'ThreeBounce'} color={'#4385f4'}/></View> : null}
				    {!this.state.isloading ? <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',}}>
						 
					{this.state.datas.length>0 ? this.state.datas.map((data, i) => {
						if(data.weburl == 'https://www.xiaoshou.com'){
							return <TouchableNativeFeedback key={i}  onLongPress={this._long.bind(this,data)} onPress={this._all.bind(this,Sales)}  >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:7,overflow:'hidden',backgroundColor:'#4385f4',alignItems:'center', justifyContent:'center'}}>
					      <Image source={{uri:data.appicon}} style={{width: 35, height: 35,borderRadius:7,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
						   {data.appname}
					   </Text>
					  </View>
					</TouchableNativeFeedback>
						}
						
						if(data.weburl == 'https://www.baobiao.com'){
							return <TouchableNativeFeedback key={i}  onLongPress={this._long.bind(this,data)} onPress={this._all.bind(this,Chart )}  >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:7,overflow:'hidden',backgroundColor:'#fff',alignItems:'center', justifyContent:'center'}}>
					      <Image source={{uri:data.appicon}} style={{width: 35, height: 35,borderRadius:7,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
						   {data.appname}
					   </Text>
					  </View>
					</TouchableNativeFeedback>
						}
						return <TouchableNativeFeedback key={i}  onLongPress={this._long.bind(this,data)} onPress={this._Webview.bind(this,data.weburl)}  >
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#ececec',}}>
					   <View style={{width: 35, height: 35,borderRadius:7,overflow:'hidden',backgroundColor:'#4385f4',alignItems:'center', justifyContent:'center'}}>
					      <Image source={{uri:data.appicon}} style={{width: 35, height: 35,borderRadius:7,}} />
					   </View>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:8,fontSize:13}}>
						   {data.appname}
					   </Text>
					  </View>
					</TouchableNativeFeedback>
					}) : <View style={{flexDirection:'row',flex:1,height:150,alignItems:'center',justifyContent:'center',}}>

								 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:20,color:'#ccc',}}>暂无应用</Text>

						</View>}
					</View>	: null}

				</View>
			 </View>
			 <TouchableNativeFeedback  onPress={this._AddApp.bind(this)} >
				 <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:15,marginBottom:15}}>
					<View style={{flexDirection:'row',alignItems:'center',}}>
					  <Icon name="ios-add-outline" color="#666"size={28}  />
					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:10,fontSize:16,}}>添加应用</Text>
					</View>
					<Icon name="ios-arrow-forward" color="#999"size={27}  />
				 </View>
			 </TouchableNativeFeedback>



		 </ScrollView>
			 {this.state.status ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.51)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:150,top:(Dimensions.get('window').height-230)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>
					 <View  style={{height:40,alignItems:'center',justifyContent:'center',flexDirection:'row', }}>
					 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#000'}}>操作</Text>
					 </View>
					 <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec'}}>
						 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>你确定要删除？</Text>
					 </View>
					 <View style={{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:'#ececec',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
						<TouchableOpacity onPress={this._cancer.bind(this)} style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomLeftRadius:5,backgroundColor:'#fff'}}>
						 <View ><Text  allowFontScaling={false} adjustsFontSizeToFit={false}style={{color:'#666',fontSize:16}}>取消</Text></View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._yes.bind(this)} style={{flex:1, alignItems:'center',justifyContent:'center', borderBottomRightRadius:5,marginLeft:1,backgroundColor:'#fff'}}>
						 <View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:16}}>确定</Text></View>
						</TouchableOpacity>
					 </View>
			 </View></View> : null}
			 {!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height,width:Dimensions.get('window').width,position:'absolute',top:0,left:0,}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
						</View>
					  </View> : null}
			 {this.state.statua ? <Animated.View style={{opacity: this.state.fadeAnims,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-175)/2,left:(Dimensions.get('window').width-200)/2,}}>
				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击重试。</Text>
                 </TouchableOpacity>
	           </Animated.View> : null}
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
  dateTitle: {
	backgroundColor:'#4385f4',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
    height:40,
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
  dateTitleText: {
	  color:'#ccc',
	  fontSize:13,
  },
});
