import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
	BackHandler,
	Animated,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';


import PassState from './PassState';
import Icon from 'react-native-vector-icons/Ionicons';
var DataA=[];
export default class KqTj extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackHandler.addEventListener('hardwareBackPress', this._pressButton);

		this.state = {
		  domain:'',
		  cid:'',
		  token:'',
		  id: '',
		  uid:'',
		  datas:[],
		  dataxs:[],
		  imgs:[],
		  loaded: false,
		  statu:false,
		  fadeAnim: new Animated.Value(0),
		  color:'#fff',
	  };
    }

    _pressButton() {
        var { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }

    componentDidMount() {
		DataA=[];
		this.setState({
		  domain:data.data.domain,
		  cid:data.data.cid,
		  token:data.data.token,
		  uid:data.data.uid,
		})

		this.timer = setTimeout(
		  () => {  this.fetchData(''+ data.data.domain +'/index.php?app=Home&m=MobileUserApps&a=getApps&cid='+data.data.cid+'&uid='+data.data.uid+'&access_token=' + data.data.token + '&type=web');},
		  800
		);
    }

	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}

	fetchData(url) {
		var that=this;
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {

         	DataA=responseData.data;


			    this.setState({



				});
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

					  var array_color=[];
					  responseData.data.forEach((data,i)=>{
					  	array_color.push('#4385f4');
              that.setState({color:array_color,})
					  	if(result.data.length>0){
					  	  result.data.forEach((info,j)=>{
					  	     if(data.key == info.key){
					  	     	responseData.data[i].isshow = true;
					  	     }
					  	     if(i == responseData.data.length-1 && j == result.data.length-1){
					  	     	that.setState({
									 datas: responseData.data,
									 loaded: true,
								     statu: false,
								})
					  	     }
					      })
					  	}else{
					  		that.setState({
									 datas: responseData.data,
									 loaded: true,
								     statu: false,
								})
					  	}
					  })



				})
				.catch((error) => {
					that.setState({
						   loaded: true,
						   statu:true,
					   })


				  });
		  })
		  .catch((error) => {

			this.setState({
			        statu: true,
                    loaded: true,
				});

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

	_addApp(data){

		var that=this;

		fetch('' + this.state.domain + '/index.php?app=Home&m=MobileUserApps&a=add&access_token=' + this.state.token + '', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'cid': this.state.cid,
					'uid':this.state.uid,
					'appkey': data.key,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {

                      var { navigator } = that.props;
					  if(that.props.getUser) {
						let user = true;
						that.props.getUser(user);
					  }
					  if(navigator) {
						navigator.pop();
					  }
				})
				.catch((error) => {
					that.setState({

						   loaded: true,
						   sx:true,
						   isReach:true,


					   })

				  });

	}

    _shuax(){
		this.setState({
			statu: false,
			loaded: false,
		});
		 this.fetchData(''+ data.data.domain +'/index.php?app=Home&m=MobileUserApps&a=getApps&cid='+data.data.cid+'&uid='+data.data.uid+'&access_token=' + data.data.token + '&type=web');
	}

	onShowUnderlay(i){
		var colors=this.state.color;
		colors[i]="#FFF"
		this.setState({color:colors})
	}

	onHideUnderlay(i){
		var colors=this.state.color;
		colors[i]="#4385f4"
		this.setState({color:colors})
	}


    render() {
    return (
	   <View style={{flex:1,flexDirection:'column', backgroundColor:'#ededed'}}>
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
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>添加应用</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
				</View>
				{!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-110,}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
					</View>
				</View> : <View></View>}
				<ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ededed'}}>
				    {this.state.datas.map((data, i) => {
						return <View key={i} style={{flexDirection:'row',alignItems: 'center', borderBottomWidth:1,borderColor:'#ccc',padding:15,justifyContent:'space-between'}}>
							   <View style={{flexDirection:'row',alignItems:'center',flex:1,}}>
									<View style={{justifyContent: 'center',alignItems:'center',width:50,height:50, borderRadius:3,}}>
									   <Image source={{uri: data.appicon}} style={{width: 50, height: 50,borderRadius:3,}} />
									</View>
									<View style={{marginLeft:15,flex:1,}}>
									   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>{data.appname}</Text>
									</View>
							   </View>
							   {data.hasOwnProperty('isshow') ? <View style={{width:70,borderWidth:1,height:35,borderColor:'#ccc',justifyContent: 'center',alignItems:'center',borderRadius:3,}}><Text style={{color:'#ccc'}} allowFontScaling={false} adjustsFontSizeToFit={false}>已添加</Text></View> : <TouchableHighlight underlayColor="#4385f4"  onShowUnderlay = {this.onShowUnderlay.bind(this,i)} onHideUnderlay = {this.onHideUnderlay.bind(this,i)} onPress={this._addApp.bind(this,data)} style={{width:70,borderWidth:1,height:35,borderColor:'#4385f4',justifyContent: 'center',alignItems:'center',borderRadius:3,}}>
									<Text   style={{color:this.state.color[i],}} allowFontScaling={false} adjustsFontSizeToFit={false}>添加</Text>
							   </TouchableHighlight >}
						</View>
					})}

				</ScrollView>
				{this.state.statu ? <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} ><View style={{padding:10,justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-50,width:Dimensions.get('window').width,}}>
				  <Icon name="ios-refresh-outline" color="#ccc"size={60}  />
				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#ccc',}}>点击屏幕，重新刷新</Text>
	           </View></TouchableOpacity>	 : <View></View>}
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
	footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },

    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
