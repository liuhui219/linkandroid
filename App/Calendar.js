import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	Text,
	ScrollView,
	BackHandler,
	InteractionManager,
	ViewPagerAndroid,
	ActivityIndicator,
	ToastAndroid,
	Animated,
	Dimensions,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Add from './Add';
import Netinfo from './Netinfo';
import CalendarInfo from './CalendarInfo';
import Token from './Token';
import PassState from './PassState';
import {Lunar} from  './currentDate';
var bgcolors = '';
var colors=['rgb(30, 127, 181)','rgb(30, 154, 181)','rgb(30, 181, 131)','rgb(30, 181, 59)','rgb(178, 181, 30)','rgb(181, 116, 30)','rgb(173, 181, 30)','rgb(181, 93, 30)','rgb(181, 53, 30)','rgb(96, 30, 181)','rgb(56, 30, 181)','rgb(67, 133, 244)'];
var DValue=[[30, 127, 181],[30, 154, 181],[30, 181, 131],[30, 181, 59],[178, 181, 30],[181, 116, 30],[173, 181, 30],[181, 93, 30],[181, 53, 30],[96, 30, 181],[56, 30, 181],[67, 133, 244]];
var right=[
           [
             [0,27,0],[37,6,63]
           ],
           [
             [0,27,-50],[0,-27,0]
           ],
           [
             [0,0,-72],[0,-27,50]
           ],
           [
             [148,0,-29],[0,0,72]
           ],
           [
             [3,-65,0],[-148,0,29]
           ],
           [
             [-8,65,0],[-3,65,0]
           ],
           [
             [8,-88,0],[8,-65,0]
           ],
           [
             [0,-40,0],[-8,88,0]
           ],
           [
             [-85,-23,151],[0,40,0]
           ],
           [
             [-40,0,0],[85,23,-151]
           ],
           [
             [11,103,63],[40,0,0]
           ],
           [
             [-37,-6,-63],[-11,-103,-63]
           ]
         ];
export default class Calendar extends React.Component {

    constructor(props) {



        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackHandler.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {
			year : new Date().getFullYear(),
      year1 : new Date().getFullYear(),
			month : new Date().getMonth() + 1,
      month1 : new Date().getMonth() + 1,
			date : new Date().getDate(),
      dated : new Date().getDate(),
			datas:[],
			datet:'',
			loaded: false,
			user: false,
			statu:false,
			fadeAnim: new Animated.Value(0),
		};

    }

	componentDidMount() {
	 this.timer = setTimeout(
		  () => {this.fetchData();},800);

    };
	fetchData() {
		fetch('' + data.data.domain + '/index.php?app=Calendar2&m=CalendarApi&a=get_calendar_schedule&uid=1&time='+this.state.year+'-'+this.state.month+'-'+this.state.date+'&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {
				this.setState({
					datas: responseData.data,
					loaded: true,
					statu:false,
				});

		  })
		  .catch((error) => {

			this.setState({
					loaded: true,
					statu:true,
				});
				Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

			  this.timerx = setTimeout(() => {
							  this.setState({
								 statu:false,
							})
						  },1500)
		  });
    }


	Gdate(n){
      if(n<10){
         return '0'+n;
      }
       else{
           return ''+n;
      }
    }

	_datet(d){
		this.setState({
      dated:this.Gdate(d),
      year1:this.Gdate(this.state.year),
      month1:this.Gdate(this.state.month),
			datet: this.Gdate(this.state.year)+'-'+this.Gdate(this.state.month)+'-'+this.Gdate(d),
			loaded: false,
			date :d,
		})

		fetch('' + data.data.domain + '/index.php?app=Calendar2&m=CalendarApi&a=get_calendar_schedule&uid=1&time='+this.state.year+'-'+this.state.month+'-'+d+'&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {
				this.setState({
					datas: responseData.data,
					loaded: true,
					statu:false,
				});

		  })
		  .catch((error) => {

			this.setState({
					loaded: true,
					statu:true,
				});
				Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

			  this.timerx = setTimeout(() => {
							  this.setState({
								 statu:false,
							})
						  },1500)
		  });
	}
	componentWillUnmount() {
	  this.timerx && clearTimeout(this.timerx);
	  this.timer && clearTimeout(this.timer);
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
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

	_xqButton(id,uid){
    var bgColor=colors[this.state.month-1];
		const { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'CalendarInfo',
                component: CalendarInfo,
        				params: {
                  bgColor:bgColor,
        					id: id,
        					uid:uid,
        				}
            })
        }
	}

	_add() {
		let _this = this;
    var bgColor=colors[this.state.month-1];
        const { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Add',
                component: Add,
        				params: {
                    bgColor:bgColor,
                    getUser: function(user) {
                          _this.setState({
                              user: user
                          })
            						if(user == true){
            							_this.fetchData();
            						}

                    }
                }
            })
			})
        }
    }

    nextMonth() {

        if (this.state.month == 12) {

            this.setState({
                year: this.state.year + 1,
                month: 1,

            })


        } else {
            this.setState({
                month: this.state.month + 1,

            })


        }

    }

    prevMonth() {

        if (this.state.month == 1) {
            this.setState({
                year: this.state.year - 1,
                month: 12,

            })
        } else {
            this.setState({
                month: this.state.month - 1,

            })
        }

    }

    myScroll(event) {
        var that = this;
        if (event.nativeEvent.position == 2) {

            this.nextMonth()

        }
        if (event.nativeEvent.position == 0) {

            this.prevMonth()

        }

        that.refs.trueViewPager.setPageWithoutAnimation(1)

    };

    onPageScroll(event){
      var that = this; 
      var bgcolor = colors[this.state.month-1];
      if(event.nativeEvent.position == 0){

        var progress = 1 - event.nativeEvent.offset;
        this.refs['head'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(progress,right[that.state.month-1][1]),
            },
        });
        this.refs['week'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(progress,right[that.state.month-1][1]),
            },
        });
        this.refs['icons'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(progress,right[that.state.month-1][1]),
            },
        });
        bgcolors = this.iconColor(event.nativeEvent.offset,right[that.state.month-1][1]);
      }else{
        this.refs['head'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(event.nativeEvent.offset,right[that.state.month-1][0]),
            },
        });
        this.refs['week'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(event.nativeEvent.offset,right[that.state.month-1][0]),
            },
        });
        this.refs['icons'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(event.nativeEvent.offset,right[that.state.month-1][0]),
            },
        });

        bgcolors = this.iconColor(event.nativeEvent.offset,right[that.state.month-1][0]);

      }

      if(event.nativeEvent.offset == 0){
        this.refs['head'].setNativeProps({
            style: {
              backgroundColor: bgcolor,
            },
        });
        this.refs['week'].setNativeProps({
            style: {
              backgroundColor: bgcolor,
            },
        });
        this.refs['icons'].setNativeProps({
            style: {
              backgroundColor: bgcolor,
            },
        });
      }
    }

    iconColor(progress,data) {
      const a = DValue[this.state.month-1][0] + data[0] * progress;
      const b = DValue[this.state.month-1][1] + data[1] * progress;
      const c = DValue[this.state.month-1][2] + data[2] * progress;
      return `rgb(${a}, ${b}, ${c})`;
    }

    onPageScrollStateChanged(state){
      console.log(state)
    }



    render() {
    return (
	   <View style={{flexDirection:'column',flex:1,backgroundColor:'#eee',}}>
	        <View ref="head" style={styles.card}>
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
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>{this.state.year}年{this.state.month}月</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity onPress={this._add.bind(this)}>
								  <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',marginRight:10,}}>
								        <Icon name="ios-add-circle-outline" color="#fff"size={27}  />

								  </View>
							</TouchableOpacity>
				  </View>
			</View>
			<Netinfo  {...this.props}/>
            <View ref='week' style={styles.dateTitle}>
      				<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.dateTitleText}>日</Text>
      				<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.dateTitleText}>一</Text>
      				<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.dateTitleText}>二</Text>
      				<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.dateTitleText}>三</Text>
      				<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.dateTitleText}>四</Text>
      				<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.dateTitleText}>五</Text>
      				<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.dateTitleText}>六</Text>
      			</View>

			<ViewPagerAndroid
			        initialPage={1}
					style={{height:290,}}
					onPageSelected={event=>this.myScroll(event)}
          onPageScroll={event=>this.onPageScroll(event)}
          onPageScrollStateChanged={this.onPageScrollStateChanged.bind(this)}
					ref="trueViewPager"
					>
					     <View>
						  <ScrollView>
                           <DateBoard bgcolor={colors[this.state.month-1]} year={this.state.year} month={this.state.month-1} _datet={this._datet.bind(this)}/>
						  </ScrollView>
						 </View>
						 <View>
						  <ScrollView >
                           <DateBoard bgcolor={colors[this.state.month-1]} year={this.state.year} month={this.state.month} _datet={this._datet.bind(this)}/>
						  </ScrollView>
						 </View>
						 <View>
						  <ScrollView>
                           <DateBoard bgcolor={colors[this.state.month-1]} year={this.state.year} month={this.state.month+1} _datet={this._datet.bind(this)}/>
						  </ScrollView>
						 </View>



			</ViewPagerAndroid>

			<View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:0.7,borderColor:'#bbb',backgroundColor:'#fff',marginTop:5}}>
				      <View ref='icons' style={{width:30,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#4385f4',marginLeft:10,marginRight:10,}}>
					     <Icon name="ios-clock-outline" color="#fff"size={22}  />
					  </View>
					  <View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',justifyContent:'space-between',paddingLeft:10,paddingRight:10}}>
              <View style={{flexDirection:'column'}}>
               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>今日日程</Text>
               <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,}}>农历{Lunar.toLunar(this.state.year1, this.state.month1,this.state.dated)[5]}{Lunar.toLunar(this.state.year1, this.state.month1,this.state.dated)[6]}</Text>
              </View>
						   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14, color:'#666'}}>{this.state.datet}</Text>
					  </View>
			</View>
		    <ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
			    <View style={{flexDirection:'column',}}>
				  {!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',height:150,}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
						</View>
					  </View> : this.state.datas.length>0 ? this.state.datas.map((data, i) => {

						 return <View key={i} style={{flexDirection:'row',marginLeft:10,borderBottomWidth:0.5,borderColor:'#bbb',height:50,alignItems:'center',}}>
									 <Icon name="ios-alarm-outline" color="#333"size={20}  />
									 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,marginLeft:10,flex:1,}}>{data.startime} —— {data.title}</Text>
									 <TouchableOpacity onPress={this._xqButton.bind(this,data.id,data.uid)} style={{paddingRight:10,height:50,justifyContent:'center', }} activeOpacity={0.4}  >
										 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',}}>查看详情</Text>
									 </TouchableOpacity>
								</View>

					  }): <View style={{flexDirection:'row',height:80,alignItems:'center',justifyContent:'center',}}>

								 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:20,color:'#ccc',}}>暂无日程</Text>

						</View>

					  }

				</View>

			</ScrollView>
			{this.state.statu ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				  <Icon name="ios-close-outline" color="#fff"size={36}  />
				  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请重新加载。</Text>
	           </Animated.View> : <View></View>}
      <PassState navigator = {this.props.navigator} {...this.props}/>
	  </View>
    )
    }
}

class DateBoard extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }
	componentDidMount() {
		this.renderDate();
	}
	renderDate() {
     let arr = [];
	 var _year = this.props.year;
	 var _month = this.props.month;
   var bgcolor = this.props.bgcolor;
	 var _firstDay = new Date(_year, _month - 1, 1);
     for (var i = 1; i < 43; i++) {
		 var _thisDay = new Date(_year, _month - 1, i - _firstDay.getDay());
		 var _thisDayStr = this.getDateStr(_thisDay);
		 if(_thisDayStr == this.getDateStr(new Date())) {
		     arr.push(
			    <TouchableOpacity onPress={this.props._datet.bind(this,_thisDay.getDate())} key={i} style={{width:Dimensions.get('window').width/7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',height:45,	}}>
					<View ref='active' style={{height:30,width:30, borderWidth:1,borderColor:'#fff',borderRadius:15,alignItems:'center',justifyContent:'center',backgroundColor:bgcolor,}}>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color: '#fff', fontSize:14,}}>{_thisDay.getDate()}</Text>
					</View>
				 </TouchableOpacity>
			 )
		 }
		 else if(_thisDayStr.substr(0, 6) == this.getDateStr(_firstDay).substr(0, 6)) {
			 arr.push(
			    <TouchableOpacity onPress={this.props._datet.bind(this,_thisDay.getDate())} key={i} style={{width:Dimensions.get('window').width/7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',height:45,flexDirection:'column'}}>

						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color: '#000',  fontSize:16,}}>{_thisDay.getDate()}</Text>
            <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color: '#999',  fontSize:8,}}>{Lunar.toLunar(_year, _month, _thisDay.getDate())[6]}</Text>


				 </TouchableOpacity>
			 )
     }else {    // 其他月
			arr.push(
			   <View key={i} style={{width:Dimensions.get('window').width/7,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',height:45,flexDirection:'column'}}>

						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color: '#999', fontSize:16,}}>{_thisDay.getDate()}</Text>
            <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color: '#999',  fontSize:8,}}>{Lunar.toLunar(_year, _thisDayStr.slice(4,6), _thisDay.getDate())[6]}</Text>
			   </View>
			 )
		  }


	  }
      return arr;
  }
  getDateStr(date) {
    var _year = date.getFullYear();
    var _month = date.getMonth() + 1;    // 月从0开始计数
    var _d = date.getDate();

    _month = (_month > 9) ? ("" + _month) : ("0" + _month);
    _d = (_d > 9) ? ("" + _d) : ("0" + _d);
    return _year + _month + _d;
  }
  render() {
        return (
            <View style={{flexDirection: 'row',height:290, flex:1, flexWrap:'wrap',backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingTop:5}}>
				      {this.renderDate()}
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
  dateTitle: {
	backgroundColor:'#4385f4',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
    height:35,
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
  dateTitleText: {
	  color:'#eee',
	  fontSize:12,
  },
});
