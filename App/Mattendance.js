import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableNativeFeedback,
	Text,
	DatePickerAndroid,
	TimePickerAndroid,
	ScrollView,
	ToastAndroid,
	TextInput,
	Animated,
	ActivityIndicator,
	WebView,
	Dimensions,
	Modal,
	InteractionManager,
	BackHandler,
	Platform,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';
import ImagePicker from 'react-native-image-picker';
import PassState from './PassState';
import YTj from './YTj';
import Scustomera from './Scustomera';
import Scustomerb from './Scustomerb';
import Scustomerc from './Scustomerc';
import Scustomerd from './Scustomerd';
export default class Mattendance extends Component {

	constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {map: '正在定位中...',
		             mapType: MapTypes.NORMAL,
					 fadeAnim: new Animated.Value(0),
					 fadeAnims: new Animated.Value(0),
					 isshows:true,
					 isfalses:false,
					 avatarSource:'',
					 imguri:'',
					 names:'',
					 maps:false,
					 type:'',
					 name:'',
					 ida:'',
					 fileImg:'',
					 ids:'',
					 times:'',
					 textaera:'',
					 isshowas:true,
					 modalVisible: false,
					 modalshow:false,
                     qiandao:false,
		             isfalse:false,
					 longitude:'',
					 latitude:'',
					 statua:false,
					 statu:false,
					 infos:'',
					 loaded: false,
					 imagesshow:false,
					 zoom: 15,
				     center: {
						longitude: 0,
						latitude: 0
					  },
					 marker: {
						latitude: 0,
						longitude: 0,
						title: 'Your location'
					  },
					  trafficEnabled: false,
                      baiduHeatMapEnabled: false,
					  markers: [{
						longitude: 0,
						latitude: 0,
						title: ""
					  }]
					  };
    }
	componentDidFocus(){

	}

	componentDidMount() {
          this.timer = setTimeout(
		  () => {
			  this.setState({maps:true,})
		  this.fetchData('' + data.data.domain + '/index.php?app=Legwork&m=MLegwork&a=isopen&access_token=' + data.data.token + '');
          this.fetchDatatime('' + data.data.domain + '/index.php?app=Car&m=IndexMobile&a=date&access_token=' + data.data.token + '');
		  Geolocation.getCurrentPosition()
				  .then(data => {
					  console.log(data.address)
					  if(data.country == undefined){
						  this.setState({
							  map:'定位失败，请检查网络',
							  statua: true,
							  loaded: true,
						  })
					  }else{
						 this.setState({
						      zoom: 15,
							  map:data.address,
							  longitude:data.longitude,
							  latitude:data.latitude,
							  isfalse:true,
							   marker: {
								latitude: data.latitude,
								longitude: data.longitude,
								title: '你的位置'
							  },
							  center: {
								latitude: data.latitude,
								longitude: data.longitude
							  },
							  markers: [{
								latitude: data.latitude,
								longitude: data.longitude,
								title: "你的位置"
							  }]
						  })
					  }
				  })
				  .catch(e =>{
					this.setState({
							statua: true,
							loaded: true,
						});
					Animated.timing(
						this.state.fadeAnim,
						{
						  toValue: 1,
						  duration: 1000,
						},

					  ).start();
				  })
				},
			  800
			);
	}
	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
      BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}
	 fetchData(url) {
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {
				this.setState({
                    loaded: true,
				});
                if(responseData.Customer==1){
					this.setState({
						isshows: true,
					});
				}else{
					this.setState({
						isshows: false,
					});
				}
                if(responseData.Car==1){
					this.setState({
						isshowas: true,
					});
				}else{
					this.setState({
						isshowas: false,
					});
				}

		  })
		  .catch((error) => {
			this.setState({
			        statua: true,
                    loaded: true,
				});
            Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

		  });
    }


    fetchDatatime(url) {
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {

               this.setState({
                   loaded: true,
			       times:new Date(responseData).getFullYear()+'年'+(new Date(responseData).getMonth()+1)+'月'+new Date(responseData).getDate()+'日',
				});
		  })
		  .catch((error) => {
			this.setState({
			        statua: true,
                    loaded: true,
				});
            Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

		  });
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


	_select(data){

		this.setState({
			names: data.custom_company,
			modalVisible: false,
			name:'',
			type:0,
			ida:data.id,
			isfalses:true,
			});

	}

	_selectc(data){

		this.setState({
			names: data.name,
			modalVisible: false,
			name:'',
			ida:data.id,
            type:2,
			isfalses:false,
			});

	}

    _selects(data){

		this.setState({
			names: data.cname,
			type:1,
			ida:data.id,
			modalVisible: false,
			isfalses:false,
			});

	}

	_selectl(data){

		this.setState({
			name: data.name,
			modalshow: false,
			ids: data.id,
			});

	}

	_xz(visible){
		 this.setState({modalVisible: visible});
	}
	_lxr(visible){
		 this.setState({modalshow: visible});
	}
	_qiandao(visible){
         if(this.state.map == '正在定位中...'){
			 ToastAndroid.show('定位信息不能为空！！！', ToastAndroid.SHORT)
			 return false;
		 }else if(this.state.names == ''){
			 ToastAndroid.show('客户名称不能为空！！！', ToastAndroid.SHORT)
			 return false;
		 }else{
			 this.setState({qiandao: visible});
		 }
	}

	selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {

      }
      else if (response.error) {

      }
      else if (response.customButton) {

      }
      else {
        var source;

        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
		      imguri:response.uri,
          avatarSource: source,
		  fileImg:response,
		  imagesshow:true,
        });
      }
    });
  }

	_delete(){
		this.setState({
          avatarSource: '',
          imguri:'',
		  imagesshow:false,
        });
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


    _Tij(){

		var that=this;
		let formData = new FormData();
		if(this.state.imguri == ''){
			file = '';
		}else{
			file = {uri: this.state.imguri, type: 'multipart/form-data', name: 'a.jpg'};
		}

	    formData.append("img",file);
        formData.append("gsy_id",this.state.ida);
		formData.append("contacts_id",this.state.ids);
		formData.append("address",this.state.map);
		formData.append("lng",this.state.longitude);
		formData.append("lat",this.state.latitude);
		formData.append("mark",this.state.textaera);
		formData.append("type",this.state.type);
        if(file == ''){
			ToastAndroid.show('请上传图片附件', ToastAndroid.SHORT);
			return false;
		}else{
		fetch('' + data.data.domain + '/index.php?app=Legwork&m=MLegwork&a=add_legwork&access_token=' + data.data.token + '', {
			  method: 'POST',
			  headers: {
				'Content-Type':'multipart/form-data',
			  },
			  body:formData,
			})
			.then(function (response) {
				return response.json();
			})
			.then(function (result) {

				that.setState({
					qiandao:false,
					avatarSource:'',
					textaera:'',
					infos:'提交成功',
					statu:true,
					imguri:'',
					});
				that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)
			})
			.catch((error) => {
				that.setState({
					qiandao:true,
					infos:'提交失败',
					statu:true,
					});
				that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)
			});
		}
	}
    componentWillUnmount() {
	  this.timerx && clearTimeout(this.timerx);
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}
	_shuax(){
		this.setState({
			loaded: false,
            statua: false,
            map: '正在定位中...',
		});
		this.fetchData('' + data.data.domain + '/index.php?app=Legwork&m=MLegwork&a=isopen&access_token=' + data.data.token + '');
        this.fetchDatatime('' + data.data.domain + '/index.php?app=Car&m=IndexMobile&a=date&access_token=' + data.data.token + '');
		Geolocation.getCurrentPosition()
				  .then(data => {

					  if(data.country == undefined){
						  this.setState({
							  map:'定位失败，请检查网络',
							  statua: true,
							  loaded: true,
						  })
					  }else{
						 this.setState({
						      zoom: 15,
							  map:data.address,
							  longitude:data.longitude,
							  latitude:data.latitude,
							  isfalse:true,
							   marker: {
								latitude: data.latitude,
								longitude: data.longitude,
								title: '你的位置'
							  },
							  center: {
								latitude: data.latitude,
								longitude: data.longitude
							  },
							  markers: [{
								latitude: data.latitude,
								longitude: data.longitude,
								title: "你的位置"
							  }]
						  })
					  }
				  })
				  .catch(e =>{

				  })

	}

	_TJ(){
		const { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'YTj',
                component: YTj,
            })
			})
        }
	}


render() {
    return (
	    <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',overflow:'hidden'}}>

                <View style={styles.card}>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity onPress={this._pressButton.bind(this)}>
								  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
								        <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,marginLeft:-5,}}>返回</Text>
								  </View>
							</TouchableOpacity>
				  </View>
				  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>外勤签到</Text>

				  </View>
				  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>
				        <TouchableOpacity onPress={this._TJ.bind(this)}>
				           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff',fontSize:16,marginRight:10,}}>统计</Text>
                        </TouchableOpacity>
				  </View>
				</View>
				<View style={{flex:1,backgroundColor:'#fff'}}>
				    <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
					    <Icon name="ios-time-outline" color="#ccc"size={20}  />
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingLeft:10,color:'#aaa'}}>{this.state.times}</Text>
					</View>
                    <View style={{flexDirection:'row',height:50,alignItems:'center',paddingLeft:10,}}>
					    <Icon name="ios-locate-outline" color="#aaa"size={20}  />
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:15,paddingLeft:8}}>{this.state.map}</Text>
					</View>
                    <View style={{height:150,width: Dimensions.get('window').width,justifyContent: 'center',alignItems: 'center',backgroundColor:'#fff',paddingBottom:30,borderBottomWidth:1,borderColor:'#ececec',}}>
					    {this.state.maps ? <MapView
						  trafficEnabled={this.state.trafficEnabled}
						  baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
						  zoom={this.state.zoom}
						  zoomControlsVisible={false}
						  mapType={this.state.mapType}
						  center={this.state.center}
						  style={styles.map}
						  marker={this.state.marker}
						  markers={this.state.markers}
						  onMapClick={(e) => {

						  }}
						>
						</MapView> : null}
					</View>
                    <View style={{flexDirection:'row',justifyContent: 'space-between',height:60,alignItems:'center',paddingLeft:10,paddingRight:10,}}>
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,width:70,}}>客户名称</Text>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{flex:1,paddingLeft:30,fontSize:15,}}>{this.state.names}</Text>
						<TouchableOpacity   activeOpacity={0.6} onPress={this._xz.bind(this,true)}>
							<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
							   <Image source={require('./imgs/xz.png')} style={{width: 26, height: 26}} />
							   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:13,}}>选择</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{height:5,backgroundColor:'#ececec'}}></View>
					{this.state.isfalses ? <View style={{flexDirection:'row',justifyContent: 'space-between',height:60,alignItems:'center',paddingLeft:10,paddingRight:10,borderTopWidth:1,borderColor:'#ececec'}}>
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,width:70,}}>联系人</Text>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{flex:1,paddingLeft:30,fontSize:15,}}>{this.state.name}</Text>
						<TouchableOpacity   activeOpacity={0.6} onPress={this._lxr.bind(this,true)}>
							<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
							   <Image source={require('./imgs/xz.png')} style={{width: 26, height: 26}} />
							   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:13,}}>选择</Text>
							</View>
						</TouchableOpacity>
					</View> : <View></View>}
                    <View style={{flex:1,flexDirection:'column', backgroundColor:'#ececec',alignItems:'center',justifyContent:'center',}}>
					    <View style={{alignItems:'center',justifyContent:'center',marginBottom:10, marginTop:10,}}>
						  <TouchableOpacity   activeOpacity={0.6} onPress={this._qiandao.bind(this,true)}>
							<View style={{width:120,height:120,borderRadius:60,backgroundColor:'#cdcdcd',alignItems:'center',justifyContent:'center',}}>
							  <View style={{width:110,height:110,borderRadius:55,backgroundColor:'#4385f4',alignItems:'center',justifyContent:'center',}}>
								  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff',fontSize:20,}}>签到</Text>
							  </View>
						   </View>
						  </TouchableOpacity>
				        </View>
					</View>
                    <View>
					   <Modal
						  animationType={"slide"}
						  transparent={false}
						  visible={this.state.modalVisible}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
						  >
						  <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
						     <View style={styles.card1}>
								  <View style={{flex:1,justifyContent:'center'}}>
										<TouchableOpacity onPress={this._xz.bind(this,false)}>
											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingLeft:10,}}>取消</Text>
											  </View>
										</TouchableOpacity>
								  </View>
								  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

											  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>选择客户</Text>

								  </View>
								  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

								  </View>
								</View>
								<ScrollableTabView
								  style={{flex:1,flexDirection:'column',backgroundColor:'#ededed',}}
								  renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
								  tabBarPosition='overlayTop'
								  tabBarInactiveTextColor ='#333'
								  tabBarActiveTextColor ='#4385f4'
								  tabBarUnderlineStyle={{backgroundColor: '#4385f4'}}
								  tabBarTextStyle={{fontSize: 16}} 
								>
									{this.state.isshows ? <View  style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='客户'>
										 <Scustomera  _select={this._select.bind(this)}/>
									</View> : null}
									{this.state.isshows ? <View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='线索客户'>
										 <Scustomerb  _selects={this._selects.bind(this)}/>
									  </View> : null}
								    {this.state.isshowas ? <View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='汽车客户'>
									     <Scustomerc _selectc={this._selectc.bind(this)}/>
								      </View> : null}
								</ScrollableTabView>
						  </View>
              <PassState navigator = {this.props.navigator} {...this.props}/>
					   </Modal>
					</View>
                    <View>
					   <Modal
					      animationType={"slide"}
						  transparent={false}
						  visible={this.state.modalshow}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
					   >
					      <View style={styles.card1}>
							  <View style={{flex:1,justifyContent:'center'}}>
									<TouchableOpacity onPress={this._lxr.bind(this,false)}>
										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
												<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingLeft:10,}}>取消</Text>
										  </View>
									</TouchableOpacity>
							  </View>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>联系人</Text>

							  </View>
							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

							  </View>
							</View>
							<View style={{flex:1,}}>
							     <Scustomerd id={this.state.ida} _selectl={this._selectl.bind(this)} />
							</View>
              <PassState navigator = {this.props.navigator} {...this.props}/>
					   </Modal>
					</View>
                    <View>
					   <Modal
					      animationType={"slide"}
						  transparent={false}
						  visible={this.state.qiandao}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
					   >
					      <View style={styles.card1}>
							  <View style={{flex:1,justifyContent:'center'}}>
									<TouchableOpacity onPress={this._qiandao.bind(this,false)}>
										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
												<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingLeft:10,}}>取消</Text>
										  </View>
									</TouchableOpacity>
							  </View>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>签到</Text>

							  </View>
							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

							  </View>
						  </View>
						  <View  style={{flex:1,}}>
						      <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
									<Icon name="ios-time-outline" color="#999"size={20}  />
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingLeft:10,}}>签到时间:</Text>
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingLeft:10,}}>{this.state.times}</Text>
							  </View>
							  <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'flex-start',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
									<Icon name="ios-locate-outline" color="#aaa"size={20}  />
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingLeft:10,}}>签到地点:</Text>
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingLeft:10,flex:1,paddingRight:5,}}>{this.state.map}</Text>
							  </View>
                              <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
									<Icon name="ios-contact-outline" color="#999"size={20}  />
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingLeft:10,}}>客户名称:</Text>
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingLeft:10,}}>{this.state.names}</Text>
							  </View>
                              {this.state.isfalses ? <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
									<Icon name="ios-contact" color="#999"size={20}  />
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingLeft:10,}}>联系人:</Text>
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingLeft:10,}}>{this.state.name}</Text>
							  </View> : <View></View>}
							  <View style={{height:15,backgroundColor:'#ececec'}}></View>
							  <View style={{padding:10,}}>
							        <TextInput
									  onChangeText={(textaera) => this.setState({textaera})}
									  multiline={true}
									  numberOfLines={5}
									  placeholderTextColor={'#ccc'}
									  style={{ color:'#666',fontSize:16,textAlignVertical:'top',}}
									  placeholder='请填写备注'
									  underlineColorAndroid={'transparent'}
									/>
							  </View>
							  <View style={{padding:10,flexDirection:'row',alignItems:'center',}}>
							      {this.state.imagesshow ? <View style={{height:85,alignItems:'center',justifyContent:'center',}}>
								     <Image source={this.state.avatarSource} style={{width: 70, height: 70,marginRight:15,}} />
									 <TouchableOpacity onPress={this._delete.bind(this)} style={{position:'absolute',right:8,top:0,}}>
										 <View style={{width:18,height:18,borderRadius:9,backgroundColor:'red',justifyContent:'center',alignItems:'center',}}>
											<Icon name="ios-close-outline" color="#fff"size={20}  />
										 </View>
									 </TouchableOpacity>
								  </View> : null}
							      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
							        <Image source={require('./imgs/photo.png')} style={{width: 70, height: 70,}} />
								  </TouchableOpacity>
							  </View>
							  <View style={{flex:1,backgroundColor:'#ececec'}}></View>
							  <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(67, 133, 244, 0.3)')} onPress={this._Tij.bind(this)}  delayPressIn={0} >
								<View style={{height:55,backgroundColor:'#fff',width:Dimensions.get('window').width,alignItems:'center',justifyContent:'center'}}>
									 <View>
										 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#4385f4'}}>
											 提交
										 </Text>
									 </View>
								</View>
							   </TouchableNativeFeedback>
						  </View>
              <PassState navigator = {this.props.navigator} {...this.props}/>
					   </Modal>
                    </View>

				</View>
				{this.state.statu ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				  <Icon name="ios-close-outline" color="#fff"size={36}  />
				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>{this.state.infos}</Text>
	            </Animated.View> : null}
				{!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',height:80,position:'absolute',top:(Dimensions.get('window').height-80)/2,left:(Dimensions.get('window').width-100)/2,}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
						</View>
				  </View> : <View></View>}
				{this.state.statua ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击重试。</Text>
                 </TouchableOpacity>
	           </Animated.View> : <View></View>}
        <PassState navigator = {this.props.navigator} {...this.props}/>
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
	flexDirection:'row',

  },
  card1: {
    height:45,
	backgroundColor:'#4385f4',
	flexDirection:'row',

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
  map: {
	paddingLeft:10,
	paddingRight:10,
    width: Dimensions.get('window').width-20,
    height: 150,
	backgroundColor:'#ffffff',
  }
});
