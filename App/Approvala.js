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
	ToastAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import Workflow from './Workflow';
import Assetm from './Assetm';
import Bxm from './Bxm';
import qus from './qus';
import Attendancem from './Attendancem';
let array = [];
let aa=[];
export default class Approvalb extends React.Component {

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
		  isLoadMore:false,
		  p:1,
		  isReach:false,
		  isRefreshing:false,
		  isNull:false,
		  sx:false,
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
        //这里获取传递过来的参数: name

		 array = [];
         aa=[];

		 this.timer = setTimeout(
			  () => { this.fetchData('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '&p='+this.state.p); },
			  500
			);
    }
	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
	}
	toQueryString(obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
				}).join('&');
			}

			return encodeURIComponent(key) + '=' + encodeURIComponent(val);
		}).join('&') : '';
	}
	fetchData(url) {
		var that=this;
		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'type': 3,
					'status': 0,
					'perPage': 10,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 if(result.data != null){
					   result.data.forEach((Data,i) => {
						   key={i}
						   var IMG =  {uri: data.data.domain.slice(0,-6)+Data.from_avatar.slice(1)}
						   aa.push(IMG)
						   array.push(Data);


					   })
					  }
					  if(result.count <= 10){
						   that.setState({
							   isReach:true,
							   isLoadMore:false,

						   })
					  }
					  if(result.count == 0){
						  that.setState({
							   dataSource: that.state.dataSource.cloneWithRows(['暂无数据']),
							   loaded: true,
							   sx:false,
							   isLoadMore:false,
							   isNull:true,
						   })
					  }else if(array.length > result.count){
						   that.setState({
							   isReach:true,
							   isLoadMore:false,
							   isNull:false,
						   })
					   }else{
						   that.setState({
							   datas:result.data,
							   imgs: aa,
							   dataSource: that.state.dataSource.cloneWithRows(array),
							   loaded: true,
							   sx:false,
							   isNull:false,
						   })
					   }


				})
				.catch((error) => {
					that.setState({

						   loaded: true,
						   sx:true,
						   isReach:true,
						   dataSource: that.state.dataSource.cloneWithRows(['加载失败，请下拉刷新']),

					   })

				  });


	}


	_InfoBut(data){
		var { navigator } = this.props;
		var _this=this;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
			if(data.app_name == '工作流'){
				navigator.push({
	                name: 'Workflow',
	                component: Workflow,
					params: {
						data: data,
						getUser: function(user) {

							if(user == true){
								_this._onRefresh();
							}

	                    }
					}
	            })
			 }else if(data.app_name == '报销管理'){
				navigator.push({
	                name: ' Bxm',
	                component: Bxm,
					params: {
						data: data,
						getUser: function(user) {

							if(user == true){
								_this._onRefresh();
							}

	                    }
					}
	            })
			 }else if(data.app_name == '资产管理'){
				navigator.push({
	                name: '  Assetm',
	                component: Assetm,
					params: {
						data: data,
						getUser: function(user) {

							if(user == true){
								_this._onRefresh();
							}

	                    }
					}
	            })
			 }else if(data.app_name == '考勤管理'){
				navigator.push({
	                name: 'Attendancem',
	                component: Attendancem,
					params: {
						data: data,
						getUser: function(user) {

							if(user == true){
								_this._onRefresh();
							}

	                    }
					}
	            })
			 }else{
			 	navigator.push({
	                name: 'qus',
	                component: qus
	            })
			 }

			})
        }
	}




    render() {
          if(!this.state.loaded){
		  return (
		     <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-170,}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
					</View>
				   </View>
		  )
		}
		return(
		 <ListView
			dataSource={this.state.dataSource}
			renderRow={this.renderMovie.bind(this)}
			onEndReached={this._onEndReach.bind(this) }
			onEndReachedThreshold={2}
			renderFooter={this._renderFooter.bind(this)}
			refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this) }
                colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
				progressBackgroundColor="#ffffff"
                />
            }
		  />
		)





    }


	 renderMovie(data,sectionID: number, rowID: number) {
		if(this.state.sx){
			return(
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-170,}}>
				    <Icon name="ios-sad-outline" color="#ccc"size={70}  />
				    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>{data}</Text>
				</View>
			)
		}
		else if(this.state.isNull){
			return (
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-170,}}>
				    <Icon name="ios-folder-outline" color="#ccc"size={70}  />
				    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>{data}</Text>
				</View>
			)
		}
        else{
		return (
		    <View style={{paddingTop:15, justifyContent:'center',alignItems:'center',}}>
			   <View style={{backgroundColor:'#ddd',paddingTop:3,paddingBottom:3,paddingLeft:8,paddingRight:8,borderRadius:3,}}>
				   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#fff'}}>{data.stime}</Text>
			   </View>
			   <View style={{flexDirection:'row',paddingTop:15,}}>
				  <View style={{marginLeft:15,marginRight:15,width: 40, height: 40,borderRadius:20,backgroundColor:'#1ADA9A',alignItems:'center', justifyContent:'center'}}>
					   <Image source={this.state.imgs[rowID]} style={{width: 40, height: 40,borderRadius:20,}} />
				  </View>
				  <View style={{flex:1,flexDirection:'column',}}>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>{data.from_name}</Text>
					   <View style={{backgroundColor:'#fff', borderRadius:3,marginRight:15,marginTop:5,}}>
						  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#4385f4',paddingTop:15,paddingLeft:15, paddingRight:15,}}>{data.app_name}</Text>
						  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{flexWrap:'wrap',marginTop:10,paddingLeft:15, paddingRight:15,}}>{data.content}</Text>
						  <TouchableOpacity onPress={this._InfoBut.bind(this,data)} activeOpacity={0.8}     style={{flexDirection:'row',justifyContent:'space-between',borderTopWidth:0.5,borderColor:'#bbb',paddingTop:10,paddingBottom:10,marginTop:10,alignItems:'center',paddingLeft:15, paddingRight:15,}}>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>阅读全文</Text>
							  <Icon name="ios-arrow-forward" color="#ccc"size={25}  />
						  </TouchableOpacity>
					   </View>

				  </View>
			   </View>
			</View>
			)
		}
	  }

	  _renderFooter() {
		 if(this.state.isLoadMore){
			 return (
				<View style={styles.footer}>
					<ActivityIndicator color="#4385f4"/>
					<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.footerTitle}>正在加载更多……</Text>
				</View>
		  )
		 }


	  }

	   // 下拉刷新
	  _onRefresh() {
		 this.setState({
			   isRefreshing:true,
			   isReach:false,
			   isLoadMore:false,
               p:1,
		  })
		  var that=this
		    fetch('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&p=1&access_token=' + data.data.token + '', {
						  method: 'POST',
						  headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						  },
						  body: this.toQueryString({
							'type': 3,
							'status': 0,
							'perPage': 10,
						  })
						})
						.then(function (response) {
							return response.json();
						})
						.then(function (result) {

							  array=[];
							  array.length = 0;
							  aa=[];
							  aa.length=0;
							  if(result.data != null){
								   result.data.forEach((Data,i) => {

									   key={i}
									   var IMG =  {uri: data.data.domain.slice(0,-6)+Data.from_avatar.slice(1)}
									   aa.push(IMG)
									   array.push(Data);

								   })
								  }
							      if(result.count <= 10){
									   that.setState({
										   isReach:true,
										   isLoadMore:false,

									   })
								  }
								  if(result.count == 0){
								  that.setState({
										   dataSource: that.state.dataSource.cloneWithRows(['暂无数据']),
										   loaded: true,
										   sx:false,
										   isLoadMore:false,
										   isRefreshing:false,
										   isReach:true,
										   isNull:true,
									   })
								  }else if(array.length > result.count){

									   that.setState({
										   isReach:true,
										   isLoadMore:false,
										   isNull:false,
									   })
								   }else{
									   that.setState({
										   imgs: aa,
										   dataSource: that.state.dataSource.cloneWithRows(array),
										   loaded: true,
										   sx:false,
										   isRefreshing:false,
										   isNull:false,
									   })

								   }


						})
			            .catch((error) => {
					that.setState({

						   loaded: true,
						   sx:true,
						   isReach:true,
                           isRefreshing:false,
						   dataSource: that.state.dataSource.cloneWithRows(['加载失败，请下拉刷新']),

					   })

				  });

	  }

	  _onEndReach() {

		  if(!this.state.isReach){
			  this.setState({
				  isLoadMore:true,
				  p:this.state.p+1,
			  })
			 InteractionManager.runAfterInteractions(() => {
				   this.fetchData('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '&p='+this.state.p);
			})
		  }


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
