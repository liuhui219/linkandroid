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
    Modal,
    Animated,
	BackHandler,
    CameraRoll,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import Token from './Token';
import PassState from './PassState';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs';
var array = [];
var aa=[];
var images = [];
export default class YTjinfoa extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
		BackHandler.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
		    tp:false,
            infos:'',
            statu:false,
            bcimg:'',
			bottoms: new Animated.Value(-110),
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

    }
	componentWillUnmount() {
	  BackHandler.removeEventListener('hardwareBackPress', this._pressButton);
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

	tup(){
        var ims={url:this.props.imgs.uri};
        images=[];
        images.push(ims)
        this.setState({tp:true,bcimg:this.props.imgs.uri})
    }

	sures(){

	var that=this;

	const downloadDest = `${RNFS.ExternalStorageDirectoryPath}/DCIM/Camera/${(new Date().getTime())}.jpg`;
	var files = 'file://' + downloadDest;
	RNFS.downloadFile({ fromUrl: this.state.bcimg, toFile: downloadDest}).promise.then(res => {
      console.log(JSON.stringify(res));
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
showActionSheet() {
	var that=this;
    Animated.timing(
       this.state.bottoms,
       {toValue: 5},
     ).start();
  }

    render() {
           return (
                <View style={{flex:1,flexDirection:'column',}}>
		           <View style={styles.card}>
						  <View style={{flex:1,justifyContent:'center'}}>
									 <TouchableOpacity onPress={this._pressButton.bind(this)}>
										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
												<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
												<Text style={{color:'white',fontSize:16,marginLeft:-5,}}  allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
										  </View>
									</TouchableOpacity>
						  </View>
						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
												<Text style={{color:'white',fontSize:18}}  allowFontScaling={false} adjustsFontSizeToFit={false}> 详情</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>

						  </View>
					</View>

					<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
						  <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                    <Icon name="ios-time-outline" color="#999"size={20}  />
                                    <Text style={{paddingLeft:10,fontSize:14,}}  allowFontScaling={false} adjustsFontSizeToFit={false}>签到时间:</Text>
                                    <Text style={{paddingLeft:10,fontSize:14,}}  allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.data.time}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'flex-start',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                <Icon name="ios-locate-outline" color="#aaa"size={20}  />
                                <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false} adjustsFontSizeToFit={false}>签到地点:</Text>
                                <Text style={{paddingLeft:10,flex:1,paddingRight:5,fontSize:14,}}  allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.data.address}</Text>
                          </View>
                          <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                <Icon name="ios-contact-outline" color="#999"size={20}  />
                                <Text style={{paddingLeft:10,fontSize:14,}}  allowFontScaling={false} adjustsFontSizeToFit={false}>客户名称:</Text>
                                <Text style={{paddingLeft:10,fontSize:14,}}  allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.data.gsy_id}</Text>
                          </View>
                          {this.props.data.contacts_id ? <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                <Icon name="ios-contact" color="#999"size={20}  />
                                <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false} adjustsFontSizeToFit={false}>联系人:</Text>
                                <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.data.contacts_id}</Text>
                          </View> : null}
                          <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'flex-start',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                <Icon name="ios-alert-outline" color="#aaa"size={20}  />
                                <Text style={{paddingLeft:10,fontSize:14,lineHeight:20}} allowFontScaling={false} adjustsFontSizeToFit={false}>备注:</Text>
                                <Text style={{paddingLeft:10,flex:1,paddingRight:5,fontSize:14,lineHeight:20}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.data.mark}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'flex-start',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                    <Icon name="ios-images-outline" color="#999"size={20}  />
                                    <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false} adjustsFontSizeToFit={false}>图片附件:</Text>
                                    <TouchableOpacity onPress={this.tup.bind(this)} style={{width: 60, height: 60,alignItems:'center', justifyContent:'center',marginLeft:15}}>
                                        <View style={{width: 60, height: 60,alignItems:'center', justifyContent:'center',}}>
                                           <Image source={this.props.imgs} style={{width: 60, height: 60,}} />
                                        </View>
                                    </TouchableOpacity>
                          </View>
                      <Modal visible={this.state.tp}
                          animationType={"fade"}
                          onRequestClose={() => {console.log("Modal has been closed.")}}
                           transparent={false}>

                                <ImageViewer saveToLocalByLongPress={false} onClick={this.closest.bind(this)} imageUrls={images}/>
                                <TouchableOpacity onPress={this.showActionSheet.bind(this)} style={{position:'absolute',bottom:0,right:30}}>
                                <View style={{backgroundColor:'transparent'}}><Icon name="ios-list-outline" color="#fff"size={50}  /></View>
                                </TouchableOpacity>
                                {this.state.statu ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
                                  <Icon name="ios-checkmark-outline" color="#fff"size={50}  />
                                  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.infos}</Text>
                                </Animated.View> : null}
								<Animated.View style={{bottom:this.state.bottoms,left:5,width:Dimensions.get('window').width-10,borderRadius:3,backgroundColor:'#fff',position:'absolute',justifyContent:'center',alignItems:'center',position:'absolute',}}>
                                    <TouchableOpacity onPress={this.sures.bind(this)} style={{width:Dimensions.get('window').width,}}>
										<View style={{borderColor:'#ccc',borderBottomWidth:1,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',}}>
											<Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,paddingTop:15,paddingBottom:15,}}>保存到手机</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity onPress={this.cancels.bind(this)} style={{width:Dimensions.get('window').width,}}>
										<View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',}}>
											<Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,paddingTop:15,paddingBottom:15,}}>取消</Text>
										</View>
									</TouchableOpacity>
					            </Animated.View>
                      <PassState navigator = {this.props.navigator} {...this.props}/>
                    </Modal>
					</View>
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
