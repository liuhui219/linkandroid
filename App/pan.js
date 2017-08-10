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
	ToastAndroid,
	BackHandler,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import panainfo from './panainfo';
import panainfoa from './panainfoa';
import PassState from './PassState';
import panainfob from './panainfob';
import panainfoc from './panainfoc';
var array = [];
var aa=[];
export default class pan extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackHandler.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
          isshows:false,
	  };
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

    componentWillMount(){
        this.power();
    }

    componentDidMount() {

    }


	componentWillUnmount() {

	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}


 power(){
   var that = this;
   fetch('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=app_accessor&uid='+data.data.uid+'&access_token=' + data.data.token + '', {
         method: 'GET',
         headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         }
       })
       .then(function (response) {
                   return response.json();
       })
       .then(function (result) {
          console.log(result);
          if(result.access == 1){
             that.setState({isshows:true,})
          }else{
             that.setState({isshows:false,})
          }
       })
       .catch((error) => {


       });
 }

	_self(){
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'panainfo',
                component: panainfo
            })
			})
        }
	}

	_shares(){
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'panainfoa',
                component: panainfoa,
                params: {
						titles: '共享网盘',
						url: '/index.php?app=Wangpan&m=MobileApi&a=share_lists',
					}
            })
			})
        }
	}

	_company(){
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'panainfob',
                component: panainfob,
                params: {
						titles: '公司网盘',
						url: '/index.php?app=Wangpan&m=MobileApi&a=company_lists',
					}
            })
			})
        }
	}

  _Appaccessory(){
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'panainfoc',
                component: panainfoc,
                params: {
						titles: '应用附件',
						url: '/index.php?app=Wangpan&m=MobileApi&a=Appaccessory',
					}
            })
			})
        }
	}

    render() {
           return (
                <View style={{flex:1,flexDirection:'column',}}>
		           <View style={styles.card}>
						  <View style={{flex:1,justifyContent:'center'}}>
									 <TouchableOpacity onPress={this._pressButton.bind(this)}>
										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
												<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
												<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
										  </View>
									</TouchableOpacity>
						  </View>
						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>网盘</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>

						  </View>
					</View>

					<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
					   <View style={{backgroundColor:'#fff',}}>
					     <TouchableHighlight onPress={this._self.bind(this)} underlayColor="#d6d6d6">
							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,borderBottomWidth:1,borderColor:'#ddd',}}>
								<View style={{width: 35, height: 35,backgroundColor:'#3ea7da',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/pan_r.png')} style={{width: 20, height: 20,}} />
								</View>
								<View style={{flex:1,marginLeft:15,height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
								   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:16}}>个人网盘</Text>
								   <Image source={require('./imgs/right.png')} style={{width: 20, height: 18,}} />
								</View>
							 </View>
						 </TouchableHighlight>
						 <TouchableHighlight onPress={this._shares.bind(this)} underlayColor="#d6d6d6">
							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,borderBottomWidth:1,borderColor:'#ddd',}}>
								<View style={{width: 35, height: 35,backgroundColor:'#5fc7e0',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/pan_f.png')} style={{width: 20, height: 20,}} />
								</View>
								<View style={{flex:1,marginLeft:15,height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
								   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:16}}>共享网盘</Text>
								   <Image source={require('./imgs/right.png')} style={{width: 20, height: 18,}} />
								</View>
							 </View>
						 </TouchableHighlight>
						 <TouchableHighlight onPress={this._company.bind(this)} underlayColor="#d6d6d6">
							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,borderBottomWidth:1,borderColor:'#ddd',}}>
								<View style={{width: 35, height: 35,backgroundColor:'#5fd9e0',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/pan_g.png')} style={{width: 20, height: 20,}} />
								</View>
								<View style={{flex:1,marginLeft:15,height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
								   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:16}}>公司网盘</Text>
								   <Image source={require('./imgs/right.png')} style={{width: 20, height: 18,}} />
								</View>
							 </View>
						 </TouchableHighlight>
						 {this.state.isshows ? <TouchableHighlight  onPress={this._Appaccessory.bind(this)} underlayColor="#d6d6d6">
							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,borderBottomWidth:1,borderColor:'#ddd',}}>
								<View style={{width: 35, height: 35,backgroundColor:'#5fe0d5',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/yun.png')} style={{width: 26, height: 26,}} />
								</View>
								<View style={{flex:1,marginLeft:15,height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
								   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:16}}>应用附件</Text>
								   <Image source={require('./imgs/right.png')} style={{width: 20, height: 18,}} />
								</View>
							 </View>
						 </TouchableHighlight> : null}
					  </View>
					</View>
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
