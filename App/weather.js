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
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import PassState from './PassState';
var array = [];
var aa=[];
export default class weather extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackHandler.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
		   Datas:{},
           car:'',
           dressing:'',
           flu:'',
           sport:'',
           travel:'',
           uv:'',
           two:{},
           three:{},
           images0:'',
           images1:'',
           images2:'',
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
        this.timer = setTimeout(() => {
            this.fetchData();
            this.fetchDatas();
        },800);
    }


	fetchData(){
     fetch('https://api.thinkpage.cn/v3/life/suggestion.json?key=ptzo3jrfv3tq1wez&location='+this.props.location+'&language=zh-Hans')
          .then((response) => response.json())
          .then((responseData) => {

            this.setState({
                car : responseData.results[0].suggestion.car_washing.brief,
                dressing : responseData.results[0].suggestion.dressing.brief,
                flu : responseData.results[0].suggestion.flu.brief,
                sport : responseData.results[0].suggestion.sport.brief,
                travel : responseData.results[0].suggestion.travel.brief,
                uv : responseData.results[0].suggestion.uv.brief,
            })
             console.log(responseData)

          })
	      .catch((error) => {


          });

	}

    fetchDatas(){
     fetch('https://api.thinkpage.cn/v3/weather/daily.json?key=ptzo3jrfv3tq1wez&location='+this.props.location+'&language=zh-Hans&unit=c&start=0&days=5')
          .then((response) => response.json())
          .then((responseData) => {
            responseData.results[0].daily.map((das,i)=>{
             if(responseData.results[0].daily[i]['code_day'] == 0){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/0.png'),infos:'晴'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/0.png'),infos:'晴'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/0.png'),infos:'晴'})
                }
              }else if(responseData.results[0].daily[i]['code_day'] == 1){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/1.png'),infos:'晴'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/1.png'),infos:'晴'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/1.png'),infos:'晴'})
                }
              }else if(responseData.results[0].daily[i]['code_day'] == 2){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/2.png'),infos:'晴'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/2.png'),infos:'晴'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/2.png'),infos:'晴'})
                }
              }else if(responseData.results[0].daily[i]['code_day'] == 3){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/3.png'),infos:'晴'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/3.png'),infos:'晴'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/3.png'),infos:'晴'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 4){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/4.png'),infos:'多云'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/4.png'),infos:'多云'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/4.png'),infos:'多云'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 5){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/5.png'),infos:'晴转多云'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/5.png'),infos:'晴转多云'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/5.png'),infos:'晴转多云'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 6){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/6.png'),infos:'晴转多云'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/6.png'),infos:'晴转多云'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/6.png'),infos:'晴转多云'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 7){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/7.png'),infos:'大部多云'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/7.png'),infos:'大部多云'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/7.png'),infos:'大部多云'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 8){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/8.png'),infos:'大部多云'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/8.png'),infos:'大部多云'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/8.png'),infos:'大部多云'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 9){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/9.png'),infos:'阴'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/9.png'),infos:'阴'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/9.png'),infos:'阴'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 10){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/10.png'),infos:'阵雨'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/10.png'),infos:'阵雨'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/10.png'),infos:'阵雨'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 11){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/11.png'),infos:'雷阵雨'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/11.png'),infos:'雷阵雨'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/11.png'),infos:'雷阵雨'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 12){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/12.png'),infos:'雷阵雨伴有冰雹'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/12.png'),infos:'雷阵雨伴有冰雹'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/12.png'),infos:'雷阵雨伴有冰雹'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 13){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/13.png'),infos:'小雨'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/13.png'),infos:'小雨'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/13.png'),infos:'小雨'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 14){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/14.png'),infos:'中雨'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/14.png'),infos:'中雨'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/14.png'),infos:'中雨'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 15){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/15.png'),infos:'大雨'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/15.png'),infos:'大雨'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/15.png'),infos:'大雨'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 16){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/16.png'),infos:'暴雨'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/16.png'),infos:'暴雨'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/16.png'),infos:'暴雨'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 17){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/17.png'),infos:'大暴雨'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/17.png'),infos:'大暴雨'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/17.png'),infos:'大暴雨'})
                }
              }else if(responseData.results[0].daily[i]['code_day'] == 18){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/18.png'),infos:'特大暴雨'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/18.png'),infos:'特大暴雨'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/18.png'),infos:'特大暴雨'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 19){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/19.png'),infos:'冻雨'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/19.png'),infos:'冻雨'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/19.png'),infos:'冻雨'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] ==20){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/20.png'),infos:'雨夹雪'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/20.png'),infos:'雨夹雪'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/20.png'),infos:'雨夹雪'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 21){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/21.png'),infos:'阵雪'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/21.png'),infos:'阵雪'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/21.png'),infos:'阵雪'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 22){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/22.png'),infos:'小雪'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/22.png'),infos:'小雪'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/22.png'),infos:'小雪'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 23){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/23.png'),infos:'中雪'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/23.png'),infos:'中雪'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/23.png'),infos:'中雪'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 24){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/24.png'),infos:'大雪'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/24.png'),infos:'大雪'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/24.png'),infos:'大雪'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 25){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/25.png'),infos:'暴雪'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/25.png'),infos:'暴雪'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/25.png'),infos:'暴雪'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 26){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/26.png'),infos:'浮尘'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/26.png'),infos:'浮尘'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/26.png'),infos:'浮尘'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 27){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/27.png'),infos:'扬沙'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/27.png'),infos:'扬沙'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/27.png'),infos:'扬沙'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 28){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/28.png'),infos:'沙尘暴'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/28.png'),infos:'沙尘暴'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/28.png'),infos:'沙尘暴'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 29){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/29.png'),infos:'强沙尘暴'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/29.png'),infos:'强沙尘暴'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/29.png'),infos:'强沙尘暴'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 30){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/30.png'),infos:'雾'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/30.png'),infos:'雾'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/30.png'),infos:'雾'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 31){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/31.png'),infos:'霾'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/31.png'),infos:'霾'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/31.png'),infos:'霾'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 32){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/32.png'),infos:'风'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/32.png'),infos:'风'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/32.png'),infos:'风'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 33){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/33.png'),infos:'大风'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/33.png'),infos:'大风'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/33.png'),infos:'大风'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 34){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/34.png'),infos:'飓风'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/34.png'),infos:'飓风'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/34.png'),infos:'飓风'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 35){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/35.png'),infos:'热带风暴'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/35.png'),infos:'热带风暴'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/35.png'),infos:'热带风暴'})
                }

              }else if(responseData.results[0].daily[i]['code_day'] == 36){
                if(i == 0){
                    this.setState({images0:require('./imgs/weather/36.png'),infos:'龙卷风'})
                }else if(i == 1){
                    this.setState({images1:require('./imgs/weather/36.png'),infos:'龙卷风'})
                }else if(i == 2){
                    this.setState({images2:require('./imgs/weather/36.png'),infos:'龙卷风'})
                }

              }

            })
             console.log(responseData)
            this.setState({
                Datas:responseData.results[0].daily[0],
                two:responseData.results[0].daily[1],
                three:responseData.results[0].daily[2],
            })
          })
          .catch((error) => {


          });

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
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>天气详情</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>

						  </View>
					</View>

					<ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#fafafa',width:Dimensions.get('window').width,}}>
						 <View style={{flexDirection:'column',paddingTop:10,paddingLeft:10}}>
                             <Text style={{fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.datas.location['name']}</Text>
                             <Text style={{marginTop:5,color:'#333',fontSize:12}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.datas['last_update'].slice(11,16)}更新</Text>
                         </View>
                         <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',paddingTop:50,paddingBottom:50}}>
                            <View>
                                <Image source={this.props.images} style={{width: 80, height: 80,}} />
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:26,color:'#777'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.datas.now['temperature']}° / {this.props.datas.now['text']}</Text>

                            </View>
                         </View>
                         <View style={{marginLeft:10,marginRight:10,borderRadius:5,}}>
                              <Text style={{paddingLeft:5,paddingTop:10,borderRadius:5,fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>生活指数</Text>
                              <ScrollView
                                  automaticallyAdjustContentInsets={false}
                                  horizontal={true}
                                  directionalLockEnabled ={true}
                                  bounces={false}
                                  style={{borderRadius:5,marginTop:10}}
                                  showsHorizontalScrollIndicator ={true}
                                  >
                                     <View style={{flexDirection:'column'}}>
                                           <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#dedede',paddingBottom:10,paddingTop:10,}}>

                                                <View style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}>
                                                     <Image source={require('./imgs/car_washing.png')} style={{width: 30, height: 30,}} />
                                                </View>
                                                <View style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}>
                                                     <Image source={require('./imgs/dressing.png')} style={{width: 30, height: 30,}} />
                                                </View>
                                                <View style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}>
                                                     <Image source={require('./imgs/flu.png')} style={{width: 30, height: 30,}} />
                                                </View>
                                                <View style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}>
                                                     <Image source={require('./imgs/sport.png')} style={{width: 30, height: 30,}} />
                                                </View>
                                                <View style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}>
                                                     <Image source={require('./imgs/travel.png')} style={{width: 30, height: 30,}} />
                                                </View>
                                                <View style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}>
                                                     <Image source={require('./imgs/uv.png')} style={{width: 30, height: 30,}} />
                                                </View>

                                            </View>

                                             <View  style={{flexDirection:'row',justifyContent:'space-between',paddingTop:18,paddingBottom:18,backgroundColor:'#ececec',}}>

                                                    <View  style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}><Text style={{fontSize:13,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.car}洗车</Text></View>
                                                    <View  style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}><Text style={{fontSize:13,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.dressing}</Text></View>
                                                    <View  style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}><Text style={{fontSize:13,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>感冒{this.state.flu}</Text></View>
                                                    <View  style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}><Text style={{fontSize:13,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.sport}运动</Text></View>
                                                    <View  style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}><Text style={{fontSize:13,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.travel}出行</Text></View>
                                                    <View  style={{flex:1,alignItems:'center',width:(Dimensions.get('window').width)/4-5,}}><Text style={{fontSize:13,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>紫外线{this.state.uv}</Text></View>

                                             </View>

                                     </View>
                               </ScrollView>
                         </View>
                         <View style={{flexDirection:'row',marginTop:30,paddingTop:20,borderTopWidth:1,borderColor:'#ccc',marginLeft:10,marginRight:10,paddingBottom:15}}>
                             <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>今天</Text>
                                 <View style={{marginTop:10,marginBottom:10}}>
                                    <Image source={this.state.images0} style={{width: 40, height: 40,}} />
                                 </View>
                                 <Text style={{fontSize:16,color:'#666',marginTop:5}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.Datas['text_day']} / {this.state.Datas['text_night']}</Text>
                                 <Text style={{fontSize:16,color:'#666',marginTop:5}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.Datas['low']}° / {this.state.Datas['high']}°</Text>
                             </View>
                             <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center',borderLeftWidth:1,borderRightWidth:1,borderColor:'#ccc'}}>
                                 <Text style={{fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>明天</Text>
                                 <View style={{marginTop:10,marginBottom:10}}>
                                    <Image source={this.state.images1} style={{width: 40, height: 40,}} />
                                 </View>
                                 <Text style={{fontSize:16,color:'#666',marginTop:5}}allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.two['text_day']}</Text>
                                 <Text style={{fontSize:16,color:'#666',marginTop:5}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.two['low']}° / {this.state.two['high']}°</Text>
                             </View>
                             <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>后天</Text>
                                 <View style={{marginTop:10,marginBottom:10}}>
                                    <Image source={this.state.images2} style={{width: 40, height: 40,}} />
                                 </View>
                                 <Text style={{fontSize:16,color:'#666',marginTop:5}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.three['text_day']}</Text>
                                 <Text style={{fontSize:16,color:'#666',marginTop:5}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.three['low']}° / {this.state.three['high']}°</Text>
                             </View>
                         </View>
					</ScrollView>
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
