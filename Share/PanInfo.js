import React from 'react';
import {
  View,
StyleSheet, 
TouchableOpacity,
TouchableHighlight,
Text,
ScrollView,
Modal,
CameraRoll,
Animated,
ActivityIndicator,
InteractionManager,
TextInput,
ActionSheetIOS,
Platform,
AlertIOS,
Dimensions,
DeviceEventEmitter,
BackAndroid,
Image,
RefreshControl,
ListView,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import ShareExtension from 'react-native-share-extension';
import Icon from 'react-native-vector-icons/Ionicons';
import PanInfo from './PanInfo';
var array = [];
var dataImpor = [];
let aa=[];
var images = [];
var folder_str = [];
var file_str = [];
var folder_strs = [];
var file_strs = [];
var flog = false;
var flogs = false;
export default class Pan extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
      this.state = {
  		  dataSource: new ListView.DataSource({
  			rowHasChanged: (row1, row2) => row1 !== row2,
  		  }),
  		  id: '',
  		  widths: new Animated.Value(0),
  		  uid:'',
  		  datas:[],
  		  imgs:[],
  		  loaded: false,
  		  isLoadMore:false,
  		  p:1,
  		  infos:'',
  		  isReach:false,
  		  isRefreshing:false,
  		  isNull:false,
  		  sx:false,
  		  domain:'',
  		  currentlyOpenSwipeable: null,
  		  status:false,
  		  tp:false,
  		  bcimg:'',
  		  bottoms: new Animated.Value(-110),
  		  IDS:'',
  		  type:'',
  		  statust:'',
  		  names:'',
  		  downloadUrl:'',
  		  add:false,
  		  statusk:false,
  		  textaera:'',
        isfalse:true,
  		  checks:false,
  		  isChecked:false,
  		  imagest:true,
  		  ischeck:true,
  		  imguri:'',
  		  avatarSource:'',
  		  fileImg:'',
  		  imagesshow:false,
  		  IsImages:false,
        uploading:false,
        isshows:false,
  	  };
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
			      return true;
        }
		    return false;
    }
    componentDidMount() {
      array = [];
      aa=[];
      this.setState({domain:data.data.domain})
	    this.timer = setTimeout(() => {
        this.fetchData('' + this.props.data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=lists&uid='+this.props.data.data.uid+'&folder_id='+this.props.dataID.id+'&file_type=0&access_token=' + this.props.data.data.token + '');
      },800);
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
				  method: 'GET',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  }
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
					  if(result.data == null){
						  that.setState({
							   dataSource: that.state.dataSource.cloneWithRows(['暂无数据']),
							   loaded: true,
							   sx:false,
							   isLoadMore:false,
							   isNull:true,
						   })
					  }else if(array.length > Number(result.count)+Number(result.folders_count)){
						   that.setState({
							   isReach:true,
							   isLoadMore:false,
							   isNull:false,
						   })
					   }else{
						   that.setState({
							   datas:result.data,
							   dataSource: that.state.dataSource.cloneWithRows(array),
							   loaded: true,
							   sx:false,
							   isNull:false,
						   })
					   }

				})
				.catch((error) => {
					that.setState({
						   isRefreshing:false,
						   loaded: true,
						   sx:true,
                           isNull:false,
						   dataSource: that.state.dataSource.cloneWithRows(['加载失败，请下拉刷新']),

					   })

				  });


	}

  Sent(){
		var that = this;
    this.setState({uploading:true,isshows:false,});
		var type = this.props.typename.split("/")[this.props.typename.split("/").length-1];
        var types = new Date().getTime()+'.'+type;
        let formData = new FormData();

        var file = {uri: this.props.typename, type: 'multipart/form-data', name:encodeURI(type)};
        formData.append("file",file);
        fetch('' + that.props.data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=uploadify&uid='+that.props.data.data.uid+'&fid='+this.props.dataID.id+'&access_token=' + that.props.data.data.token + '', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'multipart/form-data;',
				  },
				  body:formData,
				})
				.then(function (response) {
            return response.json();
				})
				.then(function (result) {
					that.setState({uploading:false,status:true,});

				})
				.catch((error) => {
          that.setState({uploading:false,})
				});
	}

  _shares(){
    this.setState({isshows:true,})
  }
  _cancerShare(){
    this.setState({isshows:false,})
  }


  _cancer(){
    ShareExtension.close()
  }

  files_k(data){
     var { navigator } = this.props;
     if(navigator) {
         navigator.push({
           name: 'PanInfo',
           component: PanInfo,
           params: {
             dataID: data,
             data:this.props.data,
             typename:this.props.typename
           },
           sceneConfig: Navigator.SceneConfigs.PushFromRight
       })
   }
   }



render() {
 if(!this.state.loaded){
  return (
     <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={styles.card}>
        <View style={{flex:1,justifyContent:'center'}}>
             <TouchableOpacity onPress={this._pressButton.bind(this)}>
                <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                  <Image source={require('../App/imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
                  <Text style={{color:'#fff',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                  <Text style={{color:'#fff',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.dataID.name}</Text>
            </View>
        </View>
        <View style={{flex:1,justifyContent:'flex-end',alignItems:'center', flexDirection:'row'}}>

        </View>
        </View>
          <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-110,width:Dimensions.get('window').width}}>
      <View style={styles.loading}>
        <ActivityIndicator color="white"/>
        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
      </View>
       </View>
  </View>
  )
}
return(
<View style={{flex:1,backgroundColor:'#fff'}}>
<View style={styles.card}>
        <View style={{flex:1,justifyContent:'center'}}>
             <TouchableOpacity onPress={this._pressButton.bind(this)}>
                <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                  <Image source={require('../App/imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
                  <Text style={{color:'#fff',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                  <Text style={{color:'#fff',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.dataID.name}</Text>
            </View>
        </View>
        <View style={{flex:1,justifyContent:'flex-end',alignItems:'center', flexDirection:'row'}}>
            <TouchableOpacity onPress={this._shares.bind(this)}>
               <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
                 <Text style={{color:'#fff',fontSize:16,marginRight:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>分享</Text>
               </View>
           </TouchableOpacity>
        </View>
    </View>
 <ListView
    dataSource={this.state.dataSource}
    renderRow={this.renderMovie.bind(this)}
    refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this) }
              colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
				progressBackgroundColor="#ffffff"
              />
          }
  />

   {this.state.uploading ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height,width:Dimensions.get('window').width,position:'absolute',top:0,left:0}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>文件分享中...</Text>
					</View>
		</View> : null}
    {this.state.status ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.51)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:150,top:(Dimensions.get('window').height-230)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>
         <View  style={{height:40,alignItems:'center',justifyContent:'center',flexDirection:'row', }}>
         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#000'}}>分享成功</Text>
         </View>
         <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec'}}>
           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#777'}}>请进入应用内进行查看</Text>
         </View>
         <View style={{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:'#ececec',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>

          <TouchableOpacity onPress={this._cancer.bind(this)}  style={{flex:1, alignItems:'center',justifyContent:'center', borderBottomLeftRadius:5,borderBottomRightRadius:5,backgroundColor:'#fff'}}>
           <View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:16}}>确定</Text></View>
          </TouchableOpacity>
         </View>
     </View></View> : null}

     {this.state.isshows ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.51)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:150,top:(Dimensions.get('window').height-230)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>
          <View  style={{height:40,alignItems:'center',justifyContent:'center',flexDirection:'row', }}>
          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#000'}}>操作</Text>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec'}}>
            <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#777'}}>分享到文件夹{this.props.dataID.name}?</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:'#ececec',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
            <TouchableOpacity onPress={this._cancerShare.bind(this)} style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomLeftRadius:5,backgroundColor:'#fff'}}>
             <View ><Text allowFontScaling={false} adjustsFontSizeToFit={false}style={{color:'#4385f4',fontSize:16}}>取消</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.Sent.bind(this)}  style={{flex:1, alignItems:'center',justifyContent:'center', borderBottomRightRadius:5,marginLeft:1,backgroundColor:'#fff'}}>
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
				    <Text style={{fontSize:16,color:'#999'}}allowFontScaling={false}>{data}</Text>
				</View>
			)
		}
		else if(this.state.isNull){
			return (
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-170,}}>
            <Icon name="ios-folder-outline" color="#ccc"size={70}  />
				    <Text style={{fontSize:16,color:'#999'}}allowFontScaling={false}>{data}</Text>
				</View>
			)
		}
    else{
          if(data.icon){
            return (
                <View style={{flexDirection:'row',flex:1}}>
                  <TouchableHighlight underlayColor='#ddd' onPress={this.files_k.bind(this,data)} style={{width:Dimensions.get('window').width}}>
                    <View style={{alignItems:'center',flexDirection:'row',width:Dimensions.get('window').width}}>
                      <View style={{paddingLeft:10}}>
                         <Image source={require('../App/imgs/folder.png')} style={{width: 36, height: 36,}} />
                      </View>
                      <View style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:'#ddd',marginLeft:10,paddingTop:10,paddingBottom:10,paddingRight:10,justifyContent:'space-between',alignItems:'center'}}>
                         <View style={{flexDirection:'column',}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666'}}>
                            {data.name}
                          </Text>
                          <Text style={{fontSize:12,color:'#aaa'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.inputtime}   {data.size}</Text>
                         </View>
                         <View style={{alignItems:'center'}}>
                          <Image source={require('../App/imgs/right.png')} style={{width: 14, height: 14,}} />
                         </View>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
            )
          }else{
            return (
              <View>

              </View>
            )
          }
	    	}
	  }

	  _renderFooter() {

	  }

	   // 下拉刷新
     _onRefresh() {
 		 this.setState({
 			   isRefreshing:true,
                p:1,
 		  })
 		  var that=this
 		  this.fresh();
 	  }


 	   _Refresh() {
 		 this.setState({
 			   isRefreshing:false,
                p:1,
 		  })
 		 var that=this
 		 this.fresh();
 	  }

 	  fresh(){
 		  var that=this;
 		  fetch('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=lists&uid='+data.data.uid+'&folder_id='+this.props.dataID.id+'&file_type=0&access_token=' + data.data.token + '', {
 						  method: 'POST',
 						  headers: {
 							'Content-Type': 'application/x-www-form-urlencoded',
 						  }
 						})
 						.then(function (response) {
 							return response.json();
 						})
 						.then(function (result) {
 							  folder_strs = [];
 							  file_strs = [];
 							  array=[];
 							  array.length = 0;

 							   if(result.data != null){
 								   result.data.forEach((Data,i) => {
 									   key={i}
 									   array.push(Data);
 									   if(Data.icon){
 										   folder_strs.push(Data.id);
 									   }else{
 										   file_strs.push(Data.id);
 									   }

 								   })
 								  }
 							      if(result.count <= 10){
 									   that.setState({
 										   isReach:true,
 										   isLoadMore:false,

 									   })
 								  }
 								  if(result.data == null){
 								  that.setState({
 										   dataSource: that.state.dataSource.cloneWithRows(['暂无数据']),
 										   loaded: true,
 										   sx:false,
 										   isLoadMore:false,
 										   isRefreshing:false,
 										   isReach:true,
 										   isNull:true,
 									   })
 								  }else if(array.length > Number(result.count)+Number(result.folders_count)){

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
 							   console.log(result)

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

}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'column',
	backgroundColor:'#fafafa',
  },
  card: {
    height:70,
	backgroundColor:'#4385f4',
  borderColor:'#ccc',
  borderBottomWidth:1,
	paddingTop:25,
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
