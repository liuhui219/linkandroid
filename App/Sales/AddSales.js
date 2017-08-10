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
	KeyboardAvoidingView,
  Switch,
  Alert,
  DatePickerIOS,
  Modal,
  Animated,
  Platform,
  TextInput,
	BackHandler,
	Image,
	RefreshControl,
	ListView,
	NativeModules,
} from 'react-native';
var FilePickerManager = NativeModules.FilePickerManager;
import PassState from '../PassState';
import HTMLView from 'react-native-htmlview';
import AllCustomer11 from '../AllCustomer11';
import AllCustomer3 from '../AllCustomer3';
import AllCustomer4 from '../AllCustomer4';
import AllCustomer5 from '../AllCustomer5';
import AllCustomer6 from '../AllCustomer6';
import AllCustomer7 from '../AllCustomer7';
import AllCustomer8 from '../AllCustomer8';
import AllCustomer9 from '../AllCustomer9';
import AllCustomer10 from '../AllCustomer10';
import Input from './Input';
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box';
import ScrollableTabView, { DefaultTabBar,ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-picker';
var all=['pdf','png','jpg','xls','doc','ppt','xlsx','docx','pptx','txt','zip','rar','jpeg','gif','bmp'];
var array = [];
var arraysd = [];
var aa=[];
var HL=['元'];
var BXQ=[];
var BXQshows=[];
var XSJData=[];
var XSNUMData=[];
var BXQNUMData=[];
var SLData=[];
var SLDATAS=[];
var MAPData=[];
var flog = false;
var scrollData=[];
var MAPSCROLL=[];
var MAPSCROLLIndexs=[];
var MAPOBJS={};
var MAPDATAOBJ=[];
var SCROLLXSJDATA=[];
var SCROLLXSNUMData=[];
var SCROLLBXQNUMData=[];
var TotalNum=[];
var NUMINDEX=[];
var MainTotalsNum=[];
var MainTotalsNumINDEX=[];
var ProArray = [];
var moreTotals = [];
var moreTotalsNUM = [];
var SLDATAMAIN = [];
var BXQValues=[];
var BXQValuesData=[];
var BXQValuesName=[];
var SLIDData=[];
var SLIDValues=[];
var XZDD = ['服务订单'];
var HKDATA = [];
var BXDY = [];
var BXDYDATA = [];
var DateTimes = [];
var ProSH = [];
var ProSHDATA = [];
var SHMAINNUM = [];
var SHDATAS = [];
var SHMAINDADANUM = [];
var SLSDATA = [];
var SL = [];
var DWNAME = [];
var DW_name = [];
var DWRELATION = [];
var DW_relation = [];
var DWIDS=[];
var DW_ID=[];
var ISTJ = false;
export default class AddSales extends React.Component {

    constructor(props) {
        super(props);
		    this._pressButton = this._pressButton.bind(this);
			  BackHandler.addEventListener('hardwareBackPress', this._pressButton);
    		this.state = {
          ckname:'产品订单',
          shows:false,
          DDname:'现销',
          imguri:'',
          fileImg:'',
          result: '',
    			results:'',
          result1: '',
    			results1:'',
          domain:'',
          uid:'',
          fromID:11,
          cid:'',
          token:'',
          DataName:[''],
          shName:'选择审核人',
          shData:[],
          nameID:'',
          FWDD:false,
          modalkh:false,
          bxObj:'选择客户',
          isAll:false,
          datetime:'XS'+new Date().getFullYear()+''+(new Date().getMonth()+1)+''+new Date().getDate()+''+new Date().getHours()+''+new Date().getMinutes()+''+new Date().getSeconds(),
          ismap:false,
          isZQ:false,
          modalVisible:false,
          projectid:'',
          mapDate:[],
          status:false,
          address:'',
          addressID:'',
          modalVisibles:false,
          GLname:'选择关联订单',
          GLID:'',
          SwitchKP:true,
          ISKP:1,
          HLData:['元'],
          HLname:'元',
          HLID:'',
          ishl:false,
          MainData:{},
          isload:false,
          hlmoney:'',
          ishbshow:true,
          isxt:true,
          isxta:false,
          isxtb:false,
          isxtc:false,
          isxtd:false,
          Switchrk:false,
          addinhouse:0,
          isswichShow:false,
          isswichShowa:false,
          Swicha:false,
          cpoutid:0,
          isxt1:false,
          isxt2:false,
          isswichShowb:false,
          Swichb:false,
          scoutid:0,
          isswichShowc:false,
          Swichc:false,
          pjoutid:0,
          isSwitchwlcg:false,
          Swichwlcg:false,
          pjcgid:0,
          Swichxtsc:false,
          Swichxtwlcg:false,
          isSwichxtsc:false,
          isSwichxtwlcg:false,
          modalzqd:false,
          ZQName:'',
          ZQID:'',
          modalPro:false,
          Proname:'',
          ProID:'',
          isshowxlh:false,
          date:new Date(),
          timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
          statu:false,
          fadeAnim: new Animated.Value(0),
          bottom:new Animated.Value(-260),
          bottom1:new Animated.Value(-260),
          add:false,
          xtTitle:true,
          selectXM:false,
          modaladdPro:false,
          Scrollshows:true,
          ProjectData:{},
          ProArray:[],
          ProIndex:[],
          BXQname:'默认',
          BXQIndex:null,
          BXQData:[],
          BXQshow:[],
          XSJData:[],
          XSNUMData:[],
          BXQNUMData:[],
          SLData:[''],
          SLName:[],
          SLID:'',
          SLDATAS:[],
          SLIndex:null,
          BXNAME:'',
          MAPData:[],
          scrollData:[],
          MAPMAIN:false,
          MAPSCROLLINDEX:null,
          MAPSCROLL:[],
          SCROLLXSJDATA:[],
          INDEXMAP:null,
          SCROLLXSNUMData:[],
          SCROLLBXQNUMData:[],
          SCROLLMianTotals:0,
          SCROLLMianTotalsNUM:0,
          ZDY1:'',
          ZDY2:'',
          ZDYShow:false,
          ZKNUM:'',
          ZKSHOW:false,
          ZKHTotals:0,
          URLS:'/index.php?app=Invoicimg&m=ProductApi&a=getFormatList&form=0',
          SwitchYQHK:false,
          fadeAnim: new Animated.Value(0),
          statua:false,
          modalTJ:false,
          HKDATA:[''],
          HKname:'',
          HKID:'',
          date1:'',
          date2:'',
          HKNUM:0,
          datex:'',
          datey:'',
          DateTimes:[],
          ProSHDATA:[],
          SHSHOW:false,
          SHNUMS:0,
          mapSHOWS:true,
          je:'',
          ZDY1name:'',
          ZDY2name:'',
          xtsc:0,
          SLSDATA:[],
          DWARR:[''],
          DWNAME:[],
          DW_DATA:[],
          defaultValues:'',
          BXDY:[],
          moneyShow:true,
          textaeras:'',
          mapsfwdd:{},
          HLISSHOWS:false,
          hlmoneys:'',
          HThao:'',
		  htfj:false,
		  typefy:'',
		  typename:'',
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
       array = [];
       arraysd = [];
       aa=[];
       HL=['元'];
       BXQ=[];
       BXQshows=[];
       XSJData=[];
       XSNUMData=[];
       BXQNUMData=[];
       SLData=[];
       SLDATAS=[];
       MAPData=[];
       flog = false;
       scrollData=[];
       MAPSCROLL=[];
       MAPSCROLLIndexs=[];
       MAPOBJS={};
       MAPDATAOBJ=[];
       SCROLLXSJDATA=[];
       SCROLLXSNUMData=[];
       SCROLLBXQNUMData=[];
       TotalNum=[];
       NUMINDEX=[];
       MainTotalsNum=[];
       MainTotalsNumINDEX=[];
       ProArray = [];
       moreTotals = [];
       moreTotalsNUM = [];
       SLDATAMAIN = [];
       BXQValues=[];
       BXQValuesData=[];
       BXQValuesName=[];
       SLIDData=[];
       SLIDValues=[];
      XZDD = ['服务订单'];
      HKDATA = [];
      BXDY = [];
      BXDYDATA = [];
      DateTimes = [];
      ProSH = [];
      ProSHDATA = [];
      SHMAINNUM = [];
      SHDATAS = [];
      SHMAINDADANUM = [];
      SLSDATA = [];
      SL = [];
      DWNAME = [];
      DW_name = [];
      DWRELATION = [];
      DW_relation = [];
      DWIDS=[];
      DW_ID=[];
      ISTJ = false;

       this.setState({domain:data.data.domain,uid:data.data.uid,cid:data.data.cid,token:data.data.token,isload:true,});
       this.timer = setTimeout(() => {this.GetSh();this._All();},800);
    }

    componentWillUnmount() {
      this.timer && clearTimeout(this.timer);
  	}

    _All(){
      var that = this;
      SLData=[],
      HL=['元'];
      HL.length=1;
      fetch('' + this.state.domain + '/index.php?app=Invoicimg&m=SaleMobile&a=addsalecli&access_token=' + this.state.token + '')
       .then((response) => response.json())
       .then((responseData) => {
         console.log(responseData)
             that.setState({MainData:responseData,SLDATAS:responseData.ratelist,BXNAME:responseData.after.name,ZDY1:responseData.set[0],ZDY2:responseData.set[1],isload:false,statua:false,});
             if(responseData.allcussel == 1){
               that.setState({isAll:true});
             }else{
               that.setState({isAll:false});
             }
             if(responseData.xm == 0){
               this.setState({selectXM:false,})
             }else{
               this.setState({selectXM:true,})
             }
             responseData.cws.map((data,i)=>{
               HL.push(data.name);
               that.setState({HLData:HL,})
             })
             if(responseData.set[8] == 0){
               that.setState({Switchrk:false,isswichShow:false,addinhouse:0,})
             }else{
               that.setState({Switchrk:true,isswichShow:true,addinhouse:1})
             }
             if(responseData.set[9] == 0){
               that.setState({isshowxlh:false,})
             }else{
               that.setState({isshowxlh:true,})
             }
             if(responseData.set[4] == 0){
               that.setState({htfj:false,})
             }else{
               that.setState({htfj:true,})
             }			 
             if(responseData.set[14] == 1){
               that.setState({ZDYShow:true,})
             }else{
               that.setState({ZDYShow:false,})
             }
             if(responseData.set[16] == 0){
               that.setState({isswichShowa:false,Swicha:false,cpoutid:0})
             }else{
               that.setState({isswichShowa:true,Swicha:true,cpoutid:1})
             }
             if(responseData.set[19] == 0){
               that.setState({isswichShowb:false,Swichb:false,scoutid:0})
             }else{
               that.setState({isswichShowb:true,Swichb:true,scoutid:1})
             }
             if(responseData.set[21] == 0){
               that.setState({isswichShowc:false,Swichc:false,pjoutid:0})
             }else{
               that.setState({isswichShowc:true,Swichc:true,pjoutid:1})
             }
             if(responseData.set[20] == 0){
               that.setState({isSwitchwlcg:false,Swichwlcg:false,pjcgid:0})
             }else{
               that.setState({isSwitchwlcg:true,Swichwlcg:true,pjcgid:1})
             }
             if(responseData.set[17] == 0){
               that.setState({isSwichxtsc:false,Swichxtsc:false,xtsc:0,})
             }else{
               that.setState({isSwichxtsc:true,Swichxtsc:true,xtsc:1})
             }
             if(responseData.set[18] == 0){
               that.setState({isSwichxtwlcg:false,Swichxtwlcg:false,wlcgid:0})
             }else{
               that.setState({isSwichxtwlcg:true,Swichxtwlcg:true,wlcgid:1})
             }
             responseData.ratelist.map((data,i)=>{
               SLData.push(data.taxRate+' '+data.state);
               this.setState({SLData:SLData,})
             })
             if(responseData.cp == 1){
               XZDD.unshift('产品订单');
             }else{
               this.setState({ckname:'服务订单',FWDD:true,ishbshow:false,ishl:false,isxt:false,isxt1:false,isxt2:false,isxta:false,isxtb:false,isxtc:false,isxtd:false,isxte:false,xtTitle:false,SCROLLMianTotals:0,SCROLLMianTotalsNUM:0,INDEXMAP:null,MAPData:MAPData,MAPSCROLL:MAPSCROLL,SCROLLXSJDATA:SCROLLXSJDATA,mapSHOWS:false,fromID:12,moneyShow:false})
             }
             if(responseData.sc == 1){
               XZDD.push(' 自产销售订单');
             }
             if(responseData.wl_isopen == 1){
               XZDD.push(' 配件销售订单');
             }

             responseData.hktype.forEach((data,i)=>{
               HKDATA.push(data.method);
               this.setState({HKDATA:HKDATA,});
             });




       })
       .catch((error) => {
           this.setState({isload:false,statua:false,})
       });
    }

    GetSh(){
       var that = this;
       aa=[];
       aa.length=0;
       fetch('' + this.state.domain + '/index.php?app=Account&m=ExpenseApi&a=select_auditlist&apps=Sale&ms=Index&as=audit&access_token=' + this.state.token + '')
   		  .then((response) => response.json())
   		  .then((responseData) => {
              that.setState({shData:responseData,isload:false,statua:false,});
              responseData.map((data,i)=>{
                aa.push(data.name);
                that.setState({DataName:aa})
              })
   		  })
   		  .catch((error) => {
           this.setState({isload:false,statua:true,})
   		  });
    }

    _shuax(){
      this.setState({isload:true,statua:false,});
      this.GetSh();
      this._All();
    }

    DClass(){
      this.setState({shows:true});
      var that = this;
      Picker.init({
        pickerData: XZDD,
        pickerTitleText: '选择',
        pickerToolBarFontSize: 16,
              pickerFontSize: 16,
              pickerFontColor: [0, 0 ,0, 1],
              onPickerConfirm: pickedValue => {
                this.setState({ckname:pickedValue,shows:false});
                if(pickedValue == '服务订单'){
                  MAPData=[];
                  MAPSCROLL=[];
                  scrollData=[];
                  moreTotals=[];
                  MAPDATAOBJ=[];
                  SCROLLXSJDATA=[];
                  MAPSCROLLIndexs=[];
                  MainTotalsNum=[];
                  SCROLLXSNUMData=[];
                  SCROLLBXQNUMData=[];
                  SLDATAMAIN=[];
                  BXQValuesData=[];
                  BXQValuesName=[];
                  SLIDData=[];
                  MainTotalsNumINDEX=[];
                  this.setState({FWDD:true,ishbshow:false,ishl:false,isxt:false,isxt1:false,isxt2:false,isxta:false,isxtb:false,isxtc:false,isxtd:false,isxte:false,xtTitle:false,SCROLLMianTotals:0,SCROLLMianTotalsNUM:0,INDEXMAP:null,MAPData:MAPData,MAPSCROLL:MAPSCROLL,SCROLLXSJDATA:SCROLLXSJDATA,SHSHOW:false,SHNUMS:0,mapSHOWS:false,fromID:12,ZKHTotals:0,moneyShow:false,address:''})
                }else if(pickedValue == '配件销售订单'){
                  MAPData=[];
                  MAPSCROLL=[];
                  scrollData=[];
                  moreTotals=[];
                  MAPDATAOBJ=[];
                  SCROLLXSJDATA=[];
                  MAPSCROLLIndexs=[];
                  MainTotalsNum=[];
                  SCROLLXSNUMData=[];
                  SCROLLBXQNUMData=[];
                  SLDATAMAIN=[];
                  BXQValuesData=[];
                  BXQValuesName=[];
                  SLIDData=[];
                  MainTotalsNumINDEX=[];
                  this.setState({FWDD:false,ishbshow:false,ishl:false,isxt:false,isxt1:false,isxt2:true,isxtd:false,isxta:false,isxtb:false,isxtc:false,isxte:true,xtTitle:true,URLS:'/index.php?app=Invoicimg_Suppliers&m=ProductApi&a=productList',SCROLLMianTotals:0,SCROLLMianTotalsNUM:0,INDEXMAP:null,MAPData:MAPData,MAPSCROLL:MAPSCROLL,SCROLLXSJDATA:SCROLLXSJDATA,SHSHOW:false,SHNUMS:0,mapSHOWS:true,fromID:16,ZKHTotals:0,moneyShow:true,address:''})
                }else if(pickedValue == '产品订单'){
                  MAPData=[];
                  MAPSCROLL=[];
                  scrollData=[];
                  moreTotals=[];
                  MAPDATAOBJ=[];
                  SCROLLXSJDATA=[];
                  MAPSCROLLIndexs=[];
                  MainTotalsNum=[];
                  SCROLLXSNUMData=[];
                  SCROLLBXQNUMData=[];
                  SLDATAMAIN=[];
                  BXQValuesData=[];
                  BXQValuesName=[];
                  SLIDData=[];
                  MainTotalsNumINDEX=[];
                  this.setState({FWDD:false,ishbshow:true,ishl:false,HLname:'元',isxt:true,isxt1:false,isxt2:false,isxta:false,isxtb:false,isxtc:false,isxtd:false,isxte:false,xtTitle:true,URLS:'/index.php?app=Invoicimg&m=ProductApi&a=getFormatList&form=0',SCROLLMianTotals:0,SCROLLMianTotalsNUM:0,INDEXMAP:null,MAPData:MAPData,MAPSCROLL:MAPSCROLL,SCROLLXSJDATA:SCROLLXSJDATA,SHSHOW:false,SHNUMS:0,mapSHOWS:true,fromID:11,ZKHTotals:0,moneyShow:true,address:''})
                }else{
                  MAPData=[];
                  MAPSCROLL=[];
                  scrollData=[];
                  moreTotals=[];
                  MAPDATAOBJ=[];
                  SCROLLXSJDATA=[];
                  MAPSCROLLIndexs=[];
                  MainTotalsNum=[];
                  SCROLLXSNUMData=[];
                  SCROLLBXQNUMData=[];
                  SLDATAMAIN=[];
                  BXQValuesData=[];
                  BXQValuesName=[];
                  SLIDData=[];
                  MainTotalsNumINDEX=[];
                  this.setState({FWDD:false,ishbshow:true,ishl:false,HLname:'元',isxt:false,isxt1:true,isxt2:false,isxta:true,isxtb:true,isxtc:true,isxtd:true,isxte:false,xtTitle:true,URLS:'/index.php?app=Invoicimg&m=ProductApi&a=getFormatList&form=1',SCROLLMianTotals:0,SCROLLMianTotalsNUM:0,INDEXMAP:null,MAPData:MAPData,MAPSCROLL:MAPSCROLL,SCROLLXSJDATA:SCROLLXSJDATA,SHSHOW:true,SHNUMS:0,mapSHOWS:true,fromID:10,ZKHTotals:0,moneyShow:true,address:''})
                }
              },
              onPickerCancel: pickedValue => {
                   that.setState({shows:false});
              },
              onPickerSelect: pickedValue => {

              }
          });
          Picker.show();
    }
    xsClass(){
      this.setState({shows:true});
      var that = this;
      Picker.init({
        pickerData: ['现销','赊销'],
        pickerTitleText: '选择',
        pickerToolBarFontSize: 16,
              pickerFontSize: 16,
              pickerFontColor: [0, 0 ,0, 1],
              onPickerConfirm: pickedValue => {
                this.setState({DDname:pickedValue,shows:false});
                if(pickedValue == '赊销'){
                  this.setState({isZQ:true})
                }else{
                  this.setState({isZQ:false})
                }
              },
              onPickerCancel: pickedValue => {
                   that.setState({shows:false});
              },
              onPickerSelect: pickedValue => {

              }
          });
          Picker.show();
    }
    sh(){
      this.setState({shows:true});
      var that = this;
      Picker.init({
        pickerData:this.state.DataName,
        pickerTitleText: '选择',
        pickerToolBarFontSize: 16,
              pickerFontSize: 16,
              pickerFontColor: [0, 0 ,0, 1],
              onPickerConfirm: pickedValue => {
                this.setState({shName:pickedValue,shows:false});
                this.state.shData.map((data,i)=>{
                  if(data.name == pickedValue){
                    this.setState({nameID:data.uid});
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

    selectPhotoTapped() {
      var that = this;
		const options = {
            title: 'File Picker',
            chooseFileButtonTitle: 'Choose File...'
        };

        FilePickerManager.showFilePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                for(var i in all){
					if(all[i] == response.path.split(".")[response.path.split(".").length-1]){
						that.setState({
							file: response.uri,
							filesd:true,
							typename:'file://' +response.path,
							typefy : response.path.split("/")[response.path.split("/").length-1]
						});
						return false;
					}else{
						if(i == all.length-1){
						 ToastAndroid.show('禁止上传此格式文件', ToastAndroid.LONG)
						}
					}
				}

                console.log(response)
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

    kh(){
      this.setState({modalkh:true})
    }

    _cancerKh(){
      this.setState({modalkh:false})
    }

    _selecta(data){
  		this.setState({
        ZKNUM:data.discount,
  			bxObj: data.custom_company,
  			modalkh: false,
        projectid:data.id,
        is_customer:0,
        ismap:true,
        ZKSHOW:true,
  			});
  	}

    _selectd(data){
  		this.setState({
        ZKNUM:data.discount,
  			bxObj: data.custom_company,
  			modalkh: false,
        projectid:data.id,
        is_customer:0,
        ismap:true,
        ZKSHOW:true,
  			});
  	}
    _selecte(data){
  		this.setState({
        ZKNUM:data.discount,
  			bxObj: data.custom_company,
  			modalkh: false,
        projectid:data.id,
        is_customer:1,
        ismap:true,
        ZKSHOW:true,
  			});
  	}
    _selectf(data){
  		this.setState({
        ZKNUM:data.discount,
  			bxObj: data.custom_company,
  			modalkh: false,
        projectid:data.id,
        is_customer:1,
        ismap:true,
        ZKSHOW:true,
  			});
  	}
    _selectg(data){
  		this.setState({
        ZKNUM:data.discount,
  			bxObj: data.custom_company,
  			modalkh: false,
        projectid:data.id,
        is_customer:1,
        ismap:true,
        ZKSHOW:true,
  			});
  	}
    _selecth(data){
      console.log(data)
      this.setState({
  			GLname: data.order_num,
  			modalVisibles: false,
        bxObj: data.gys_name,
        GLID:data.id,
        ismap:true,
        projectid:data.gys_id,
  			});
  	}

    dz(){
      this.setState({
        modalVisible:true,
        status:true,
      })
      this.getMap();
    }

    getMap(){
      var that = this;
      fetch('' + this.state.domain + '/index.php?app=Invoicimg&m=SaleMobile&a=custom_address&gsyid='+this.state.projectid+'&access_token=' + this.state.token + '')
       .then((response) => response.json())
       .then((responseData) => {
             console.log(responseData)
             this.setState({mapDate:responseData,status:false,})
       })
       .catch((error) => {
             this.setState({status:false,})
       });
    }

    _xz(){
      this.setState({
        modalVisible:false,
      })
    }

    selectMap(data){
      console.log(data)
      this.setState({
        mapsfwdd:data,
        modalVisible:false,
        address:data.area+' '+data.address,
        addressID:data.id,
      })
      var that = this;
      flog = false;
      MAPData.forEach((datas,i)=>{
        if(datas.id == data.id){
         flog = true;
         ToastAndroid.show('已选择该地址', ToastAndroid.SHORT);
         return false;
        }
      })

      if(!flog){
         MAPData.push(data);
         scrollData.push(false);
         MAPSCROLL.push([]);
         MainTotalsNum.push(0);
         MainTotalsNumINDEX.push(0);
         MAPSCROLLIndexs.push([]);
         MAPDATAOBJ.push({});
         SCROLLXSJDATA.push([]);
         SCROLLXSNUMData.push([]);
         SCROLLBXQNUMData.push([]);
         moreTotals.push([]);
         moreTotalsNUM.push([]);
         SLDATAMAIN.push([]);
         BXQValuesData.push([]);
         BXQValuesName.push([]);
         SLIDData.push([]);
         BXDY.push([]);
         ProSHDATA.push([]);
         SHMAINNUM.push([]);
         SHMAINDADANUM.push([]);
         SLSDATA.push([]);
         DWRELATION.push([]);
         DWNAME.push([]);
         DWIDS.push([]);
         DateTimes.push(['','']);
         this.setState({MAPData:MAPData,scrollData:scrollData,MAPSCROLL:MAPSCROLL,MAPSCROLLIndexs:MAPSCROLLIndexs,DateTimes:DateTimes,ProSHDATA:ProSHDATA,DWNAME:DWNAME,BXDY:BXDY,})
      }
    }

    GLDD(){
      this.setState({
        modalVisibles:true,
      })
    }

    _cancerDD(){
      this.setState({
        modalVisibles:false,
      })
    }

    _SwitchKP(value){
      this.setState({SwitchKP:value});
      if(value == true){
        this.setState({ISKP:1});
      }else{
        this.setState({ISKP:0});
      }
    }

    seleceHL(){
      this.setState({shows:true});
      var that = this;
      Picker.init({
        pickerData: this.state.HLData,
        pickerTitleText: '选择',
        pickerToolBarFontSize: 16,
              pickerFontSize: 16,
              pickerFontColor: [0, 0 ,0, 1],
              onPickerConfirm: pickedValue => {
                this.setState({HLname:pickedValue,shows:false});
                if(pickedValue == '元'){
                  this.setState({ishl:false,hlmoney:'',ZKSHOW:true,})
                }else{
                  this.setState({ishl:true,ZKSHOW:false,ZKHTotals:0,})
                }
                this.state.MainData.cws.map((data,i)=>{
                  if(data.name == pickedValue){
                    this.gethl(data.id)
                    this.setState({HLID:data.id});
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

    gethl(data){
      var that = this;
      this.setState({isload:true,})
      fetch('' + this.state.domain + '/index.php?app=Invoicimg&m=SaleMobile&a=money_cr&id='+data+'&access_token=' + this.state.token + '')
       .then((response) => response.json())
       .then((responseData) => {
             var num=Number(this.state.SCROLLMianTotals) / Number(responseData.rate);
             this.setState({isload:false,hlmoney:String(responseData.rate),hlmoneys:num.toFixed(2),})
       })
       .catch((error) => {

       });
    }

    _Switchrk(value){
      this.setState({Switchrk:value})
      if(value == true){
        this.setState({addinhouse:1});
      }else{
        this.setState({addinhouse:0});
      }
    }

    _Switchcp(value){
      this.setState({Swicha:value})
      if(value == true){
        this.setState({cpoutid:1});
      }else{
        this.setState({cpoutid:0});
      }
    }

    _Switchcpb(value){
      this.setState({Swichb:value})
      if(value == true){
        this.setState({scoutid:1});
      }else{
        this.setState({scoutid:0});
      }
    }

    _Switchcpc(value){
      this.setState({Swichc:value})
      if(value == true){
        this.setState({pjoutid:1});
      }else{
        this.setState({pjoutid:0});
      }
    }

    _Swichwlcg(value){
      this.setState({Swichwlcg:value})
      if(value == true){
        this.setState({pjcgid:1})
      }else{
        this.setState({pjcgid:0})
      }
    }

    _Swichxtsc(value){
      this.setState({Swichxtsc:value,})
      if(value == true){
        this.setState({xtsc:1})
      }else{
        this.setState({xtsc:0})
      }
    }

    _Swichxtwlcg(value){
      this.setState({Swichxtwlcg:value,})
      if(value == true){
        this.setState({wlcgid:1})
      }else{
        this.setState({wlcgid:0})
      }
    }

    ZQD(){
      this.setState({
        modalzqd:true,
      })
    }
    _cancerZQD(){
      this.setState({
        modalzqd:false,
      })
    }

    _selecti(data){
      this.setState({
        modalzqd:false,
        ZQName:data.number,
        ZQID:data.id,
      })
    }

    selectPro(){
      this.setState({
        modalPro:true,
      })
    }

    _cancerPro(){
      this.setState({
        modalPro:false,
      })
    }

    _selectj(data){
      this.setState({
        modalPro:false,
        Proname:data.pro_name,
        ProID:data.id,
      })
    }

    onDateChange(date) {

        this.setState({date: date});
    }

       _datetime(){

            Animated.timing(
    				this.state.bottom,
    				{
    				  toValue: 0,
    				  duration: 200,
    				},

    			  ).start();
            this.setState({
          	     add:!this.state.add,
                 timesshow:true,
            });
       }

       _cancle(){

       	    Animated.timing(
    				this.state.bottom,
    				{
    				  toValue: -260,
    				  duration: 200,
    				},

    			  ).start();
       	    Animated.timing(
    				this.state.bottom1,
    				{
    				  toValue: -260,
    				  duration: 200,
    				},

    			  ).start();
       	    this.setState({
          	     add:!this.state.add,
            });
       }


       _finish(){

          this.setState({
          	 result: this.state.date.getFullYear()+'-'+this.Gdate((this.state.date.getMonth()+1))+'-'+this.Gdate(this.state.date.getDate()),
             date:new Date(),
             add:false,
            });
           Animated.timing(
    				this.state.bottom,
    				{
    				  toValue: -260,
    				  duration: 200,
    				},

    			  ).start();
       }

       _finish1(){

          this.setState({
          	 result1: this.state.date.getFullYear()+'-'+this.Gdate((this.state.date.getMonth()+1))+'-'+this.Gdate(this.state.date.getDate()),
             date:new Date(),
             add:false,
            });
           Animated.timing(
    				this.state.bottom1,
    				{
    				  toValue: -260,
    				  duration: 200,
    				},

    			  ).start();
       }

       _datetime1(){
            Animated.timing(
    				this.state.bottom1,
    				{
    				  toValue: 0,
    				  duration: 200,
    				},

    			  ).start();
            this.setState({
          	     add:!this.state.add,
                 timesshowa:true,
            });
       }

       _adds(){
    		this.setState({add:false,})
    		 Animated.timing(
    				this.state.bottom1,
    				{
    				  toValue: -260,
    				  duration: 200,
    				},

    			  ).start();

    		 Animated.timing(
    				this.state.bottom,
    				{
    				  toValue: -260,
    				  duration: 200,
    				},

    			  ).start();
    	}

      Gdate(n){
    		if(n<10){
    			 return '0'+n;
    		}
    		 else{
    		     return ''+n;
    		}
    	}

      _addPro(i){
        this.setState({
          modaladdPro:true,
          MAPSCROLLINDEX:i,
        })
      }

      _canceraddPro(){
        this.setState({
          modaladdPro:false,
        })
      }

      _selectYes(data){
        var totalNum = 0;
        var totals = 0;
        var maintotals = 0;
        var that = this;
        var NUMSD = 0;
        var SHNUMS = 0;
        var SHMAIN = 0;
        XSJData=[];
        TotalNum=[];
        XSNUMData=[];
        BXQNUMData=[];
        SLIDValues=[];
        BXDYDATA=[];
        SLDATAS=[];
        DW_ID=[];
        DW_name=[];
        SL=[];
        ProSH=[];
        DW_relation=[];
        BXQ=[];
        SHDATAS=[];
        BXQValues=[];
        MAPSCROLL[this.state.INDEXMAP]=data.Data;
        MAPSCROLLIndexs[this.state.INDEXMAP]=data.Index;
        MAPDATAOBJ[this.state.INDEXMAP]=data;
        data.Data.map((datas,i)=>{
          BXQ.push('默认');
          BXQValues.push(0);
          SLIDValues.push('');
          ProSH.push(0);
          SL.push('');
          DW_ID.push(datas.unitarr[0].id);
          DW_relation.push(datas.unitarr[0].relation);
          SHDATAS.push(1);
          BXDYDATA.push('');
          DW_name.push(datas.unitarr[0].unitname);
          XSJData.push(datas.sellPrice);
          TotalNum.push(datas.sellPrice);
          NUMINDEX.push(1);
          XSNUMData.push(1);
          BXQNUMData.push(1);
          SLDATAS.push('请选择税率');
          BXQshows.push(false);
          DWIDS[this.state.INDEXMAP]=DW_ID;
          DWRELATION[this.state.INDEXMAP]=DW_relation;
          DWNAME[this.state.INDEXMAP]=DW_name;
          SHMAINNUM[this.state.INDEXMAP]=SHDATAS;
          ProSHDATA[this.state.INDEXMAP]=ProSH;
          BXDY[this.state.INDEXMAP]=BXDYDATA;
          SLSDATA[this.state.INDEXMAP]=SL;
          SLIDData[this.state.INDEXMAP]=SLIDValues;
          BXQValuesName[this.state.INDEXMAP]=BXQ;
          BXQValuesData[this.state.INDEXMAP]=BXQValues;
          moreTotals[this.state.INDEXMAP]=TotalNum;
          moreTotalsNUM[this.state.INDEXMAP]=XSNUMData;
          SCROLLXSJDATA[this.state.INDEXMAP]=XSJData;
          SCROLLXSNUMData[this.state.INDEXMAP]=XSNUMData;
          SCROLLBXQNUMData[this.state.INDEXMAP]=BXQNUMData;
          SLDATAMAIN[this.state.INDEXMAP]=SLDATAS;
          if(i == data.Data.length-1){

            XSJData.forEach((nums,j)=>{
              totals += Number(nums);
              if(j == XSJData.length-1){
                MainTotalsNum[that.state.INDEXMAP]=Number(totals);
                console.log(MainTotalsNum)
                MainTotalsNum.forEach((mains,k)=>{
                  maintotals += Number(mains);
                  if(k == MainTotalsNum.length-1){
                    that.setState({SCROLLMianTotals:maintotals});
                  }

                });

              }
            })
            SCROLLXSNUMData[this.state.INDEXMAP].forEach((nums,j)=>{
              totalNum += Number(nums);
              if(j == SCROLLXSNUMData[this.state.INDEXMAP].length-1){
                MainTotalsNumINDEX[this.state.INDEXMAP]=Number(totalNum);
                MainTotalsNumINDEX.forEach((mains,k)=>{
                  NUMSD += Number(mains);
                  if(k == MainTotalsNumINDEX.length-1){
                    that.setState({SCROLLMianTotalsNUM:NUMSD});
                  }
                });
              }
            })
            SHMAINNUM[this.state.INDEXMAP].forEach((datak,s)=>{
              SHNUMS += Number(datak);
              if(s == SHMAINNUM[this.state.INDEXMAP].length-1){
                SHMAINDADANUM[this.state.INDEXMAP]=Number(SHNUMS);
                SHMAINDADANUM.forEach((num,k)=>{
                  SHMAIN += Number(num);
                  if(k == SHMAINDADANUM.length-1){
                    this.setState({SHNUMS:SHMAIN});
                  }
                })
              }
            })

            that.setState({BXQData:BXQValuesName,BXQshow:BXQshows,XSJData:XSJData,XSNUMData:XSNUMData,BXQNUMData:BXQNUMData,SLName:SLDATAMAIN,SCROLLXSJDATA:SCROLLXSJDATA,SCROLLXSNUMData:SCROLLXSNUMData,SCROLLBXQNUMData:SCROLLBXQNUMData,BXDY:BXDY,});
          }


        })
        this.setState({
          modaladdPro:false,
          ProjectData:data,
          ProArray:data.Data,
          ProIndex:data.Index,
          MAPSCROLL:MAPSCROLL,
          DWNAME:DWNAME,
          ProSHDATA:ProSHDATA,
          defaultValues:'',
        })
      }

      deletePro(i){
        var that = this;
        var ArrayIndex = [];
        var Arrays = [];
        var objs = {};
        var totalNum = 0;
        var totals = 0;
        var maintotals = 0;
        var SHNUMS = 0;
        var SHMAIN = 0;
        var that = this;
        var TotalNum = moreTotals[this.state.INDEXMAP];
        var XSJData = [];
        var XSNUMData = [];
        var BXQNUMData = [];
        var BXDYDATA = [];
        var NUMSD = 0;
        var ProSH = [];
        var SHDATAS = [];
        var DW_ID = [];
        var SL = [];
        var DW_relation = [];
        var DW_name = [];
        Arrays = this.state.MAPSCROLL[this.state.INDEXMAP];
        ArrayIndex = MAPSCROLLIndexs[this.state.INDEXMAP];
        XSJData = this.state.SCROLLXSJDATA[this.state.INDEXMAP];
        XSNUMData = this.state.SCROLLXSNUMData[this.state.INDEXMAP];
        BXQNUMData = this.state.SCROLLBXQNUMData[this.state.INDEXMAP];
        BXDYDATA = BXDY[this.state.INDEXMAP];
        ProSH = ProSHDATA[this.state.INDEXMAP];
        SHDATAS = SHMAINNUM[this.state.INDEXMAP];
        SL =   SLSDATA[this.state.INDEXMAP];
        DW_relation = DWRELATION[this.state.INDEXMAP];
        DW_name = DWNAME[this.state.INDEXMAP];
        DW_ID = DWIDS[this.state.INDEXMAP];
        Alert.alert(
          '操作',
          '确定移除？',
          [
            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () => {
              Arrays.splice(i,1);
              ArrayIndex.splice(i,1);
              XSJData.splice(i,1);
              BXQ.splice(i,1);
              TotalNum.splice(i,1);
              SLIDValues.splice(i,1);
              XSNUMData.splice(i,1);
              BXQNUMData.splice(i,1);
              SLDATAS.splice(i,1);
              DW_name.splice(i,1);
              BXQValues.splice(i,1);
              SL.splice(i,1);
              DW_relation.splice(i,1);
              BXDYDATA.splice(i,1);
              ProSH.splice(i,1);
              DW_ID.splice(i,1);
              SHDATAS.splice(i,1);
              DWIDS[this.state.INDEXMAP]=DW_ID;
              DWRELATION[this.state.INDEXMAP]=DW_relation;
              SHMAINNUM[this.state.INDEXMAP]=SHDATAS;
              SLSDATA[this.state.INDEXMAP]=SL;
              ProSHDATA[this.state.INDEXMAP]=ProSH;
              BXDY[this.state.INDEXMAP]=BXDYDATA;
              DWNAME[this.state.INDEXMAP]=DW_name;
              SLIDData[this.state.INDEXMAP]=SLIDValues;
              BXQValuesName[this.state.MAPSCROLLINDEX]=BXQ;
              BXQValuesData[this.state.MAPSCROLLINDEX]=BXQValues;
              moreTotals[this.state.INDEXMAP]=TotalNum;
              SCROLLXSJDATA[this.state.INDEXMAP]=XSJData;
              SCROLLXSNUMData[this.state.INDEXMAP]=XSNUMData;
              SCROLLBXQNUMData[this.state.INDEXMAP]=BXQNUMData;
              objs={'Data':Arrays,'Index':ArrayIndex}
              MAPSCROLL[this.state.INDEXMAP]=Arrays;
              MAPSCROLLIndexs[this.state.INDEXMAP]=ArrayIndex;
              MAPDATAOBJ[this.state.INDEXMAP]=objs;
              SLDATAMAIN[this.state.MAPSCROLLINDEX]=SLDATAS;
              moreTotals[this.state.INDEXMAP].forEach((nums,j)=>{
                totals += Number(nums);
                if(j == moreTotals[this.state.INDEXMAP].length-1){
                  MainTotalsNum[that.state.INDEXMAP]=totals;
                  MainTotalsNum.forEach((mains,k)=>{
                    maintotals += Number(mains);
                    if(k == MainTotalsNum.length-1){
                      that.setState({SCROLLMianTotals:maintotals});
                    }
                  });
                }
              })
              SCROLLXSNUMData[this.state.INDEXMAP].forEach((nums,j)=>{
                totalNum += Number(nums);
                if(j == SCROLLXSNUMData[this.state.INDEXMAP].length-1){
                  MainTotalsNumINDEX[this.state.INDEXMAP]=Number(totalNum);
                  MainTotalsNumINDEX.forEach((mains,k)=>{
                    NUMSD += Number(mains);
                    if(k == MainTotalsNumINDEX.length-1){
                      that.setState({SCROLLMianTotalsNUM:NUMSD});
                    }
                  });
                }
              })
              SHMAINNUM[this.state.INDEXMAP].forEach((data,s)=>{
                SHNUMS += Number(data);
                if(s == SHMAINNUM[this.state.INDEXMAP].length-1){
                  SHMAINDADANUM[this.state.INDEXMAP]=Number(SHNUMS);
                  SHMAINDADANUM.forEach((num,k)=>{
                    SHMAIN += Number(num);
                    if(k == SHMAINDADANUM.length-1){
                      this.setState({SHNUMS:SHMAIN});
                    }
                  })
                }
              });

              that.setState({BXQData:BXQValuesName,ProArray:Arrays,ProIndex:ArrayIndex,ProjectData:objs,XSJData:XSJData,XSNUMData:XSNUMData,BXQNUMData:BXQNUMData,SLName:SLDATAMAIN,SCROLLXSJDATA:SCROLLXSJDATA,SCROLLXSNUMData:SCROLLXSNUMData,SCROLLBXQNUMData:SCROLLBXQNUMData,MAPSCROLL:MAPSCROLL,ProSHDATA:ProSHDATA,DWNAME:DWNAME,BXDY:BXDY,})
            }},
          ],
          { cancelable: false }
        )

      }

      selectBXQ(i){
        this.setState({shows:true,BXQIndex:i,});
        var that = this;
        Picker.init({
          pickerData: ['默认','天','月','年'],
          pickerTitleText: '选择',
          pickerToolBarFontSize: 16,
                pickerFontSize: 16,
                pickerFontColor: [0, 0 ,0, 1],
                onPickerConfirm: pickedValue => {
                  BXQValuesName[this.state.INDEXMAP][i] = pickedValue;
                  if(pickedValue == '默认'){
                    BXQValuesData[this.state.INDEXMAP][i]=0;
                    BXQshows[i] = false;
                  }else if(pickedValue == '天'){
                    BXQValuesData[this.state.INDEXMAP][i]=1;
                    BXQshows[i] = true;
                  }else if(pickedValue == '月'){
                    BXQValuesData[this.state.INDEXMAP][i]=2;
                    BXQshows[i] = true;
                  }else if(pickedValue == '年'){
                    BXQValuesData[this.state.INDEXMAP][i]=3;
                    BXQshows[i] = true;
                  }else{
                    BXQshows[i] = true;
                  }
                  this.setState({BXQData:BXQValuesName,shows:false,BXQshow:BXQshows});

                },
                onPickerCancel: pickedValue => {
                     that.setState({shows:false});
                },
                onPickerSelect: pickedValue => {

                }
            });
            Picker.show();
      }

      Onclick1(i,data){
        var totals = 0;
        var maintotals = 0;
        var maintotals = 0;
        var that = this;
        var XSJData = [];
        if(this.state.INDEXMAP != null){
          XSJData = SCROLLXSJDATA[this.state.INDEXMAP];
          SCROLLXSJDATA[this.state.INDEXMAP][i]=data;
          console.log(SCROLLXSJDATA)
          console.log(moreTotals)
          moreTotals[this.state.INDEXMAP][i]=Number(SCROLLXSJDATA[this.state.INDEXMAP][i])*Number(SCROLLXSNUMData[this.state.INDEXMAP][i]);

          moreTotals[this.state.INDEXMAP].forEach((nums,j)=>{
            totals += Number(nums);
            if(j == moreTotals[this.state.INDEXMAP].length-1){
              MainTotalsNum[that.state.INDEXMAP]=Number(totals);
              console.log(MainTotalsNum)
              MainTotalsNum.forEach((mains,k)=>{
                maintotals += Number(mains);
                that.setState({SCROLLMianTotals:maintotals});
              });
            }
          })
          SCROLLXSJDATA[this.state.INDEXMAP]=XSJData;

          this.setState({XSJData:XSJData,SCROLLXSJDATA:SCROLLXSJDATA,});
       }
      }
      Onclick2(i,data){
        var totalNum = 0;
        var totals = 0;
        var maintotals = 0;
        var NUMSD = 0;
        var SHNUMS = 0;
        var SHMAIN = 0;
        var XSJData = [];
        var that = this;
        XSNUMData = [];
        if(this.state.INDEXMAP != null){
        XSNUMData = SCROLLXSNUMData[this.state.INDEXMAP];
        XSJData = SCROLLXSJDATA[this.state.INDEXMAP];
        SCROLLXSNUMData[this.state.INDEXMAP][i]=Number(data);
        moreTotals[this.state.INDEXMAP][i]=Number(SCROLLXSJDATA[this.state.INDEXMAP][i])*Number(SCROLLXSNUMData[this.state.INDEXMAP][i]);
        SHMAINNUM[this.state.INDEXMAP][i]=Number(ProSHDATA[this.state.INDEXMAP][i])+Number(SCROLLXSNUMData[this.state.INDEXMAP][i]);
        SHMAINNUM[this.state.INDEXMAP].forEach((data,s)=>{
          SHNUMS += Number(data);
          if(s == SHMAINNUM[this.state.INDEXMAP].length-1){
            SHMAINDADANUM[this.state.INDEXMAP]=Number(SHNUMS);
            SHMAINDADANUM.forEach((num,k)=>{
              SHMAIN += Number(num);
              if(k == SHMAINDADANUM.length-1){
                this.setState({SHNUMS:SHMAIN});
              }
            })
          }
        });
        SCROLLXSNUMData[this.state.INDEXMAP].forEach((nums,j)=>{
          totalNum += Number(nums);
          if(j == SCROLLXSNUMData[this.state.INDEXMAP].length-1){
            MainTotalsNumINDEX[this.state.INDEXMAP]=Number(totalNum);
            MainTotalsNumINDEX.forEach((mains,k)=>{
              NUMSD += Number(mains);
              if(k == MainTotalsNumINDEX.length-1){
                that.setState({SCROLLMianTotalsNUM:NUMSD});
              }
            });
          }
        })
        moreTotals[this.state.INDEXMAP].forEach((nums,j)=>{
          totals += Number(nums);
          if(j == moreTotals[this.state.INDEXMAP].length-1){
            MainTotalsNum[that.state.INDEXMAP]=Number(totals);
            console.log(MainTotalsNum)
            MainTotalsNum.forEach((mains,k)=>{
              maintotals += Number(mains);
              if(k == MainTotalsNum.length-1){
                that.setState({SCROLLMianTotals:maintotals});
              }
            });
          }
        })
        SCROLLXSNUMData[this.state.INDEXMAP]=XSNUMData;
        this.setState({XSNUMData:XSNUMData,SCROLLXSNUMData:SCROLLXSNUMData,});
      }
      }
      Onclick3(i,data){
        if(this.state.INDEXMAP != null){
            BXQNUMData[i]=data;
            SCROLLBXQNUMData[this.state.INDEXMAP]=BXQNUMData;
            this.setState({BXQNUMData:BXQNUMData,SCROLLBXQNUMData:SCROLLBXQNUMData,});
          }
      }
      Onclick4(data){
          if(this.state.ckname == '服务订单'){
            var NUM = Number(this.state.je)*Number(data)/100;
          }else{
            var NUM = Number(this.state.SCROLLMianTotals)*Number(data)/100;
          }
          if(this.state.ishl){
            this.setState({ZKNUM:data,ZKHTotals:0});
          }else{
            this.setState({ZKNUM:data,ZKHTotals:NUM.toFixed(2)});
          }


      }

      Onclick5(data){
        this.setState({HKNUM:data,});
      }

      Onclick6(i,data){
        var SHNUMS = 0;
        var SHMAIN = 0;
         if(this.state.INDEXMAP != null){
           ProSHDATA[this.state.INDEXMAP][i]=data;
           SHMAINNUM[this.state.INDEXMAP][i]=Number(ProSHDATA[this.state.INDEXMAP][i])+Number(SCROLLXSNUMData[this.state.INDEXMAP][i]);
           SHMAINNUM[this.state.INDEXMAP].forEach((data,s)=>{
             SHNUMS += Number(data);
             if(s == SHMAINNUM[this.state.INDEXMAP].length-1){
               SHMAINDADANUM[this.state.INDEXMAP]=Number(SHNUMS);
               SHMAINDADANUM.forEach((num,k)=>{
                 SHMAIN += Number(num);
                 if(k == SHMAINDADANUM.length-1){
                   this.setState({SHNUMS:SHMAIN});
                 }
               })
             }
           });
           this.setState({ProSHDATA:ProSHDATA,})
         }
      }

      selectSL(j){
        this.setState({shows:true,SLIndex:j,});
        var that = this;
        Picker.init({
          pickerData: this.state.SLData,
          pickerTitleText: '选择',
          pickerToolBarFontSize: 16,
                pickerFontSize: 16,
                pickerFontColor: [0, 0 ,0, 1],
                onPickerConfirm: pickedValue => {
                  SLDATAMAIN[this.state.INDEXMAP][j]=pickedValue;
                  this.setState({SLName:SLDATAMAIN,shows:false,});
                  this.state.SLDATAS.map((data,i)=>{
                    if(data.taxRate+' '+data.state == pickedValue){
                      SLSDATA[this.state.INDEXMAP][j]=data.taxRate;
                      SLIDData[this.state.INDEXMAP][j]=data.id;
                      this.setState({SLID:SLIDData,SLSDATA})
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

      btnPros(i){
        scrollData = [];
        this.state.MAPData.map((data,j)=>{
          scrollData.push(false);
          scrollData[i]=true;
          this.setState({
            INDEXMAP:i,
            scrollData:scrollData,
            Scrollshows:false,
            MAPMAIN:true,
            ProjectData:MAPDATAOBJ[i],
            ProArray:this.state.MAPSCROLL[i],
            ProIndex:MAPSCROLLIndexs[i],
          })

        })
      }
      btnXX(){
        scrollData = [];
        this.state.MAPData.map((data,j)=>{
          scrollData.push(false);
          this.setState({scrollData:scrollData,Scrollshows:true,MAPMAIN:false})
        })
      }

      scrollDelete(i){
        var NUMSD = 0;
        var maintotals = 0;
        var that = this;
        MAPData.splice(i,1);
        MAPSCROLL.splice(i,1);
        scrollData.splice(i,1);
        moreTotals.splice(i,1);
        MAPDATAOBJ.splice(i,1);
        SCROLLXSJDATA.splice(i,1);
        MAPSCROLLIndexs.splice(i,1);
        MainTotalsNum.splice(i,1);
        SCROLLXSNUMData.splice(i,1);
        SCROLLBXQNUMData.splice(i,1);
        SLDATAMAIN.splice(i,1);
        BXQValuesData.splice(i,1);
        BXQValuesName.splice(i,1);
        SLIDData.splice(i,1);
        BXDY.splice(i,1);
        DWIDS.splice(i,1);
        DateTimes.splice(i,1);
        DWRELATION.splice(i,1);
        ProSHDATA.splice(i,1);
        MainTotalsNumINDEX.splice(i,1);
        SHMAINDADANUM.splice(i,1);
        SHMAINNUM.splice(i,1);
        SLSDATA.splice(i,1);
        DWNAME.splice(i,1);
        scrollData[0]=true;

        MainTotalsNumINDEX.forEach((mains,k)=>{
          NUMSD += Number(mains);
          if(k == MainTotalsNumINDEX.length-1){
            that.setState({SCROLLMianTotalsNUM:NUMSD});
          }
        });

        MainTotalsNum.forEach((mains,k)=>{
          maintotals += Number(mains);
          if(k == MainTotalsNum.length-1){
            that.setState({SCROLLMianTotals:maintotals});
          }
        });
        SHMAINDADANUM.forEach((num,k)=>{
          SHMAIN += Number(num);
          if(k == SHMAINDADANUM.length-1){
            this.setState({SHNUMS:SHMAIN});
          }
        })
        this.setState({MAPData:MAPData,MAPSCROLL:MAPSCROLL,SCROLLXSJDATA:SCROLLXSJDATA,INDEXMAP:i-1,DWNAME:DWNAME,BXDY:BXDY,})
        if(MAPData.length == 0){
          scrollData = [];
          this.setState({scrollData:scrollData,Scrollshows:true,MAPMAIN:false,SCROLLMianTotals:0,SCROLLMianTotalsNUM:0,INDEXMAP:null,DateTimes:DateTimes,ProSHDATA:ProSHDATA,SHNUMS:0,ZKHTotals:0,})
        }

      }

      _SwitchYQHK(value){
        this.setState({SwitchYQHK:value});
      }
      TJHK(){
        this.setState({modalTJ:true,})
      }
      _cancerTJ(){
        this.setState({modalTJ:false,})
      }
      HKGET(){
        this.setState({shows:true});
        var that = this;
        Picker.init({
          pickerData: this.state.HKDATA,
          pickerTitleText: '选择',
          pickerToolBarFontSize: 16,
                pickerFontSize: 16,
                pickerFontColor: [0, 0 ,0, 1],
                onPickerConfirm: pickedValue => {
                  this.setState({HKname:pickedValue,shows:false,});
                  this.state.MainData.hktype.forEach((data,i)=>{
                    if(data.method == pickedValue){
                      this.setState({HKID:data.id});
                    }
                  });
                },
                onPickerCancel: pickedValue => {
                     that.setState({shows:false});
                },
                onPickerSelect: pickedValue => {

                }
            });
            Picker.show();
      }

      changs(text,j){
        BXDY[this.state.INDEXMAP][j]=text;
        this.setState({BXDY:BXDY,})
      }

      changtimea(date,i){
        DateTimes[this.state.INDEXMAP][0]=date;
        this.setState({DateTimes:DateTimes,})
      }
      changtimeb(date,i){
        DateTimes[this.state.INDEXMAP][1]=date;
        this.setState({DateTimes:DateTimes,})
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

      sent(){
        
        var arr = [];
        var arrs = [];
        var sum = [];
        var obj = {};
        var mapobj=[];
        var that = this;
        ISTJ = false;
        var ISSENT = false;
        var foreign_currency = {};
        console.log('' + that.state.domain + '/index.php?app=Invoicimg&m=SaleMobile&a=addsale&access_token=' + that.state.token + '')
        if(this.state.shName == '选择审核人'){
          ToastAndroid.show('请选择审核人', ToastAndroid.SHORT);
          return false;
        }else if( this.state.bxObj == '选择客户'){
          ToastAndroid.show('请选择客户', ToastAndroid.SHORT);
          return false;
        }else if( this.state.MAPData.length == 0){
          ToastAndroid.show('请选择地址', ToastAndroid.SHORT);
          return false;
        }else if( this.state.DDname == '赊销' &&  this.state.ZQName == ''){
          ToastAndroid.show('请选择周期单', ToastAndroid.SHORT);
          return false;
        }else if(this.state.ckname == '服务订单' && this.state.result == '请选择(必填)'){
          ToastAndroid.show('请选择开始时间', ToastAndroid.SHORT);
          return false;
        }else if(this.state.ckname == '服务订单' && this.state.result1 == '请选择(必填)'){
          ToastAndroid.show('请选择结束时间', ToastAndroid.SHORT);
          return false;
        }else if(this.state.ckname == '服务订单' && (new Date(this.state.result.replace(/-/g,"\/"))) > (new Date(this.state.result1.replace(/-/g,"\/")))){
          ToastAndroid.show('开始时间不能大于结束时间', ToastAndroid.SHORT);
    			return false;
    		}else if(this.state.ckname == '服务订单' && this.state.je == ''){
          ToastAndroid.show('请填写金额', ToastAndroid.SHORT);
          return false;
        }else if(this.state.SwitchYQHK == true && this.state.date1 == ''){
          ToastAndroid.show('请选择回款起始时间', ToastAndroid.SHORT);
          return false;
        }else if(this.state.SwitchYQHK == true && this.state.date2 == ''){
          ToastAndroid.show('请选择回款结束时间', ToastAndroid.SHORT);
          return false;
        }else if(this.state.SwitchYQHK == true && (new Date(this.state.date1.replace(/-/g,"\/"))) > (new Date(this.state.date2.replace(/-/g,"\/")))){
          ToastAndroid.show('回款起始时间不能大于结束时间', ToastAndroid.SHORT);
    			return false;
    		}else if(this.state.SwitchYQHK == true && this.state.HKname == ''){
          ToastAndroid.show('请选择回款方式', ToastAndroid.SHORT);
    			return false;
        }else if(this.state.ZDYShow && this.state.ZDY1name == ''){
          ToastAndroid.show('请填写自定义信息', ToastAndroid.SHORT);
    			return false;
        }else if(this.state.ZDYShow && this.state.ZDY2name == ''){
          ToastAndroid.show('请填写自定义信息', ToastAndroid.SHORT);
    			return false;
        }else if(this.state.htfj && this.state.typefy == ''){
          ToastAndroid.show('请选择合同附件', ToastAndroid.SHORT);
    			return false;
        }else{
		  var type = this.state.typename.split("/")[this.state.typename.split("/").length-1]; 
          var file = {uri: this.state.typename, type: 'multipart/form-data', name:encodeURI(type)};	

          if(this.state.SwitchYQHK == true ){
            var return_money_info={
                   custom_id:that.state.projectid,
                   money:this.state.HKNUM,
                   remark:this.state.textaeras,
                   return_start:this.state.date1,
                   return_time:this.state.date2,
                   type:this.state.HKID
                };
          }else{
            var return_money_info='';
          }

          if(this.state.ckname != '服务订单') {
            if(this.state.HLname == '元'){
              foreign_currency='';
            }else{
            foreign_currency={
              'money_cr':this.state.hlmoney,
              'money_name':this.state.HLname,
              'money_gw':this.state.hlmoneys
            }
          }
            mapobj='';

          this.state.MAPData.forEach((data,i)=>{
            console.log(that.state.MAPSCROLL[i])
           ISTJ = false;
            var numsIndex = Number(i)+Number(1);
            if(that.state.DateTimes[i][0] == ''){
              ToastAndroid.show("请选择地址"+numsIndex+"交货日期", ToastAndroid.SHORT);
        			return false;
            }else if(that.state.DateTimes[i][1] == ''){
              ToastAndroid.show("请选择地址"+numsIndex+"交货日期", ToastAndroid.SHORT);
        			return false;
            }else{
              var objs={
                address_info:{'address':data.address,'area':data.area,'areas':data.areas,'ckeck':data.ckeck,'createtime':data.createtime,'custom_id':data.custom_id,'email':data.email,'id':data.id,'mobile':data.mobile,'phone':data.phone,'receiver':data.receiver,'remark':data.remark,'sort':data.sort,'userid':data.userid},
                'data':[],
                'count_price':MainTotalsNum[i],
                'num':SHMAINDADANUM[i],
                'time':that.state.DateTimes[i][0],
                'timeend':that.state.DateTimes[i][1],
              }
              arr.push(objs);
            }
            if(that.state.MAPSCROLL[i].length == 0){
              ToastAndroid.show("请添加产品", ToastAndroid.SHORT);
              return false;
            }else{
            that.state.MAPSCROLL[i].forEach((info,j)=>{
              ISTJ = false;
              if(this.state.SLName[i][j] == '请选择税率'){
                ToastAndroid.show("请选择税率", ToastAndroid.SHORT);
                ISSENT=true;
                return false;
              }else if(this.state.BXDY[i][j] == ''){
                ToastAndroid.show('请输入'+this.state.BXNAME+'值', ToastAndroid.SHORT);
                ISSENT=true;
                return false;
              }else{
              var DW = {'id':info.id,'purchasePrice':that.state.SCROLLXSJDATA[i][j],'relation':DWRELATION[i][j],'stornNum':that.state.SCROLLXSNUMData[i][j],'tax_rate':SLSDATA[i][j],'tax_rateid':that.state.SLID[i][j],'unit':DWIDS[i][j],'wastage':that.state.ProSHDATA[i][j],};

              sum.forEach((sinfo,k)=>{
                if(sinfo.unit == DWIDS[i][j] && sinfo.id == info.id){
                  ISTJ = true;
                  sum[k].stornNum = Number(sinfo.stornNum)+Number(that.state.SCROLLXSNUMData[i][j]);
                  sum[k].tax_rate = SLSDATA[i][j];
                  sum[k].tax_rateid = that.state.SLID[i][j];
                }
              })
                console.log(j)
              if(!ISTJ){
                sum.push(DW);
              }



              var PRO = {
                'afterdef1':this.state.BXDY[i][j],
                'def1':'',
                'def2':'',
                'def3':'',
                'default1': that.state.SCROLLBXQNUMData[i][j],
                'default2': BXQValuesData[i][j],
                'id': info.id,
                'purchasePrice': that.state.SCROLLXSJDATA[i][j],
                'relation': DWRELATION[i][j],
                'stornNum': that.state.SCROLLXSNUMData[i][j],
                'sycknum':0,
                'tax_rate':SLSDATA[i][j],
                'tax_rateid': that.state.SLID[i][j],
                'unit':DWIDS[i][j],
                'unitarr':[],
                'wastage':that.state.ProSHDATA[i][j],
                'xlharr':[],
                'xlhcode':'',
                'xlhtitle':'',
                'yuyue_batcharr':[],
                'yuyue_aerialarr':[],
                'yuyuekc':0
              };
              arr[i].data.push(PRO);
              if(i == this.state.MAPData.length-1 && j == that.state.MAPSCROLL[this.state.MAPData.length-1].length-1 && !ISSENT){
                console.log(arr);
                that.FecthData(foreign_currency,mapobj,return_money_info,arr,sum,file);

              }
            }

            })
          }
          });
        }else{
             mapobj=[{'address':this.state.mapsfwdd.address,
             'area':this.state.mapsfwdd.area,
             'areas':this.state.mapsfwdd.areas,
             'ckeck':this.state.mapsfwdd.ckeck,
             'createtime':this.state.mapsfwdd.createtime,
             'custom_id':this.state.mapsfwdd.custom_id,
             'email':this.state.mapsfwdd.email,
             'id':this.state.mapsfwdd.id,
             'mobile':this.state.mapsfwdd.mobile,
             'phone':this.state.mapsfwdd.phone,
             'receiver':this.state.mapsfwdd.receiver,
             'remark':this.state.mapsfwdd.remark,
             'sort':this.state.mapsfwdd.sort,
             'userid':this.state.mapsfwdd.userid}];

             foreign_currency='';
             that.FecthData(foreign_currency,mapobj,return_money_info,arr,sum,file);
        }


        }

      }

      FecthData(foreign_currency,mapobj,return_money_info,arr,sum,file){
        var that = this;
        var obs = {
              'noshenhe':0,
              'shenh_uid':that.state.nameID,
              'peroid':that.state.ZQID,
              'orsernum':that.state.HThao,
              'order': that.state.datetime,
              'iskp': that.state.ISKP,
              'ordertype': 2,
              'customval': that.state.projectid,
              'mark': that.state.result,
              'from': that.state.fromID,
              'count_price': that.state.SCROLLMianTotals,
              'num': that.state.SCROLLMianTotalsNUM,
              'default4': that.state.GLID,
              'sale_def1': that.state.ZDY1name,
              'sale_def2': that.state.ZDY2name,
              'proid': that.state.ProID,
              'promoney': that.state.je,
              'scid': that.state.xtsc,
              'wlcgid': that.state.wlcgid,
              'scoutid': that.state.scoutid,
              'addinhouse': that.state.addinhouse,
              'cpoutid': that.state.cpoutid,
              'pjcgid': that.state.pjcgid,
              'pjoutid': that.state.pjoutid,
              'foreign_currency':foreign_currency,
              'discount': that.state.ZKNUM,
              'default5':mapobj,
              'return_money_info':return_money_info,
              'choiceData':arr, 
              'sum_pro':sum

       }
       console.log(obs);
       console.log(JSON.stringify(obs));


        fetch('' + that.state.domain + '/index.php?app=Invoicimg&m=SaleMobile&a=addsale&access_token=' + that.state.token + '', {
           method: 'POST',
           headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
           },
           body: that.toQueryString({xyz:JSON.stringify(obs)})
         })
         .then(function (response) {
           return response.json();
         })
         .then(function (result) {
          console.log(result);
          if(result.xyz.statu == 1){
            ToastAndroid.show('提交成功', ToastAndroid.SHORT);
            const { navigator } = that.props;
            if(navigator) {
                navigator.pop();
            }
          }
   
         })
         .catch((error) => {
           console.log(error);
             ToastAndroid.show('提交失败', ToastAndroid.SHORT);
         })
      }


      selectDW(j,data){
        var arr = [];
        var that = this;
        this.setState({DW_DATA:data,SLIndex:j,shows:true,})
        data.forEach((info,i)=>{
          arr.push(info.unitname);
          that.setState({DWARR:arr,})
        })
        Picker.init({
          pickerData: arr,
          pickerTitleText: '选择',
          pickerToolBarFontSize: 16,
                pickerFontSize: 16,
                pickerFontColor: [0, 0 ,0, 1],
                onPickerConfirm: pickedValue => {
                  DWNAME[this.state.INDEXMAP][this.state.SLIndex]=pickedValue;
                  this.setState({DWNAME:DWNAME,shows:false,});DWRELATION
                  this.state.DW_DATA.map((data,i)=>{
                    if(data.unitname == pickedValue){
                      DWRELATION[this.state.INDEXMAP][this.state.SLIndex]=data.relation;
                      DWIDS[this.state.INDEXMAP][this.state.SLIndex]=data.id;

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

      changsJE(je){
        var num = Number(this.state.ZKNUM)*Number(je)/100;

        this.setState({je:je,ZKHTotals:num.toFixed(2)});
      }
      changsHL(hlmoney){
        var num=Number(this.state.SCROLLMianTotals) / Number(hlmoney);
        this.setState({hlmoneys:num.toFixed(2),hlmoney:hlmoney,})
      }









    render() {
      var that =this;
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
                               <Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>新增销售单</Text>
                         </View>
                     </View>
                     <View style={{flex:1,justifyContent:'center'}}>
                       <TouchableOpacity onPress={this.sent.bind(this)}>
                          <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
                            <Text style={{color:'white',fontSize:16,paddingRight:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>提交</Text>
                          </View>
                      </TouchableOpacity>
                     </View>
                 </View>
                 <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'column',width:70,borderRightWidth:1,borderColor:'#ececec',}}>
                       <TouchableHighlight underlayColor="#b9bbbe" onPress={this.btnXX.bind(this)} style={{height:50,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',}}>
                          <View><Text allowFontScaling={false} adjustsFontSizeToFit={false}>信息</Text></View>
                       </TouchableHighlight>
                       {this.state.MAPData.length != 0 && this.state.mapSHOWS ? this.state.MAPData.map((data,i)=>{
                         return <TouchableHighlight underlayColor="#b9bbbe" key={i} onPress={this.btnPros.bind(this,i)} style={{height:50,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',}}>
                            <View><Text allowFontScaling={false} adjustsFontSizeToFit={false}>地址{i+1}</Text></View>
                         </TouchableHighlight>
                       }) : null}
                    </View>
                    {this.state.Scrollshows ?  <KeyboardAvoidingView behavior='padding' style={{flex:1}}><ScrollView  automaticallyAdjustContentInsets={false}  style={{flex:1,backgroundColor:'#ececec',flexDirection:'column',}}>
                       <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              选择订单
                          </Text>
                          <TouchableOpacity onPress={this.DClass.bind(this)} activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                  {this.state.ckname}
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View>
                       <View style={{padding:10}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false}>基础信息</Text>
                       </View>


                       <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              销售单号
                          </Text>
                          <View style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                    {this.state.datetime}
                                </Text>
                            </View>

                          </View>
                       </View>
                       <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              审核人
                          </Text>
                          <TouchableOpacity onPress={this.sh.bind(this)}  activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                    {this.state.shName}
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View>
                       <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              选择客户
                          </Text>
                          <TouchableOpacity onPress={this.kh.bind(this)} activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {this.state.bxObj}
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View>
                       {this.state.ismap ? <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              选择地址
                          </Text>
                          {this.state.mapSHOWS ? <TouchableOpacity onPress={this.dz.bind(this)} activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                     已选择{this.state.MAPData.length}个地址
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity> : <TouchableOpacity onPress={this.dz.bind(this)} activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                     {this.state.address}
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>}
                       </View> : null}
                       {this.state.ismap ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              订单类型
                          </Text>
                          <TouchableOpacity onPress={this.xsClass.bind(this)} activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                  {this.state.DDname}
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View> : null}
                       {this.state.isZQ ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              选择周期单
                          </Text>
                          <TouchableOpacity onPress={this.ZQD.bind(this)} activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {this.state.ZQName}
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View> : null}
                       <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              关联订单
                          </Text>
                          <TouchableOpacity onPress={this.GLDD.bind(this)} activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   <HTMLView value={this.state.GLname} />
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View>
                       {this.state.FWDD ? <View style={{padding:10}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false}>交货时间</Text>
                       </View> : null}
                       {this.state.FWDD ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              开始时间
                          </Text>
                          <TouchableOpacity activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>
                                <DatePicker
                                  style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}
                                  date={this.state.result}
                                  mode="date"

                                  placeholder="开始时间"
                                  format="YYYY-MM-DD"
                                  minDate= {new Date()}
                                  androidMode="spinner"
                                  maxDate="2050-06-01"
                                  confirmBtnText="确定"
                                  cancelBtnText="取消"
                                  onDateChange={(date) => {this.setState({result: date})}}
                                />

                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View> : null}
                       {this.state.FWDD ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              结束时间
                          </Text>
                          <TouchableOpacity  activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                              <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>
                                <DatePicker
                                  style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}
                                  date={this.state.result1}
                                  mode="date"
                                  androidMode="spinner"
                                  placeholder="结束时间"
                                  format="YYYY-MM-DD"
                                  minDate= {new Date()}
                                  maxDate="2050-06-01"
                                  confirmBtnText="确定"
                                  cancelBtnText="取消"
                                  onDateChange={(date) => {this.setState({result1: date})}}


                                />

                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View> : null}
                       {this.state.FWDD ? <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>金额</Text>
                         <View style={{flex:1,}}>
                           <TextInput
                           underlineColorAndroid = 'transparent'
                           placeholder = '金额'
                           keyboardType = 'numeric'
                           placeholderTextColor = {'#ccc'}
                           onChangeText={(je) => this.changsJE.bind(this,je)()}
                           style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                         </View>
                       </View> : null}
                       {this.state.FWDD && this.state.selectXM ? <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              选择项目
                          </Text>
                          <TouchableOpacity onPress={this.selectPro.bind(this)} activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'left',paddingRight:15, alignItems:'center'}}>
                                   {this.state.Proname}
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View> : null}
                       <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:1}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>合同号</Text>
                         <View style={{flex:1,}}>
                           <TextInput
                           underlineColorAndroid = 'transparent'
                           placeholder = '输入合同号'
                           placeholderTextColor = {'#ccc'}
                           onChangeText={(HThao) => this.setState({HThao})}
                           style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                         </View>
                       </View>
                       <View style={{padding:10}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false}>财务信息</Text>
                       </View>
                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:0}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>新增预期回款</Text>
                           <Switch
                             onTintColor={'#4385f4'}
                             onValueChange={(value) => this._SwitchYQHK.bind(this,value)()}
                             value={this.state.SwitchYQHK} />
                           {this.state.SwitchYQHK ? <TouchableHighlight onPress={this.TJHK.bind(this)} underlayColor="#6d97de" style={{width:50,backgroundColor:'#4385f4',justifyContent:'center',alignItems:'center',height:30,borderRadius:3}}><View><Text allowFontScaling={false} style={{fontSize:14,color:'#fff'}}>添加</Text></View></TouchableHighlight> : null}
                       </View>
                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:1}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>开票</Text>
                           <Switch
                             onValueChange={(value) => this._SwitchKP.bind(this,value)()}
                             onTintColor={'#4385f4'}
                             value={this.state.SwitchKP} />
                       </View>
                       {this.state.ZKSHOW ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:60,backgroundColor:'#fff',padding:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false}>折扣</Text>
                          <View style={{width:120,flexDirection:'row',justifyContent:'center',alignItems:'center'}}><Input styles={{width:120,height:35,marginRight:10}} Onclick={this.Onclick4.bind(this)} max={'100'} min={'0'} num={String(this.state.ZKNUM)}/><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,marginRight:10}}>%</Text></View>
                       </View> : null}
                       {this.state.ishbshow ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                              货币
                          </Text>
                          <TouchableOpacity onPress={this.seleceHL.bind(this)} activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                            <View style={{flex:1,}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {this.state.HLname}
                                </Text>
                            </View>
                            <Icon name="ios-arrow-forward" color="#999"size={27}  />
                          </TouchableOpacity>
                       </View> : null}
                       {this.state.ishl ? <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1,paddingRight:20}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>汇率</Text>
                         <View style={{flex:1,}}>
                           <TextInput
                           ref='text'
                           defaultValue={this.state.hlmoney}
                           keyboardType = 'numeric'
                           underlineColorAndroid = 'transparent'
                           placeholderTextColor = {'#ccc'}
                           onChangeText={(hlmoney) => this.changsHL.bind(this,hlmoney)()}
                           style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',textAlign:'right',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                         </View>
                       </View> : null}
                       {this.state.moneyShow ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                         <View style={{flexDirection:'row',flex:1,justifyContent:'space-between'}}>
                            <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                                总价
                            </Text>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
                              <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center',color:'#f14747'}}>
                                      {this.state.SCROLLMianTotals}￥
                                  </Text>
                                  {this.state.ishl ? <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center',color:'#f14747'}}>
                                      /   {this.state.hlmoneys}{this.state.HLname}
                                  </Text> : null}
                              </View>


                            </View>
                         </View>

                       </View> : null}
                       {this.state.moneyShow ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>

                         <View style={{flexDirection:'row',flex:1,}}>
                            <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                                总数
                            </Text>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',}}>
                              <View style={{flex:1,}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center',color:'#f14747'}}>
                                      {this.state.SCROLLMianTotalsNUM}
                                  </Text>
                              </View>

                            </View>
                         </View>
                       </View> : null}
                      {!this.state.ishl ?  <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>
                         <View style={{flexDirection:'row',flex:1}}>
                            <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                                折扣总价
                            </Text>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',}}>
                              <View style={{flex:1,}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center',color:'#f14747'}}>
                                      {this.state.ZKHTotals}
                                  </Text>
                              </View>

                            </View>
                         </View>


                       </View> : null}
                       {this.state.SHSHOW ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:1}}>

                         <View style={{flexDirection:'row',flex:1,paddingLeft:10}}>
                            <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                                总数
                            </Text>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',}}>
                              <View style={{flex:1,}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center',color:'#f14747'}}>
                                      {this.state.SHNUMS}
                                  </Text>
                              </View>

                            </View>
                         </View>

                       </View>: null}
                       {this.state.xtTitle ? <View style={{padding:10}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false}>下推信息</Text>
                       </View> : null}
                       {this.state.isxta && !this.state.isSwichxtwlcg && !this.state.isSwichxtsc ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:1}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>自动创建入库单</Text>
                           <Switch
                             disabled={this.state.isswichShow || this.state.Swichxtsc || this.state.Swichxtwlcg}
                             onValueChange={(value) => this._Switchrk.bind(this,value)()}
                             onTintColor={'#4385f4'}
                             value={this.state.Switchrk} />
                       </View> : null}
                       {this.state.isxtb && !this.state.isswichShow ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:1}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>下推生产</Text>
                           <Switch
                             disabled={this.state.Switchrk || this.state.isSwichxtsc}
                             onValueChange={(value) => this._Swichxtsc.bind(this,value)()}
                             onTintColor={'#4385f4'}
                             value={this.state.Swichxtsc} />
                       </View> : null}
                       {this.state.isxtc && !this.state.isSwichxtwlcg && !this.state.isSwichxtsc && this.state.isshowxlh ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:1}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>生成序列号</Text>
                           <Switch
                             disabled={!this.state.Switchrk}
                             onTintColor={'#4385f4'}
                             value={false} />
                       </View> : null}
                       {this.state.isxtd && !this.state.isswichShow ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:1}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>下推物料采购</Text>
                           <Switch
                             disabled={this.state.Switchrk || this.state.isSwichxtwlcg}
                             onTintColor={'#4385f4'}
                             onValueChange={(value) => this._Swichxtwlcg.bind(this,value)()}
                             value={this.state.Swichxtwlcg} />
                       </View> : null}
                       {this.state.isxte ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:1}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>下推物料采购</Text>
                           <Switch
                             disabled={this.state.isSwitchwlcg}
                             onTintColor={'#4385f4'}
                             onValueChange={(value) => this._Swichwlcg.bind(this,value)()}
                             value={this.state.Swichwlcg} />
                       </View> : null}
                       {this.state.isxt ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:1}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>下推出库</Text>
                           <Switch
                             disabled={this.state.isswichShowa}
                             onTintColor={'#4385f4'}
                             onValueChange={(value) => this._Switchcp.bind(this,value)()}
                             value={this.state.Swicha} />
                       </View> : null}
                       {this.state.isxt1 ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:1}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>下推出库</Text>
                           <Switch
                             disabled={this.state.isswichShowb}
                             onTintColor={'#4385f4'}
                             onValueChange={(value) => this._Switchcpb.bind(this,value)()}
                             value={this.state.Swichb} />
                       </View> : null}
                       {this.state.isxt2 ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingLeft:10,paddingRight:10,height:50,marginTop:1}}>
                           <Text allowFontScaling={false} style={{color:'#333',fontSize:14}}>下推出库</Text>
                           <Switch
                             disabled={this.state.isswichShowc}
                             onTintColor={'#4385f4'}
                             onValueChange={(value) => this._Switchcpc.bind(this,value)()}
                             value={this.state.Swichc} />
                       </View> : null}
                       {this.state.ZDYShow ? <View>
                       <View style={{padding:10}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false}>自定义信息</Text>
                       </View>
                       <View  style={{padding:10,flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333'}}>{this.state.ZDY1}</Text>
                         <View style={{flex:1,}}>
                           <TextInput
                           underlineColorAndroid = 'transparent'
                           placeholder='请填写'
                           placeholderTextColor = {'#ccc'}
                           onChangeText={(ZDY1name) => this.setState({ZDY1name})}
                           style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                         </View>
                       </View><View  style={{padding:10,flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333'}}>{this.state.ZDY2}</Text>
                         <View style={{flex:1,}}>
                           <TextInput
                           underlineColorAndroid = 'transparent'
                           placeholder='请填写'
                           placeholderTextColor = {'#ccc'}
                           onChangeText={(ZDY2name) => this.setState({ZDY2name})}
                           style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                         </View>
                       </View>
                       </View> : null}
                       <View style={{padding:10}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false}>合同及备注</Text>
                       </View>
                       <View style={{padding:10,backgroundColor:'#fff'}}>
                             <TextInput
                           onChangeText={(textaera) => this.setState({textaera})}
                           multiline={true}
                           numberOfLines={5}
                           placeholderTextColor={'#ccc'}
                           style={{ color:'#666',fontSize:14,textAlignVertical:'top',height:100,}}
                           placeholder='请填写备注'
                           underlineColorAndroid={'transparent'}
                         />
                       </View>
                       <View style={{padding:10,flexDirection:'row',alignItems:'center',backgroundColor:'#fff',}}>
                            
                           <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                             <Image source={require('../imgs/photo.png')} style={{width: 70, height: 70,}} />
                         </TouchableOpacity>
						 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:10,flex:1}}>{this.state.typefy}</Text>
                       </View>


                    </ScrollView></KeyboardAvoidingView> : null}
                    {this.state.MAPMAIN ? this.state.MAPData.map((data,i)=>{
                      return this.state.scrollData[i] ? <View key={i} style={{flex:1}}><ScrollView   automaticallyAdjustContentInsets={false}  style={{flex:1,backgroundColor:'#ececec',flexDirection:'column',}}>
                          <View style={{flexDirection:'row',flex:1, paddingTop:16,paddingBottom:16,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#ececec'}}>
                             <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14,paddingLeft:10}}>
                                 地址
                             </Text>
                             <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                               <View style={{flex:1,}}>
                                   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                       {data.area}
                                   </Text>
                               </View>
                             </View>
                          </View>
                          <View>
                          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#ececec'}}>
                          <View style={{flex:1,height:49,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff'}}>

                            <View><DatePicker
                              style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}
                              date={this.state.DateTimes[i][0]}
                              mode="date"
                              placeholder="交货起始日期"
                              format="YYYY-MM-DD"
                              minDate= {new Date()}
                              androidMode="spinner"
                              maxDate="2050-06-01"
                              confirmBtnText="确定"
                              cancelBtnText="取消"

                              onDateChange={(date) => this.changtimea.bind(this,date,i)()}


                            /></View>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,}}>至</Text></View>
                            <View style={{flex:1,height:49,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',}}>

                              <View><DatePicker
                                style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}
                                date={this.state.DateTimes[i][1]}
                                mode="date"
                                placeholder="交货结束日期"
                                format="YYYY-MM-DD"
                                minDate= {new Date()}
                                androidMode="spinner"
                                maxDate="2050-06-01"
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                onDateChange={(date) => this.changtimeb.bind(this,date,i)()}


                              /></View>
                              </View>
                              </View>
                          {this.state.MAPSCROLL[i].length != 0 ? this.state.MAPSCROLL[i].map((data,j)=>{
                            return <View key={j} style={{flexDirection:'column',padding:10,backgroundColor:'#fff',margin:3}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingTop:10,paddingBottom:10}}>{data.name}</Text>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingTop:10,paddingBottom:10}}>规格型号：{data.code}</Text>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:40}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>销售价</Text>
                                  <View style={{width:120,}}><Input styles={{width:120,height:35}} Onclick={this.Onclick1.bind(this,j)} min={'0'}  num={this.state.SCROLLXSJDATA[i][j]}/></View>
                               </View>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingTop:10,paddingBottom:10}}>定价：{data.sellPrice}</Text>
                               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>销售数量 </Text>
                                  <View style={{width:120,height:40,flexDirection:'row',justifyContent:'center',alignItems:'center'}}><Input styles={{width:120,height:35}} Onclick={this.Onclick2.bind(this,j)} min={'1'} num={String(this.state.SCROLLXSNUMData[i][j])}/></View>
                               </View>
                               {this.state.SHSHOW ? <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>产品损耗</Text>
                                  <View style={{width:120,height:40,flexDirection:'row',justifyContent:'center',alignItems:'center'}}><Input styles={{width:120,height:35}} Onclick={this.Onclick6.bind(this,j)} min={'0'} num={String(this.state.ProSHDATA[i][j])}/></View>
                               </View> : null}
                               <View style={{flexDirection:'row',height:80,backgroundColor:'#fff',alignItems:'center',justifyContent:'space-between',}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14}}>
                                      保修期
                                  </Text>
                                  {this.state.BXQshow[j] ? <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',}}><Input  styles={{width:120,height:35}} Onclick={this.Onclick3.bind(this,j)} num={String(this.state.SCROLLBXQNUMData[i][j])}/></View> : null}
                                  <TouchableOpacity onPress={this.selectBXQ.bind(this,j)} activeOpacity={0.8} style={{width:45,flexDirection:'row',alignItems:'center',paddingRight:10,marginRight:15}}>
                                    <View style={{width:45,}}>
                                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                           {this.state.BXQData[i][j]}
                                        </Text>
                                    </View>
                                    <Icon name="ios-arrow-forward" color="#999"size={27}  />
                                  </TouchableOpacity>
                               </View>
                               <View style={{flexDirection:'row',height:40,backgroundColor:'#fff',alignItems:'center',justifyContent:'space-between',}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14}}>
                                      单位
                                  </Text>

                                  <TouchableOpacity onPress={this.selectDW.bind(this,j,data.unitarr)} activeOpacity={0.8} style={{flex:1,flexDirection:'row',alignItems:'center',paddingRight:5,}}>
                                    <View style={{flex:1,}}>
                                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                           {this.state.DWNAME[i][j]}
                                        </Text>
                                    </View>
                                    <Icon name="ios-arrow-forward" color="#999"size={27}  />
                                  </TouchableOpacity>
                               </View>
                               {this.state.SwitchKP ? <View style={{flexDirection:'row',height:40,backgroundColor:'#fff',alignItems:'center',justifyContent:'space-between',}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14}}>
                                      税率
                                  </Text>

                                  <TouchableOpacity onPress={this.selectSL.bind(this,j)} activeOpacity={0.8} style={{flex:1,flexDirection:'row',alignItems:'center',paddingRight:5,}}>
                                    <View style={{flex:1,}}>
                                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                           {this.state.SLName[i][j]}
                                        </Text>
                                    </View>
                                    <Icon name="ios-arrow-forward" color="#999"size={27}  />
                                  </TouchableOpacity>
                               </View> : null}

                               <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',}}>
                                 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14}}>{this.state.BXNAME}</Text>
                                 <View style={{flex:1,}}>
                                   <TextInput
                                   underlineColorAndroid = 'transparent'
                                   placeholder = {'输入'+this.state.BXNAME+'值'}
                                   defaultValue={this.state.BXDY[i][j]}
                                   keyboardType = 'numeric'
                                   placeholderTextColor = {'#ccc'}
                                   onChangeText={(text) => this.changs.bind(this,text,j)()}
                                   style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',flex:1,fontSize:14,paddingLeft:30,borderRadius:3}}/>
                                 </View>
                               </View>
                               <TouchableOpacity onPress={this.deletePro.bind(this,j)} style={{position:'absolute',right:10,top:20}}><View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#ed4040'}}>移除</Text></View></TouchableOpacity>
                            </View>
                          }) : <View style={{backgroundColor:'#fff',width:Dimensions.get('window').width-50,height:Dimensions.get('window').height-200,justifyContent:'center',alignItems:'center',position:'absolute',top:50,left:0}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16}}>请添加产品</Text></View>}
                          </View>
                      </ScrollView>
                      <View style={{flexDirection:'row',height:50,}}>
                          <TouchableHighlight onPress={this.scrollDelete.bind(this,i)} underlayColor="#de7a43" style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#de4343'}}><View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff'}}>移除</Text></View></TouchableHighlight>
                          <TouchableHighlight onPress={this._addPro.bind(this,i)} underlayColor="#ececec" style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ccc'}}><View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16}}>添加产品</Text></View></TouchableHighlight>
                      </View>
                      </View> : null
                    }) : null}
                 </View>


                   {this.state.shows ? <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(107, 107, 107, 0.43)',position:'absolute',top:0,left:0}}></View> : null}



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
        								  renderTabBar={()=><ScrollableTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
        								  tabBarPosition='overlayTop'
        								  tabBarInactiveTextColor ='#333'
        								  tabBarActiveTextColor ='#4385f4'
        								  tabBarUnderlineStyle={{backgroundColor: '#4385f4'}}
        								  tabBarTextStyle={{fontSize: 16}} 
        								>
        									<View  style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='我的客户'>
                                <AllCustomer3  _selectd={this._selectd.bind(this)}/>
        									</View>
      								    <View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='我参与的客户'>
                                <AllCustomer4  _selecte={this._selecte.bind(this)}/>
      								    </View>
                          <View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='下属的客户'>
                                <AllCustomer5  _selectf={this._selectf.bind(this)}/>
      								    </View>
                          <View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='下属参与的客户'>
                                <AllCustomer6  _selectg={this._selectg.bind(this)}/>
      								    </View>
                          {this.state.isAll ? <View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='所有客户'>
                                <AllCustomer11  _selecta={this._selecta.bind(this)}/>
      								    </View> : null}
        								</ScrollableTabView>
										<PassState navigator = {this.props.navigator} {...this.props}/>
           					   </Modal>
                       <Modal
          						  animationType={"slide"}
          						  transparent={false}
          						  visible={this.state.modalVisible}
          						  onRequestClose={() => {console.log("Modal has been closed.")}}
          						  >
          						  <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
          						     <View style={styles.card1}>
          								  <View style={{flex:1,justifyContent:'center'}}>
          										<TouchableOpacity onPress={this._xz.bind(this,false)}>
          											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
          													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
          											  </View>
          										</TouchableOpacity>
          								  </View>
          								  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

          											  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>选择地址</Text>

          								  </View>
          								  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

          								  </View>
          								</View>
          								<ScrollView>
                          {this.state.status ? <View style={{justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width,height:Dimensions.get('window').height-140,overflow:'hidden',position:'absolute',top:0,left:0,}}>
                    		    <View style={styles.loading}>
                                    <ActivityIndicator color="white"/>
                                    <Text style={styles.loadingTitle} allowFontScaling={false}>加载中……</Text>
                                </View>
                    		  </View> : this.state.mapDate ? this.state.mapDate.map((data,i)=>{
                            return <TouchableOpacity onPress={this.selectMap.bind(this,data)} key={i} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:15,borderBottomWidth:1,borderColor:'#ccc'}}>
                               <Text allowFontScaling={false}>{data.area} {data.address}</Text>
                            </TouchableOpacity>
                          }) : <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-65,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:16}} allowFontScaling={false}>暂无数据</Text></View>}
                          </ScrollView>
          						  </View>
								  <PassState navigator = {this.props.navigator} {...this.props}/>
          					   </Modal>
                       <Modal
          						  animationType={"slide"}
          						  transparent={false}
          						  visible={this.state.modalVisibles}
          						  onRequestClose={() => {console.log("Modal has been closed.")}}
          						  >
          						  <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
          						     <View style={styles.card1}>
          								  <View style={{flex:1,justifyContent:'center'}}>
          										<TouchableOpacity onPress={this._cancerDD.bind(this,false)}>
          											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
          													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
          											  </View>
          										</TouchableOpacity>
          								  </View>
          								  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

          											  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>订单列表</Text>

          								  </View>
          								  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

          								  </View>
          								</View>
          								<View style={{flex:1}}>
                            <AllCustomer7  _selecth={this._selecth.bind(this)}/>
                          </View>
          						  </View>
								  <PassState navigator = {this.props.navigator} {...this.props}/>
          					   </Modal>
                       <Modal
          						  animationType={"slide"}
          						  transparent={false}
          						  visible={this.state.modalzqd}
          						  onRequestClose={() => {console.log("Modal has been closed.")}}
          						  >
          						  <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
          						     <View style={styles.card1}>
          								  <View style={{flex:1,justifyContent:'center'}}>
          										<TouchableOpacity onPress={this._cancerZQD.bind(this,false)}>
          											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
          													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
          											  </View>
          										</TouchableOpacity>
          								  </View>
          								  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

          											  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>周期单</Text>

          								  </View>
          								  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

          								  </View>
          								</View>
          								<View style={{flex:1}}>
                            <AllCustomer8  _selecti={this._selecti.bind(this)} id={this.state.projectid}/>
                          </View>
          						  </View>
								  <PassState navigator = {this.props.navigator} {...this.props}/>
          					   </Modal>
                       <Modal
          						  animationType={"slide"}
          						  transparent={false}
          						  visible={this.state.modalPro}
          						  onRequestClose={() => {console.log("Modal has been closed.")}}
          						  >
          						  <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
          						     <View style={styles.card1}>
          								  <View style={{flex:1,justifyContent:'center'}}>
          										<TouchableOpacity onPress={this._cancerPro.bind(this,false)}>
          											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
          													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
          											  </View>
          										</TouchableOpacity>
          								  </View>
          								  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

          											  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}> 项目列表</Text>

          								  </View>
          								  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

          								  </View>
          								</View>
          								<View style={{flex:1}}>
                            <AllCustomer9  _selectj={this._selectj.bind(this)} id={this.state.projectid}/>
                          </View>
          						  </View>
								  <PassState navigator = {this.props.navigator} {...this.props}/>
          					   </Modal>
                       <Modal
          						  animationType={"slide"}
          						  transparent={false}
          						  visible={this.state.modaladdPro}
          						  onRequestClose={() => {console.log("Modal has been closed.")}}
          						  >
          						  <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
          						     <View style={styles.card1}>
          								  <View style={{flex:1,justifyContent:'center'}}>
          										<TouchableOpacity onPress={this._canceraddPro.bind(this,false)}>
          											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
          													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
          											  </View>
          										</TouchableOpacity>
          								  </View>
          								  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

          											  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>产品列表</Text>

          								  </View>
          								  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

          								  </View>
          								</View>
          								<View style={{flex:1}}>
                            <AllCustomer10 _selectYes={this._selectYes.bind(this)} url={this.state.URLS}  Index={this.state.ProIndex} ProArray={this.state.ProArray} obj={this.state.ProjectData}/>
                          </View>
          						  </View>
								  <PassState navigator = {this.props.navigator} {...this.props}/>
          					   </Modal>
                       <Modal
          						  animationType={"slide"}
          						  transparent={false}
          						  visible={this.state.modalTJ}
          						  onRequestClose={() => {console.log("Modal has been closed.")}}
          						  >
          						  <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
          						     <View style={styles.card1}>
          								  <View style={{flex:1,justifyContent:'center'}}>
          										<TouchableOpacity onPress={this._cancerTJ.bind(this,false)}>
          											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
          													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
          											  </View>
          										</TouchableOpacity>
          								  </View>
          								  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

          											  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>新增回款</Text>

          								  </View>
          								  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>
                            <TouchableOpacity onPress={this._cancerTJ.bind(this,false)}>
                                <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                                  <Text style={{color:'white',fontSize:16,paddingRight:10,}} allowFontScaling={false}>确定</Text>
                                </View>
                            </TouchableOpacity>
          								  </View>
          								</View>
          								<View style={{flex:1,backgroundColor:'#ececec',}}>
                            <View style={{height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,backgroundColor:'#fff'}}>
                              <Text allowFontScaling={false} adjustsFontSizeToFit={false}>回款起始日期</Text>
                              <View><DatePicker
                                style={{width: 100,justifyContent:'center',alignItems:'flex-end',}}
                                date={this.state.date1}
                                mode="date"
                                placeholder="选择日期"
                                format="YYYY-MM-DD"
                                minDate= {new Date()}
                                androidMode="spinner"
                                maxDate="2050-06-01"
                                confirmBtnText="确定"
                                cancelBtnText="取消"

                                onDateChange={(date) => {this.setState({date1: date})}}


                              /></View>
                              </View>
                              <View style={{height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,backgroundColor:'#fff',marginTop:1}}>
                                <Text allowFontScaling={false} adjustsFontSizeToFit={false}>回款结束日期</Text>
                                <View><DatePicker
                                  style={{width: 100,justifyContent:'center',alignItems:'flex-end',}}
                                  date={this.state.date2}
                                  mode="date"
                                  placeholder="选择日期"
                                  format="YYYY-MM-DD"
                                  minDate= {new Date()}
                                  androidMode="spinner"
                                  maxDate="2050-06-01"
                                  confirmBtnText="确定"
                                  cancelBtnText="取消"
                                  onDateChange={(date) => {this.setState({date2: date})}}


                                /></View>
                                </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:50,backgroundColor:'#fff',padding:10,marginTop:15}}>

                               <View style={{backgroundColor:'#fff',flexDirection:'column'}}>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>回款金额</Text>
                                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,color:'#e22727',marginTop:5}}>回款金额不能大于{this.state.SCROLLMianTotals}</Text>
                               </View>
                               <View style={{width:120,}}><Input styles={{width:120,height:35}} Onclick={this.Onclick5.bind(this)} max={String(this.state.SCROLLMianTotals)} min={'0'} num={String(this.state.HKNUM)}/></View>
                            </View>
                            <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:15}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                                    回款方式
                               </Text>
                               <TouchableOpacity onPress={this.HKGET.bind(this)}  activeOpacity={0.8} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>
                                 <View style={{flex:1,}}>
                                     <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                         {this.state.HKname}
                                     </Text>
                                 </View>
                                 <Icon name="ios-arrow-forward" color="#999"size={27}  />
                               </TouchableOpacity>
                            </View>

                            <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333', paddingTop:5,}}>备注</Text>
                               <View style={{flex:1,marginLeft:15,}}>
                                 <TextInput
                                   onChangeText={(textaeras) => this.setState({textaeras})}
                                   multiline={true}
                                   numberOfLines={5}
                                   placeholderTextColor={'#ccc'}
                                   style={{ color:'#666',fontSize:14,textAlignVertical:'top',paddingTop:0,height:120}}
                                   placeholder='备注内容'
                                   underlineColorAndroid={'transparent'}
                                 />
                               </View>
                           </View>

                          </View>
          						  </View>
                        {this.state.shows ? <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(107, 107, 107, 0.43)',position:'absolute',top:0,left:0}}></View> : null}
						<PassState navigator = {this.props.navigator} {...this.props}/>

          					   </Modal>





                       {this.state.isload ? <View style={{justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width,height:Dimensions.get('window').height-140,overflow:'hidden',position:'absolute',top:65,left:0,}}>
                 		    <View style={styles.loading}>
                                 <ActivityIndicator color="white"/>
                                 <Text style={styles.loadingTitle} allowFontScaling={false}>加载中……</Text>
                             </View>
                 		  </View> : null}
                      {this.state.statua ? <Animated.View style={{opacity: this.state.fadeAnims,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
              				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
              				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
              				  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>加载失败，请点击重试。</Text>
                               </TouchableOpacity>
              	           </Animated.View> : <View></View>}
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
