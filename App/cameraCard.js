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
  Animated,
	Dimensions,
	ToastAndroid,
	BackHandler,
  Platform,
  StatusBar,
  TextInput,
	Image,
	RefreshControl,
	ListView,
  Modal,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import PassState from './PassState';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-picker';
var array = [];
var aa=[];
import Contacts  from 'react-native-contacts';
import Camera from 'react-native-camera';
export default class cameraCard extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackHandler.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
        path:null,
        sb:false,
        info:'',
        _infos:false,
        data:{},
        modalshow:false,
        stateID:null,
        showsk:false,
        GJname:'请选择',
        XBname:'请选择',
        XSname:'请选择',
        XBID:null,
        XSID:null,
        cname:'',
        contact:'',
        depart:'',
        post:'',
        mobile:'',
        phone:'',
        email:'',
        weibo:'',
        area:'',
        address:'',
        code:'',
        remark:'',
        XSdata:[],
        XSnameData:[],
        showsx:false,
        statua:false,
        bottoms: new Animated.Value(-190),
        isshows:false,
        modalshowP:false,
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
  	  this.Times && clearTimeout(this.Times);
      BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
  	}

    takePicture() {
      this.camera.capture()
        .then((data) => {
          this.setState({ path: data.path })
        })
        .catch(err => console.error(err));
    }

    renderCamera() {
      return (
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}

        >

        </Camera>
      );
    }

    renderImage() {
      return (
        <View style={styles.preview}>
          <Image
            source={{ uri: this.state.path }}
            style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,}}
          />

        </View>
      );
    }

    _shuax(){
      this.setState({showsx:true,statua:false,})
      this.getXS();
    }

    getXS(){
      array = [];
      fetch('' + data.data.domain + '/index.php?app=Customer&m=MPrethread&a=custom_thread_source&access_token=' + data.data.token + '')
  		  .then((response) => response.json())
  		  .then((responseData) => {
          console.log(responseData)
          this.setState({XSdata:responseData,showsx:false,})
          responseData.forEach((data,i)=>{
            array.push(data.name);
            this.setState({XSnameData:array});
          })
  		  })
  		  .catch((error) => {
            this.setState({showsx:false,statua:true,})
        })
    }

    _yes(){
      var that = this;
      that.setState({sb:true,})
      let formData = new FormData();
      var file = {uri: this.state.path, type: 'multipart/form-data', name: 'a.jpg'};
      formData.append("upfile",file);
      fetch('http://bcr2.intsig.net/BCRService/BCR_VCF2?user=liuhui219@126.com&pass=SJL4RB3EF5M97XXF&json=1&lang=524287', {
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
        that.setState({isshows:true,sb:false,data:result,cname:result.organization[0].item.name,contact:result.formatted_name[0].item,post:result.title[0].item,mobile:result.telephone[0].item.number,phone:result.telephone[1].item.number,email:result.email[0].item,address:result.label[0].item.address})
        Animated.timing(
           that.state.bottoms,
           {toValue: 5},
         ).start();

       })
       .catch((error) => {
         console.log(error);
         that.setState({sb:false,path:null,_infos:true,info:'识别失败，请重新拍摄'})
         this.Times=setInterval(() => {
				       this.setState({
						   _infos:false,
					   })
             this.Times && clearTimeout(this.Times);
			   }, 3000);
       });
    }

    _lxr(){
      this.setState({modalshow:false,})
    }

    _cancers(){
      this.setState({modalshowP:false,})
    }

    GJstate(){
      this.setState({showsk:true});
      var that = this;
      Picker.init({
        pickerData: ['未处理','已联系','关闭'],
        pickerTitleText: '选择',
        pickerToolBarFontSize: 16,
              pickerFontSize: 16,
              pickerFontColor: [0, 0 ,0, 1],
              onPickerConfirm: pickedValue => {
                this.setState({GJname:pickedValue,showsk:false});
                if(pickedValue == '未处理'){
                  this.setState({stateID:1})
                }else if(pickedValue == '已联系'){
                  this.setState({stateID:2})
                }else if(pickedValue == '关闭'){
                  this.setState({stateID:3})
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
    XBstate(){
      this.setState({showsk:true});
      var that = this;
      Picker.init({
        pickerData: ['男','女'],
        pickerTitleText: '选择',
        pickerToolBarFontSize: 16,
              pickerFontSize: 16,
              pickerFontColor: [0, 0 ,0, 1],
              onPickerConfirm: pickedValue => {
                this.setState({XBname:pickedValue,showsk:false});
                if(pickedValue == '男'){
                  this.setState({XBID:1})
                }else if(pickedValue == '女'){
                  this.setState({XBID:2})
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
    XSstate(){
      this.setState({showsk:true});
      var that = this;
      Picker.init({
        pickerData: this.state.XSnameData,
        pickerTitleText: '选择',
        pickerToolBarFontSize: 16,
              pickerFontSize: 16,
              pickerFontColor: [0, 0 ,0, 1],
              onPickerConfirm: pickedValue => {
                this.setState({XSname:pickedValue,showsk:false});
                       this.state.XSdata.forEach((data,i)=>{
                         if(pickedValue == data.name){
                           this.setState({XSID:data.id})
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

    trim(str) {
       return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
    }

    tj(){
      var that = this;
      if(this.state.cname == '' || this.state.cname == undefined){
        ToastAndroid.show('公司名称不能为空', ToastAndroid.SHORT);
        return false;
      }else if((this.state.phone == '' && this.state.mobile == '') || (this.state.phone == undefined && this.state.mobile == undefined)){
        ToastAndroid.show('电话不能为空', ToastAndroid.SHORT);
        return false;
      }else{
        fetch('' + data.data.domain + '/index.php?app=Customer&m=MPrethread&a=add_thread&access_token=' + data.data.token + '', {
         method: 'POST',
         headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: this.toQueryString({
              'cname': this.state.cname,
              'contact': this.state.contact,
              'state': this.state.stateID,
              'sex': this.state.XBID,
              'depart': this.state.depart,
              'post':this.state.post,
              'mobile': this.state.mobile,
              'phone':this.state.phone,
              'email':this.state.email,
              'weibo':this.state.weibo,
              'area':this.state.area,
              'address':this.state.address,
              'code':this.state.code,
              'source':this.state.XSID,
              'remark':this.state.remark
         })
       })
       .then(function (response) {
         return response.json();
       })
       .then(function (result) {
        console.log('123',result);
        if(result.status == 'success'){
           that.setState({modalshow:false,_infos:true,info:'提交成功'});
           that.Times=setInterval(() => {
  				       that.setState({
  						   _infos:false,
  					   })
               that.Times && clearTimeout(that.Times);
  			   }, 3000);
         }else{
           ToastAndroid.show(result.info, ToastAndroid.SHORT);
         }
       })
       .catch((error) => {
         console.log(error);
         ToastAndroid.show("提交失败", ToastAndroid.SHORT);
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

    cancels(){
      this.setState({isshows:false,})
  		Animated.timing(
  		   this.state.bottoms,
  		   {toValue: -190},
  		 ).start();
  	}

    sures(){
      Animated.timing(
        this.state.bottoms,
        {toValue: -190},
      ).start();
      this.setState({modalshow:true,showsx:true,isshows:false,});
      this.getXS();
    }

    onclicks(){
      this.setState({isshows:false,});
      Animated.timing(
  		   this.state.bottoms,
  		   {toValue: -190},
  		 ).start();
    }

    contacts(){
      Animated.timing(
        this.state.bottoms,
        {toValue: -190},
      ).start();
      this.setState({modalshowP:true,});
    }

    contact(){
      var newPerson = {
        company: this.state.cname,
        jobTitle: this.state.post,
        phoneNumbers: [{
          label: "手机",
          number: this.state.mobile
        },{
          label: "电话",
          number: this.state.phone
        }],
        emailAddresses: [{
          label: "邮箱",
          email: this.state.email
        }],
        familyName: this.state.contact
      }
      this.setState({modalshowP:false,_infos:true,info:'新增成功'});
      this.Times=setInterval(() => {
            this.setState({
            _infos:false,
          })
          this.Times && clearTimeout(this.Times);
      }, 3000);
      Contacts.addContact(newPerson, (err) => { /*...*/ })
    }

    ImagePickers(){

      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };

      ImagePicker.launchImageLibrary(options, (response) => {
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
  		      path:response.uri,
          });
        }
      });
    }


    render() {
           return (
                <View style={{flex:1,flexDirection:'column',}}>

                  <View style={styles.card}>
                       <View style={{flex:1,justifyContent:'center'}}>
                            <TouchableOpacity onPress={this._pressButton.bind(this)}>
                               <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                                 <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
                                 <Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>返回</Text>
                               </View>
                           </TouchableOpacity>
                       </View>
                       <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                           <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                                 <Text style={{color:'white',fontSize:18}} allowFontScaling={false}></Text>
                           </View>
                       </View>
                       <View style={{flex:1,justifyContent:'center'}}>
                            {this.state.path ? <TouchableOpacity onPress={() => this.setState({ path: null })}>
                               <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
                                 <Text style={{color:'white',fontSize:16,paddingRight:10,}} allowFontScaling={false}>重拍</Text>
                               </View>
                           </TouchableOpacity> : null}
                       </View>

                   </View>
        					<View style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
                    <View style={styles.container}>
                      {this.state.path ? this.renderImage() : this.renderCamera()}
                    </View>
        					</View>
                  <View style={{backgroundColor:'#000',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10}}>
                      {!this.state.path ? <TouchableHighlight
                        style={styles.capture}
                        onPress={this.takePicture.bind(this)}
                        underlayColor="rgba(255, 255, 255, 0.5)"
                      >
                        <View style={{}}>
                          <Image source={require('./imgs/ic_photo_camera_36pt.png')} style={{width:50,height:50,marginTop:5}}/>
                        </View>
                      </TouchableHighlight> : <TouchableHighlight
                        style={styles.capture}
                        onPress={this._yes.bind(this)}
                        underlayColor="rgba(255, 255, 255, 0.5)"
                      >
                        <View style={{}}>
                          <Text style={{color:'#000',fontSize:16}} allowFontScaling={false}>确定</Text>
                        </View>
                      </TouchableHighlight>}


                  </View>
                  {this.state.sb ? <View style={{justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width,height:Dimensions.get('window').height-65,paddingBottom:90,overflow:'hidden',position:'absolute',top:65,left:0}}>
            		    <View style={styles.loading}>
                            <ActivityIndicator color="#000"/>
                            <Text style={styles.loadingTitle} allowFontScaling={false}>正在识别中……</Text>
                        </View>
            		  </View> : null}
                  {this.state._infos ? <View style={{justifyContent: 'center',alignItems: 'center', height:Dimensions.get('window').height-65,paddingBottom:90,overflow:'hidden',position:'absolute',width:Dimensions.get('window').width,top:65,left:0}}>
      							<View style={styles.loadings}>
      								<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>{this.state.info}</Text>
      							</View>
      						</View> : null}
                  {this.state.isshows ? <TouchableOpacity onPress={this.onclicks.bind(this)} style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,position:'absolute',top:0,left:0,}}>
                      <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,position:'absolute',top:0,left:0,backgroundColor:'rgba(204, 204, 204, 0.3)'}}></View>
                  </TouchableOpacity> : null}
                  <Animated.View style={{bottom:this.state.bottoms,left:5,width:Dimensions.get('window').width-10,borderRadius:3,backgroundColor:'#fff',position:'absolute',justifyContent:'center',alignItems:'center',position:'absolute',}}>
                                      <TouchableOpacity onPress={this.contacts.bind(this)} style={{width:Dimensions.get('window').width,}}>
                      <View style={{borderColor:'#ccc',borderBottomWidth:1,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',}}>
                        <Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,paddingTop:15,paddingBottom:15,}}>保存到手机联系人</Text>
                      </View>
                    </TouchableOpacity>
                                      <TouchableOpacity onPress={this.sures.bind(this)} style={{width:Dimensions.get('window').width,}}>
  										<View style={{borderColor:'#ccc',borderBottomWidth:1,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',}}>
  											<Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,paddingTop:15,paddingBottom:15,}}>保存到客户管理</Text>
  										</View>
  									</TouchableOpacity>
  									<TouchableOpacity onPress={this.cancels.bind(this)} style={{width:Dimensions.get('window').width,}}>
  										<View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',}}>
  											<Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,paddingTop:15,paddingBottom:15,}}>取消</Text>
  										</View>
  									</TouchableOpacity>
  					      </Animated.View>
                  <Modal
     					      animationType={"slide"}
       						  transparent={false}
       						  visible={this.state.modalshow}
       						  onRequestClose={() => {console.log("Modal has been closed.")}}
       					   >
     					      <View style={styles.card1}>
       					      <TouchableOpacity onPress={this._lxr.bind(this)} style={{flex:1}}>
         								  <View style={{flex:1,justifyContent:'center'}}>

         											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
         													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
         											  </View>

         								  </View>
       							  </TouchableOpacity>
       							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

       										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>客户-新增</Text>

       							  </View>
                      <TouchableOpacity onPress={this.tj.bind(this)} style={{flex:1}}>
         								  <View style={{flex:1,justifyContent:'center'}}>

         											  <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
         													<Text style={{color:'white',fontSize:16,paddingRight:10,}} allowFontScaling={false}>提交</Text>
         											  </View>

         								  </View>
       							  </TouchableOpacity>

     							</View>
     							{JSON.stringify(this.state.data) != '{}' ?<ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',}}>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>公司名称</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入公司名称'
                        placeholderTextColor = {'#ccc'}
                        defaultValue={this.state.data.organization[0].item.name}
                        onChangeText={(cname) => this.setState({cname})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>姓       名</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入姓名'
                        placeholderTextColor = {'#ccc'}
                        defaultValue={this.state.data.formatted_name[0].item}
                        onChangeText={(contact) => this.setState({contact})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                           跟进状态
                       </Text>
                       <TouchableOpacity activeOpacity={0.8} onPress={this.GJstate.bind(this)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                         <View style={{flex:1,}}>
                             <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                               {this.state.GJname}
                             </Text>
                         </View>
                         <Icon name="ios-arrow-forward" color="#999"size={27}  />
                       </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                           性       别
                       </Text>
                       <TouchableOpacity activeOpacity={0.8} onPress={this.XBstate.bind(this)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                         <View style={{flex:1,}}>
                             <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                               {this.state.XBname}
                             </Text>
                         </View>
                         <Icon name="ios-arrow-forward" color="#999"size={27}  />
                       </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                           线索来源
                       </Text>
                       <TouchableOpacity activeOpacity={0.8} onPress={this.XSstate.bind(this)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                         <View style={{flex:1,}}>
                             <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                               {this.state.XSname}
                             </Text>
                         </View>
                         <Icon name="ios-arrow-forward" color="#999"size={27}  />
                       </TouchableOpacity>
                    </View>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>部       门</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入部门'
                        placeholderTextColor = {'#ccc'}
                        onChangeText={(depart) => this.setState({depart})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>职       务</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入职务'
                        placeholderTextColor = {'#ccc'}
                        defaultValue={this.state.data.title[0].item}
                        onChangeText={(post) => this.setState({post})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>电       话</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入电话号码'
                        placeholderTextColor = {'#ccc'}
                        keyboardType = 'numeric'
                        defaultValue={this.state.data.telephone.length>1 ? this.state.data.telephone[1].item.number : ''}
                        onChangeText={(phone) => this.setState({phone})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>手       机</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入手机号码'
                        placeholderTextColor = {'#ccc'}
                        keyboardType = 'numeric'
                        defaultValue={this.state.data.telephone[0].item.number}
                        onChangeText={(mobile) => this.setState({mobile})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>电子邮件</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入电子邮件'
                        placeholderTextColor = {'#ccc'}
                        defaultValue={this.state.data.email[0].item}
                        onChangeText={(email) => this.setState({email})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>微       博</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入微博'
                        placeholderTextColor = {'#ccc'}
                        onChangeText={(weibo) => this.setState({weibo})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>地       区</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入地区'
                        placeholderTextColor = {'#ccc'}
                        onChangeText={(area) => this.setState({area})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333', paddingTop:5,}}>地       址</Text>
                       <View style={{flex:1,marginLeft:15,}}>
                         <TextInput
                           onChangeText={(address) => this.setState({address})}
                           multiline={true}
                           numberOfLines={5}
                           placeholderTextColor={'#ccc'}
                           defaultValue={this.state.data.label[0].item.address}
                           style={{ color:'#666',fontSize:14,textAlignVertical:'top',paddingTop:0,height:60}}
                           placeholder='输入地址'
                           underlineColorAndroid={'transparent'}
                         />
                       </View>
                   </View>
                    <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>邮政编码</Text>
                      <View style={{flex:1,}}>
                        <TextInput
                        underlineColorAndroid = 'transparent'
                        placeholder = '输入邮政编码'
                        placeholderTextColor = {'#ccc'}
                        onChangeText={(code) => this.setState({code})}
                        style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333', paddingTop:5,}}>备注</Text>
                       <View style={{flex:1,marginLeft:15,}}>
                         <TextInput
                           onChangeText={(remark) => this.setState({remark})}
                           multiline={true}
                           numberOfLines={5}
                           placeholderTextColor={'#ccc'}
                           style={{ color:'#666',fontSize:14,textAlignVertical:'top',paddingTop:0,height:120}}
                           placeholder='备注内容'
                           underlineColorAndroid={'transparent'}
                         />
                       </View>
                   </View>
     							</ScrollView> : null}
                  {this.state.showsx ? <View style={{justifyContent: 'center',alignItems: 'center', height:Dimensions.get('window').height-50,width:Dimensions.get('window').width,overflow:'hidden',position:'absolute',top:0,left:0}}>
                    <View style={{backgroundColor: 'gray',
                            height: 80,
                            width: 100,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',}}>
                            <ActivityIndicator color="#fff"/>
                            <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop: 10,
                            fontSize: 14,
                            color: '#fff'}}>加载中……</Text>
                        </View>
                  </View> : null}
                  {this.state.statua ? <View style={{padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
          				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
          				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
          				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击重试。</Text>
                           </TouchableOpacity>
          	           </View> : <View></View>}
                 {this.state.showsk ? <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(107, 107, 107, 0.43)',position:'absolute',top:0,left:0}}></View> : null}

                 <PassState navigator = {this.props.navigator} {...this.props}/>

     					   </Modal>

                 <Modal
    					      animationType={"slide"}
      						  transparent={false}
      						  visible={this.state.modalshowP}
      						  onRequestClose={() => {console.log("Modal has been closed.")}}
      					   >
    					      <View style={styles.card1}>
    					          <TouchableOpacity onPress={this._cancers.bind(this,false)} style={{flex:1}}>
    								  <View style={{flex:1,justifyContent:'center'}}>

    											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
    													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
    											  </View>

    								  </View>
    							  </TouchableOpacity>
    							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

    										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>新增联系人</Text>

    							  </View>
                    <TouchableOpacity onPress={this.contact.bind(this)} style={{flex:1}}>
                        <View style={{flex:1,justifyContent:'center'}}>

                              <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
                                <Text style={{color:'white',fontSize:16,paddingRight:10,}} allowFontScaling={false}>提交</Text>
                              </View>

                        </View>
                    </TouchableOpacity>
    							</View>
                  {JSON.stringify(this.state.data) != '{}' ? <ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',}}>
                  <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>姓       名</Text>
                    <View style={{flex:1,}}>
                      <TextInput
                      underlineColorAndroid = 'transparent'
                      placeholder = '输入姓名'
                      placeholderTextColor = {'#ccc'}
                      defaultValue={this.state.data.formatted_name[0].item}
                      onChangeText={(contact) => this.setState({contact})}
                      style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                    </View>
                  </View>
                  <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>电       话</Text>
                    <View style={{flex:1,}}>
                      <TextInput
                      underlineColorAndroid = 'transparent'
                      placeholder = '输入电话号码'
                      placeholderTextColor = {'#ccc'}
                      keyboardType = 'numeric'
                      defaultValue={this.state.data.telephone.length>1 ? this.state.data.telephone[1].item.number : ''}
                      onChangeText={(phone) => this.setState({phone})}
                      style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                    </View>
                  </View>
                  <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>手       机</Text>
                    <View style={{flex:1,}}>
                      <TextInput
                      underlineColorAndroid = 'transparent'
                      placeholder = '输入手机号码'
                      placeholderTextColor = {'#ccc'}
                      keyboardType = 'numeric'
                      defaultValue={this.state.data.telephone[0].item.number}
                      onChangeText={(mobile) => this.setState({mobile})}
                      style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                    </View>
                  </View>
                  <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>公司名称</Text>
                    <View style={{flex:1,}}>
                      <TextInput
                      underlineColorAndroid = 'transparent'
                      placeholder = '输入公司名称'
                      placeholderTextColor = {'#ccc'}
                      defaultValue={this.state.data.organization[0].item.name}
                      onChangeText={(cname) => this.setState({cname})}
                      style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                    </View>
                  </View>
                  <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>职       务</Text>
                    <View style={{flex:1,}}>
                      <TextInput
                      underlineColorAndroid = 'transparent'
                      placeholder = '输入职务'
                      placeholderTextColor = {'#ccc'}
                      defaultValue={this.state.data.title[0].item}
                      onChangeText={(post) => this.setState({post})}
                      style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                    </View>
                  </View>
                  <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>电子邮件</Text>
                    <View style={{flex:1,}}>
                      <TextInput
                      underlineColorAndroid = 'transparent'
                      placeholder = '输入电子邮件'
                      placeholderTextColor = {'#ccc'}
                      defaultValue={this.state.data.email[0].item}
                      onChangeText={(email) => this.setState({email})}
                      style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                    </View>
                  </View>
    							</ScrollView> : null}
                  <PassState navigator = {this.props.navigator} {...this.props}/>
    					   </Modal>
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
	backgroundColor:'#000',
	flexDirection:'row'
  },
  card1: {
    height:45,
	backgroundColor:'#000',
	flexDirection:'row'
  },
  loading: {
        backgroundColor: '#fff',
        height: 80,
        width: 150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    loadings: {
          backgroundColor: '#fff',
          height: 80,
          width: 250,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',

      },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: '#000'
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent:'center',
    alignItems:'center',
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});
