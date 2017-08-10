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
  CameraRoll,
  Modal,
  Animated,
	BackAndroid,
	ToastAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import panLook from './panLook';
import RNFS from 'react-native-fs';
let array = [];
let aa=[];
var images = [];
export default class ProjectStateA extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
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
      add:false,
      domain:'',
      tp:false,
      bottoms: new Animated.Value(-110),
      statu:false,
      status:false,
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
         this.setState({domain:data.data.domain,uid:data.data.uid})

				 this.timer = setTimeout(
			  () => {this.fetchData('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=Notice_list&access_token=' + data.data.token + '&p='+this.state.p); },
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
					'option': 15,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
          console.log(result)
					 if(result.list != null){
					   result.list.forEach((Data,i) => {
						   key={i}
						   var IMG =  {uri: data.data.domain.slice(0,-6)+Data.img.slice(1)}
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

  see(data){
    var { navigator } = this.props;
    if(navigator) {
      InteractionManager.runAfterInteractions(() => {
        navigator.push({
          name: 'panLook',
          component: panLook,
          params: {
            data: data
          }
        })
      })
    }
  }

  imgAll(img){
		var ims={url:img};
		images=[];
		images.push(ims)
		this.setState({tp:true,bcimg:img})
	}
	sures(){

		var that=this;

		const downloadDest = `${RNFS.ExternalStorageDirectoryPath}/DCIM/Camera/${(new Date().getTime())}.jpg`;
		var files = 'file://' + downloadDest;

		RNFS.downloadFile({ fromUrl: this.state.bcimg, toFile: downloadDest}).promise.then(res => {

		  CameraRoll.saveToCameraRoll(files);
			  that.setState({
				statu:true,
				infos:'保存成功'
			  })
			  Animated.timing(
			   this.state.bottoms,
			   {toValue: -110},
			 ).start();
			  that.timerx = setTimeout(() => {
						  that.setState({
							 statu:false,
						})
					  },1000)


		}).catch(err => {
			  that.setState({
				statu:true,
				infos:'保存失败'
			  })
			  Animated.timing(
			   this.state.bottoms,
			   {toValue: -110},
			 ).start();
			  that.timerx = setTimeout(() => {
						  that.setState({
							 statu:false,
						})
					  },1000)
		});

	}

  closest(){

		if(this.state.bottoms._value == 0){
			Animated.timing(
		   this.state.bottoms,
		   {toValue: -110},
		 ).start();
		}else{
			this.setState({
				tp:false,
			})
		}
	}
	cancels(){
		Animated.timing(
		   this.state.bottoms,
		   {toValue: -110},
		 ).start();
	}
	showActionSheet() {
		var that=this;
		Animated.timing(
		   this.state.bottoms,
		   {toValue: 0},
		 ).start();
    }

  _cancer(){
		this.setState({
			status:false,
		})
	}

  sc(data){
    this.setState({
			status:true,
      id:data.id,
		})
  }

  _Yes(){
    this._delete('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=delete_pro&uid='+this.state.uid+'&id="+this.state.id+"&access_token=' + data.data.token + '');
    this.setState({
			status:false,
		})
  }

  _delete(url){
    var that = this;
		fetch(url, {
				  method: 'GET',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  }
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 console.log(result);
					if(result.statu == 'success'){
						ToastAndroid.show('删除成功', ToastAndroid.LONG)
					}else{
						ToastAndroid.show('删除失败', ToastAndroid.LONG)
					}

					that._Refresh();

				})
				.catch((error) => {

					ToastAndroid.show('删除失败', ToastAndroid.LONG)
				});
  }






    render() {
          if(!this.state.loaded){
		  return (
		     <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-110,}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
					</View>
				   </View>
		  )
		}
		return(
      <View>

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

        <Modal visible={this.state.tp}
            animationType={"fade"}
            onRequestClose={() => {console.log("Modal has been closed.")}}
             transparent={true}>

              <ImageViewer saveToLocalByLongPress={false} onClick={this.closest.bind(this)} imageUrls={images}/>
              <TouchableOpacity onPress={this.showActionSheet.bind(this)} style={{position:'absolute',bottom:0,right:30}}>
                 <View ><Icon name="ios-list-outline" color="#fff"size={50}  /></View>
              </TouchableOpacity>
              {this.state.statu ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
                <Icon name="ios-checkmark-outline" color="#fff"size={50}  />
                <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.infos}</Text>
              </Animated.View> : null}

              <Animated.View style={{bottom:this.state.bottoms,left:0,width:Dimensions.get('window').width,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',position:'absolute',}}>
                <TouchableOpacity onPress={this.sures.bind(this)} style={{width:Dimensions.get('window').width,}}>
                  <View style={{borderColor:'#ccc',borderBottomWidth:1,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{fontSize:18,paddingTop:15,paddingBottom:15,}} allowFontScaling={false} adjustsFontSizeToFit={false}>保存到手机</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.cancels.bind(this)} style={{width:Dimensions.get('window').width,}}>
                  <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{fontSize:18,paddingTop:15,paddingBottom:15,}} allowFontScaling={false} adjustsFontSizeToFit={false}>取消</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
        </Modal>

        {this.state.status ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.51)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:150,top:(Dimensions.get('window').height-230)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>
					 <View  style={{height:40,alignItems:'center',justifyContent:'center',flexDirection:'row', }}>
					 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#000'}}>删除此动态？</Text>
					 </View>
					 <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec'}}>
						 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>该动态将彻底删除</Text>
					 </View>
					 <View style={{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:'#ececec',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
						<TouchableOpacity onPress={this._cancer.bind(this)} style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomLeftRadius:5,backgroundColor:'#fff'}}>
						 <View ><Text allowFontScaling={false} adjustsFontSizeToFit={false}style={{color:'#4385f4',fontSize:16}}>取消</Text></View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._Yes.bind(this)}  style={{flex:1, alignItems:'center',justifyContent:'center', borderBottomRightRadius:5,marginLeft:1,backgroundColor:'#fff'}}>
						 <View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:16}}>确定</Text></View>
						</TouchableOpacity>
					 </View>
			 </View></View> : null}
      </View>

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
		    <View style={{paddingTop:15,backgroundColor:'#fff',marginTop:10,flexDirection:'column',}}>

           <View style={{flexDirection:'row',}}>
             <View style={{marginLeft:15,marginRight:15,width: 40, height: 40,borderRadius:20,backgroundColor:'#1ADA9A',alignItems:'center', justifyContent:'flex-start'}}>
               <Image source={this.state.imgs[rowID]} style={{width: 40, height: 40,borderRadius:20,}} />
            </View>
            <View style={{flexDirection:'column'}}>
              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#555'}}>{data.uid}</Text>
              <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginTop:3}}>{data.time}   {data.pro_name}</Text>
            </View>

           </View>
           <View style={{paddingLeft:15,paddingTop:15,paddingRight:15,paddingBottom:10}}>
             <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,marginTop:3,lineHeight :20,color:'#555'}}>{data.notice}</Text>
           </View>
				  <View style={{flexDirection:'column',}}>

					   <View style={{backgroundColor:'#fafafa', borderRadius:3,marginTop:5,}}>
               {data.attic != null ? data.attic.map((info,i)=>{
                 if(info.type.indexOf('image') > -1){
                   return <TouchableOpacity key={i} activeOpacity={0.8} onPress={this.imgAll.bind(this,this.state.domain.slice(0,-6)+info.pic_url.slice(1))}   style={{flexDirection:'row',justifyContent:'space-between',borderTopWidth:0.5,borderColor:'#bbb',paddingTop:10,paddingBottom:10,alignItems:'center',paddingLeft:15, paddingRight:15,}}>
     							  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>{info.name}</Text>
     							  <Icon name="ios-arrow-forward" color="#ccc"size={25}  />
     						  </TouchableOpacity>
                }else{
                  return <TouchableOpacity onPress={this.see.bind(this,info)} key={i} activeOpacity={0.8}    style={{flexDirection:'row',justifyContent:'space-between',borderTopWidth:0.5,borderColor:'#bbb',paddingTop:10,paddingBottom:10,alignItems:'center',paddingLeft:15, paddingRight:15,}}>
    							  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>{info.name}</Text>
    							  <Icon name="ios-arrow-forward" color="#ccc"size={25}  />
    						  </TouchableOpacity>
                }

              }) : null}

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
 		    fetch('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=Notice_list&p=1&access_token=' + data.data.token + '', {
 						  method: 'POST',
 						  headers: {
 							'Content-Type': 'application/x-www-form-urlencoded',
 						  },
 						  body: this.toQueryString({
 							'option': 15,
 						  })
 						})
 						.then(function (response) {
 							return response.json();
 						})
 						.then(function (result) {
 							  datax=[];
 							  array=[];
 							  array.length = 0;
 							  aa=[];
 							  aa.length=0;
 							  if(result.list != null){
 								   result.list.forEach((Data,i) => {
 									   datax.push(Data.id);
 									   key={i}
 									   var IMG =  {uri: data.data.domain.slice(0,-6)+Data.img.slice(1)}
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
 				   this.fetchData('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=Notice_list&access_token=' + data.data.token + '&p='+this.state.p);
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
