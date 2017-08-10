import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	AppState,
	ActivityIndicator,
	Animated,
	StatusBar,
	Dimensions,
	ScrollView,
	InteractionManager,
	BackHandler,
	Image
} from 'react-native';
import Communications from 'react-native-communications';
import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';
import Icon from 'react-native-vector-icons/Ionicons';
import Token from './Token';
import CalendarTj from './CalendarTj';
import Bcard from './Bcard';
import PassState from './PassState';
import TJ from './TJ';

import DeviceInfo from 'react-native-device-info';

export default class ContactInfo extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {map: '正在定位中...',datas:{},data:{},longitude:'',latitude:'',backgroundColor:'#4385f4',times:[],time:'',day:'',weekday:['日','一','二','三','四','五','六'],clock:'',datatime:'',nowas:0,nows:0,nowa:0,fadeAnim: new Animated.Value(0),statu:'',isfalse:false,add:false,fadeAnims: new Animated.Value(0),loaded: false,statua:false,appState:AppState.currentState,};
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
	  AppState.addEventListener('change', this._handleAppStateChange.bind(this));
	  this.timer = setTimeout(
		  () => { this.fetchData('' + data.data.domain + '/index.php?app=Kaoqin&m=KaoqinReportApi&a=get_my_set&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
          this.fetchDatas();
	      this.location();

	    },800);
	 this.Times=setInterval(() => {
				       this.setState({
						   nowa:this.state.nowa+1000,
						   nows:new Date(this.state.nowa+1),
					   })
				}, 1000);
	}


	_handleAppStateChange(appState){
	  	this.setState({appState});
	  	if(this.state.appState == 'active'){
	  		this.fetchData('' + data.data.domain + '/index.php?app=Kaoqin&m=KaoqinReportApi&a=get_my_set&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
	          this.fetchDatas();
		      this.location();
	  	}
	  }

	location(){

		Geolocation.getCurrentPosition()
              .then(data => {

				  if(data.country == undefined){
					  this.setState({
						  map:'定位失败，请检查网络',
						  statua: true,
			              loaded: true,
					  })
                      Animated.timing(
						this.state.fadeAnims,
						{
						  toValue: 1,
						  duration: 1000,
						},

					  ).start();

				  }else{
					 this.setState({
						  map:data.address,
						  longitude:data.longitude,
						  latitude:data.latitude,
						  isfalse:true,
					  })
				  }
              })
              .catch(e =>{

              })

	}

	componentWillUnmount() {
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	  clearInterval(this.Times);
	  this.timer && clearTimeout(this.timer);
	  this.timerx && clearTimeout(this.timerx);
	}

	fetchData(url) {
		var that=this;
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {
			   this.setState({
				   loaded:true,
				   datas:responseData.data,
				   datatime:responseData.time,
                   time:responseData.time.slice(0,10),
                   day:	'星期'+this.state.weekday[new Date(responseData.time.slice(0,10)).getDay()],
                   clock:responseData.time.slice(10,19),
                   nowa:parseInt(new Date(responseData.time.split("-").join("/")).getTime()),

				})




		  })
		  .catch((error) => {
			this.setState({
			        statua: true,
                    loaded: true,
				});
            Animated.timing(
				this.state.fadeAnims,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

		  });
    }

	fetchDatas(){
		 fetch('' + data.data.domain + '/index.php?app=Kaoqin&m=KaoqinApi&a=get_kaoqin_status&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {
					 this.setState({
						 times:responseData.data.infos,
						 loaded:true,
					 })
		  })
		 .catch((error) => {
			this.setState({
			        statua: true,
                    loaded: true,
				});
            Animated.timing(
				this.state.fadeAnims,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

		  });

	}


		kaoqing(){

			fetch('' + data.data.domain + '/index.php?app=Kaoqin&m=KaoqinApi&a=daKa&uid='+data.data.uid+'&cid='+data.data.cid+'&address='+this.state.map+'&longitude='+this.state.longitude+'&latitude='+this.state.latitude+'&phone_type='+DeviceInfo.getBrand()+'&access_token=' + data.data.token + '')
			  .then((response) => response.json())
			  .then((responseData) => {

						  this.setState({
								 statu:responseData.data.infos,
							})
						  this.location();
						  this.fetchDatas();
						  this.timerx = setTimeout(() => {
							  this.setState({
								 statu:'',
						  });
						  Animated.timing(
							this.state.fadeAnim,
							{
							  toValue: 0,
							  duration: 1000,
							},

						  ).start();
						  },1500)
			  })
			  .catch((error) => {
				   this.setState({
						 statu:'打卡失败',
					})
				   this.timerx = setTimeout(() => {
						   this.setState({
									 statu:'',
						   });
						   Animated.timing(
							this.state.fadeAnim,
							{
							  toValue: 0,
							  duration: 1000,
							},

						  ).start();
                    },1500)
			  });

		Animated.timing(
            this.state.fadeAnim,
            {
              toValue: 1,
              duration: 1000,
            },

          ).start();


	}
	Gdate(n){
		if(n<10){
			 return '0'+n;
		}
		 else{
		     return ''+n;
		}
	}

	_add(){
		this.setState({add:!this.state.add,})
	}

	_adds(){
		this.setState({add:false,})
	}

	_Tj(){
		this.setState({add:false,});
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'CalendarTj',
                component: CalendarTj,
            })
			})
        }
	}

	_BK(){
		this.setState({add:false,});
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Bcard',
                component: Bcard,
            })
			})
        }
	}

	_shuax(){
		this.setState({
			statua: false,
			loaded: false,
            map: '正在定位中...',
		});
		this.fetchData('' + data.data.domain + '/index.php?app=Kaoqin&m=KaoqinReportApi&a=get_my_set&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
        this.fetchDatas();
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
						  map:data.address,
						  longitude:data.longitude,
						  latitude:data.latitude,
						  isfalse:true,
					  })
				  }
              })
              .catch(e =>{

              })
	}

    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>

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

										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>考勤打卡</Text>

				  </View>
				  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>
				    <TouchableOpacity onPress={this._add.bind(this)}>
				      <View style={{paddingRight:15,}}>
							<Icon name="ios-more" color="#fff"size={32}  />
					  </View>
                    </TouchableOpacity>
				  </View>
				</View>

				<View style={{flexDirection:'column',backgroundColor:'#ececec',borderBottomWidth:1,borderColor:'#ececec',}}>
				    <View style={{flexDirection:'row',backgroundColor:'#4385f4',height:100,justifyContent:'space-between',alignItems:'center',paddingLeft:15,paddingRight:15,}}>
					   <View style={{flexDirection:'column',}}>
					      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff',fontSize:22}}>{this.state.day}</Text>
						  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff',fontSize:18,marginTop:5,}}>{this.state.time}</Text>
					   </View>
					   <View style={{alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/rc.png')} style={{width: 50, height: 50,}} />
					   </View>
					</View>
					<View style={{flexDirection:'row',height:50,alignItems:'center',paddingLeft:15,backgroundColor:'#fff',}}>
					   <Icon name="ios-locate-outline" color="#4385f4"size={28}  />
					   <View style={{flex:1,marginLeft:15,}}>
					      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:15,}}>{this.state.map}</Text>
					   </View>
					</View>
				</View>
				<ScrollView style={{flex:1,backgroundColor:'#fff',}}>

					{this.state.times.map((data,i) => {
						return <View key={i} style={{flexDirection:'row',justifyContent:'space-around',height:70,alignItems:'center',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ececec',}}>
					    <View style={{flexDirection:'column',flex:1,alignItems:'center',}}>
						   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:15,}}>第{data.order}次打卡</Text>

						</View>
						<View style={{flexDirection:'column',flex:1,alignItems:'center',}}>
						   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,}}>{data.qd_time}</Text>
						</View>
					</View>
					})}


				</ScrollView>
				{this.state.isfalse ? <View style={{alignItems:'center',justifyContent:'center',marginBottom:10,backgroundColor:'#fff',marginTop:10,}}>
				  <TouchableHighlight
								 underlayColor="#5889db"
								 onPress={this.kaoqing.bind(this)}
								 style={{width:100,height:100,borderRadius:50,alignItems:'center',justifyContent:'center',}}
                                >

				   <View style={{width:100,height:100,borderRadius:50,backgroundColor:'#cdcdcd',alignItems:'center',justifyContent:'center',}}>
				      <View style={{width:90,height:90,borderRadius:50,backgroundColor:'#4385f4',alignItems:'center',justifyContent:'center',}}>
					      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff',fontSize:20,}}>打卡</Text>
						  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff',marginTop:5,}}>{this.Gdate(new Date(this.state.nowa).getHours())}:{this.Gdate(new Date(this.state.nowa).getMinutes())}:{this.Gdate(parseInt(this.state.nowa/1000%60))}</Text>
					  </View>
				   </View>
				   </TouchableHighlight>
				</View> : <View></View>}
				{this.state.statu.length>0 ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				  <Icon name="ios-close-outline" color="#fff"size={36}  />
				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>{this.state.statu}</Text>
	           </Animated.View> : null}
			   {this.state.add ? <TouchableOpacity onPress={this._adds.bind(this)}  style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-45,position:'absolute',top:45,left:0,}}><View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-45,backgroundColor:'rgba(61, 61, 62, 0)',position:'absolute',top:0,left:0,}}></View></TouchableOpacity> : <View></View>}
			   {this.state.add ? <View style={{position:'absolute',top:65,right:5,flexDirection:'column',width:120,height:100,}}>
				   <View style={{width:120,height:90,backgroundColor:'#fff',borderRadius:5,flexDirection:'column',alignItems:'center',marginTop:10,}}>
				     <TouchableOpacity  onPress={this._Tj.bind(this)}>
					   <View style={{borderBottomWidth:1,borderColor:'#ccc',width:120,alignItems:'center',height:45,flexDirection:'row',paddingLeft:10,}}>
						  <Icon name="ios-pie-outline" color="#4385f4"size={22}  />
						  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:15,fontSize:16,}}>统计</Text>
					   </View>
					 </TouchableOpacity>
                     <TouchableOpacity onPress={this._BK.bind(this)}>
					   <View style={{width:120,alignItems:'center',height:45,flexDirection:'row',paddingLeft:10,}}>
					      <Icon name="ios-person-outline" color="#4385f4"size={30}  />
						  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:15,fontSize:16,}}>补卡</Text>
					   </View>
					 </TouchableOpacity>
				   </View>
				   <View style={{position:'absolute',top:-9,right:13}}><Icon name="md-arrow-dropup" color="#fff"size={30}  /></View>
			   </View> : <View></View>}

			   {!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',height:80,position:'absolute',top:(Dimensions.get('window').height-80)/2,left:(Dimensions.get('window').width-100)/2,}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
						</View>
				  </View> : <View></View>}
				{this.state.statua ? <Animated.View style={{opacity: this.state.fadeAnims,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击重试。</Text>
                 </TouchableOpacity>
	           </Animated.View> : <View></View>}
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
});
