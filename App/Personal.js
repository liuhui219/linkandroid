import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	StatusBar,
	ScrollView,
	BackHandler,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PassState from './PassState';
export default class Personal extends React.Component {
	constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);

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
	render() {
        return (
		   <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
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
												<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>个人资料</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>
									 <TouchableOpacity>
										  <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>

										  </View>
									</TouchableOpacity>
						  </View>
						</View>
						<View style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',}}>
						   <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(193, 193, 193, 0.3)')}  delayPressIn={0} >
						    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:15,marginTop:15,backgroundColor:'#fff',borderBottomWidth:1,borderTopWidth:1,borderColor:'#ececec'}}>
						       <View  style={{alignItems:'center',justifyContent:'flex-start',flex:1,flexDirection:'row',}}>
							       <View  style={{alignItems:'center',justifyContent:'center',height:50,backgroundColor:'#ccc',width:50,borderRadius:25,}}><Image source={require('./imgs/sp1.png')} style={{width: 50, height: 50,borderRadius:25,}} /></View>
								   <View style={{marginLeft:10,}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>sdgd</Text></View>
							   </View>
							   <Icon name="ios-arrow-forward" color="#ccc"size={27}  />
						    </View>
                           </TouchableNativeFeedback>

						   <View style={{ flexDirection:'column', backgroundColor:'#ececec'}}>
						     <View style={{marginTop:15,backgroundColor:'#fff'}}>
							   <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(222, 222, 222, 0.3)')}  delayPressIn={0} >
									<View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',padding:15, borderBottomWidth:1,borderColor:'#ececec',justifyContent:'space-between',}}>
									    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>

										   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>电子邮件：</Text>
										</View>

									</View>
							   </TouchableNativeFeedback>
							 </View>
							 <View style={{marginTop:15,backgroundColor:'#fff'}}>
							   <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(222, 222, 222, 0.3)')}  delayPressIn={0} >
									<View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',padding:15, borderBottomWidth:1,borderColor:'#ececec',justifyContent:'space-between',}}>
									    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>

										   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>固定电话：</Text>
										</View>

									</View>
							   </TouchableNativeFeedback>
							 </View>
							 <View style={{marginTop:15,backgroundColor:'#fff'}}>
							   <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(222, 222, 222, 0.3)')}  delayPressIn={0} >
									<View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',padding:15, borderBottomWidth:1,borderColor:'#ececec',justifyContent:'space-between',}}>
									    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>

										   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>移动电话：</Text>
										</View>

									</View>
							   </TouchableNativeFeedback>
							 </View>

							 <View style={{marginTop:15,backgroundColor:'#fff'}}>
							   <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(222, 222, 222, 0.3)')}  delayPressIn={0} >
									<View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',padding:15, borderBottomWidth:1,borderColor:'#ececec',justifyContent:'space-between',}}>
									    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>

										   <Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>职位名称：</Text>
										</View>

									</View>
							   </TouchableNativeFeedback>
							 </View>

							 <View style={{marginTop:15,backgroundColor:'#fff'}}>
							   <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(222, 222, 222, 0.3)')}  delayPressIn={0} >
									<View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',padding:15, borderBottomWidth:1,borderColor:'#ececec',justifyContent:'space-between',}}>
									    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>

										   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>所在部门：</Text>
										</View>

									</View>
							   </TouchableNativeFeedback>
							 </View>

                           </View>


						</View>

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
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
