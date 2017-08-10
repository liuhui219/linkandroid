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
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import Gonggaob from './Gonggaob';

var array = [];
export default class AllCustomer6 extends React.Component {

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
	  };
    }

    componentDidMount() {
        //这里获取传递过来的参数: name
		 array = [];


		 this.fetchData('' + data.data.domain + '/index.php?app=Invoicimg&m=SaleMobile&a=chiocecustom&status=4&p=1&n=15&access_token=' + data.data.token + '&p='+this.state.p)

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
		else{
			return (
			   <TouchableOpacity onPress={this.props._selectg.bind(this,data)}>
				<View style={{flexDirection:'row',height:60,alignItems:'center', justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ececec',}}>
				   <View style={{marginLeft:15,marginRight:15,width: 40, height: 40,borderRadius:20,backgroundColor:'#dcdcdc',alignItems:'center', justifyContent:'center'}}>
					   <Image source={require('./imgs/ren.png')} style={{width: 20, height: 20, }} />
				   </View>
				   <View style={{flexDirection:'column',flex:1,}}>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#777'}}>
						   {data.custom_company}
					   </Text>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,color:'#999'}}>
						   {data.custom_type}
					   </Text>
				   </View>
				   <View style={{flexDirection:'row',marginRight:15, alignSelf:'flex-start',paddingTop:10,}}>
					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginRight:5,color:'#999'}}>负责人</Text>
					  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#999'}}>{data.charge}</Text>
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
				fetch('' + data.data.domain + '/index.php?app=Invoicimg&m=SaleMobile&a=chiocecustom&status=4&n=15&access_token=' + data.data.token + '')
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
				  this.fetchData('' + data.data.domain + '/index.php?app=Invoicimg&m=SaleMobile&a=chiocecustom&status=4&n=15&access_token=' + data.data.token + '&p='+this.state.p);
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
