import React from 'react';
import {
  View,
	StyleSheet,
  Navigator,
	TouchableOpacity,
	TouchableHighlight,
  TouchableNativeFeedback,
	Text,
  Platform,
  Modal,
  TextInput,
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
import CheckBox from 'react-native-check-box';
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-picker';
import PassState from './PassState';
import AllCustomer from './AllCustomer';
import AllCustomer1 from './AllCustomer1';
import AllCustomer2 from './AllCustomer2';
import ObjectList from './ObjectList';
import ShouHou from './ShouHou';
var array = [];
var aa=[];
var bb=[];
var cc=[];
var checks=[];
var isreceipts = 1;
var flog = false;
export default class CreatBX extends React.Component {

    constructor(props) {
        super(props);
		    this._pressButton = this._pressButton.bind(this);
			  BackHandler.addEventListener('hardwareBackPress', this._pressButton);
    		this.state = {
             text:'',
             shows:false,
             ckname:'请选择审核人',
             nameData:[],
             shuid:'',
             Datas:[],
             modal:false,
             pjDatas:[],
             selDatas:[],
             modalsk:false,
             classifyData:[],
             cateNames:[],
             flName:'请选择分类',
             lyName:'请选择来源',
             showsk:false,
             classId:'',
             bxObjShow:false,
             khShow:false,
             xmPShow:false,
             shPShow:false,
             bxObj:'请选择',
             khObj:'请选择',
             xmObj:'请选择',
             shObj:'请选择',
             ischeckeds:true,
             avatarSource:'',
             imguri:'',
             fileImg:'',
             lyDatas:[],
             modalkh:false,
             khIds:'',
             modalXm:false,
             xmIds:'',
             modalSh:false,
             shIds:'',
             texts:'',
             money:'',
             domain:'',
             uid:'',
             cid:'',
             token:'',
             default1:'',
             projectid:'',
             is_customer:0,
             textaeras:'',
             textaera:'',
             isreceipt:1,
             showsx:true,
             statua:false,
             checkinfo:'是',
			 imagesshow:false,
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
         this.setState({domain:data.data.domain,uid:data.data.uid,cid:data.data.cid,token:data.data.token,})
         this.timer = setTimeout(() => {this.getSH();this.pjData();},800);
    }


	componentWillUnmount() {
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
    this.timer && clearTimeout(this.timer);
	}

  _shuax(){
    this.setState({showsx:true,statua:false,})
    this.getSH();
    this.pjData();
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

  getSH(){
    array = [];
    fetch('' + data.data.domain + '/index.php?app=Account&m=ExpenseApi&a=select_auditlist&apps=Account&ms=Expense&as=auditqx&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {
        this.setState({Datas:responseData,showsx:false,})
        responseData.forEach((data,i)=>{
          array.push(data.name);
          this.setState({nameData:array});
        })
		  })
		  .catch((error) => {
         this.setState({showsx:false,statua:true,})
      })
  }

  _onPressHandle(){
    var that = this;
    this.setState({shows:true});
    Picker.init({
      pickerData: this.state.nameData,
      pickerTitleText: '选择',
      pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            onPickerConfirm: pickedValue => {
                this.setState({ckname:pickedValue,shows:false});
                that.state.Datas.forEach((data,i)=>{
                  if(data.name == pickedValue){
                    that.setState({shuid:data.uid});
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

  _lmodal(){
    this.setState({modal:false,selDatas:aa});
    console.log(aa)
  }

  _select(){
    this.setState({modal:true,});

  }

  pjData(){
    aa = [];
    bb = [];
    cc = [];
    checks = [];
    aa.length = 0;
    bb.length = 0;
    cc.length = 0;
    checks.length = 0;
    flog = false;
    this.setState({selDatas:[],})
    fetch('' + data.data.domain + '/index.php?app=Account&m=ExpenseApi&a=userpj&uid='+data.data.uid+'&access_token=' + data.data.token + '')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.data)
        this.setState({pjDatas:responseData.data,showsx:false,})
        responseData.data.map((data,i)=>{
          checks.push(false);
        })
      })
      .catch((error) => {
        this.setState({showsx:false,statua:true,})
      })
  }

  _check(data,index){
    var that = this;
    if(!flog){
       aa.push(data);
       bb.push(index);
       cc.push(data.id);
       checks[index]=true;
       flog = true;
    }else{
       aa.forEach((datas,i)=>{
         if(datas.id == data.id){
           aa.splice(i,1);
           bb.splice(i,1);
           cc.splice(i,1);
           checks[index]=false;
           if(aa.length == 0){
 						flog = false;
 					}
         }else{
           if(i == aa.length-1){
            checks[index]=true;
            return aa.push(data),bb.push(index),cc.push(data.id);
           }
         }
       })

     }
	}

  _deletes(i){
    aa.splice(i,1);
    cc.splice(i,1);
    checks[bb[i]]=false;
    bb.splice(i,1);
    if(aa.length == 0){
      flog = false;
    }
    this.setState({selDatas:aa});

  }

  _xinj(){
    var classDtata = [];
    var lyData = [];
    var that = this;
    this.setState({modalsk:true,texts:'',flName:'请选择分类',lyName:'请选择来源',ischeckeds:true,checkinfo:'是',bxObj:'请选择',money:'',avatarSource:'',imguri:'',textaeras:'',is_customer:0,isreceipt:1});
    fetch('' + data.data.domain + '/index.php?app=Account&m=ExpenseApi&a=pclist&access_token=' + data.data.token + '')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({classifyData:responseData})
        responseData.clist.forEach((data,i)=>{
          if(data.isedit == 0){
            classDtata.push(data.cateName);
            that.setState({cateNames:classDtata});
          }
        })
        responseData.plist.forEach((data,j)=>{
          lyData.push(data.projectName);
          that.setState({lyDatas:lyData,});
        })
      })
      .catch((error) => {

      })
  }

  _cancerxj(){
    this.setState({modalsk:false})
  }

  _flClick(){
    var that = this;
    this.setState({showsk:true});
    Picker.init({
      pickerData: this.state.cateNames,
      pickerTitleText: '选择',
      pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            onPickerConfirm: pickedValue => {
                this.setState({flName:pickedValue,showsk:false});
                this.state.classifyData.clist.forEach((data,i)=>{
                  if(pickedValue == data.cateName){
                    that.setState({classId:data.id});
                  }
                })

            },
            onPickerCancel: pickedValue => {
                 that.setState({showsk:false});
            },
            onPickerSelect: pickedValue => {

            }
        });
        Picker.show();
  }

  _lyClick(){
    var that = this;
    this.setState({showsk:true});
    Picker.init({
      pickerData: ['报销项目','客户','项目管理','售后管理'],
      pickerTitleText: '选择',
      pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            onPickerConfirm: pickedValue => {
                this.setState({lyName:pickedValue,showsk:false});
                if(pickedValue == '报销项目'){
                  that.setState({bxObjShow:true,khShow:false,xmPShow:false,shPShow:false,bxObj:'请选择',default1:0})
                }else if(pickedValue == '客户'){
                  that.setState({bxObjShow:false,khShow:true,xmPShow:false,shPShow:false,bxObj:'请选择',default1:1})
                }else if(pickedValue == '项目管理'){
                  that.setState({bxObjShow:false,khShow:false,xmPShow:true,shPShow:false,bxObj:'请选择',default1:2})
                }else if(pickedValue == '售后管理'){
                  that.setState({bxObjShow:false,khShow:false,xmPShow:false,shPShow:true,bxObj:'请选择',default1:3})
                }

            },
            onPickerCancel: pickedValue => {
                 that.setState({showsk:false});
            },
            onPickerSelect: pickedValue => {

            }
        });
        Picker.show();
  }

  _bxClick(){
    var that = this;
    this.setState({showsk:true});
    Picker.init({
      pickerData: this.state.lyDatas,
      pickerTitleText: '选择',
      pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            onPickerConfirm: pickedValue => {
                this.setState({bxObj:pickedValue,showsk:false});
                this.state.classifyData.plist.forEach((data,i)=>{
                  if(pickedValue == data.projectName){
                    that.setState({projectid:data.id})
                  }
                })
            },
            onPickerCancel: pickedValue => {
                 that.setState({showsk:false});
            },
            onPickerSelect: pickedValue => {

            }
        });
        Picker.show();
  }

  _khClick(){
    this.setState({modalkh:true,})
  }

  _cancerKh(){
    this.setState({modalkh:false,})
  }

  _isfalse(){
    if(this.state.ischeckeds){
      this.setState({ischeckeds:false,checkinfo:'不是'})
    }else{
      this.setState({ischeckeds:true,checkinfo:'是'})
    }

  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {

      }
      else if (response.error) {

      }
      else if (response.customButton) {

      }
      else {
        var source;

        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
		      imguri:response.uri,
              avatarSource: source,
		      fileImg:response,
			  imagesshow:true,
        });
      }
    });
  }

  _delete(){
		this.setState({
          avatarSource: '',
          imguri:'',
		  imagesshow:false,
        });
	}

  _selecta(data){
		this.setState({
			bxObj: data.custom_company,
			modalkh: false,
      projectid:data.id,
      is_customer:0,
			});
	}
  _selectb(data){
		this.setState({
			bxObj: data.cname,
			modalkh: false,
      projectid:data.id,
      is_customer:1,
			});
	}
  _selectc(data){
		this.setState({
			bxObj: data.cname,
			modalkh: false,
      projectid:data.id,
      is_customer:1,
			});
	}

  _xmClick(){
    this.setState({modalXm:true,})
  }

  _cancerXm(){
    this.setState({modalXm:false,})
  }

  _selectxm(data){
    this.setState({bxObj:data.pro_name,projectid:data.id,modalXm:false,})
  }

  _shClick(){
    this.setState({modalSh:true,})
  }

  _cancerSh(){
    this.setState({modalSh:false,})
  }

  _selectsh(data){
    this.setState({modalSh:false,bxObj:data.f_id,projectid:data.id})
  }

  trim(str) {
     return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
  }

  subPJ(){
    var that = this;

    let formData = new FormData();
    if(this.state.ischeckeds){
        isreceipts = 1;
    }else{
        isreceipts = 2;
    }
    if(this.state.imguri == ''){
			file = '';
		}else{
			file = {uri: this.state.imguri, type: 'multipart/form-data', name: 'a.jpg'};
		}
    formData.append("uid",this.state.uid);
    formData.append("money",this.state.money);
    formData.append("file",file);
    formData.append("isreceipt",isreceipts);
    formData.append("documentsname",this.state.texts);
    formData.append("cateid",this.state.classId);
    formData.append("default1",this.state.default1);
    formData.append("projectid",this.state.projectid);
    formData.append("docbz",this.state.textaeras);
    formData.append("is_customer",this.state.is_customer);

    if(this.trim(this.state.texts) == ''){
      ToastAndroid.show('请填写数据名称', ToastAndroid.SHORT);
      return false;
    }else if(this.state.flName == '请选择分类'){
      ToastAndroid.show('请选择分类', ToastAndroid.SHORT);
      return false;
    }else if(this.state.lyName == '请选择来源'){
      ToastAndroid.show('请选择来源', ToastAndroid.SHORT);
      return false;
    }else if(this.state.bxObj == '请选择'){
      ToastAndroid.show('请选择来源分类', ToastAndroid.SHORT);
      return false;
    }else if(this.trim(this.state.money) == ''){
      ToastAndroid.show('请填写金额', ToastAndroid.SHORT);
      return false;
    }else if(file == ''){
      ToastAndroid.show('请上传票据附件', ToastAndroid.SHORT);
      return false;
    }else{
      that.setState({showsx:true,})
      fetch('' + this.state.domain + '/index.php?app=Account&m=ExpenseApi&a=addpj&access_token=' + this.state.token + '', {
       method: 'POST',
       headers: {
       'Content-Type': 'multipart/form-data',
       },
       body: formData,
     })
     .then(function (response) {
       return response.json();
     })
     .then(function (result) {
      console.log(result);
      if(result.statu == 1){
        ToastAndroid.show('提交成功', ToastAndroid.SHORT);
        that.setState({modalsk:false,showsx:false,})
        that.pjData();
      }else{
        ToastAndroid.show('提交失败', ToastAndroid.SHORT);
        that.setState({showsx:false,})
      }

     })
     .catch((error) => {
       console.log(error);
       ToastAndroid.show('提交失败', ToastAndroid.SHORT);
       that.setState({showsx:false,})
     })
    }
  }


  _submitBX(){
    var that = this;
    if(this.trim(this.state.text) == ''){
      ToastAndroid.show('请填写报销单名称', ToastAndroid.SHORT);
      return false;
    }else if(this.state.ckname == '请选择审核人'){
      ToastAndroid.show('请选择审核人', ToastAndroid.SHORT);
      return false;
    }else if(this.trim(this.state.textaera) == ''){
      ToastAndroid.show('请填写备注', ToastAndroid.SHORT);
      return false;
    }else if(this.state.selDatas.length == 0){
      ToastAndroid.show('请添加票据', ToastAndroid.SHORT);
      return false;
    }else{
	  that.setState({showsx:true,}) 	
      fetch('' + this.state.domain + '/index.php?app=Account&m=ExpenseApi&a=addbx&access_token=' + this.state.token + '', {
       method: 'POST',
       headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: this.toQueryString({
            'uid': this.state.uid,
            'audit': this.state.shuid,
            'name': this.state.text,
            'bxbz': this.state.textaera,
            'strid': cc.join(',')
       })
     })
     .then(function (response) {
       return response.json();
     })
     .then(function (result) {
      console.log(result);
      if(result.statu == 1){
        ToastAndroid.show('提交成功', ToastAndroid.SHORT);
		that.setState({showsx:false,}) 
        that._pressButton();
      }else{
        ToastAndroid.show('提交失败', ToastAndroid.SHORT);
		that.setState({showsx:false,}) 
      }
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
      												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>报销单</Text>
      									</View>
      						  </View>
      						  <View style={{flex:1,justifyContent:'center'}}>
                      <TouchableOpacity onPress={this._submitBX.bind(this)}>
                         <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
                           <Text style={{color:'white',fontSize:16,marginRight:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>提交</Text>
                         </View>
                     </TouchableOpacity>
      						  </View>
					        </View>

        					<ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',}}>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>报销单名称</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入报销单名称'
                        placeholderTextColor = {'#ccc'}
                        onChangeText={(text) => this.setState({text})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                           选择审核人
                       </Text>
                       <TouchableOpacity activeOpacity={0.8} onPress={this._onPressHandle.bind(this)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                         <View style={{flex:1,}}>
                             <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                               {this.state.ckname}
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
                           placeholder='备注内容(必填)'
                           underlineColorAndroid={'transparent'}
                         />
                       </View>
                   </View>
                   {this.state.selDatas.length > 0 ? <ScrollView
                     automaticallyAdjustContentInsets={false}
                     horizontal={true}
                     directionalLockEnabled ={true}
                     bounces={false}
                     showsHorizontalScrollIndicator ={true}
                     style={{marginTop:15}}
                     >
                     <View style={{flexDirection:'column'}}>
                         <View style={{flexDirection:'row',justifyContent:'center',paddingBottom:10,paddingTop:10,borderBottomWidth:1,borderColor:'#dcdcdc',backgroundColor:'#fff',}}>

                           <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>票据名</Text></View>
                           <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3+10,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>票据号</Text></View>
                           <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>类别</Text></View>
                           <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>来源</Text></View>
                           <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>金额</Text></View>
                           <View style={{alignItems:'center',width:(Dimensions.get('window').width)/4,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>操作</Text></View>
                         </View>


                         {this.state.selDatas.map((data,i)=>{
                           return <View key={i} style={{flexDirection:'row',justifyContent:'center',paddingBottom:10,paddingTop:10,borderBottomWidth:1,borderColor:'#dcdcdc',backgroundColor:'#fff',}}>

                             <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.documentsname}</Text></View>
                             <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3+10,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.documentsid}</Text></View>
                             <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.cateid}</Text></View>
                             <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.projectid}</Text></View>
                             <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.money}</Text></View>
                             <TouchableOpacity style={{alignItems:'center',width:(Dimensions.get('window').width)/4,}} onPress={this._deletes.bind(this,i)} ><View style={{alignItems:'center',width:(Dimensions.get('window').width)/4,}}><Text selectable={true} style={{fontSize:14,alignItems:'center',color:'#dd4848'}} allowFontScaling={false} adjustsFontSizeToFit={false}>移除</Text></View></TouchableOpacity>
                           </View>
                         })}
                     </View>
                   </ScrollView> : null}
                   <TouchableNativeFeedback  onPress={this._select.bind(this)} >
            				 <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:15,}}>
            					<View style={{flexDirection:'row',alignItems:'center',}}>
            					  <Icon name="ios-add-outline" color="#666"size={28} style={{marginTop:2}} />
            					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:10,fontSize:16,}}>添加票据</Text>
            					</View>
            				 </View>
            			 </TouchableNativeFeedback>
                   <Modal
      					      animationType={"slide"}
        						  transparent={false}
        						  visible={this.state.modal}
        						  onRequestClose={() => {console.log("Modal has been closed.")}}
        					   >
      					      <View style={styles.card1}>
      					          <TouchableOpacity onPress={this._lmodal.bind(this)} style={{flex:1}}>
          								  <View style={{flex:1,justifyContent:'center'}}>

          											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
          													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>确定</Text>
          											  </View>

          								  </View>
          							  </TouchableOpacity>
      							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

      										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>选择票据</Text>

      							  </View>
      							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>
                        <TouchableOpacity onPress={this._xinj.bind(this)} style={{flex:1}}>
                          <View style={{flex:1,justifyContent:'center'}}>

                                <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                                  <Text style={{color:'white',fontSize:16,paddingRight:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>新建</Text>
                                </View>

                          </View>
                        </TouchableOpacity>
      							  </View>
      							</View>
      							<ScrollView style={{flex:1}}>
                      {this.state.pjDatas.length>0 ? <ScrollView
                        automaticallyAdjustContentInsets={false}
                        horizontal={true}
                        directionalLockEnabled ={true}
                        bounces={false}
                        showsHorizontalScrollIndicator ={true}
                        >
                        <View style={{flexDirection:'column'}}>
                            <View style={{flexDirection:'row',justifyContent:'center',paddingBottom:10,paddingTop:10,borderBottomWidth:1,borderColor:'#dcdcdc',backgroundColor:'#fff',}}>
                              <View style={{width:40}}></View>
                              <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>票据名</Text></View>
                              <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3+10,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>票据号</Text></View>
                              <View style={{alignItems:'center',width:(Dimensions.get('window').width)/4,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>员工</Text></View>
                              <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>类别</Text></View>
                              <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>来源</Text></View>
                              <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>金额</Text></View>
                            </View>


                            {this.state.pjDatas.map((data,i)=>{
                              return <View key={i} style={{flexDirection:'row',justifyContent:'center',paddingBottom:10,paddingTop:10,borderBottomWidth:1,borderColor:'#dcdcdc',backgroundColor:'#fff',}}>
                                <View>
                                  <CheckBox
                         						 style={{width:40, alignItems:'center',justifyContent:'center',paddingLeft:10}}
                         						 onClick={this._check.bind(this,data,i)}
                         						 isChecked={checks[i]}
                         						 leftText={''}
                         						 checkedImage={<Image source={require('./imgs/enabled.png')} style={{width:24,height:24}}/>}
                                     unCheckedImage={<Image source={require('./imgs/disabled.png')} style={{width:24,height:24}}/>}
                         				  />
                                </View>
                                <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.documentsname}</Text></View>
                                <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3+10,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.documentsid}</Text></View>
                                <View style={{alignItems:'center',width:(Dimensions.get('window').width)/4,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.userid}</Text></View>
                                <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.cateid}</Text></View>
                                <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.projectid}</Text></View>
                                <View style={{alignItems:'center',width:(Dimensions.get('window').width)/3,}}><Text selectable={true} style={{fontSize:14,alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.money}</Text></View>
                              </View>
                            })}
                        </View>
                      </ScrollView> : <View style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width,height:Dimensions.get('window').height-90}}><Text style={{color:'#666',fontSize:20,}} allowFontScaling={false} adjustsFontSizeToFit={false}>暂无数据</Text></View>}
                      <Modal
         					      animationType={"slide"}
           						  transparent={false}
           						  visible={this.state.modalsk}
           						  onRequestClose={() => {console.log("Modal has been closed.")}}
           					   >
         					      <View style={styles.card1}>
         					          <TouchableOpacity onPress={this._cancerxj.bind(this)} style={{flex:1}}>
             								  <View style={{flex:1,justifyContent:'center'}}>

             											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
             													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>取消</Text>
             											  </View>

             								  </View>
             							  </TouchableOpacity>
         							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

         										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>新建票据</Text>

         							  </View>
         							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>
                          <TouchableOpacity onPress={this.subPJ.bind(this)} style={{flex:1}}>
                            <View style={{flex:1,justifyContent:'center'}}>

                                  <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
                                    <Text style={{color:'white',fontSize:16,paddingRight:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>提交</Text>
                                  </View>

                            </View>
                          </TouchableOpacity>
         							  </View>
         							</View>
         							<ScrollView  keyboardDismissMode = {'interactive'} style={{flex:1,backgroundColor:'#ececec',}}>
                        <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>票据名称</Text>
                          <View style={{flex:1,}}>
                            <TextInput
                            underlineColorAndroid = 'transparent'
                            placeholder = '输入票据名称'
                            placeholderTextColor = {'#ccc'}
                            onChangeText={(texts) => this.setState({texts})}
                            style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                               分类
                           </Text>
                           <TouchableOpacity activeOpacity={0.8} onPress={this._flClick.bind(this)}  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                             <View style={{flex:1,}}>
                                 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {this.state.flName}
                                 </Text>
                             </View>
                             <Icon name="ios-arrow-forward" color="#999"size={27}  />
                           </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                               来源
                           </Text>
                           <TouchableOpacity activeOpacity={0.8} onPress={this._lyClick.bind(this)}  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                             <View style={{flex:1,}}>
                                 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {this.state.lyName}
                                 </Text>
                             </View>
                             <Icon name="ios-arrow-forward" color="#999"size={27}  />
                           </TouchableOpacity>
                        </View>
                        {this.state.bxObjShow ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                               报销项目
                           </Text>
                           <TouchableOpacity activeOpacity={0.8} onPress={this._bxClick.bind(this)}  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                             <View style={{flex:1,}}>
                                 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {this.state.bxObj}
                                 </Text>
                             </View>
                             <Icon name="ios-arrow-forward" color="#999"size={27}  />
                           </TouchableOpacity>
                        </View> : null}
                        {this.state.khShow ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                               选择客户
                           </Text>
                           <TouchableOpacity activeOpacity={0.8} onPress={this._khClick.bind(this)}  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                             <View style={{flex:1,}}>
                                 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {this.state.bxObj}
                                 </Text>
                             </View>
                             <Icon name="ios-arrow-forward" color="#999"size={27}  />
                           </TouchableOpacity>
                        </View> : null}
                        {this.state.xmPShow ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                               项目管理
                           </Text>
                           <TouchableOpacity activeOpacity={0.8} onPress={this._xmClick.bind(this)}  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                             <View style={{flex:1,}}>
                                 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {this.state.bxObj}
                                 </Text>
                             </View>
                             <Icon name="ios-arrow-forward" color="#999"size={27}  />
                           </TouchableOpacity>
                        </View> : null}
                        {this.state.shPShow ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                               售后管理
                           </Text>
                           <TouchableOpacity activeOpacity={0.8} onPress={this._shClick.bind(this)}  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                             <View style={{flex:1,}}>
                                 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {this.state.bxObj}
                                 </Text>
                             </View>
                             <Icon name="ios-arrow-forward" color="#999"size={27}  />
                           </TouchableOpacity>
                        </View> : null}
                        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                               发票
                           </Text>
                           <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',paddingRight:15}}>
                             <View style={{marginRight:20}}>
                               <CheckBox
                                  style={{width:70, alignItems:'center',justifyContent:'center',paddingLeft:10}}
                                  onClick={this._isfalse.bind(this)}
                                  isChecked={this.state.ischeckeds}
                                  leftText={this.state.checkinfo}
                                  checkedImage={<Image source={require('./imgs/enabled.png')} style={{width:30,height:30}}/>}
                                  unCheckedImage={<Image source={require('./imgs/disabled.png')} style={{width:30,height:30}}/>}
                               />
                             </View>

                           </View>
                        </View>
                        <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>金额</Text>
                          <View style={{flex:1,}}>
                            <TextInput
                            underlineColorAndroid = 'transparent'
                            placeholder = '输入金额'
                            keyboardType = 'numeric'
                            placeholderTextColor = {'#ccc'}
                            onChangeText={(money) => this.setState({money})}
                            style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                          </View>
                        </View>
                        <View style={{marginTop:15,backgroundColor:'#fff',flexDirection:'column',paddingLeft:10,paddingTop:10}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>票据附件</Text>
                          <View style={{padding:10,paddingLeft:0,flexDirection:'row',alignItems:'center',}}>
          							      {this.state.imagesshow ? <View style={{height:85,alignItems:'center',justifyContent:'center',}}>
                               <Image source={this.state.avatarSource} style={{width: 70, height: 70,marginRight:15,}} />
            									 <TouchableOpacity onPress={this._delete.bind(this)}  style={{position:'absolute',right:8,top:0,}}>
            										 <View style={{width:18,height:18,borderRadius:9,backgroundColor:'red',justifyContent:'center',alignItems:'center',}}>
            											<Icon name="ios-close-outline" color="#fff"size={20}  />
            										 </View>
            									 </TouchableOpacity>
										  </View> : null}
          							      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          							        <Image source={require('./imgs/photo.png')} style={{width: 70, height: 70,}} />
          								  </TouchableOpacity>
          							  </View>
                      </View>
                      <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,marginBottom:15}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333', paddingTop:5,}}>备注</Text>
                         <View style={{flex:1,marginLeft:15,}}>
                           <TextInput
                             onChangeText={(textaeras) => this.setState({textaeras})}
                             multiline={true}
                             numberOfLines={5}
                             placeholderTextColor={'#ccc'}
                             style={{ color:'#666',fontSize:14,textAlignVertical:'top',paddingTop:5,}}
                             placeholder='备注内容(必填)'
                             underlineColorAndroid={'transparent'}
                           />
                         </View>
                      </View>
         							</ScrollView>
                      {this.state.showsx ? <View style={{justifyContent: 'center',alignItems: 'center', height:Dimensions.get('window').height-50,width:Dimensions.get('window').width,overflow:'hidden',position:'absolute',top:0,left:0}}>
                        <View style={styles.loading}>
                                <ActivityIndicator color="#fff"/>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>提交中……</Text>
                            </View>
                      </View> : null}
                      {this.state.showsk ? <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(107, 107, 107, 0.43)',position:'absolute',top:0,left:0}}></View> : null}
                        <Modal
           					      animationType={"slide"}
             						  transparent={false}
             						  visible={this.state.modalkh}
             						  onRequestClose={() => {console.log("Modal has been closed.")}}
             					   >
           					      <View style={styles.card1}>
           							  <View style={{flex:1,justifyContent:'center'}}>
           									<TouchableOpacity onPress={this._cancerKh.bind(this,false)}>
           										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
           												<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingLeft:10,}}>取消</Text>
           										  </View>
           									</TouchableOpacity>
           							  </View>
           							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

           										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>客户</Text>

           							  </View>
           							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

           							  </View>
           							</View>
                        <ScrollableTabView
        								  style={{flex:1,flexDirection:'column',backgroundColor:'#ededed',}}
        								  renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
        								  tabBarPosition='overlayTop'
        								  tabBarInactiveTextColor ='#333'
        								  tabBarActiveTextColor ='#4385f4'
        								  tabBarUnderlineStyle={{backgroundColor: '#4385f4'}}
        								  tabBarTextStyle={{fontSize: 16}} 
        								>
        									<View  style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='所有客户'>
                                <AllCustomer  _selecta={this._selecta.bind(this)}/>
        									</View>
        									<View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='线索客户'>
                                <AllCustomer1  _selectb={this._selectb.bind(this)}/>
      									  </View>
      								    <View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='下属线索客户'>
                                <AllCustomer2  _selectc={this._selectc.bind(this)}/>
      								    </View>
        								</ScrollableTabView>
                        <PassState navigator = {this.props.navigator} {...this.props}/>
           					   </Modal>
                       <Modal
          					      animationType={"slide"}
            						  transparent={false}
            						  visible={this.state.modalXm}
            						  onRequestClose={() => {console.log("Modal has been closed.")}}
            					   >
          					      <View style={styles.card1}>
          							  <View style={{flex:1,justifyContent:'center'}}>
          									<TouchableOpacity onPress={this._cancerXm.bind(this,false)}>
          										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
          												<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingLeft:10,}}>取消</Text>
          										  </View>
          									</TouchableOpacity>
          							  </View>
          							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>项目列表</Text>
          							  </View>
          							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

          							  </View>
          							</View>
          							<View style={{flex:1,}}>
                            <ObjectList  _selectxm={this._selectxm.bind(this)}/>
          							</View>
                        <PassState navigator = {this.props.navigator} {...this.props}/>
          					   </Modal>
                       <Modal
          					      animationType={"slide"}
            						  transparent={false}
            						  visible={this.state.modalSh}
            						  onRequestClose={() => {console.log("Modal has been closed.")}}
            					   >
          					      <View style={styles.card1}>
          							  <View style={{flex:1,justifyContent:'center'}}>
          									<TouchableOpacity onPress={this._cancerSh.bind(this,false)}>
          										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
          												<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingLeft:10,}}>取消</Text>
          										  </View>
          									</TouchableOpacity>
          							  </View>
          							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>项目列表</Text>
          							  </View>
          							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

          							  </View>
          							</View>
          							<View style={{flex:1,}}>
                            <ShouHou  _selectsh={this._selectsh.bind(this)}/>
          							</View>
                        <PassState navigator = {this.props.navigator} {...this.props}/>
          					   </Modal>
                       <PassState navigator = {this.props.navigator} {...this.props}/>
         					   </Modal>
      							</ScrollView>
                    <PassState navigator = {this.props.navigator} {...this.props}/>
      					   </Modal>
        					</ScrollView>
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
