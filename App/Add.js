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
  KeyboardAvoidingView,
	Animated,
	Dimensions,
	BackHandler,
	StatusBar,
	Image
} from 'react-native';
import PassState from './PassState';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker';
import Token from './Token';
import Netinfo from './Netinfo';

var dataImpor = [];


export default class Add extends Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {
			result: '请选择(必填)',
			results:'',
           	result1: '请选择(必填)',
			results1:'',
			language:'请选择(必填)',
			richeng:'请选择(必填)',
			youxian:'请选择(必填)',
			selectedValue:'一般',
			pickerData:['1'],
			text:'',
			textaera:'',
            datas:{},
			yxid:0,
			rc:0,
			times:0,
			statu:false,
			fadeAnim: new Animated.Value(0),
			domain:'',
		    cid:'',
		    token:'',
		    uid:'',
		};
    }

	componentDidMount() {
	    this.setState({
		  domain:data.data.domain,
		  cid:data.data.cid,
		  token:data.data.token,
		  uid:data.data.uid,
		})
		this.timer = setTimeout(() => {this.fetchData();},800);
	  }

	fetchData() {
		fetch('' + data.data.domain + '/index.php?app=Calendar2&m=CalendarApi&a=Calendar_category&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {

			   this.setState({
					   datas:responseData,
					   statu:true,
				   })
			   responseData.cate.forEach((data ,i)=>{
				   key = {data}
				   dataImpor.push(responseData.cate[i].important)


				    this.setState({
					   pickerData:dataImpor,

				   })
			   })



		  })
		  .catch((error) => {

			this.setState({
					statu:true,
				});
				Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

			  this.timerx = setTimeout(() => {
							  this.setState({
								 statu:false,
							})
						  },1500)
		  });
    }
	componentWillUnmount() {
	  this.timerx && clearTimeout(this.timerx);
	  this.timer && clearTimeout(this.timer);
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}
    _pressButton() {
		dataImpor = [];
        var { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }
    _datetime(){
		let self=this;
		let today=new Date();
		let theMinDate= new Date();
		let theMaxDate= new Date(2050,1,1);
		let theHour = new Date().getHours();
		let theMinute = new Date().getMinutes();
		let is24Hour = true;
		let options = {
			hour:theHour,
			minute:theMinute,
			is24Hour:is24Hour,
		};
		let option = {
			date:today,
			minDate:theMinDate,
			maxDate:theMaxDate,
		};
		DatePickerAndroid.open(option).then(
		  result => {
			  if(result.action === DatePickerAndroid.dismissedAction){


			  }else{
				   self.setState(
				    {results:this.Gdate(result.year)+'-'+this.Gdate((result.month + 1))+'-'+this.Gdate(result.day),}
				  );
				  TimePickerAndroid.open(options).then(
				    result => {
						if(result.action !== TimePickerAndroid.timeSetAction){

						}
						else{
							self.setState(
								{result:this.state.results+' '+this.Gdate(result.hour)+':'+this.Gdate(result.minute),}
							  );
						}
					}
				  )
			  }
		  }
		)
	}
	_datetime1(){
		let self=this;
		let today=new Date();
		let theMinDate= new Date();
		let theMaxDate= new Date(2050,1,1);
		let theHour = new Date().getHours();
		let theMinute = new Date().getMinutes();
		let is24Hour = true;
		let options = {
			hour:theHour,
			minute:theMinute,
			is24Hour:is24Hour,
		};
		let option = {
			date:today,
			minDate:theMinDate,
			maxDate:theMaxDate,
		};
		DatePickerAndroid.open(option).then(
		  result => {
			  if(result.action === DatePickerAndroid.dismissedAction){


			  }else{
				   self.setState(
				    {results1:this.Gdate(result.year)+'-'+this.Gdate((result.month + 1))+'-'+this.Gdate(result.day),}
				  );
				  TimePickerAndroid.open(options).then(
				    result => {
						if(result.action !== TimePickerAndroid.timeSetAction){

						}
						else{
							self.setState(
								{result1:this.state.results1+' '+this.Gdate(result.hour)+':'+this.Gdate(result.minute),}
							  );
						}
					}
				  )
			  }
		  }
		)
	}
	Gdate(n){
		if(n<10){
			 return '0'+n;
		}
		 else{
		     return ''+n;
		}
	}

	_onPressHandle(){
		Picker.init({
            pickerData: ['不提醒','10分钟','30分钟','一小时','六小时','一天'],
			pickerTitleText: '选择',
			pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            onPickerConfirm: pickedValue => {
                this.setState({language:pickedValue})
							if(pickedValue == '不提醒'){
								this.setState({times:0})
							}else if(pickedValue == '10分钟'){
								this.setState({times:10})
							}else if(pickedValue == '30分钟'){
								this.setState({times:30})
							}else if(pickedValue == '一小时'){
								this.setState({times:60})
							}else if(pickedValue == '六小时'){
								this.setState({times:360})
							}else if(pickedValue == '一天'){
								this.setState({times:1440})
							}
            },
            onPickerCancel: pickedValue => {

            },
            onPickerSelect: pickedValue => {


            }
        });
        Picker.show();

	}

	_onPressHandles(){
		Picker.init({
            pickerData: ['个人日程','工作日程','工作计划'],
			pickerTitleText: '选择',
			pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            onPickerConfirm: pickedValue => {
                this.setState({richeng:pickedValue})
							if(pickedValue == '个人日程'){
								this.setState({rc:0})
							}else if(pickedValue == '工作日程'){
								this.setState({rc:1})
							}else if(pickedValue == '工作计划'){
								this.setState({rc:2})
							}
            },
            onPickerCancel: pickedValue => {

            },
            onPickerSelect: pickedValue => {

            }
        });
        Picker.show();

	}

	_onPressHandlea(){
		Picker.init({
            pickerData: this.state.pickerData,
			pickerTitleText: '选择',
			pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            onPickerConfirm: pickedValue => {
                this.setState({youxian:pickedValue})
							this.state.datas.cate.forEach((m,i) => {
								if(m.important == pickedValue){
									this.setState({yxid:m.id})
								}
							})
            },
            onPickerCancel: pickedValue => {

            },
            onPickerSelect: pickedValue => {


            }
        });
        Picker.show();

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

	trim(str)
	   {
		 return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
	   }
    _tijiao(){
		var that = this
		if(this.trim(this.state.text) == ''){
			ToastAndroid.show('日程名称不能为空！！！', ToastAndroid.SHORT)
			return false;
		}else if(this.state.result == '请选择(必填)'){
			ToastAndroid.show('开始时间未选！！！', ToastAndroid.SHORT)
			return false;
		}else if(this.state.result1 == '请选择(必填)'){
			ToastAndroid.show('结束时间未选！！！', ToastAndroid.SHORT)
			return false;
		}else if(this.state.richeng == '请选择(必填)'){
			ToastAndroid.show('日程类型未选！！！', ToastAndroid.SHORT)
			return false;
		}else if(this.state.youxian == '请选择(必填)'){
			ToastAndroid.show('优先等级未选！！！', ToastAndroid.SHORT)
			return false;
		}else if(this.state.language == '请选择(必填)'){
			ToastAndroid.show('提前通知未选！！！', ToastAndroid.SHORT)
			return false;
		}else if(this.trim(this.state.textaera) == ''){
			ToastAndroid.show('日程内容不能为空！！！', ToastAndroid.SHORT)
			return false;
		}else if((new Date(this.state.result.replace(/-/g,"\/"))) >= (new Date(this.state.result1.replace(/-/g,"\/")))){
			ToastAndroid.show('开始时间不能大于结束时间！！！', ToastAndroid.SHORT)
			return false;
		}else{
			fetch('' + this.state.domain + '/index.php?app=Calendar2&m=CalendarApi&a=Calendar_add&access_token=' + this.state.token + '', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			  },
			  body: this.toQueryString({
				'title': this.state.text,
				'content': this.state.textaera,
                'type': this.state.rc,
                'important': this.state.yxid,
                'startime': this.state.result,
                'endtime': this.state.result1,
                'tixintime': this.state.times,
			  })
			})
			.then(function (response) {
				return response.json();
			})
			.then(function (result) {

				if(result.statu == 1){
					ToastAndroid.show('提交成功', ToastAndroid.SHORT)
					dataImpor = [];
					var { navigator } = that.props;
					if(that.props.getUser) {
						let user = true;
						that.props.getUser(user);
					}

					if(navigator) {
						//很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
						navigator.pop();

					}
				}
			})
      .catch((error) => {
        console.log(error);
      })
		}

	}

    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',}}>

                <View style={[styles.card,{backgroundColor:this.props.bgColor || '#4385f4'}]}>
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
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>新增日程</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity>
								  <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>

								  </View>
							</TouchableOpacity>
				  </View>
				</View>
				<Netinfo  {...this.props}/>
        <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
				<ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec'}} >

				    <View style={{flexDirection:'row',height:45,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#666',}}>日程名称</Text>
						<View style={{flex:1,marginLeft:15,justifyContent:'flex-start',height:45,}}>
					    <TextInput
						  numberOfLines={1}
						  onChangeText={(text) => this.setState({text})}
						  placeholderTextColor={'#999'}
						  style={{ color:'#666',fontSize:14,height:55 }}
						  placeholder='日程名称(必填)'
						  underlineColorAndroid={'transparent'}
						/>
						</View>
					</View>

                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#666',}}>开始时间</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._datetime.bind(this)}
								 style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
									{this.state.result}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#666',}}>结束时间</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._datetime1.bind(this)}
								 style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
									{this.state.result1}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>

					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#666',}}>日程类型</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._onPressHandles.bind(this)}
								 style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
									{this.state.richeng}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#666',}}>优先等级</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._onPressHandlea.bind(this)}
								 style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
									{this.state.youxian}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#666',}}>提前通知</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._onPressHandle.bind(this)}
								 style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
									{this.state.language}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>

					 <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#666', paddingTop:5,}}>日程内容</Text>
						<View style={{flex:1,marginLeft:15,}}>
					    <TextInput
						  onChangeText={(textaera) => this.setState({textaera})}
						  multiline={true}
						  numberOfLines={5}
						  placeholderTextColor={'#999'}
						  style={{ color:'#666',fontSize:14,textAlignVertical:'top',paddingTop:7,}}
						  placeholder='日程内容(必填)'
						  underlineColorAndroid={'transparent'}
						/>
						</View>
					</View>

					<TouchableOpacity activeOpacity={0.8} onPress={this._tijiao.bind(this)}   style={{marginTop:30,backgroundColor:this.props.bgColor || '#4385f4',marginLeft:20,marginRight:20,height:50,alignItems:'center',justifyContent:'center',borderRadius:5,}}>
					     <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff',fontSize:16,}}>提交</Text>
					</TouchableOpacity>

					</ScrollView>
         </KeyboardAvoidingView>


				{this.state.statu ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				  <Icon name="ios-close-outline" color="#fff"size={36}  />
				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请重新加载。</Text>
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
