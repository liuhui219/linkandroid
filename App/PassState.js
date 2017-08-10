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
  AppState,
  PushNotificationIOS,
	BackHandler,
	Image,
  Alert,
	RefreshControl,
  AsyncStorage,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import rootReducer from './reducers/index';
import { createStore } from 'redux';
import Storage from 'react-native-storage';
import {Login} from './Login';
var array = [];
var aa=[];
var number = '';
var length = 0;
var errorLength = 5;
var statusSwitch = null;
var passwords = null;

const store = createStore(rootReducer);
export default class PassState extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        lengths:0,
        errorLength:null,
        error:false,
        status:false,
        appState:AppState.currentState,
      };
  }

  componentDidMount() {
   if(this.props.isshow){
    store.subscribe(() =>
      this.setState({
        status:store.getState(),
      })
    );
    number = '';
    length=0;
    this.setState({lengths:0,})
    var that = this;

      storage.load({
        key: 'password',
        autoSync: true,
        syncInBackground: true
        }).then(ret => {
            statusSwitch=ret.statusSwitch;
            passwords=ret.passwords;
            if(statusSwitch == true){

            }
            this.setState({
              status:statusSwitch,
            })
        }).catch(err => {
            statusSwitch=false;
            this.setState({
              status:statusSwitch,
            })
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

  componentWillMount(){
    var that = this;
    AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    store.subscribe(() =>
      this.setState({
        status:store.getState(),
      })
    );
  }

  componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
   }


  _handleAppStateChange(appState){
    store.subscribe(() =>
      this.setState({
        status:store.getState(),
      })
    );
    number = '';
    length=0;
    this.setState({lengths:0,})
    var that = this;
    if(appState == 'active'){


      storage.load({
        key: 'password',
        autoSync: true,
        syncInBackground: true
        }).then(ret => {
            statusSwitch=ret.statusSwitch;
            passwords=ret.passwords;
            if(statusSwitch == true){

            }
            this.setState({
              status:statusSwitch,
            })
        }).catch(err => {
            statusSwitch=false;
            this.setState({
              status:statusSwitch,
            })
        })
    }

    AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
  }

  aa(num){
    number += num;
    length++ ;
    var that = this;
    if(length == 4){
       if(Number(number) == Number(passwords)){
         this.setState({status:false,error:false,});
         store.dispatch({ type: 'ADD_TODO' });
         errorLength = 5;
       }else{
          errorLength--;
          this.setState({error:true,errorLength:errorLength,})
          if(errorLength == 0){
            storage.clearMap();
            storage.remove({
            	key: 'password'
            });
            storage.remove({
            	key: 'loginState'
            });
			storage.remove({
			   key: 'contact'
			});
            const {navigator} = that.props;
                navigator.resetTo({
                  component: Login,
                  name: 'Login'
            });

          }
       }
        length = 0;
        number = '';
    }
    this.setState({lengths:length,})
  }

  _cancer(){
    var that = this;
    storage.clearMap();
    storage.remove({
      key: 'password'
    });
    storage.remove({
      key: 'loginState'
    });
	storage.remove({
	   key: 'contact'
	});
    const {navigator} = that.props;
        navigator.resetTo({
          component: Login,
          name: 'Login'
            });
  }

  _delete(){
    length-- ;
    number = number.slice(0,-1);
    if(length <= 0){
      number = '';
      length = 0;
    }
    this.setState({lengths:length,})
  }

  _States(){
    let arr = [];
    for (var i = 0; i < 4; i++) {
      if(i<this.state.lengths){
        arr.push(
          <View key={i} style={{width:12,height:12,backgroundColor:'#fff',borderRadius:6,marginLeft:10,marginRight:10}} />
        )
      }else{
        arr.push(
          <View key={i} style={{width:12,height:12,borderWidth:1,borderColor:'#fff',borderRadius:6,marginLeft:10,marginRight:10}} />
        )
      }
    }
    return arr;
  }



  relogin(){
    Alert.alert(
      '重新登录，同时关闭锁屏保护',
      '',
      [
        {text:'取消',onPress: ()=>console.log(1)},
        {text:'重新登录',onPress: this._cancer.bind(this)}
      ]
    )
  }



    render() {

           if(this.state.status){
           return (
              <View style={{alignItems:'center',backgroundColor:'#5d9dd7',flexDirection:'column',position:'absolute',top:0,left:0,height:Dimensions.get('window').height,justifyContent:'space-around'}}>
               <View style={{marginTop:50,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{color:'#fff',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>请输入安全锁密码</Text>
               </View>
               <View style={{width:Dimensions.get('window').width,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                   {this._States()}
               </View>
               {this.state.error ? <View style={{width:Dimensions.get('window').width,flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
                   <Text style={{color:'#fff'}} allowFontScaling={false}>密码不正确，{this.state.errorLength}次后重试需重新登录</Text>
               </View> : <View style={{width:Dimensions.get('window').width,flexDirection:'row',alignItems:'center',justifyContent:'center',}}><Text style={{color:'#fff',}} allowFontScaling={false}> </Text></View>}
               <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
                   <View style={{flexDirection:'row',flexWrap:'wrap',width:Dimensions.get('window').width-30,justifyContent:'space-around',paddingTop:5,paddingBottom:5,}}>
                     <TouchableHighlight onPress={this.aa.bind(this,'1')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                      <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                         <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>1</Text>
                      </View>
                     </TouchableHighlight>
                     <TouchableHighlight onPress={this.aa.bind(this,'2')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                     <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>2</Text>
                     </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.aa.bind(this,'3')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                      <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                         <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>3</Text>
                      </View>
                     </TouchableHighlight>
                   </View>
                   <View style={{flexDirection:'row',flexWrap:'wrap',width:Dimensions.get('window').width-30,justifyContent:'space-around',paddingTop:5,paddingBottom:5,}}>
                     <TouchableHighlight onPress={this.aa.bind(this,'4')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                      <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                         <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>4</Text>
                      </View>
                     </TouchableHighlight>
                     <TouchableHighlight onPress={this.aa.bind(this,'5')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                     <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>5</Text>
                     </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.aa.bind(this,'6')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                      <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                         <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>6</Text>
                      </View>
                     </TouchableHighlight>
                   </View>
                   <View style={{flexDirection:'row',flexWrap:'wrap',width:Dimensions.get('window').width-30,justifyContent:'space-around',paddingTop:5,paddingBottom:5,}}>
                     <TouchableHighlight onPress={this.aa.bind(this,'7')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                      <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                         <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>7</Text>
                      </View>
                     </TouchableHighlight>
                     <TouchableHighlight onPress={this.aa.bind(this,'8')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                     <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>8</Text>
                     </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.aa.bind(this,'9')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                      <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                         <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>9</Text>
                      </View>
                     </TouchableHighlight>
                   </View>
                   <View style={{flexDirection:'row',flexWrap:'wrap',width:Dimensions.get('window').width-30,justifyContent:'space-around',paddingTop:5,paddingBottom:5,}}>
                     <TouchableHighlight  style={{width:70,height:70,borderRadius:35}}>
                      <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                         <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}></Text>
                      </View>
                     </TouchableHighlight>
                     <TouchableHighlight onPress={this.aa.bind(this,'0')} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                     <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.fonts} allowFontScaling={false} adjustsFontSizeToFit={false}>0</Text>
                     </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._delete.bind(this)} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
                      <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                         <Icon name="ios-backspace-outline" color="#ececec"size={40}  />
                      </View>
                     </TouchableHighlight>
                   </View>
               </View>

               <View style={{width:Dimensions.get('window').width,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:25,paddingRight:25,}}>
                 <TouchableHighlight   activeOpacity = {0.8} underlayColor="transparent">
                   <View style={{width:100,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{color:'#fff',fontSize:14}}allowFontScaling={false} adjustsFontSizeToFit={false}></Text>
                   </View>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={this.relogin.bind(this)}  activeOpacity = {0.8} underlayColor="transparent">
                   <View style={{width:100,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{color:'#fff',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>忘记密码?</Text>
                   </View>
                </TouchableHighlight>
               </View>

             </View>
           )}
           else{
             return (
             <View></View>
           )
           }


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
    fonts:{
      fontSize:28,
      color:'#fff',
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
