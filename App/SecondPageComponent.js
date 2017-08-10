import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	Text,
	BackHandler,
	Image
} from 'react-native';

import Calendar from './Calendar';

export default class SecondPageComponent extends Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {
			yearmonth : new Date().getFullYear()+'年'+(new Date().getMonth()+1)+'月',
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

	YearMonth(dates){
		 this.setState({
			yearmonth: dates,
        })
	}

    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',}}>
                <View style={styles.card}>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity onPress={this._pressButton.bind(this)}>
								  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
								        <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
										<Text style={{color:'white',fontSize:16,marginLeft:-5,}}>返回</Text>
								  </View>
							</TouchableOpacity>
				  </View>
				  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
										<Text style={{color:'white',fontSize:18}}>{this.state.yearmonth}</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity>
								  <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>
										<Text style={{color:'white',fontSize:20,marginRight:10}}>+</Text>
								  </View>
							</TouchableOpacity>
				  </View>
				</View>

				<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
				    <Calendar YearMonth={this.YearMonth}/>
				</View>
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
