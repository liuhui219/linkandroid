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
import StatusA from './StatusA';
import StatusB from './StatusB';
var array = [];
var aa=[];
export default class Status extends React.Component {

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
           return (
                <View style={{flex:1,flexDirection:'column',}}>
          		      <View style={styles.card}>
          						  <View style={{flex:1,justifyContent:'center'}}>

          						  </View>
          						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
          												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>动态</Text>
          									</View>
          						  </View>
          						  <View style={{flex:1,justifyContent:'center'}}>

          						  </View>
          					</View>

                    <ScrollableTabView
            				   style={{flex:1,flexDirection:'column',backgroundColor:'#ededed',}}
            				  renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
            				  tabBarPosition='overlayTop'
            				  initialPage={0}
            				  tabBarInactiveTextColor ='#333'
            				  tabBarActiveTextColor ='#4385f4'
            				  tabBarUnderlineStyle={{backgroundColor: '#4385f4'}}
            				  tabBarTextStyle={{fontSize: 14}} 
            				>
            				  <View  style={{marginTop:50,flex:1,}} tabLabel='项目动态'>
                         <StatusA navigator = {this.props.navigator} {...this.props}/>
            				  </View>
            				  <View style={{marginTop:50,flex:1,}} tabLabel='子项目'>

            				  </View>
            				  <View style={{marginTop:50,flex:1,}} tabLabel='讨论组'>

            				  </View>
                      <View style={{marginTop:50,flex:1,}} tabLabel='项目附件'>
                         <StatusB navigator = {this.props.navigator} {...this.props}/>
            				  </View>
            				</ScrollableTabView>
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
