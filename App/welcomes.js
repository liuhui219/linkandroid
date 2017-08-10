import React, { Component } from 'react'
import {
  View,
  Image,
  AppRegistry,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  BackHandler,
  Text,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper';
import {Login,data} from './Login';
import Splash from './Splash';
import PassState from './PassState';
const { width, height } = Dimensions.get('window')

const styles = {
  wrapper: {
    // backgroundColor: '#f00'
  },

  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  image: {
    width,
    height,
    flex: 1
  }
}

export default class Welcome extends Component {
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
componentWillUnmount() {
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);

	}
  render () {
    return (
      <View>

          <StatusBar
		    backgroundColor={'#4385f4'}
			hidden={true}
			barStyle="light-content"
			translucent={false}
            style={{height: 25}}
         />
          <Swiper style={styles.wrapper}
            dot={<View style={{backgroundColor: 'rgba(0,0,0,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 7, marginRight: 7}} />}
            activeDot={<View style={{backgroundColor: '#666', width: 8, height: 8, borderRadius: 4, marginLeft: 7, marginRight: 7}} />}
            paginationStyle={{
              bottom: 35
            }}
            loop={false}>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./imgs/1.jpg')} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./imgs/2.jpg')} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./imgs/3.jpg')} />
              <View style={{position:'absolute', bottom:70,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',}}>
              <TouchableHighlight onPress={this._pressButton.bind(this)} underlayColor="#1a5fd4" style={{borderRadius:4,}}>
                <View style={{borderWidth:1,borderColor:'#ececec',borderRadius:4,paddingTop:10,paddingBottom:10,paddingLeft:80,paddingRight:80, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
                    <Text style={{fontSize:18, color:'#fff'}}  allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
                </View>
              </TouchableHighlight>
              </View>
            </View>
          </Swiper>
        <PassState navigator = {this.props.navigator} {...this.props}/>
      </View>
    )
  }
}
