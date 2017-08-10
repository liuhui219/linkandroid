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
  TextInput,
  Keyboard,
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
export default class StatusA extends React.Component {

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
      remark:'',
		  p:1,
		  isReach:false,
		  isRefreshing:false,
		  isNull:false,
		  sx:false,
      add:false,
      domain:'',
      tp:false,
      bottom: new Animated.Value(-60),
      bottoms: new Animated.Value(-110),
      statu:false,
      status:false,
      modalshow:false,
      messages:{},
      give_uid:0,
      shows:false,
      placeholder:'回复内容',
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

    componentWillMount () {
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentDidMount() {
        //这里获取传递过来的参数: name

		     array = [];
         aa=[];
         this.setState({domain:data.data.domain,uid:data.data.uid})

				 this.timer = setTimeout(
			  () => {this.fetchData('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=project&access_token=' + data.data.token + '&p='+this.state.p); },
			  500
			);
    }

	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
    this.keyboardDidHideListener.remove();
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

  _lxr(){

    this.setState({modalshow:false,placeholder:'回复内容',give_uid:0})
  }

  _message(data){
    this.setState({modalshow:true,messages:data,placeholder:'回复内容',give_uid:0})
  }
  trim(str){
     return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
     }

  submits(){
    Keyboard.dismiss();
    console.log(1)
    var that =this;
    if(this.trim(this.state.remark) == ''){
      ToastAndroid.show('填写回复内容', ToastAndroid.SHORT)
      return false;
    }else{
    that.setState({shows:true})
    fetch('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=add_revert&access_token=' + data.data.token + '', {
       method: 'POST',
       headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: this.toQueryString({
          'give_uid':that.state.give_uid,
          'nid':that.state.messages.nid,
          'uid':that.state.uid,
          'notice':that.state.remark
       })
     })
     .then(function (response) {
       return response.json();
     })
     .then(function (result) {

       if(result.status == 1){
         that.refs.text.clear();
         that._onRefresh();
         that.setState({shows:false,remark:'',})
         ToastAndroid.show('发送成功', ToastAndroid.SHORT)
       }else{
         that.setState({shows:false,})
         ToastAndroid.show('发送失败', ToastAndroid.SHORT)
       }
       console.log(result)
     })
     .catch((error) => {
        that.setState({shows:false,})
        ToastAndroid.show('发送失败', ToastAndroid.SHORT)
     })
   }
  }

  reflex(data){
    this.refs.text.focus()
    var placeholderText = '回复: '+data.uid_name;
    this.setState({placeholder:placeholderText,give_uid:data.uid})
    Animated.timing(
       this.state.bottom,
       {
         toValue: 0,
         duration: 200
       },
     ).start();
  }

  _keyboardDidHide () {

    Animated.timing(
       this.state.bottom,
       {
         toValue: -60,
       },
     ).start();
     this.refs.text.blur()
  }

  answers(){
    this.setState({placeholder:'回复内容',give_uid:0});
    this.refs.text.focus()
    Animated.timing(
       this.state.bottom,
       {
         toValue: 0,
         duration: 200
       },
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

        <Modal
           animationType={"slide"}
           transparent={false}
           visible={this.state.modalshow}
           onRequestClose={() => {console.log("Modal has been closed.")}}
        >
           <View style={styles.card1}>
           <View style={{flex:1,justifyContent:'center'}}>
             <TouchableOpacity onPress={this._lxr.bind(this,false)}>
                 <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,paddingLeft:10,}}>取消</Text>
                 </View>
             </TouchableOpacity>
           </View>
           <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}>消息-回复</Text>

           </View>
           <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

           </View>
         </View>
         <ScrollView style={{flex:1,}}>
              <View style={{paddingTop:20,paddingLeft:15,paddingBottom:20,borderBottomWidth:1,borderColor:'#ececec'}}>
                {this.state.messages.revent != null ? <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16}}>
                  共{this.state.messages.revent.length}条回复
                </Text> : <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16}}>
                  暂无回复
                </Text>}
              </View>
              {this.state.messages.revent != null ? this.state.messages.revent.map((data,i)=>{
                var img = {uri: this.state.domain.slice(0,-6)+data.uid_img.slice(1)}
                if(data.give_uid_name == null){
                  return <TouchableOpacity onPress={this.reflex.bind(this,data)} key={i} activeOpacity={0.8} style={{paddingTop:15,marginLeft:15,backgroundColor:'#fff',marginTop:10,flexDirection:'column',borderBottomWidth:1,borderColor:'#ececec'}}>

                     <View style={{flexDirection:'row',}}>
                       <View style={{marginLeft:5,marginRight:15,width: 40, height: 40,borderRadius:20,backgroundColor:'#1ADA9A',alignItems:'center', justifyContent:'flex-start'}}>
                         <Image source={img} style={{width: 40, height: 40,borderRadius:20,}} />
                      </View>
                      <View style={{flexDirection:'column'}}>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:13,color:'#ed5b34'}}>{data.uid_name}</Text>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginTop:3}}>{data._time} </Text>
                      </View>

                     </View>
                     <View style={{paddingLeft:60,paddingTop:15,paddingRight:15,paddingBottom:10}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:15,marginTop:3,lineHeight :20,color:'#555'}}>{data.notice}</Text>
                     </View>
          			</TouchableOpacity>
              }else{
                return <TouchableOpacity key={i}  onPress={this.reflex.bind(this,data)} activeOpacity={0.8} style={{paddingTop:15,marginLeft:15,backgroundColor:'#fff',marginTop:10,flexDirection:'column',borderBottomWidth:1,borderColor:'#ececec'}}>

                   <View style={{flexDirection:'row',}}>
                     <View style={{marginLeft:5,marginRight:15,width: 40, height: 40,borderRadius:20,backgroundColor:'#1ADA9A',alignItems:'center', justifyContent:'flex-start'}}>
                       <Image source={img} style={{width: 40, height: 40,borderRadius:20,}} />
                    </View>
                    <View style={{flexDirection:'column'}}>
                      <View style={{flexDirection:'row',}}>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:13,color:'#ed5b34'}}>{data.uid_name}</Text>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:13,paddingLeft:10,paddingRight:10}}>回复</Text>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:13,color:'#ed5b34'}}>{data.give_uid_name}</Text>
                      </View>

                      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginTop:3}}>{data._time} </Text>
                    </View>

                   </View>
                   <View style={{paddingLeft:60,paddingTop:15,paddingRight:15,paddingBottom:10}}>
                     <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:15,marginTop:3,lineHeight :20,color:'#555'}}>{data.notice}</Text>
                   </View>
        			</TouchableOpacity>
              }

            }) : null}
         </ScrollView>
         <TouchableOpacity onPress={this.answers.bind(this)} activeOpacity={0.8} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:50,backgroundColor:'#ececec',padding:5,borderTopWidth:1,borderColor:'#ddd'}}>
           <Icon name="ios-chatbubbles-outline" color="#555"size={25}  />
           <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:5}}>回复</Text>
         </TouchableOpacity>
         <Animated.View  style={{width:Dimensions.get('window').width,flexDirection:'row',bottom:this.state.bottom,position:'absolute',left:0,justifyContent:'center',alignItems:'center',height:50,backgroundColor:'#ececec',padding:5,}}>
           <View style={{flex:1,borderWidth:1,borderColor:'#ccc',borderRadius:5,backgroundColor:'#fff'}}>
             <TextInput
               ref='text'
               onChangeText={(remark) => this.setState({remark})}
               numberOfLines={3}
               placeholderTextColor={'#aaa'}
               style={{ color:'#666',fontSize:14,textAlignVertical:'center',padding:0,paddingLeft:5,flex:1,}}
               placeholder={this.state.placeholder}
               blurOnSubmit={false}
               returnKeyType ='send'
               underlineColorAndroid={'transparent'}
               onSubmitEditing = {this.submits.bind(this)}
             />
           </View>
         </Animated.View>
         {this.state.shows ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-50,width:Dimensions.get('window').width,position:'absolute',top:45,left:0,
           backgroundColor:'rgba(74, 68, 68, 0.32)'}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>发送中……</Text>
					</View>
        </View> : null}

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
             {data.revent != null ? <TouchableOpacity onPress={this._message.bind(this,data)} activeOpacity={0.8}><View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',justifyContent:'space-between',borderTopWidth:0.5,borderColor:'#bbb',paddingLeft:15,paddingRight:15}}>
                <Text allowFontScaling={false} adjustsFontSizeToFit={false}>{data.revent.length}条回复</Text>
                <View>
                  <Icon name="ios-chatbubbles-outline" color="#555"size={25}  />
                </View>
             </View></TouchableOpacity> : <TouchableOpacity onPress={this._message.bind(this,data)} activeOpacity={0.8}><View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',justifyContent:'space-between',borderTopWidth:0.5,borderColor:'#bbb',paddingLeft:15,paddingRight:15}}>
                <Text allowFontScaling={false} adjustsFontSizeToFit={false}>0条回复</Text>
                <View>
                  <Icon name="ios-chatbubbles-outline" color="#555"size={25}  />
                </View>
             </View></TouchableOpacity>}
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
 		    fetch('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=project&p=1&access_token=' + data.data.token + '', {
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
 				   this.fetchData('' + data.data.domain + '/index.php?app=Pmanager&m=PmanegerApi&a=project&access_token=' + data.data.token + '&p='+this.state.p);
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
  card1: {
    height:45,
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
