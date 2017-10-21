import React ,{ Component }from 'react';
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
	BackHandler,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import PassState from '../PassState';
import Orientation from 'react-native-orientation';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view'; 
import Icon from 'react-native-vector-icons/Ionicons';
var array = [];
var aa=[];
export default class qus extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackHandler.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
            show:true,
			list:[],
			catename:[],
			summary:{},
			rw:[],
			kkdd:[],
			kucun:[],
			ruku:[],
			datas:{},
			day:[],
			month:[],
			years:[],
	    };
    }

    _pressButton() {
        const { navigator } = this.props;
		if(this.props.getUser) {
			let user = true;
			this.props.getUser(user);
		}
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
			Orientation.lockToPortrait();
            navigator.pop();
			return true;
        }
		return false;
    }
    componentDidMount() {
      this.timer = setTimeout(() => {this.getData()},800);
    }
    
	getData(){
		fetch('' + data.data.domain + this.props.url + '&access_token=' + data.data.token )
		  .then((response) => response.json())
		  .then((responseData) => { 
		  console.log(responseData)
             this.setState({
				 show:false,
				 datas:responseData,  
				 kkdd:responseData.kkdd,
				 kucun:responseData.kucun,
				 ruku:responseData.ruku,
				 catename:responseData.catename,
			 })
			 this.timers = setTimeout(() => {Orientation.lockToLandscapeLeft();},300);
		  })   
		  .catch((error) => {
             console.log(111)
          })
	}

	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
	  this.timers && clearTimeout(this.timers);
	  Orientation.lockToPortrait();
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}




    render() {
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
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>库存日报</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>

						  </View>   
					</View>

					<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
						 <ScrollView style={{flex:1,}}>
						    <View style={{flex:1,flexDirection:'row'}}>
						      <View style={{flexDirection:'column',width:180,borderRightWidth:1,borderColor:'#ccc'}}>
							     <View style={{flexDirection:'column',flex:1}}>
								    <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc'}}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>日期</Text>
									</View>
									<View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{flex:1,textAlign:'center',paddingTop:10,paddingBottom:10}}>日期</Text> 
									</View>
								 </View>
								 <View style={{flex:1,flexDirection:'column',}}>
								   <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{flex:1,textAlign:'center',paddingTop:10,paddingBottom:10}}>{this.state.datas.date}</Text> 
									</View>
									 
								    
								 </View>
								    
							  </View>
							  <ScrollView horizontal={true}>
							  
								  
								  <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
									 <View style={{flexDirection:'column',flex:1}}>
										<View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>交车</Text>
										</View>
										
										<View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} key={i} style={{width:Dimensions.get('window').width/4,textAlign:'center',borderRightWidth:1,borderColor:'#ccc',paddingTop:10,paddingBottom:10}}>{catenames}</Text>
										  })} 
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4,textAlign:'center',paddingTop:10,paddingBottom:10}}>汇总</Text>
										</View>
									 </View>
									 <View style={{flex:1,flexDirection:'row',}}>
										{this.state.kkdd.map((lists,i)=>{
											return <View key={i} style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
													  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4,textAlign:'center',borderRightWidth:1,borderColor:'#ccc',paddingTop:10,paddingBottom:10}}>{lists}</Text> 
													</View>
										})}
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4,textAlign:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc',}}>{this.state.datas.kd_total}</Text>
										
									 </View>
									  
								  </View>
								  
								  <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
									 <View style={{flexDirection:'column',flex:1}}>
										<View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>库存车</Text>
										</View>
										
										<View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} key={i} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',borderRightWidth:1,borderColor:'#ccc',paddingTop:10,paddingBottom:10}}>{catenames}</Text>
										  })} 
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',paddingTop:10,paddingBottom:10,borderRightWidth:1,borderColor:'#ccc'}}>汇总</Text> 
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',paddingTop:10,paddingBottom:10,borderRightWidth:1,borderColor:'#ccc'}}>质量冻结</Text>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',paddingTop:10,paddingBottom:10,borderRightWidth:1,borderColor:'#ccc'}}>不可发车库存</Text>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',paddingTop:10,paddingBottom:10,}}>可发库存</Text>
										</View>
									 </View>
									 <View style={{flex:1,flexDirection:'row',}}>
										{this.state.kucun.map((lists,i)=>{
											return <View key={i} style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
													  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',borderRightWidth:1,borderColor:'#ccc',paddingTop:10,paddingBottom:10}}>{lists}</Text> 
													</View>
										})}
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}>{this.state.datas.kc_total}</Text>
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}>{this.state.datas.Dongjie}</Text>
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}>{this.state.datas.bkf_Kuncun}</Text>
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4-1,textAlign:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc',}}>{this.state.datas.kf_Kuncun}</Text>  
									 </View>
									 
								  </View>
								  
								   <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
									 <View style={{flexDirection:'column',flex:1}}>
										<View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>有款订单</Text>
										</View>
										
										<View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} key={i} style={{width:Dimensions.get('window').width/4,textAlign:'center',borderRightWidth:1,borderColor:'#ccc',paddingTop:10,paddingBottom:10}}>{catenames}</Text>
										  })} 
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4,textAlign:'center',paddingTop:10,paddingBottom:10}}>汇总</Text>
										</View>
									 </View>
									 <View style={{flex:1,flexDirection:'row',}}>
										{this.state.ruku.map((lists,i)=>{
											return <View key={i} style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
													  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4,textAlign:'center',borderRightWidth:1,borderColor:'#ccc',paddingTop:10,paddingBottom:10}}>{lists}</Text> 
													</View>
										})}
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/4,textAlign:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc',}}>{this.state.datas.rk_total}</Text>
										
									 </View>
									  
								  </View>
								  
								  
								  
								  <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
									 <View style={{flexDirection:'column',flex:1}}>
										<View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>统计</Text>
										</View>
										<View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
										  
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/3,textAlign:'center',paddingTop:10,paddingBottom:10}}>经销商账户余额</Text>
										  
										</View>
									 </View>
									 <View style={{flex:1,flexDirection:'column',}}>
										 
											 <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
											          
											  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:Dimensions.get('window').width/3,textAlign:'center',paddingTop:10,paddingBottom:10}}>{this.state.datas.jxs_totalprice}</Text>
											  
											</View>
										 
										
									 </View>
									 
								  </View>
							  </ScrollView>
							</View>  
						 </ScrollView>
					</View>
					{this.state.show ? <View style={{justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width, height:Dimensions.get('window').height-70,overflow:'hidden',position:'absolute',top:70,left:0, backgroundColor:'#fff'}}>
							<View style={styles.loading}>
								<ActivityIndicator color="white"/>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
							</View>
						</View> : null}
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
