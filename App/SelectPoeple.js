import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	ListView,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	Dimensions,
	ActivityIndicator,
	Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
var secs = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']
let heightMsg = {
    'A': 0,
    'B': 0,
    'C': 0,
    'D': 0,
    'E': 0,
    'F': 0,
    'G': 0,
    'H': 0,
    'I': 0,
    'J': 0,
    'K': 0,
    'L': 0,
    'M': 0,
    'N': 0,
    'O': 0,
    'P': 0,
    'Q': 0,
    'R': 0,
    'S': 0,
    'T': 0,
    'U': 0,
    'V': 0,
    'W': 0,
    'X': 0,
    'Y': 0,
    'Z': 0,
    '#': 0,
};

let scroll = 0;


export default class SelectPoeple extends Component {

    constructor(props) {

        super(props);
		var getSectionData = (dataBlob, sectionID) => {
		  return dataBlob[sectionID];
		};
		var getRowData = (dataBlob, sectionID, rowID) => {
		  return dataBlob[rowID];
		};

        this.state = {
		  sx:false,
		  datas:'',
		  dataSource: new ListView.DataSource({
		  getRowData: getRowData,
		  getSectionHeaderData: getSectionData,
		  rowHasChanged: (row1, row2) => row1 !== row2,
		  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		}),
			   loaded: false,
		};



    }
    componentDidMount() {
		this.fetchData();
	  }


    fetchData() {
		fetch('' + data.data.domain + '/index.php?app=Comtxl&m=MobileApi&a=phoneBookAndroid&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {

                            this.setState({
								datas:responseData,
							})
							var dataBlob = {};
							var sectionIDs = [];
							var rowIDs = [];
							for (var ii = 0; ii < secs.length; ii++) {
							  var sectionName = secs[ii]
							  sectionIDs.push(sectionName);
							  dataBlob[sectionName] = sectionName;
							  rowIDs[ii] = [];

								  lengths = responseData.data[ii].data;

							  for (var jj = 0; jj < lengths.length; jj++) {
								 lengths[jj].avatar={uri: data.data.domain.slice(0,-6)+lengths[jj].avatar.slice(1)};
			                    var rowNames = lengths[jj].name+jj;
								rowIDs[ii].push(rowNames);

								dataBlob[rowNames] = lengths[jj];



							  }
							}
							this.setState({
								            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                							loaded: true,
										});


		  })
		  .catch((error) => {

			this.setState({
			        loaded: true,
					dataSource: this.state.dataSource.cloneWithRows(['加载失败，请下拉刷新']),
					sx:true,
				});
		  });
    }

	_shuax(){
		this.setState({
			loaded: false,
			sx:false,
		});
		this.fetchData();
	}

    layoutH(e){

		for (var i = 0; i < secs.length; i++) {
		  var lengs = this.state.datas.data[i].data;
		  var sectionNames=secs[i];
		  if(lengs.length>0){
			  heightMsg[sectionNames]=Number(Number(lengs.length*e.nativeEvent.layout.height)+Number(25));
		  }else{
			  heightMsg[sectionNames]=0;
		  }
		}

	}

    moveScroll(e){
        let num = Math.floor((e.nativeEvent.pageY - 45 - Math.floor((Dimensions.get('window').height-513)/2)) / 14);

        if(num<1){
			num = 1;
		}
        if (num > 27) {
            num = 27;
        }
        var tab = secs[num-1];
		 if(heightMsg[tab] == 0){
			return false;
		}else{
			scroll=0;
			for (var obj in heightMsg) {
			if(tab == obj){
				break;
			}else{
				scroll+=heightMsg[obj];
			}

		}
		}

		this.refs.myScroll.scrollTo({x: 0, y: scroll, animated: true});
	}

    renderLoadingView() {
		return (
		 <View>
		  <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-140,overflow:'hidden',}}>
		    <View style={styles.loading}>
                <ActivityIndicator color="white"/>
                <Text style={styles.loadingTitle}  allowFontScaling={false} adjustsFontSizeToFit={false}>加载中……</Text>
            </View>
		  </View>
		 </View>
		);
	  }

    renderSectionHeader(sectionData, sectionID){
		return (
		  <View style={{flex:1,height:25,backgroundColor:'#eee',justifyContent: 'center',paddingLeft:15,}}>
			<Text style={{fontSize:14,color:'#666'}}  allowFontScaling={false} adjustsFontSizeToFit={false}>
			  {sectionData}
			</Text>
		  </View>
		);
	  }

	renderHeader(){

    return (
      <TouchableOpacity onPress={this._onPressHeader} style={styles.header}>

        <View style={{height:0}}>
          <Text   allowFontScaling={false} adjustsFontSizeToFit={false}>

          </Text>
        </View>
      </TouchableOpacity>
    );
   }
	renderFooter(){
    return (
      <View style={{height:0}}>
        <Text  allowFontScaling={false} adjustsFontSizeToFit={false}>

        </Text>
      </View>
    );
   }


    render() {

		if(this.state.sx){
			return(
			<View style={{flex:1}}>

			  <TouchableOpacity activeOpacity={1}   onPress={this._shuax.bind(this)}>
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-150,}}>
				    <Icon name="ios-refresh-outline" color="#ccc"size={70}  />
				    <Text style={{fontSize:14,color:'#ccc'}}  allowFontScaling={false} adjustsFontSizeToFit={false}>点击屏幕，重新加载</Text>
				</View>
			  </TouchableOpacity>
			 </View>
			)
		}

		else if(!this.state.loaded){
		  return this.renderLoadingView();
		}
		else{
		return(
		<View style={{flex:1}}>

		 <View style={{flex:1,flexDirection:'row',overflow:'hidden'}}>

		  <View style={{flex:1,paddingRight:20,}}>
			  <ListView
			    ref="myScroll"
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				renderHeader={this.renderHeader}
				renderFooter={this.renderFooter}
				renderSectionHeader={this.renderSectionHeader}
				initialListSize={3}
				showsVerticalScrollIndicator={false}
				pageSize={10}
			  />
		  </View>
		  <View onTouchStart={(e)=>{this.moveScroll(e)}}
                  onTouchMove={(e)=>{this.moveScroll(e)}} style={{position: 'absolute',top: (Dimensions.get('window').height-513)/2,right: 0,flexDirection: 'column',backgroundColor: 'transparent'}}>

		      {secs.map((tab, i) => {
				return <View key={tab}    style={{height:14,width:20,alignItems: 'center',}}>

				  <Text  style={{fontSize:12,color:'#4385f4'}}  allowFontScaling={false} adjustsFontSizeToFit={false}>
						{tab}
					</Text>
				</View>;
			  })}

		  </View>

		 </View>
		 </View>
		)
		}
    }
	renderRow(rowData, sectionID, rowID){



		return (
		 <TouchableOpacity onLayout={(e)=>{this.layoutH(e)}}  onPress={this.props._select.bind(this,rowData)}   >

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:0,paddingLeft:15,}}>
                 <View style={{width: 40, height: 40,borderRadius:20,alignItems:'center', justifyContent:'center'}}>
					 <Image source={rowData.avatar} style={{width: 40, height: 40,borderRadius:20,}} />
				 </View>
				 <View style={{marginLeft:15, flex:1,flexDirection:'column',height:51, borderBottomWidth:1,borderColor:'#dcdcdc',justifyContent: 'center',paddingBottom:5,paddingTop:2,}}>
				     <Text style={{fontSize:14,color:'#555'}}  allowFontScaling={false} adjustsFontSizeToFit={false}>{rowData.name}</Text>
					 <Text style={{fontSize:12,color:'#999',paddingTop:5,}}  allowFontScaling={false} adjustsFontSizeToFit={false}>{rowData.departName}</Text>
				</View>
			</View>

		 </TouchableOpacity>
		);

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
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

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
	thumbnail:{
    width:53,
    height:81,
  },
});
