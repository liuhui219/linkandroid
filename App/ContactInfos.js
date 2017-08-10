import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	Linking,
	BackHandler,
	PanResponder,
	ActivityIndicator,
	Animated,
	ScrollView,
	Dimensions,
	Image,
} from 'react-native';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import Token from './Token';
import PassState from './PassState';
export default class ContactInfo extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {id: '',uid:'',datas:{},img:'',statu:false,fadeAnim: new Animated.Value(0),loaded: false,trans: new Animated.ValueXY(),};
		this._panResponder = PanResponder.create({
	        onStartShouldSetPanResponder: () => true, //响应手势
	        onPanResponderMove: Animated.event(
	          [null, {dx: this.state.trans.x, dy:this.state.trans.y}] // 绑定动画值
	        ),
	        onPanResponderRelease: ()=>{//手松开，回到原始位置
	          Animated.spring(this.state.trans,{toValue: {x: 0, y: 0}}
	           ).start();
	        },
	        onPanResponderTerminate:()=>{//手势中断，回到原始位置
	          Animated.spring(this.state.trans,{toValue: {x: 0, y: 0}}
	           ).start();
	        },
	    });
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
        //这里获取传递过来的参数: name
		this.timer = setTimeout(
			  () => {this.fetchData('' + data.data.domain + '/index.php?app=Home&m=MobileApi&a=memberInfo&access_token=' + data.data.token + '&memberId='+this.props.uid);},800);
    }

	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}

	fetchData(url) {
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {



			    this.setState({
					datas: responseData.data,
					loaded: true,
					img:{uri: data.data.domain.slice(0,-6)+responseData.data.photo.slice(1)},
				});
		  })
		  .catch((error) => {
			this.setState({
			        statu: true,
                    loaded: true,
				});
            Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

		  });
    }
	_shuax(){
		this.setState({
			statu: false,
			loaded: false,
		});
		this.fetchData('' + data.data.domain + '/index.php?app=Home&m=MobileApi&a=memberInfo&access_token=' + data.data.token + '&memberId='+this.props.uid);
	}

    render() {
    var arrayColor=['#54cfc7','#613ba7','#4385f4','#8fcb42','#3784b5'];
    var bgColor=arrayColor[parseInt(Math.random()*5)];
    return (
	   <View style={{flex:1,flexDirection:'column',}}>
           <View style={[styles.card,{backgroundColor:this.props.colors,}]}>
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
    										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}></Text>
    							</View>
    				  </View>
    				  <View style={{flex:1,justifyContent:'center'}}>

    				  </View>
				  </View>

				<View style={{flex:1,flexDirection:'column',backgroundColor:'#ececec'}}>
				    <View style={{height:150,flexDirection:'column',backgroundColor:this.props.colors,alignItems:'center',paddingBottom:40, }}>
  					   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:100,}}>
  					      <Text allowFontScaling={false} adjustsFontSizeToFit={false} selectable={true} style={{color:'#fff',fontSize:18,}}>{ this.props.id }</Text>
  					   </View>
  					</View>
					<ScrollView>
					<View style={{backgroundColor:'#fff',marginTop:10,paddingLeft:20,flexDirection:'column',}}>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingTop:15,paddingBottom:15, color:'#000',}}>联系方式</Text>
					   <View style={{flexDirection:'row', borderBottomWidth:0.5, borderColor:'#dadada',height:50,alignItems:'center',}}>
						   <View>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{ color:'#999',}}>电子邮件：</Text>
						   </View>
						   <View style={{flex:1,marginLeft:20,flexDirection:'row',justifyContent:'center',alignItems:'center',}} >

							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} selectable={true} style={{fontSize:14,flex:1,}} allowFontScaling={false}>{this.state.datas.email}</Text>
							  <TouchableOpacity
							      activeOpacity={0.5}
                                  onPress={()=>Linking.canOpenURL('mailto:'+this.state.datas.email).then(supported => {
							           if (supported) {
							               Linking.openURL('mailto:'+this.state.datas.email);
							           } else {

							           }
							        })}
                                  underlayColor={'#dedede'}
								  style={{width:50,height:50,justifyContent:'center',alignItems:'center', }}
							  >
							      <Image source={require('./imgs/email.png')} style={{height:30,width:30,}} />
							  </TouchableOpacity>

						   </View>
					   </View>
					   <View style={{flexDirection:'row', borderBottomWidth:0.5, borderColor:'#dadada',height:50,alignItems:'center',}}>
						   <View>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{ color:'#999',}}>移动电话：</Text>
						   </View>
						   {this.state.datas.phone ? <View style={{flex:1,marginLeft:20, flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} selectable={true} style={{flex:1,}}>{this.state.datas.phone}</Text>
							  <TouchableOpacity
							      activeOpacity={0.5}
                                  onPress={() => Communications.phonecall(this.state.datas.phone, true)}
                                  underlayColor={'#dedede'}
								  style={{width:50,height:50,justifyContent:'center',alignItems:'center', }}
							  >
							      <Image source={require('./imgs/iphone.png')} style={{height:30,width:30,}} />
							  </TouchableOpacity>
						   </View> : <View style={{flex:1,marginLeft:20, }}>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>暂无</Text>
						   </View> }
					   </View>
					    <View style={{flexDirection:'row', height:50,alignItems:'center',}}>
						   <View>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',}}>固定电话：</Text>
						   </View>
                           {this.state.datas.mobile ? <View style={{flex:1,marginLeft:20, flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} selectable={true} style={{flex:1,}}>{this.state.datas.mobile}</Text>
							  <TouchableOpacity
							      activeOpacity={0.5}
                                  onPress={() => Communications.phonecall(this.state.datas.mobile, true)}
                                  underlayColor={'#dedede'}
								  style={{width:50,height:50,justifyContent:'center',alignItems:'center', }}
							  >     
							      <Image source={require('./imgs/mobile.png')} style={{height:30,width:30,}} />
							  </TouchableOpacity>
						   </View> : <View style={{flex:1,marginLeft:20, }}>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>暂无</Text>
						   </View> }
					   </View>
					</View>

					<View style={{backgroundColor:'#fff',marginTop:10,paddingLeft:20,flexDirection:'column',}}>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{paddingTop:15,paddingBottom:15, color:'#000',}}>部门职位</Text>
					   <View style={{flexDirection:'row', borderBottomWidth:0.5, borderColor:'#dadada',height:50,alignItems:'center',}}>
						   <View>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{ color:'#999',}}>所在部门：</Text>
						   </View>
						   <View style={{flex:1,marginLeft:20, }}>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.datas.deptName}</Text>
						   </View>
					   </View>
					   <View style={{flexDirection:'row', height:50,alignItems:'center',}}>
						   <View>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{ color:'#999',}}>职位名称：</Text>
						   </View>
						   <View style={{flex:1,marginLeft:20,}}>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.datas.postName}</Text>
						   </View>
					   </View>
					</View>
				  </ScrollView>
				</View>
                  {!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',height:80,position:'absolute',top:(Dimensions.get('window').height-80)/2,left:(Dimensions.get('window').width-100)/2,}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
						</View>
				  </View> : <View></View>}
				{this.state.statu ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)}>
				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击刷新。</Text>
                 </TouchableOpacity>
	           </Animated.View> : <View></View>}
			   <Animated.View style={{flexDirection:'row',ZIndex:100000,position:'absolute',top:75,left:(Dimensions.get('window').width-80)/2,alignItems:'center',justifyContent:'center',height:80,width:80,borderRadius:40, backgroundColor:'transparent',transform:[{translateY:this.state.trans.y},{translateX:this.state.trans.x} ],}} {...this._panResponder.panHandlers}>
					     <Image source={this.state.img} style={{width: 80,height:80,borderRadius:40,}} />
				</Animated.View>
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

	flexDirection:'row'
  },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,
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
});
