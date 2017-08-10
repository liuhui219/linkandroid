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
	BackAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
var array = [];
var aa=[];
export default class Infos extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {

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

	  BackAndroid.removeEventListener('hardwareBackPress', this._pressButton);
	}




    render() {
      const { data } = this.props;
           return (
                <View style={{flex:1,flexDirection:'column',}}>
      		       <View style={styles.card}>
        						  <View style={{flex:1,justifyContent:'center'}}>

        						  </View>
        						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
        												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>详情</Text>
        									</View>
        						  </View>
        						  <View style={{flex:1,justifyContent:'center'}}>

        						  </View>
        					</View>

        					<ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
                      <View style={{flexDirection:'row',alignItems:'center',paddingTop:15,paddingLeft:15}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#333'}}>{data.pro_name}</Text>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginLeft:10}}>(项目编号{data.serialNumber})</Text>
                      </View>
                      <View style={{marginTop:30,borderTopWidth:1,borderColor:'#ececec'}}>
                        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:15,}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:14}}>
                               负责人
                           </Text>
                           <View style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,justifyContent:'flex-end'}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                  {data.leaderinfo.name}
                               </Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:15,}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:14}}>
                               开始时间
                           </Text>
                           <View style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,justifyContent:'flex-end'}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                  {data.time}
                               </Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:15,}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:14}}>
                               完成时间
                           </Text>
                           <View style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,justifyContent:'flex-end'}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                  {data.end_time}
                               </Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:15,}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:14}}>
                               实际完成时间
                           </Text>
                           <View style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,justifyContent:'flex-end'}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                  {data.finish_time}
                               </Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:15,}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:14}}>
                               状态
                           </Text>
                           <View style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,justifyContent:'flex-end'}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                  {data.status_name}
                               </Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:15,paddingTop:15,paddingBottom:15,}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:14}}>
                               参与人
                           </Text>

                           <View style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,flexWrap:'wrap'}}>
                             {data.userinfo ? data.userinfo.map((info,i)=>{
                                return <Text key={i} allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                   {info.info.name}
                                </Text>
                             }) : <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{textAlign:'right',flex:1,paddingRight:15}}>无</Text>}
                          </View>
                        </View>
                        <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:15,}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:14}}>
                               项目级别
                           </Text>
                           <View style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,justifyContent:'flex-end'}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                                  {data.projectGrade}
                               </Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:15,paddingTop:15,paddingBottom:15,}}>
                           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:14}}>
                               项目描述
                           </Text>
                           <View style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,justifyContent:'flex-start'}}>
                               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'left',paddingRight:15, alignItems:'center'}}>
                                  {data.objective}
                               </Text>
                          </View>
                        </View>
                        <View style={{alignItems:'center',justifyContent:'center',marginTop:20,marginBottom:20}}>
                          <View  style={{position:'absolute',left:15,alignItems:'center',justifyContent:'center',top:40,}}>
                            <Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:14}}>项目进度</Text>
                          </View>
                          <Progress.Circle progress={data.percent/100} size={100} />
                          <View style={{position:'absolute',left:(Dimensions.get('window').width/2)-15,alignItems:'center',justifyContent:'center',top:40,}}>
                            <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{width:30,textAlign:'center',fontSize:16,color:'#4385f4'}}>{data.percent}%</Text>
                          </View>
                        </View>
                      </View>
        					</ScrollView>
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
