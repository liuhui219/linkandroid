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
import * as Progress from 'react-native-progress';
let array = [];
let aa=[];
var images = [];
export default class StatusB extends React.Component {

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
			  () => {this.fetchData('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=getNewfj&access_token=' + data.data.token + '&p='+this.state.p); },
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
            'pid':this.props.data.id,
            'cid':this.props.data.cid,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
          console.log(result)
					 if(result.data != null){
					   result.data.forEach((Data,i) => {
						   key={i}
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










    render() {
          if(!this.state.loaded){
		  return (
		     <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-190,}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
					</View>
				   </View>
		  )
		}
		return(
      <View style={{flex:1}}>

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
          if(data.type.indexOf('image') > -1){
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={this.imgAll.bind(this,this.state.domain.slice(0,-6)+data.pic_url.slice(1))} style={{paddingTop:15,paddingBottom:15,backgroundColor:'#fff',flexDirection:'column',borderBottomWidth:1,borderColor:'#ccc'}}>
                   <View style={{flexDirection:'row',paddingLeft:10,paddingRight:10,flex:1}}>
                    <View style={{flexDirection:'column'}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333'}}>dfgd</Text>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,}}>创建时间  {data.time} -- 负责人  {data.uid}</Text>
                      </View>
                      <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,marginRight:15}}>{data.name}</Text>
                       </View>
                    </View>

                   </View>
                   <View style={{position:'absolute',right:15,top:40}}>
                     <Image source={require('../imgs/right.png')} style={{width: 20, height: 18,}} />
                   </View>
              </TouchableOpacity>
              )
          }else{
            return (
               <TouchableOpacity activeOpacity={0.8} onPress={this.see.bind(this,data)} style={{paddingTop:15,paddingBottom:15,backgroundColor:'#fff',flexDirection:'column',borderBottomWidth:1,borderColor:'#ccc'}}>
                   <View style={{flexDirection:'row',paddingLeft:10,paddingRight:10,flex:1}}>
                    <View style={{flexDirection:'column'}}>
                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333'}}>dfgd</Text>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,}}>创建时间  {data.time} -- </Text>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,}}>负责人  {data.uid}</Text>
                      </View>
                      <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,marginRight:15}}>{data.name}</Text>
                           </View>
                    </View>

                   </View>
                   <View style={{position:'absolute',right:15,top:40}}>
                     <Image source={require('../imgs/right.png')} style={{width: 20, height: 18,}} />
                   </View>
             </TouchableOpacity>
             )
          }

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
 		    fetch('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=getNewfj&p=1&access_token=' + data.data.token + '', {
 						  method: 'POST',
 						  headers: {
 							'Content-Type': 'application/x-www-form-urlencoded',
 						  },
 						  body: this.toQueryString({
                'option': 15,
                'pid':this.props.data.id,
                'cid':this.props.data.cid,
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
 							  if(result.data != null){
 								   result.data.forEach((Data,i) => {
 									   datax.push(Data.id);
 									   key={i}
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
 				   this.fetchData('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=getNewfj&access_token=' + data.data.token + '&p='+this.state.p);
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
