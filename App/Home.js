import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	StatusBar,
	Dimensions,
	ScrollView,
	ToastAndroid,
	RefreshControl,
	Linking,
	BackHandler,
	DeviceEventEmitter,
	InteractionManager,
	Image
} from 'react-native';
import Calendar from './Calendar';
import News from './News';
import Netinfo from './Netinfo';
import Approval from './Approval';
import Operation from './Operation';
import RNFS from 'react-native-fs';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import Personal from './Personal';
import DeviceInfo from 'react-native-device-info';
export default class Home extends React.Component {

	constructor(props) {
        super(props);
		this.state = {
		  statust:false,
		  id: '',
		  output:'',
		  uid:'',
		  datas:[],
		  imgs:[],
		  loaded: false,
		  isLoadMore:false,
		  p:1,
		  data:'',
		  data_a:'',
		  data_b:'',
		  isReach:false,
		  isRefreshing:false,
		  isNull:0,
		  isNull_a:0,
		  isNull_b:0,
		  NUMTOTAL:0,
      bgc:'#4385f4',
	  };
    }

	componentDidMount() {
           console.log(data)
	       this.fetchData('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
           this.fetchData_a('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
           this.fetchData_b('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
           this.fetchUpdate('http://www.linksame.com/phone/update.php');

    }


	componentWillReceiveProps(nextProps) { 
		if(nextProps.bgCount == 0 && nextProps.xxCount == 0 && nextProps.ywCount == 0){
			return false;
		}else if(nextProps.bgCount != undefined && nextProps.xxCount == undefined && nextProps.ywCount == undefined){ 
			this.setState({
			  isNull_a:nextProps.bgCount,
			  data_a:nextProps.Contents,
			})

		}else if(nextProps.bgCount == undefined && nextProps.xxCount != undefined && nextProps.ywCount == undefined){
			this.setState({
			  isNull: nextProps.xxCount,
			  data:nextProps.Contents,
			})

		}else if(nextProps.bgCount == undefined && nextProps.xxCount == undefined && nextProps.ywCount != undefined){
			this.setState({
			  isNull_b: nextProps.ywCount,
			  data_b:nextProps.Contents,
			})

		}else{  
			this.setState({
			  isNull_b: nextProps.ywCount,
			  isNull_a: nextProps.bgCount,
			  isNull: nextProps.xxCount,
			})

		}

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

	fetchUpdate(url){
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {
               if(responseData.cache == DeviceInfo.getVersion()){
				   this.setState({statust:false,})
			   }else{
				   this.setState({statust:true,})
			   }
		  })
		  .catch((error) => {

		  });
	}



	fetchData(url) {
		var that=this;

		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'type': 1,
					'status': -1,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
				   that.props.totalnums.bind(that,result.count,true)();
					  that.setState({
						   isNull:result.count,
						   isRefreshing:false,
                           data:null,
					  })


                      if(result.count>0){
						that.setState({
						   data:result.data[result.data.length-1].content,
						   isRefreshing:false,
					    })
					  }
				})
				.catch((error) => {
							that.setState({
								   isRefreshing:false,
							   })
							   ToastAndroid.show('加载失败，请下拉刷新', ToastAndroid.SHORT);
						  });
	}

	fetchData_a(url) {
		var that=this;
		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'type': 3,
					'status': 0,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {

					  that.setState({
						   isNull_a:result.count,
						   data_a:null,
						   isRefreshing:false,
					  })

			          that.props.totalnums_a.bind(that,result.count,true)();
                      if(result.count>0){
						that.setState({
						   data_a:result.data[0].content,
						   isRefreshing:false,
					    })
					  }
				})
	}

	fetchData_b(url) {
		var that=this;
		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'type': 2,
					'status': 0,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {

					  that.setState({
						   isNull_b:result.count,
						   data_b:null,
						   isRefreshing:false,
					  })

			          that.props.totalnums_b.bind(that,result.count,true)();
                      if(result.count>0){
						that.setState({
						   data_b:result.data[0].content,
						   isRefreshing:false,
					    })
					  }
				})
	}


	_pressButton() {
        var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Calendar',
                component: Calendar,
            })
			})
        }
    }

	_newButton(){
		let _this = this;
		var { navigator } = this.props;
        if(navigator) {

            navigator.push({
                name: 'News',
                component: News,
			    // params: {
                    // getUser: function(user) {
                        // _this.setState({
                            // user: user
                        // })
						// if(user == true){
							// _this.fetchData('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');;
						// }

                    // }
                // }
            })

        }
	}

	_AppButton(){
		let _this = this;
		var { navigator } = this.props;
        if(navigator) {

            navigator.push({
                name: 'Approval',
                component: Approval,
				// params: {
                    // getUser: function(user) {
						// if(user == true){
							// _this.fetchData_a('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
						// }

                    // }
                // }
            })

        }
	}

	_OperationButton(){
		let _this = this;
		var { navigator } = this.props;
        if(navigator) {

            navigator.push({
                name: 'Operation',
                component: Operation,
				// params: {
                    // getUser: function(user) {
						// if(user == true){
							// _this.fetchData_b('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
						// }

                    // }
                // }
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

	render() {
        return (
		  <View style={{flex:1}}>

		   <View style={styles.card}>
			  <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
				<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
							<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>{data.data.companyName}</Text>
				</View>
			  </View>
			</View>
			<Netinfo  {...this.props}/>
		   <ScrollView style={{flex:1,flexDirection:'column',}}
		     refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this) }
                colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
				progressBackgroundColor="#ffffff"
                />
            }
		   >
					   <View  style={{flex:1,flexDirection:'row',alignItems:'center', backgroundColor:'#fff',}}>
					       <TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._newButton.bind(this)}

								 style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#000', }}>
						     <View style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,}}>
							   <View style={{width: 50, height: 50,borderRadius:25,backgroundColor:'#1ADA9A',alignItems:'center', justifyContent:'center'}}>
						           <Image source={require('./imgs/xiaox.png')} style={{width: 30, height: 30,}} />
							   </View>
							   <View style={{marginLeft:10,flex:1,flexDirection:'row',borderBottomWidth:1, borderColor:'#ececec', height: 70,paddingTop:2,paddingBottom:10, }}>
								   <View style={{flex:1,flexDirection:'column', height: 70,paddingTop:8,paddingBottom:10, }}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{ fontSize:18,color:'#666'}}>消息</Text>
									  {this.state.data ? <Text allowFontScaling={false} adjustsFontSizeToFit={false} numberOfLines={1} style={{ fontSize:13,paddingTop:6,flex:1,overflow:'hidden',color:'#999'}}>{this.state.data}</Text> : <Text style={{color:'#ccc'}}></Text>}
								   </View>
								   <View style={{width:50,height:50,alignItems:'center',justifyContent:'center'}}>
									 <View style={{backgroundColor:'#F53B5C',borderRadius:18,}}>
										 {this.state.isNull>0 ? <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#ffffff',paddingTop:1,paddingBottom:1,paddingLeft:6,paddingRight:6,fontSize:12,}}>{this.state.isNull}</Text> : <Text></Text>}
									 </View>
								   </View>
							   </View>
							 </View>
						   </TouchableOpacity>

					   </View>
					   <View  style={{flex:1,flexDirection:'row',alignItems:'center', backgroundColor:'#fff',}}>
					       <TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._AppButton.bind(this)}
								 style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#000', }}>
						     <View style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,}}>
						        <View style={{width: 50, height: 50,borderRadius:25,backgroundColor:'#35DCEF',alignItems:'center', justifyContent:'center'}}>
						           <Image source={require('./imgs/sp.png')} style={{width: 30, height: 30,}} />
							   </View>
                                 <View style={{marginLeft:10,flex:1,flexDirection:'row',borderBottomWidth:1, borderColor:'#ececec', height: 70,paddingTop:2,paddingBottom:10, }}>
								   <View style={{flex:1,flexDirection:'column', height: 70,paddingTop:8,paddingBottom:10, }}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{ fontSize:18,color:'#666'}}>办公审批</Text>
									  {this.state.data_a ? <Text numberOfLines={1} allowFontScaling={false} adjustsFontSizeToFit={false} style={{ fontSize:13,paddingTop:6,flex:1,overflow:'hidden',color:'#999'}}>{this.state.data_a}</Text> : <Text style={{color:'#ccc'}}></Text>}
								   </View>
								   <View style={{width:50,height:50,alignItems:'center',justifyContent:'center'}}>
									 <View style={{backgroundColor:'#F53B5C',borderRadius:18,}}>
									  {this.state.isNull_a>0 ? <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#ffffff',paddingTop:1,paddingBottom:1,paddingLeft:6,paddingRight:6,fontSize:12,}}>{this.state.isNull_a}</Text> : <Text></Text>}
									 </View>
								   </View>
							   </View>

							 </View>
						   </TouchableOpacity>
					   </View>
					   <View  style={{flex:1,flexDirection:'row',alignItems:'center', backgroundColor:'#fff',}}>
					       <TouchableOpacity
						          activeOpacity={0.8}
                                  onPress={this._OperationButton.bind(this)}

								 style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#000', }}>
						     <View style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,}}>
						       <View style={{width: 50, height: 50,borderRadius:25,backgroundColor:'#718DC1',alignItems:'center', justifyContent:'center'}}>
						           <Image source={require('./imgs/sp1.png')} style={{width: 30, height: 30,}} />
							   </View>
							   <View style={{marginLeft:10,flex:1,flexDirection:'row',borderBottomWidth:1, borderColor:'#ececec', height: 70,paddingTop:2,paddingBottom:10, }}>
								   <View style={{flex:1,flexDirection:'column', height: 70,paddingTop:8,paddingBottom:10, }}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{ fontSize:18,color:'#666'}}>业务审批</Text>
									  {this.state.data_b ? <Text allowFontScaling={false} adjustsFontSizeToFit={false} numberOfLines={1} style={{ fontSize:13,paddingTop:6,flex:1,overflow:'hidden',color:'#999'}}>{this.state.data_b}</Text> : <Text style={{color:'#ccc'}}></Text>}
								   </View>
								   <View style={{width:50,height:50,alignItems:'center',justifyContent:'center'}}>
									 <View style={{backgroundColor:'#F53B5C',borderRadius:18,}}>
									  {this.state.isNull_b>0 ? <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#ffffff',paddingTop:1,paddingBottom:1,paddingLeft:6,paddingRight:6,fontSize:12,}}>{this.state.isNull_b}</Text> : <Text></Text>}
									 </View>
								   </View>
							   </View>
							 </View>
						   </TouchableOpacity>
					   </View>
					   <View  style={{flex:1,flexDirection:'row',alignItems:'center', backgroundColor:'#fff',}}>
					       <TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._pressButton.bind(this)}

								 style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#000', }}>
						     <View style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,}}>
						       <View style={{width: 50, height: 50,borderRadius:25,backgroundColor:'#978BC3',alignItems:'center', justifyContent:'center'}}>
						           <Image source={require('./imgs/rc.png')} style={{width: 30, height: 30,}} />
							   </View>
							  <View style={{marginLeft:10,flex:1,flexDirection:'column',borderBottomWidth:1, borderColor:'#ececec', height: 70,paddingTop:10,paddingBottom:10, }}>
							      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{ fontSize:18,color:'#666'}}>日程</Text>
								  <Text style={{ fontSize:13,paddingTop:6,}}> </Text>
							   </View>
							 </View>
						   </TouchableOpacity>
					   </View>


					</ScrollView>
                       {this.state.statust ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.51)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:150,top:(Dimensions.get('window').height-180)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>
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
			 </View></View> : null}</View>
		)
	}

	_onRefresh() {
		 this.setState({
			   isRefreshing:true,
		  })

		   this.fetchData('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
           this.fetchData_a('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
           this.fetchData_b('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');

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
