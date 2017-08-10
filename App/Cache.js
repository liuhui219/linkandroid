import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	BackHandler,
	Image,
	Dimensions,
} from 'react-native';
import PassState from './PassState';
import Token from './Token';
import * as httpCache from 'react-native-http-cache';
export default class About extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {size:'0M',caches:false,info:'不需要清理'};
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
         httpCache.getCacheSize().then((value)=> {
			size=Math.round((value / 1024 / 1024) * 100) / 100 + 'M';
			if(value == 0){
				this.setState({size:'0M',caches:false,});
			}else{
				this.setState({size:size,caches:true,});
			}

		});
    }

	clear(){
		httpCache.clearCache().then((value)=> {
			this.setState({caches:false,info:'正在清理中'});
            this.timer = setTimeout(() => {

				this.setState({size:'0M',caches:false,info:'不需要清理'});

			},1000);
		});
	}

	componentWillUnmount() {
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	  this.timer && clearTimeout(this.timer);
	}

    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',}}>
           <View style={styles.card}>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity onPress={this._pressButton.bind(this)}>
								  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
										<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
										<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
								  </View>
							</TouchableOpacity>
				  </View>
				  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
										<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>清除缓存</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
			</View>

			<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
				  <View style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width,marginTop:50}}>
				       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:18}}>可清理空间</Text>
				  </View>

				  <View style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width,marginTop:30}}>
				       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:34}}>{this.state.size}</Text>
				  </View>

				  <View style={{paddingLeft:10,paddingRight:10,marginTop:20,}}>
				       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#aaa'}}>
					       缓存的图片，数据文件等将被清理，节省手机的存储空间。
					   </Text>
				  </View>

				  <View style={{marginTop:50,}}>
					  {this.state.caches ? <TouchableHighlight onPress={this.clear.bind(this)}   style={{borderRadius:4,marginLeft:30,marginRight:30,}}>
							<View style={{borderWidth:1,borderColor:'#ececec',borderRadius:4,paddingTop:10,paddingBottom:10,paddingLeft:80,paddingRight:80, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18, color:'#fff'}} allowFontScaling={false}>一键清理</Text>
							</View>
					   </TouchableHighlight> : <View style={{borderWidth:1,borderColor:'#ececec',borderRadius:4,paddingTop:10,paddingBottom:10,paddingLeft:80,paddingRight:80,marginLeft:30,marginRight:30, justifyContent:'center',alignItems:'center',backgroundColor:'rgba(67, 133, 244, 0.6)'}}>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18, color:'#fff'}} allowFontScaling={false}>{this.state.info}</Text>
	                      </View>}
				  </View>
			</View>
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
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
