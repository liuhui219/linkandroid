/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  AppState,
  Alert,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Image,
  BackHandler,
  AsyncStorage,
  View
} from 'react-native';
import PassState from '../PassState';
import Icon from 'react-native-vector-icons/Ionicons';
import {Login} from '../Login';
var number = '';
var numbers = '';
var length = 0;
var passwords = null;
var errorLength = 5;
export default class CancerPassword extends Component {

  constructor(props) {
      super(props);
      this._pressButton = this._pressButton.bind(this);
      BackHandler.addEventListener('hardwareBackPress', this._pressButton);
      this.state = {
        lengths:0,
        info:'请输入密码',
        error:false,
        errorinfo:'密码不正确',
        errorLength:null,
      };
  }

  componentDidMount(){
    number = '';
    numbers = '';
    length = 0;
    errorLength = 5;
  }

  componentWillMount(){
    storage.load({
      key: 'password',
      autoSync: true,
      syncInBackground: true
      }).then(ret => {
          statusSwitch=ret.statusSwitch;
          passwords=ret.passwords;
          this.setState({passwords:passwords})
      }).catch(err => {
          statusSwitch=false;
      })
  }
  
  componentWillUnmount(){ 
	BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
  }

  _pressButton() {
      var that = this;
      const { navigator } = this.props;
      if(navigator) {
          navigator.pop();
		  
          if(that.props.getUser) {
			  let user = false;
			  that.props.getUser(user);
		  }
		  return true;
      }
	  return false;
  }



  aa(num){
    var that = this;
    length++ ;
    if(this.state.info == '请输入密码'){
      number += num;
      if(length == 4){
        if(Number(this.state.passwords) == Number(number)){
          this.setState({error:false,})
          errorLength = 5;
          storage.remove({
            key: 'password'
          });
          const { navigator } = this.props;
          if(navigator) {
              navigator.pop();
              if(that.props.getUser) {
    							let user = true;
    							that.props.getUser(user);
    						}
          }
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
    }

    this.setState({lengths:length,})
  }
  _delete(){
    length-- ;
    if(this.state.info == '请输入密码'){
      number = number.slice(0,-1);
      if(length <= 0){
        number = '';
        length = 0;
      }
    }

    this.setState({lengths:length,})

  }

  _cancer(){
    const {navigator} = this.props;
				navigator.resetTo({
  			  component: Login,
  			  name: 'Login'
	      });
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

  render() {
    return (
      <View style={{flex:1,alignItems:'center',backgroundColor:'#5d9dd7',flexDirection:'column'}}>
        <View style={{height:65,paddingTop:20,flexDirection:'row'}}>
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
                       <Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>关闭密码</Text>
                 </View>
             </View>
             <View style={{flex:1,justifyContent:'center'}}>

             </View>
         </View>
        <View style={{flexDirection:'column',flex:1,justifyContent:'space-around',alignItems:'center'}}>
        <View style={{marginTop:30,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.info}</Text>
        </View>
        <View style={{width:Dimensions.get('window').width,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
            {this._States()}
        </View>
        {this.state.error ? <View style={{width:Dimensions.get('window').width,flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
            <Text style={{color:'#fff'}} allowFontScaling={false} adjustsFontSizeToFit={false}>密码不正确，{this.state.errorLength}次后重试需重新登录</Text>
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
                 <Text style={styles.fonts}>0</Text>
              </View>
             </TouchableHighlight>
             <TouchableHighlight onPress={this._delete.bind(this)} activeOpacity = {0.8} underlayColor="rgba(209, 218, 233, 0.29)" style={{width:70,height:70,borderRadius:35}}>
               <View style={{width:70,height:70,justifyContent:'center',alignItems:'center'}}>
                  <Icon name="ios-backspace-outline" color="#ececec"size={40}  />
               </View>
              </TouchableHighlight>
            </View>
        </View>
       </View>
       <PassState navigator = {this.props.navigator} {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  fonts:{
    fontSize:28,
    color:'#fff',
  }
});
