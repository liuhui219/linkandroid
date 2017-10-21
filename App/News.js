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
	Image,
	RefreshControl,
	ListView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Newsa from './Newsa';
import PassState from './PassState';
import Newsb from './Newsb';
import Icon from 'react-native-vector-icons/Ionicons';
let array = []
let aa=[];
export default class News extends React.Component {

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
		  imgs:[],
		  loaded: false,
	  };
    }

    _pressButton() {
        const { navigator } = this.props;
		if(this.props.getUser) {
			let user = true;
			this.props.getUser(user);
		}
        if(navigator) {
            navigator.pop();
			return true;
        }
		return false;
    }

	componentWillUnmount() {

	    BackHandler.removeEventListener('hardwareBackPress', this._pressButton);

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
				  tabBarUnderlineStyle={{backgroundColor: '#4385f4'}}
				  tabBarInactiveTextColor ='#333'
				  tabBarActiveTextColor ='#4385f4'
				  tabBarTextStyle={{fontSize: 16}} 
				>
				  <View  style={{marginTop:50,flex:1,}} tabLabel='未读'>
				   <Newsa navigator = {this.props.navigator} {...this.props}/>
				  </View>
				  <View style={{marginTop:50,flex:1,}} tabLabel='已读'>
					 <Newsb navigator = {this.props.navigator} {...this.props}/>
				  </View>
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
