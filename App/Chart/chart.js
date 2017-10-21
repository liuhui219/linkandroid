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
	BackHandler,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import PassState from '../PassState';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view'; 
import List from './chartlist';
import Listx from './chartlistx';
import Icon from 'react-native-vector-icons/Ionicons';
var array = [];
var aa=[];
export default class Chart extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackHandler.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
            data:[],
			categoryName:[],
			show:true,
			statua:false,
			domain:'',
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
	  this.setState({domain:data.data.domain.slice(0,-6)})	
      this.timer = setTimeout(() => {this.getData();},800);
	  
    }
	
	getData(){ 
	var arr = [];
	var arrName=[];
	var main = [];
	                              
    fetch('' + this.state.domain + 'app00aee5aa1cc1bf0ecd5d41/dashboard/getCategoryListService.do?userId='+data.data.uid+'&access_token=32886e81a349f1ef')
		  .then((response) => response.json())
		  .then((responseData) => { 
		 
		  console.log(responseData)
             this.setState({data:responseData,show:false,});
			 
		  })   
		  .catch((error) => {
			 
			  console.log(11111)
             this.setState({show:false,})
          })
  }
  
  _shuax(){
	  this.getData();
	  this.setState({show:true,statua:false})
  }


	componentWillUnmount() {

	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
	}
	
	list(data){
		var { navigator } = this.props;
        if(navigator) { 
            navigator.push({
                name: 'List',
                component: List,
                params: {
					data: data.id, 
				}
            }) 
        }
	}
	
	listx(){
		var { navigator } = this.props;
        if(navigator) { 
            navigator.push({
                name: 'Listx',
                component: Listx 
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
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>看板</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>

						  </View>
					</View>

					<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
					     
						{this.state.data.length !=0 ? this.state.data.map((datas,i)=>{
							return <TouchableHighlight key={i} onPress={this.list.bind(this,datas)} underlayColor="#d6d6d6">
							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,borderBottomWidth:1,borderColor:'#ddd',}}> 
								<View style={{flex:1,marginLeft:15,height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
								   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:16}}>{datas.name}</Text>
								   <Image source={require('../imgs/right.png')} style={{width: 20, height: 18,}} />
								</View>
							 </View>
						 </TouchableHighlight>
						 
						}) : <View style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height-120,justifyContent:'center',alignItems:'center'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999',fontSize:22}}>暂无数据</Text></View>}
						 
					</View>
					{this.state.show ? <View style={{justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width, height:Dimensions.get('window').height-70,overflow:'hidden',position:'absolute',top:70,left:0, backgroundColor:'#fff'}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
						</View>
					</View> : null}
					{this.state.statua ? <View style={{padding:10,width:200,borderRadius:5,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-105)/2,left:(Dimensions.get('window').width-200)/2,}}>
					 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
					  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击重试。</Text>
					 </TouchableOpacity>
				   </View> : null}
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
