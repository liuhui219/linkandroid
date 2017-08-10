import React from 'react';
import {
  View,
	StyleSheet,
  Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
  Modal,
  TextInput,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
  KeyboardAvoidingView,
  Keyboard,
	Dimensions,
  DatePickerAndroid,
	TimePickerAndroid,
	ToastAndroid,
	BackHandler,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker';
import PassState from './PassState';
import SelectPoeple from './SelectPoeple';
import ZC from './ZC';
var array = [];
var aa=[];
export default class SQoffice extends React.Component {

    constructor(props) {
        super(props);
		    this._pressButton = this._pressButton.bind(this);
			  BackHandler.addEventListener('hardwareBackPress', this._pressButton);
    		this.state = {
          ckname:'请选择',
          shows:false,
          result: '请选择(必填)',
          result1: '请选择(必填)',
          results:'',
          results1:'',
          textaera:'',
          textaerax:'',
          text:'',
          modalpoeple:false,
          poepleName:'请选择审核人',
          domain:'',
          uid:'',
          cid:'',
          token:'',
          id:'',
          shDatas:[],
          shNames:[],
          shUID:'',
          showsx:true,
          statua:false,
          modal:false,
          nums:null,
          ZCID:null,
    	  };
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
			      return true;
        }
		        return false;
    }
    componentDidMount() {
        this.setState({domain:data.data.domain,uid:data.data.uid,cid:data.data.cid,token:data.data.token,})
        this.timer = setTimeout(() => {this.GetSh();},800);
    }

    _shuax(){
      this.setState({showsx:true,statua:false,})
      this.GetSh();
    }

    GetSh(){
      var that = this;
      aa = [];
      fetch('' + this.state.domain + '/index.php?app=Account&m=ExpenseApi&a=select_auditlist&apps=Account&ms=Expense&as=auditqx&access_token=' + this.state.token + '', {
       method: 'POST',
       headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: this.toQueryString({
          'apps':'Kaoqin',
          'ms':'Jilu',
          'as':'person_shenh'
       })
     })
     .then(function (response) {
       return response.json();
     })
     .then(function (result) {
       result.forEach((data,i)=>{
         aa.push(data.name);
         that.setState({shNames:aa});
       })
      that.setState({shDatas:result,showsx:false,});
     })
     .catch((error) => {
       console.log(error);
       this.setState({showsx:false,statua:true,})
     })
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

	componentWillUnmount() {
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
    this.timer && clearTimeout(this.timer);
	}






   _selectZC(){
     this.setState({
       modal:true,
     })
   }

   _cancer(){
     this.setState({
       modal:false,
     })
   }

   _selectxm(data){
    this.setState({
      ckname:data.names,
      modal:false,
      nums:data.num,
      ZCID:data.id,
    })
   }

    _selectPeople(){
      var that = this;
      this.setState({shows:true});
      Picker.init({
        pickerData: this.state.shNames,
        pickerTitleText: '选择',
        pickerToolBarFontSize: 16,
              pickerFontSize: 16,
              pickerFontColor: [0, 0 ,0, 1],
              onPickerConfirm: pickedValue => {
                  this.setState({poepleName:pickedValue,shows:false});
                  that.state.shDatas.forEach((data,i)=>{
                    if(pickedValue == data.name){
                      that.setState({shUID:data.uid});
                    }
                  })
              },
              onPickerCancel: pickedValue => {
                   that.setState({shows:false});
              },
              onPickerSelect: pickedValue => {

              }
          });
          Picker.show();
    }

    _select(data){
  		this.setState({
        poepledata:data,
  			modalpoeple: false,
  		});

  	}

    _lmodalpoeple(visible){
  		 this.setState({modalpoeple: visible,});
  	}

    trim(str) {
  		 return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
  	}
    _submit(){
      Keyboard.dismiss();
      var that = this;
      if(this.state.ckname == '请选择'){
  			ToastAndroid.show('选择资产名称', ToastAndroid.SHORT)
  			return false;
  		}else if(this.trim(this.state.text) == ''){
  			ToastAndroid.show('输入申请数量', ToastAndroid.SHORT)
  			return false;
  		}else if(Number(this.trim(this.state.text)) > Number(this.state.nums)){
        ToastAndroid.show('申请数量不能大于库存数', ToastAndroid.SHORT)
  			return false;
      }else if(this.state.poepleName == '请选择审核人'){
        ToastAndroid.show('请选择审核人', ToastAndroid.SHORT)
  			return false;
      }else{
		that.setState({showsx:true,})   
        fetch('' + this.state.domain + '/index.php?app=Asset&m=AssetApi&a=consumable_apply&access_token=' + this.state.token + '', {
         method: 'POST',
         headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: this.toQueryString({
              'id': this.state.ZCID,
              'num': this.state.text,
              'apply_people': this.state.shUID,
              'remark':this.state.textaera,
              'uid':this.state.uid
         })
       })
       .then(function (response) {
         return response.json();
       })
       .then(function (result) {
         if(result.status == 1){
           ToastAndroid.show(result.info, ToastAndroid.SHORT);
		   that.setState({showsx:false,}) 
           that._pressButton();
         }else{
           ToastAndroid.show(result.info, ToastAndroid.SHORT);
		   that.setState({showsx:false,}) 
         }
        console.log(result);

       })
       .catch((error) => {
         console.log(error);
         ToastAndroid.show('提交失败', ToastAndroid.SHORT);
		 that.setState({showsx:false,}) 
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
    												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>办公用品申请</Text>
    									</View>
    						  </View>
    						  <View style={{flex:1,justifyContent:'center'}}>
                    <TouchableOpacity onPress={this._submit.bind(this)}>
                       <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
                         <Text style={{color:'white',fontSize:16,marginRight:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>提交</Text>
                       </View>
                   </TouchableOpacity>
    						  </View>
					    </View>
              <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
    					<ScrollView style={{flexDirection:'column',backgroundColor:'#ececec',flex:1}}>
                <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                       资产名称
                   </Text>
                   <TouchableOpacity activeOpacity={0.8} onPress={this._selectZC.bind(this)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                     <View style={{flex:1,}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                           {this.state.ckname}
                         </Text>
                     </View>
                     <Icon name="ios-arrow-forward" color="#999"size={27}  />
                   </TouchableOpacity>
                </View>

                <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>申请数量</Text>
                  <View style={{flex:1,}}>
                    <TextInput
                    underlineColorAndroid = 'transparent'
                    placeholder = '输入申请数量'
                    keyboardType = 'numeric'
                    placeholderTextColor = {'#ccc'}
                    onChangeText={(text) => this.setState({text})}
                    style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                  </View>
                </View>
                <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                       审核人
                   </Text>
                   <TouchableOpacity activeOpacity={0.8} onPress={this._selectPeople.bind(this)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                     <View style={{flex:1,}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                           {this.state.poepleName}
                         </Text>
                     </View>
                     <Icon name="ios-arrow-forward" color="#999"size={27}  />
                   </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
                   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333', paddingTop:5,}}>备注</Text>
                   <View style={{flex:1,marginLeft:15,}}>
                     <TextInput
                       onChangeText={(textaera) => this.setState({textaera})}
                       multiline={true}
                       numberOfLines={5}
                       placeholderTextColor={'#ccc'}
                       style={{ color:'#666',fontSize:14,textAlignVertical:'top',paddingTop:5,}}
                       placeholder='备注'
                       underlineColorAndroid={'transparent'}
                     />
                   </View>
               </View>

    					</ScrollView>
              </KeyboardAvoidingView>
              <Modal
                 animationType={"slide"}
                 transparent={false}
                 visible={this.state.modal}
                 onRequestClose={() => {console.log("Modal has been closed.")}}
                >
                 <View style={styles.card1}>
                 <View style={{flex:1,justifyContent:'center'}}>
                   <TouchableOpacity onPress={this._cancer.bind(this,false)}>
                       <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingLeft:10,}}>取消</Text>
                       </View>
                   </TouchableOpacity>
                 </View>
                 <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>资源列表</Text>
                 </View>
                 <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

                 </View>
               </View>
               <View style={{flex:1,}}>
                   <ZC  _selectxm={this._selectxm.bind(this)}/>
               </View>
               <PassState navigator = {this.props.navigator} {...this.props}/>
              </Modal>

              {this.state.shows ? <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(107, 107, 107, 0.43)',position:'absolute',top:0,left:0}}></View> : null}
              {this.state.showsx ? <View style={{justifyContent: 'center',alignItems: 'center', height:Dimensions.get('window').height-50,width:Dimensions.get('window').width,overflow:'hidden',position:'absolute',top:0,left:0}}>
                <View style={styles.loading}>
                        <ActivityIndicator color="#fff"/>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
                    </View>
              </View> : null}
              {this.state.statua ? <View style={{padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
      				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
      				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
      				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击重试。</Text>
                       </TouchableOpacity>
      	           </View> : <View></View>}
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
  card1: {
    height:45,
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
