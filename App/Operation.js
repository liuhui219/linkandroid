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
	ListView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Operationa from './Operationa';
import Operationb from './Operationb';
import PassState from './PassState';
import Operationc from './Operationc';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Operation extends React.Component {

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
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>业务审批</Text>
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
				  tabBarTextStyle={{fontSize: 16}} 
				>
				  <View  style={{marginTop:50,flex:1,}} tabLabel='未审批'>
				     <Operationa navigator = {this.props.navigator} {...this.props}/>
				  </View>
				  <View style={{marginTop:50,flex:1,}} tabLabel='已审批'>
					 <Operationb navigator = {this.props.navigator} {...this.props}/>
				  </View>
				  <View style={{marginTop:50,flex:1,}} tabLabel='我发起'>
					 <Operationc navigator = {this.props.navigator} {...this.props}/>
				  </View>
				</ScrollableTabView>
      <PassState navigator = {this.props.navigator} {...this.props}/>
	  </View>
    );
    }


}
const styles = StyleSheet.create({

  card: {
    height:70,
    paddingTop:25,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
});
