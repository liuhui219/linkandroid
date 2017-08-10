import React from 'react';
import {
  View,
	StyleSheet,
  Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
  TextInput,
  Clipboard,
  Animated,
  DatePickerAndroid,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
	ToastAndroid,
	BackHandler,
	Image,
  Modal,
	RefreshControl,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import PassState from './PassState';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker';
var array = [];
var aa=[];
var dataImpor=[];
var datakw=[];
var dataImporId=[];
let inputs=[];
var Times=[];
var timed=[];
var flog=false;
var flogs=false;
export default class scanner_info extends React.Component {

    constructor(props) {

        super(props);
		    this._pressButton = this._pressButton.bind(this);
			  BackHandler.addEventListener('hardwareBackPress', this._pressButton);
    		this.state = {
            loading:true,
            status:false,
            Undata:false,
            data:{},
            isshow:false,
            modalshow:false,
            infotitle:'',
            ckDataName:[],
            ckname:'请选择仓库',
            kwname:'请选择库位',
            ckId:[],
            ckDatas:[],
            ids:null,
            isParent:false,
            domain:'',
            token:'',
            kwData:[],
            kwid:null,
            kwDatas:[],
            datetime:'',
            shows:false,
            isshowk:false,
            editData:[],
            timeInfo:'请选择日期',
            TimeData:[],
            Ckshow:true,
            ck_id:'',
            textaera:'',
            ordertype:'',
            id:'',
            isover:false,
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
      this.setState({domain:data.data.domain,token:data.data.token,})
      this.timer = setTimeout(
  		  () => {this.LoadData('' + data.data.domain + '/index.php?app=Invoicimg&m=ProductApi&a=getStronOrderByDimension&dimension='+ this.props.data +'&access_token=' + data.data.token + '');
        },800);
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


    LoadData(url){
      var that = this;
      var total = null;
      fetch(url, {
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
           that.setState({loading:false,})
           if(result.status == 0){  //获取数据失败
             that.setState({Undata:true,isshow:false,isshowk:false,})
           }else{ //获取数据成功
             that.setState({data:result,isshow:true,ordertype:result.order_info.ordertype,id:result.order_info.id})
             if(result.order_status == 1){
               that.setState({infotitle:'入库'})
             }else{
               that.setState({infotitle:'出库'})
             }
             if(result.order_info.ckid_1 == 0){
                 that.setState({Ckshow:true,})
             }else{
                 that.setState({Ckshow:false,ids:result.order_info.ckid_1})
             }
             result.product.forEach((data,i)=>{
               total += Number(data.intoStoreNum);
               if(total == result.order_info.num){
                 that.setState({isshowk:false,isover:true,})
               }else{
                 that.setState({isshowk:true,})
               }
             })
           }

         })
         .catch((error) => {
           console.log(error);
           that.setState({loading:false,status:true,isshow:false,isshowk:false,})
         })
    }

    _Reload(){
        this.setState({loading:true,status:false,});
        this.LoadData('' + data.data.domain + '/index.php?app=Invoicimg&m=ProductApi&a=getStronOrderByDimension&dimension='+ this.props.data +'&access_token=' + data.data.token + '');
    }

  	componentWillUnmount() {
  	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
      this.timer && clearTimeout(this.timer);
  	}

    _rk(){
      dataImpor=[];
      datakw=[];
      inputs=[];
      timed=[];
      flog = true;
      flogs=false;
      this.setState({textaera:'',timeInfo:'请选择日期',editData:this.state.data.product,shows:false,modalshow:true,isParent:false,ckname:'请选择仓库',kwname:'请选择库位',kwid:null,datetime:new Date().getFullYear()+''+(new Date().getMonth()+1)+''+new Date().getDate()+''+new Date().getHours()+''+new Date().getMinutes()+''+new Date().getSeconds()})
      this.LoadCk('' + data.data.domain + '/index.php?app=Invoicimg&m=InstockApi&a=getStrorageList&access_token=' + data.data.token + '')
      this.state.data.product.forEach((data,i)=>{
        timed[i] = '请选择日期';
        this.setState({TimeData:timed});
        inputs[i] = Number(data.num)-Number(data.intoStoreNum);
        return inputs;
      })
    }

    _lxr(){
      this.setState({modalshow:false,isParent:false})
    }

    LoadCk(url){
      var that = this;
      fetch(url, {
           method: 'GET',
           headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           }
         })
         .then(function (response) {
            return response.json();
         })
         .then(function (result) {
           that.setState({ckDatas:result});
           result.forEach((data,i)=>{
             key = {i}
             dataImpor.push(data.storehouse);
             dataImporId.push(data.id)
             that.setState({ckDataName:dataImpor,ckId:dataImporId});
           })

         })
         .catch((error) => {
           console.log(error);
         })
    }

    loadKw(url){
      var that = this;
      fetch(url, {
           method: 'GET',
           headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           }
         })
         .then(function (response) {
            return response.json();
         })
         .then(function (result) {
           that.setState({kwDatas:result});
           result.forEach((data,i)=>{
             datakw.push(data.storehouse)
             that.setState({kwData:datakw,});
           })
         })
         .catch((error) => {
           console.log(error);
         })
    }

    _onPressHandle(){
      dataImpor=[];
      datakw=[];
      var that = this;
      this.setState({shows:true});
      Picker.init({
        pickerData: this.state.ckDataName,
  			pickerTitleText: '选择',
  			pickerToolBarFontSize: 16,
              pickerFontSize: 16,
              pickerFontColor: [0, 0 ,0, 1],
              onPickerConfirm: pickedValue => {
                  this.setState({ckname:pickedValue,kwname:'请选择库位',kwid:null,shows:false})
                  this.state.ckDatas.forEach((data,i)=>{
                     if(data.storehouse == pickedValue){
                       that.setState({ids:data.id})
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




    _proTime(j){
      let self=this;
  		let today=new Date();
  		let theMinDate= new Date(2014,0,1);
  		let theMaxDate= new Date();
      let option = {
  			date:today,
  			minDate:theMinDate,
  			maxDate:theMaxDate,
        mode:'spinner'
  		};
      DatePickerAndroid.open(option).then(
  		  result => {
  			  if(result.action === DatePickerAndroid.dismissedAction){

  			  }else{
               timed[j] = self.Gdate(result.year)+'-'+self.Gdate((result.month + 1))+'-'+self.Gdate(result.day);
               self.setState({TimeData:timed});
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

    changs(text,data,j){
      inputs[j]=text;
      var refName = "input" + j;
      var nums = String(Number(data.num)-Number(data.intoStoreNum));

      if(text>Number(data.num)-Number(data.intoStoreNum)){
           inputs[j] = Number(data.num)-Number(data.intoStoreNum);
           this.refs[refName].setNativeProps({text: nums});
           ToastAndroid.show('不能超过上限', ToastAndroid.SHORT)
           return flogs = false;
      }else if(text<0){
           inputs[j] = 0;
           this.refs[refName].setNativeProps({text: '0'});
           return flogs = false;
      }else if(this.trim(text) == ''){
           ToastAndroid.show('入库数不能为空', ToastAndroid.SHORT)
           return flogs = true;
      }else{
        return flogs = false;
      }
    }

    trim(str)
  	   {
  		 return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
  	   }

   _sub(){

     var that = this;
     var pro = [];
     this.state.data.product.forEach((data,i)=>{
        var obj={};
        obj={proName:data.proName,productdate:timed[i],xinhao:data.xinhao,intonum:inputs[i],intoStoreNum:data.intoStoreNum,id:data.id,num:data.num,pro_id:data.pro_id,unitname:data.unitname,formatname:data.formatname,ispcStatus:data.ispcStatus,xlhstatus:data.xlhstatus};
        pro.push(obj);
        if(timed[i] == '请选择日期'){
          return flog = true;
        }else{
          return flog = false;
        }
     })

     if(this.state.Ckshow && this.state.ckname == '请选择仓库'){
       ToastAndroid.show('请选择仓库', ToastAndroid.SHORT);
       return false;
     }else if(this.trim(this.state.textaera) == ''){
       ToastAndroid.show('请填写备注', ToastAndroid.SHORT);
       return false;
     }else if(flogs){
       ToastAndroid.show('入库数量不能为空', ToastAndroid.SHORT);
       return false;
     }else if(flog){
       ToastAndroid.show('请选择生产日期', ToastAndroid.SHORT);
       return false;
     }else{
       fetch('' + this.state.domain + '/index.php?app=Invoicimg&m=InstockApi&a=inStockOperation&access_token=' + this.state.token + '', {
 			  method: 'POST',
 			  headers: {
 				'Content-Type': 'application/x-www-form-urlencoded',
 			  },
 			  body: this.toQueryString({
     				 'ckid': this.state.ids,
     				 'id': this.state.id,
             'ordertype': this.state.ordertype,
             'mark': this.state.textaera,
             'piciname': this.state.datetime,
             'product': JSON.stringify(pro)
 			  })
 			})
 			.then(function (response) {
 				return response.json();
 			})
 			.then(function (result) {
       console.log(result);
       if(result.status == 1){
         that.setState({modalshow:false});
         that.LoadData('' + data.data.domain + '/index.php?app=Invoicimg&m=ProductApi&a=getStronOrderByDimension&dimension='+ that.props.data +'&access_token=' + data.data.token + '');
         ToastAndroid.show('入库成功', ToastAndroid.SHORT);
       }else{
         ToastAndroid.show('入库失败', ToastAndroid.SHORT);
       }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('入库失败', ToastAndroid.SHORT);
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
          												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>详情</Text>
          									</View>
          						  </View>
          						  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>
                          {this.state.isshowk ? <TouchableOpacity onPress={this._rk.bind(this)}>
                            <View style={{paddingRight:10}}>
                               <Image source={require('./imgs/rk.png')} style={{width: 30, height: 30,marginLeft:5,}} />
                            </View>
                          </TouchableOpacity> : null}
          						  </View>
          					</View>

          					<View style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
                        {this.state.loading ? <View style={styles.loading}>
                           <ActivityIndicator color="white"/>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
                        </View> : null}
                        {this.state.Undata ? <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height,}}>
              				    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>无此订单号</Text>
              				  </View> : null}
                        {this.state.status ? <Animated.View style={{opacity: this.state.fadeAnims,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-170)/2,left:(Dimensions.get('window').width-200)/2,}}>
                				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._Reload.bind(this)} >
                				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
                				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击重试。</Text>
                                 </TouchableOpacity>
                	       </Animated.View> : null}

                         {this.state.isshow ? <ScrollableTabView
                 				    style={{flex:1,flexDirection:'column',backgroundColor:'#f9f9f9',}}
                   				  renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
                   				  tabBarPosition='overlayTop'
                   				  tabBarUnderlineStyle={{backgroundColor: '#4385f4'}}
                   				  tabBarInactiveTextColor ='#333'
                   				  tabBarActiveTextColor ='#4385f4'
                   				  tabBarTextStyle={{fontSize: 16}} 
                   				>
                 				  <View  style={{marginTop:50,flex:1,}} tabLabel='订单信息'>
                              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',marginTop:15,paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15}}>
                                 <Text style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>订单号</Text>
                                 <Text selectable={true} style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.data.order_info['order_num']}</Text>
                              </View>
                              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',marginTop:15,paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15}}>
                                 <Text style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>创建人员</Text>
                                 <Text selectable={true} style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.data.order_info['username']}</Text>
                              </View>
                              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',marginTop:15,paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15}}>
                                 <Text style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>供应商</Text>
                                 <Text selectable={true} style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.data.order_info['gysname']}</Text>
                              </View>
                              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',marginTop:15,paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15}}>
                                 <Text style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>数量</Text>
                                 <Text selectable={true} style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.data.order_info['num']}</Text>
                              </View>
                              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',marginTop:15,paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15}}>
                                 <Text style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>创建时间</Text>
                                 <Text selectable={true} style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.data.order_info['creatTime']}</Text>
                              </View>
                              {this.state.isover ? <View style={{position:'absolute',bottom:20,right:20}}><Image source={require('./imgs/over.png')} style={{width:120, height:120,marginLeft:5,}} /></View> : null}
                 				  </View>
                 				  <View style={{marginTop:50,flex:1}} tabLabel='产品信息'>
                               <View style={{width:Dimensions.get('window').width,flexDirection:'row',backgroundColor:'#fff',paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderColor:'#ddd'}}>
                                  <View style={{flex:1,justifyContent:'center',alignItems:'center',}}><Text style={{color:'#000',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>产品名称</Text></View>
                                  <View style={{flex:1,justifyContent:'center',alignItems:'center',}}><Text style={{color:'#000',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>型号</Text></View>
                                  <View style={{flex:1,justifyContent:'center',alignItems:'center',}}><Text style={{color:'#000',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>入库数</Text></View>
                                  <View style={{flex:1,justifyContent:'center',alignItems:'center',}}><Text style={{color:'#000',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>已入库</Text></View>
                               </View>
                              <ScrollView style={{flex:1}}>
                                  {this.state.data.product.map((Datas,i)=>{
                                     return <View key={i} style={{flex:1,width:Dimensions.get('window').width,flexDirection:'row',backgroundColor:'#fff',paddingTop:15,paddingBottom:15,borderBottomWidth:1,borderColor:'#ddd'}}>
                                               <View style={{flex:1,justifyContent:'center',alignItems:'center',}}><Text selectable={true} style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>{Datas.proName}</Text></View>
                                               <View style={{flex:1,justifyContent:'center',alignItems:'center',}}><Text selectable={true} style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>{Datas.xinhao}</Text></View>
                                               <View style={{flex:1,justifyContent:'center',alignItems:'center',}}><Text selectable={true} style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>{Datas.num}({Datas.unitname})</Text></View>
                                               <View style={{flex:1,justifyContent:'center',alignItems:'center',}}><Text selectable={true} style={{color:'#666',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>{Datas.intoStoreNum}</Text></View>
                                            </View>
                                  })}
                              </ScrollView>

                 				  </View>
                 				</ScrollableTabView> : null}

                        <Modal
                          animationType={"slide"}
                          transparent={false}
                          visible={this.state.modalshow}
                          onRequestClose={() => {console.log("Modal has been closed.")}}
                         >
                          <View style={styles.card1}>
                            <View style={{flex:1,justifyContent:'center'}}>
                              <TouchableOpacity onPress={this._lxr.bind(this)}>
                                  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingLeft:10,}}>取消</Text>
                                  </View>
                              </TouchableOpacity>
                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>{this.state.infotitle}</Text>

                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>
                              <TouchableOpacity onPress={this._sub.bind(this)}>
                                  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingRight:10,}}>确定</Text>
                                  </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <ScrollView style={{flex:1,backgroundColor:'#f3f3f3'}}>
                             {this.state.Ckshow ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                                    选择仓库
                                </Text>
                                <TouchableOpacity activeOpacity={0.8} onPress={this._onPressHandle.bind(this)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                    						  <View style={{flex:1,}}>
                    							    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                      									{this.state.ckname}
                      								</Text>
                    							</View>
                    						  <Icon name="ios-arrow-forward" color="#999"size={27}  />
                    						</TouchableOpacity>
                             </View> : null}

                             <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>入库批次</Text>
                               <View style={{flex:1,}}>
                                   <Text selectable={true} allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                     {this.state.datetime}
                                   </Text>
                               </View>
                             </View>
                             <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
                  					    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333', paddingTop:5,}}>备注</Text>
                  						<View style={{flex:1,marginLeft:15,}}>
                  					    <TextInput
                  						  onChangeText={(textaera) => this.setState({textaera})}
                  						  multiline={true}
                  						  numberOfLines={5}
                  						  placeholderTextColor={'#999'}
                  						  style={{ color:'#666',fontSize:14,textAlignVertical:'top',paddingTop:5,}}
                  						  placeholder='备注内容(必填)'
                  						  underlineColorAndroid={'transparent'}
                  						/>
                  						</View>
                  					</View>
                            <View style={{marginTop:0}}>
                              <View style={{height:30,alignItems:'flex-start',justifyContent:'center',paddingLeft:10}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false}>产品信息</Text>
                              </View>
                                {this.state.editData.map((data,j)=>{
                                return <View key={j} style={{marginLeft:5,marginRight:5,borderWidth:1,borderColor:'#dcdcdc',borderRadius:3,marginBottom:10}}>
                                <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>产品名称</Text>
                                  <View style={{flex:1,}}>
                                      <Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                        {data.proName}
                                      </Text>
                                  </View>
                                </View>
                                <View style={{borderBottomWidth:1,borderColor:'#dcdcdc',flexDirection:'row',paddingLeft:10,height:50,backgroundColor:'#fff',}}>
                                  <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flex:1}}>
                                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>入库数量</Text>
                                    <View style={{flex:1,}}>
                                        <Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'center',paddingRight:15, alignItems:'center'}}>
                                          {data.num}({data.unitname})
                                        </Text>
                                    </View>
                                  </View>
                                  <View style={{width:1,backgroundColor:'#dcdcdc'}}></View>
                                  <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flex:1,paddingLeft:10,}}>
                                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>已入库</Text>
                                    <View style={{flex:1,}}>
                                        <Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'center',paddingRight:15, alignItems:'center'}}>
                                          {data.intoStoreNum}
                                        </Text>
                                    </View>
                                  </View>
                                </View>
                                <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>本次入库</Text>
                                  <View style={{flex:1,}}>
                                    <TextInput
                                    ref={"input" + j}
                                    underlineColorAndroid = 'transparent'
                                    placeholder = '输入入库数量'
                                    keyboardType = 'numeric'
                                    defaultValue = {String(Number(data.num)-Number(data.intoStoreNum))}
                                    placeholderTextColor = {'#ccc'}
                                    onChangeText={(text) => this.changs.bind(this,text,data,j)()}
                                    style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                                  </View>
                                </View>

                                <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>生产日期</Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={this._proTime.bind(this,j)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                                      <View style={{flex:1,}}>
                                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                            {this.state.TimeData[j]}
                                          </Text>
                                      </View>
                                      <Icon name="ios-arrow-forward" color="#999"size={27}  />
                                    </TouchableOpacity>
                                </View>
                              </View>})}
                            </View>
                          </ScrollView>
                          {this.state.shows ? <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(107, 107, 107, 0.43)',position:'absolute',top:0,left:0}}></View> : null}
                        <PassState navigator = {this.props.navigator} {...this.props}/>
                       </Modal>
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
