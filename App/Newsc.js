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
import Gonggaoa from './Gonggaoa';
import PassState from './PassState';
import Token from './Token';
import HTMLView from 'react-native-htmlview';
export default class Gonggao extends React.Component {
	constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {data:{},};
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
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>信息</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
				</View>

				<View style={{flex:1,backgroundColor:'#ececec',}}>
				     <View style={{flexDirection:'column',flex:1, }}>
					    <View style={{justifyContent:'center',alignItems:'center',height:40,}}>
					     <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16}}>{this.props.data.title}</Text>
						</View>
						<View style={{flexDirection:'row',paddingLeft:10,paddingRight:10,height:30,borderBottomWidth:0.6,borderColor:'#bbb',alignItems:'center',}}>
						   <Text allowFontScaling={false} adjustsFontSizeToFit={false}>
						      发布人：{this.props.data.from_name}
						   </Text>
						   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:15,}}>
						      发布时间：{this.props.data.stime}
						   </Text>
						</View>
						<ScrollView style={{flex:1,}}>
						    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginTop:5,flexWrap:'wrap',lineHeight:20,paddingLeft:5,paddingRight:5,color:'#666',fontSize:14,}}  > <HTMLView value={this.props.data.content} /></Text>
						</ScrollView>
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
