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
	BackHandler,
	Animated,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import PassState from './PassState';
import Icon from 'react-native-vector-icons/Ionicons';

export default class KqTj extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackHandler.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
		  dataSource: new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		  }),
		  id: '',
		  uid:'',
		  datas:[],
		  dataxs:[],
		  imgs:[],
		  loaded: false,
		  statu:false,
		  fadeAnim: new Animated.Value(0),
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
       this.timer = setTimeout(
			  () => {this.fetchData();},800);
    }
	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}
	fetchData() {
		fetch('' + data.data.domain + '/index.php?app=Kaoqin&m=KaoqinReportApi&a=report&uid=' + data.data.uid + '&cid=' + data.data.cid + '&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {
				this.setState({
					datas: responseData.not_qd.data,
					dataxs: responseData.has_qd.data,
					loaded: true,
					datax:responseData.sett,
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
		this.fetchData();
	}

    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',}}>
                <View style={styles.card}>
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
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>消息</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

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
				  <ScrollView  style={{marginTop:50,flex:1,}} tabLabel='未签到'>
				    {!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-150}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
					</View>
				   </View> : this.state.datas.map((data, i) => {
					    return <View key={i} style={{paddingTop:15, justifyContent:'center',alignItems:'center',}}>
						   <View style={{backgroundColor:'#ddd',paddingTop:3,paddingBottom:3,paddingLeft:8,paddingRight:8,borderRadius:3,}}>
							   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff'}}>{data.setTime}</Text>
						   </View>
						   <View style={{flexDirection:'row',paddingTop:15,}}>
							  <View style={{marginLeft:15,marginRight:15,width: 40, height: 40,borderRadius:20,backgroundColor:'#ccc',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/ren.png')} style={{width: 30, height: 30,}} />
							  </View>
							  <View style={{flex:1,flexDirection:'column',}}>
								   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>{data.userName}</Text>
								   <View style={{backgroundColor:'#fff', borderRadius:3,marginRight:15,marginTop:5,padding:15,}}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#4385f4'}}>{data.info}</Text>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{flexWrap:'wrap',marginTop:10,}}>{data.qd_result}</Text>
								   </View>
							  </View>
						   </View>
						</View>
					 })}

					 {this.state.statu ? <View style={{flex:1,justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-150}}><Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',}}>
					 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)}>
					  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击刷新。</Text>
					 </TouchableOpacity>
				   </Animated.View></View> : <View></View>}

				  </ScrollView>
				  <ScrollView style={{marginTop:50,flex:1,}} tabLabel='已签到'>
					 {this.state.dataxs !=null ? this.state.dataxs.map((data, i) => {
					    return <View key={i} style={{paddingTop:15, justifyContent:'center',alignItems:'center',}}>
						   <View style={{backgroundColor:'#ddd',paddingTop:3,paddingBottom:3,paddingLeft:8,paddingRight:8,borderRadius:3,}}>
							   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff'}}>{data.setTime}</Text>
						   </View>
						   <View style={{flexDirection:'row',paddingTop:15,}}>
							  <View style={{marginLeft:15,marginRight:15,width: 40, height: 40,borderRadius:20,backgroundColor:'#ccc',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/ren.png')} style={{width: 30, height: 30,}} />
							  </View>
							  <View style={{flex:1,flexDirection:'column',}}>
								   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>{data.userName}</Text>
								   <View style={{backgroundColor:'#fff', borderRadius:3,marginRight:15,marginTop:5,padding:15,}}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#4385f4'}}>{data.info}</Text>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{flexWrap:'wrap',marginTop:10,}}>{data.qd_result}</Text>
								   </View>
							  </View>
						   </View>
						</View>
					 }) : null}
				  </ScrollView>
				</ScrollableTabView>
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
