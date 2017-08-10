import React from 'react';
import {
  View,
	StyleSheet,
  Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
  Keyboard,
  Animated,
  TextInput,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
	BackHandler,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import Gonggaob from './Gonggaob';

var array = [];
export default class AllCustomer extends React.Component {

    constructor(props) {
        super(props);
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
      texts:'',
      width: new Animated.Value(0),
      datasName:[],
      isshows:false,
	  };
    }

    componentDidMount() {
        //这里获取传递过来的参数: name
		 array = [];


		 this.fetchData('' + data.data.domain + '/index.php?app=Asset&m=AssetApi&a=consumable_list&type=&access_token=' + data.data.token + '&p='+this.state.p)

    }


	fetchData(url) {
		var that=this;
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData)=>{
        console.log(responseData)
					 if(responseData.data != ''){
					   responseData.data.forEach((Data,i) => {
						   key={i}


						   array.push(Data);


					   })
					  }
					  if(responseData.count <= 10){
						   that.setState({
							   isReach:true,
							   isLoadMore:false,

						   })
					  }
					  if(responseData.count == 0){
						  that.setState({
							   dataSource: that.state.dataSource.cloneWithRows(['暂无数据']),
							   loaded: true,
							   sx:false,
							   isLoadMore:false,
							   isNull:true,
						   })
					  }else if(array.length > responseData.count){

						   that.setState({
							   isReach:true,
							   isLoadMore:false,
							   isNull:false,

						   })
					   }else{

						   that.setState({
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

    Focus(){
      Animated.timing(
         this.state.width,
         {toValue: 45,
          duration: 200
        },
      ).start();
      this.setState({isshows:true,datasName:[],});
	  this.refs.text.setNativeProps({style:{
        textAlign:'left'
      }})
    }

    cancer(){
      this.refs.text.clear();
      Keyboard.dismiss();
      this.setState({texts:'',isshows:false,datasName:[],})
      Animated.timing(
         this.state.width,
         {toValue: 0,
          duration: 200
        },
      ).start();
	  this.refs.text.setNativeProps({style:{
        textAlign:'center'
      }})
    }

    trim(str) {
  		 return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
  	}

    changs(texts){
      if(this.trim(texts) == ''){
        this.setState({datasName:[]});
      }else{
      fetch('' + data.data.domain + '/index.php?app=Asset&m=AssetApi&a=consumable_list&type=1&data='+this.trim(texts)+'&access_token=' + data.data.token + '&p='+this.state.p)
  		  .then((response) => response.json())
  		  .then((responseData) => {
            console.log(responseData)
            this.setState({datasName:responseData.data});
  		  })
  		  .catch((error) => {

  		  });
      }
    }







    render() {
          if(!this.state.loaded){
		  return (
		     <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-170,}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
					</View>
				   </View>
		  )
		}
		return(
      <View style={{flex:1,flexDirection:'column',}}>
         <View style={{borderColor:'#ccc',borderWidth:1,backgroundColor:'#ddd',height:45,flexDirection:'row-reverse',alignItems:'center'}}>
		 <Animated.View style={{width:this.state.width,justifyContent:'center',alignItems:'center',overflow:'hidden',}}><Text onPress={this.cancer.bind(this)} allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#4385f4',width:45,marginLeft:5}}>取消</Text></Animated.View>
		 <View style={{flex:1,backgroundColor:'#ddd'}}>
           <TextInput
             ref='text'
             onChangeText={(texts) => this.changs.bind(this,texts)()}
             placeholderTextColor={'#ccc'}
             style={{flex:1, color:'#666',fontSize:14,textAlignVertical:'center',textAlign:'center', backgroundColor:'#fff',margin:7,height:30,borderRadius:5,padding:0,paddingLeft:10}}
             placeholder='搜索/资源名称'
             underlineColorAndroid={'transparent'}
             onFocus={this.Focus.bind(this)}
           />
          </View>
         </View>
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
        {this.state.isshows ? <ScrollView style={{position:'absolute',top:50,left:0,height:Dimensions.get('window').height-115,width:Dimensions.get('window').width,backgroundColor:'#fff'}}>
            {this.state.datasName.length>0 ? this.state.datasName.map((data,i)=>{

              if(data.num == 0){
          			return (

              				<View key={i} style={{flexDirection:'row',height:60,alignItems:'center', justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ececec',}}>
              				   <View style={{marginLeft:0,marginRight:15,backgroundColor:'#dcdcdc',alignItems:'center', justifyContent:'center'}}>

              				   </View>
              				   <View style={{flexDirection:'column',flex:1,}}>
              					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#999'}}>
              						   {data.names}
              					   </Text>
              					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,color:'#999'}}>
              						   分类：{data.cat}
              					   </Text>
              				   </View>
              				   <View style={{flexDirection:'row',marginRight:15, alignSelf:'flex-start',paddingTop:10,}}>
              					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginRight:5,color:'#999'}}>库存</Text>
              					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999'}}>{data.num}</Text>
              				   </View>
              			   </View>

          				)
                  }else{
              			return (
              			   <TouchableOpacity key={i} onPress={this.props._selectxm.bind(this,data)}>
                  				<View style={{flexDirection:'row',height:60,alignItems:'center', justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ececec',}}>
                  				   <View style={{marginLeft:0,marginRight:15,backgroundColor:'#dcdcdc',alignItems:'center', justifyContent:'center'}}>

                  				   </View>
                  				   <View style={{flexDirection:'column',flex:1,}}>
                  					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#333'}}>
                  						   {data.names}
                  					   </Text>
                  					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,color:'#666'}}>
                  						   分类：{data.cat}
                  					   </Text>
                  				   </View>
                  				   <View style={{flexDirection:'row',marginRight:15, alignSelf:'flex-start',paddingTop:10,}}>
                  					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginRight:5,color:'#666'}}>库存</Text>
                  					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666'}}>{data.num}</Text>
                  				   </View>
                  			   </View>
              			   </TouchableOpacity>
              				)
                      }
            }) : <View style={{height:Dimensions.get('window').height-210,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18}}>暂无结果</Text></View>}
        </ScrollView> : null}
      </View>
		)

    }

	_ggButton(id){
		const { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'Gonggaob',
                component: Gonggaob,
				params: {
					id: id,

				}
            })
			})
        }
	}

	 renderMovie(data,sectionID: number, rowID: number) {
		if(this.state.sx){
			return(
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-170,}}>
				    <Icon name="ios-sad-outline" color="#ccc"size={70}  />
				    <Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>{data}</Text>
				</View>
			)
		}
        else if(this.state.isNull){
			return (
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-170,}}>
				    <Icon name="ios-folder-outline" color="#ccc"size={70}  />
				    <Text  allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>{data}</Text>
				</View>
			)
		}
		else if(data.num == 0){
			return (

    				<View style={{flexDirection:'row',height:60,alignItems:'center', justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ececec',}}>
    				   <View style={{marginLeft:0,marginRight:15,backgroundColor:'#dcdcdc',alignItems:'center', justifyContent:'center'}}>

    				   </View>
    				   <View style={{flexDirection:'column',flex:1,}}>
    					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#999'}}>
    						   {data.names}
    					   </Text>
    					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,color:'#999'}}>
    						   分类：{data.cat}
    					   </Text>
    				   </View>
    				   <View style={{flexDirection:'row',marginRight:15, alignSelf:'flex-start',paddingTop:10,}}>
    					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginRight:5,color:'#999'}}>库存</Text>
    					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999'}}>{data.num}</Text>
    				   </View>
    			   </View>

				)
        }else{
    			return (
    			   <TouchableOpacity onPress={this.props._selectxm.bind(this,data)}>
        				<View style={{flexDirection:'row',height:60,alignItems:'center', justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ececec',}}>
        				   <View style={{marginLeft:0,marginRight:15,backgroundColor:'#dcdcdc',alignItems:'center', justifyContent:'center'}}>

        				   </View>
        				   <View style={{flexDirection:'column',flex:1,}}>
        					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#333'}}>
        						   {data.names}
        					   </Text>
        					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,color:'#666'}}>
        						   分类：{data.cat}
        					   </Text>
        				   </View>
        				   <View style={{flexDirection:'row',marginRight:15, alignSelf:'flex-start',paddingTop:10,}}>
        					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginRight:5,color:'#666'}}>库存</Text>
        					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666'}}>{data.num}</Text>
        				   </View>
        			   </View>
    			   </TouchableOpacity>
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
				fetch('' + data.data.domain + '/index.php?app=Asset&m=AssetApi&a=consumable_list&type=&access_token=' + data.data.token + '')
						.then((response) => response.json())
		                .then(function (result) {

							  array=[];
							  array.length = 0;

							  if(result.data != ''){
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
				  this.fetchData('' + data.data.domain + '/index.php?app=Asset&m=AssetApi&a=consumable_list&type=&access_token=' + data.data.token + '&p='+this.state.p);
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
