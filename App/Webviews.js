import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
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
	BackHandler,
	Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker'
import Token from './Token';
import PassState from './PassState';
import Netinfo from './Netinfo';
import AndroidWebView from 'react-native-webview-file-upload-android';


var WEBVIEW_REF = 'webview';
export default class Webviews extends Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this.onBackHandler.bind(this));
        this.state = {
			 isfalse:true,
			 isshow:true,
			 isreload:true,
			 url:'',
			 isloading:false,
			 canBack:false,
		};
    }

	componentDidMount() {
		 this.setState({
			url:this.props.url,
		 })

	  }

    onBackHandler(){
        var { navigator } = this.props;
        if (this.state.canBack) {
           this.refs[WEBVIEW_REF].goBack();
		   return true;
        } else {
           if(navigator) {
				navigator.pop();
				return true;
			}
			return false;
        }
	};


	_pressButton() {
       var { navigator } = this.props;
	   if(navigator) {
			navigator.pop();
			return true;
		}
		return false;
    }

	componentWillUnmount() {

	    BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);

	}
	onNavigationStateChange(navState) {
        this.setState({canBack: navState.canGoBack})
		this.refs[WEBVIEW_REF].postMessage(JSON.stringify(data));
		if(navState.url.indexOf("/home")!=-1){
			this.setState({
				isfalse:true,

			})
		}else{
		  this.timer = setTimeout(
            () => {
				this.setState({
					isfalse:false,

				})
			},200);
		}
	 }

	renderLoading(){
		   return(
		        <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-60,width:Dimensions.get('window').width, position:'absolute',top:0,left:0,}}>
					<View style={{justifyContent:'center',position:'absolute',top:0,left:0,height:45,alignItems:'flex-start',width:Dimensions.get('window').width,paddingLeft:10,backgroundColor:'#4385f4'}}>
						 <TouchableOpacity  onPress={this._pressButton.bind(this)}>
							  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',backgroundColor:'transparent'}}>
									<Icon name="ios-arrow-back" color="#fff"size={24}  />
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:17,marginLeft:5,}}>返回</Text>
							  </View>
						</TouchableOpacity>
					 </View>
				     <View style={styles.loading}>
						<ActivityIndicator color="#fff" />
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中...</Text>
					</View>
				</View>

		   )
	}

	renderError(){

		if(this.state.isreload){
		return(
		   <View>

			 <TouchableOpacity activeOpacity={1} onPress={this._shuax.bind(this)}>
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-60,}}>
				    <Icon name="ios-refresh-outline" color="#ccc"size={60}  />
				    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#ccc'}}>点击屏幕，重新加载</Text>
				</View>
			  </TouchableOpacity>
			  <View style={{justifyContent:'center',position:'absolute',top:0,left:0,height:45,alignItems:'flex-start',width:Dimensions.get('window').width,paddingLeft:10,backgroundColor:'#4385f4'}}>
						 <TouchableOpacity  onPress={this._pressButton.bind(this)}>
							  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',backgroundColor:'transparent'}}>
									<Icon name="ios-arrow-back" color="#fff"size={24}  />
									<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:17,marginLeft:5,}}>返回</Text>
							  </View>
						</TouchableOpacity>
					 </View>
          </View>
		   )
		}else{
			return(
			    <View></View>
			)
		}
	}

	_shuax(){

		this.setState({
			isshow: true,
            isfalse: true,
            isloading:true,
		});
        this.refs[WEBVIEW_REF].reload();

	}

	onLoad(){

		this.setState({
				isshow:false,
			})
	}

	onLoadEnd(){

		this.setState({
			url:this.props.url,
			isloading:false,
		});
	}

	onError(){

		this.setState({
			isshow: true,
            isfalse: false,
            isloading:false,
		});
	}

    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
       <View style={{backgroundColor:'#4385f4',height:25,width:Dimensions.get('window').width}}></View>
             <AndroidWebView style={{  flex:1,}}
                  ref={WEBVIEW_REF}
				  source={{uri:this.props.url}}
				  startInLoadingState={true}
				  domStorageEnabled={false}
				  scalesPageToFit={false}
				  onLoad = {this.onLoad.bind(this)}
				  renderLoading={this.renderLoading.bind(this)}
                  onNavigationStateChange={this.onNavigationStateChange.bind(this)}
				  javaScriptEnabled={true}
				  onError={this.onError.bind(this)}
				  renderError={this.renderError.bind(this)}
				  onLoadEnd={this.onLoadEnd.bind(this)}
			  >
			 </AndroidWebView>
             {this.state.isfalse ? <View style={{justifyContent:'center',position:'absolute',top:25,left:0,height:45,alignItems:'flex-start',width:57,paddingLeft:10,}}>
				 <TouchableOpacity  onPress={this._pressButton.bind(this)}>
					  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
							<Icon name="ios-arrow-back" color="#fff"size={24}  />
							<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:17,marginLeft:5,}}>返回</Text>
					  </View>
				</TouchableOpacity>
			 </View> : <View></View>}
			 {this.state.isloading ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-60,width:Dimensions.get('window').width,backgroundColor:'#fff',position:'absolute',top:25,left:0,}}>
				     <View style={styles.loading}>
						<ActivityIndicator color="#999" size="large"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>正在加载...</Text>
					</View>
				</View> : <View></View>}
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
