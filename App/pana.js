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
	TextInput,
	BackHandler,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Panainfo from './panainfo';
import Icon from 'react-native-vector-icons/Ionicons';
var array = [];
var aa=[];
export default class qus extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackHandler.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
		 add:false,
		 status:false,
		 textaera:'',
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

	_add(){
		this.setState({add:!this.state.add,})
	}

	_adds(){
		this.setState({add:false,})
	}

	_Tj(){
		this.setState({add:false,});
	}
	/* 新增文件夹 start */
	new_folder(){
		this.setState({status:true,add:false,});

	}
	_cancer(){
		this.setState({
			status:false,
		})
	}

	_yes(){
		this.addFech('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=create_folder&name='+this.state.textaera+'&uid='+data.data.uid+'&folder_str=0&access_token=' + data.data.token + '')
	    this.setState({
			status:false,
		})
	}

	addFech(url){
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

					 ToastAndroid.show('创建成功', ToastAndroid.LONG)

				})
				.catch((error) => {

					ToastAndroid.show('创建失败', ToastAndroid.LONG)
				});
	}
	/* 新增文件夹 end */
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
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>个人网盘</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'flex-end',alignItems:'center', flexDirection:'row'}}>
						       <TouchableOpacity >
						          <View style={{paddingRight:20,paddingTop:3}}>
									<Image source={require('./imgs/update.png')} style={{width: 25, height: 25,}} />
								  </View>
							   </TouchableOpacity>
                               <TouchableOpacity  onPress={this._add.bind(this)} >
								  <View style={{paddingRight:15,}}>
										<Icon name="ios-more" color="#fff"size={32}  />
								  </View>
								</TouchableOpacity>
						  </View>
					</View>

					<View style={{flex:1,backgroundColor:'#ececec',}}>
						 <Panainfo   navigator = {this.props.navigator} {...this.props}/>
					</View>



					{this.state.add ? <TouchableOpacity onPress={this._adds.bind(this)}  style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-45,position:'absolute',top:45,left:0,}}><View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-45,backgroundColor:'rgba(61, 61, 62, 0)',position:'absolute',top:0,left:0,}}></View></TouchableOpacity> : <View></View>}
					{this.state.add ? <View style={{position:'absolute',top:40,right:5,flexDirection:'column',width:120,height:100,}}>
				   <View style={{width:120,height:90,backgroundColor:'#fff',borderRadius:5,flexDirection:'column',alignItems:'center',marginTop:10,}}>
						 <TouchableOpacity  onPress={this._Tj.bind(this)}>
						   <View style={{borderBottomWidth:1,borderColor:'#ccc',width:120,alignItems:'center',height:45,flexDirection:'row',paddingLeft:10,}}>

							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:10,fontSize:16,}}>多选</Text>
						   </View>
						 </TouchableOpacity>
						 <TouchableOpacity onPress={this.new_folder.bind(this)}>
						   <View style={{width:120,alignItems:'center',height:45,flexDirection:'row',paddingLeft:10,}}>

							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:10,fontSize:16,}}>新建文件夹</Text>
						   </View>
						 </TouchableOpacity>
					   </View>
					   <View style={{position:'absolute',top:-8,right:13}}><Icon name="md-arrow-dropup" color="#fff"size={30}  /></View>
				   </View> : <View></View>}
				   {this.state.status ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.51)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:150,top:(Dimensions.get('window').height-230)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>
					 <View  style={{height:40,alignItems:'center',justifyContent:'center',flexDirection:'row', }}>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#000'}}>文件夹名称</Text>
					 </View>
					 <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',}}>
						<TextInput
						  onChangeText={(textaera) => this.setState({textaera})}
						  numberOfLines={1}
						  multiline = {true}
						  placeholderTextColor={'#999'}
						  style={{ color:'#666',fontSize:14,width:230,borderWidth:1,borderColor:'#ccc',height:35,textAlignVertical:'center',padding: 0,paddingLeft:5,borderRadius:3}}
						  placeholder='文件夹名称'
						  underlineColorAndroid={'transparent'}
						/>
					 </View>
					 <View style={{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:'#ececec',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
						<TouchableOpacity onPress={this._cancer.bind(this)} style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomLeftRadius:5,backgroundColor:'#fff'}}>
						 <View ><Text allowFontScaling={false} adjustsFontSizeToFit={false}style={{color:'#4385f4',fontSize:16}}>取消</Text></View>
						</TouchableOpacity>
						<TouchableOpacity  onPress={this._yes.bind(this)}  style={{flex:1, alignItems:'center',justifyContent:'center', borderBottomRightRadius:5,marginLeft:1,backgroundColor:'#fff'}}>
						 <View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:16}}>确定</Text></View>
						</TouchableOpacity>
					 </View>
			 </View></View> : null}
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
