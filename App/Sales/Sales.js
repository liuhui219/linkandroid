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
  TabBarIOS,
	BackHandler,
	Image,
	RefreshControl,
	ListView,
} from 'react-native'; 
import Webviews from './Webviews'; 
import PassState from '../PassState';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import AddSales from './AddSales';
import Contacts from '../Contacts';
var array = [];
var aa=[];
export default class Sales extends React.Component {

    constructor(props) {
        super(props);
		    this._pressButton = this._pressButton.bind(this);
			  BackHandler.addEventListener('hardwareBackPress', this._pressButton);
    		this.state = {
          selectedTab: 'AddSales',
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

    add(){
      var { navigator } = this.props;
        if(navigator) {
      			InteractionManager.runAfterInteractions(() => {
                  navigator.push({
                      name: 'AddSales',
                      component: AddSales
                  })
      			})
          }
    }

    more(){
      var { navigator } = this.props;
          if(navigator) {
      			InteractionManager.runAfterInteractions(() => {
                  navigator.push({
                      name: 'Webviews',
                      component: Webviews,
                      params: {
            						url: 'http://m.linksame.com/mobile/sell/www/index.html#/home',
            					}
                  })
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
                             <Image source={require('../imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
                             <Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
                           </View>
                       </TouchableOpacity>
                   </View>
                   <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                       <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                             <Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>销售管理</Text>
                       </View>
                   </View>
                   <View style={{flex:1,justifyContent:'center'}}>

                   </View>
               </View>
               <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
     					   <View style={{backgroundColor:'#fff',}}>
     					     <TouchableHighlight  onPress={this.add.bind(this)} underlayColor="#d6d6d6">
     							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,borderBottomWidth:1,borderColor:'#ddd',}}>
     								<View style={{width: 35, height: 35,backgroundColor:'#3ea7da',alignItems:'center', justifyContent:'center'}}>
     								   <Icon name="ios-add-circle" color="#fff"size={30}  style={{marginTop:2}} />
     								</View>
     								<View style={{flex:1,marginLeft:15,height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
     								   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:16}}>新建销售单</Text>
     								   <Image source={require('../imgs/right.png')} style={{width: 20, height: 18,}} />
     								</View>
     							 </View>
     						 </TouchableHighlight>
                 <TouchableHighlight onPress={this.more.bind(this)} underlayColor="#d6d6d6">
                 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,borderBottomWidth:1,borderColor:'#ddd',}}>
                  <View style={{width: 35, height: 35,backgroundColor:'#3ea7da',alignItems:'center', justifyContent:'center'}}>
                     <Icon name="ios-apps" color="#fff"size={30}  style={{marginTop:2}} />
                  </View>
                  <View style={{flex:1,marginLeft:15,height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
                     <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:16}}>更多</Text>
                     <Image source={require('../imgs/right.png')} style={{width: 20, height: 18,}} />
                  </View>
                 </View>
               </TouchableHighlight>
     					  </View>
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
    height:65,
    paddingTop:20,
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
