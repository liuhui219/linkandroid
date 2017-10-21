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
  Switch,
	RefreshControl,
  AsyncStorage,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Password from './password';
import Passwords from './passwords';
import PassState from '../PassState';
import CancerPassword from './CancerPassword';
import Storage from 'react-native-storage';
var array = [];
var aa=[];
var statusSwitch = null;

export default class qus extends React.Component {

    constructor(props) {
        super(props);
		    this._pressButton = this._pressButton.bind(this);
			BackHandler.addEventListener('hardwareBackPress', this._pressButton);
    		this.state = {
            falseSwitchIsOn:false,
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
    componentDidMount() {

    }
	
	componentWillUnmount() { 
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}

    componentWillMount(){
      storage.load({
        key: 'password',
        autoSync: true,
        syncInBackground: true
        }).then(ret => {
            statusSwitch=ret.statusSwitch;
            this.setState({falseSwitchIsOn:statusSwitch})
        }).catch(err => {
            statusSwitch=false;
            this.setState({falseSwitchIsOn:statusSwitch})
        })
    }

    changs(value){
      var that = this;
      var { navigator } = this.props;
      this.setState({falseSwitchIsOn:value});
      if(value == true){
            if(navigator) {
                this.props.navigator.push({
                    name: 'Password',
                    component: Password,
                    params: {
                      getUser: function(user) {
          							if(user == true){
          								that.setState({falseSwitchIsOn:false});
          							}else{
                          that.setState({falseSwitchIsOn:true});
                        }
          	           }
                    }

                })
            }
      }else if(value == false){
        this.props.navigator.push({
            name: 'CancerPassword',
            component: CancerPassword,
            params: {
              getUser: function(user) {
                if(user == true){
                  that.setState({falseSwitchIsOn:false});
                }else{
                  that.setState({falseSwitchIsOn:true});
                }
               }
            }

        })
      }
    }

    gg(){
      var { navigator } = this.props;
          if(navigator) {
              this.props.navigator.push({
                  name: 'Passwords',
                  component: Passwords,
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
      												<Image source={require('../imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
      												<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
      										  </View>
      									</TouchableOpacity>
      						  </View>
      						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
      												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>账号与安全</Text>
      									</View>
      						  </View>
      						  <View style={{flex:1,justifyContent:'center'}}>

      						  </View>
      					</View>

      					<View style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:15,paddingRight:15,height:50,marginTop:15}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16}}>开启密码锁屏</Text>
                       <Switch
                         onValueChange={(value) => this.changs.bind(this,value)()}
                         onTintColor={'#4385f4'}
                         value={this.state.falseSwitchIsOn} />
                   </View>

                   {this.state.falseSwitchIsOn ? <TouchableOpacity onPress={this.gg.bind(this)} activeOpacity = {0.8} style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'center',justifyContent:'space-between',paddingLeft:15,paddingRight:15,height:50,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16}}>
                          更改密码
                      </Text>
                      <Icon name="ios-arrow-forward" color="#999"size={27}  />
                   </TouchableOpacity> : null}
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
    height:65,
    paddingTop:20,
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
