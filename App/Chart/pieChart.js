import React ,{ Component }from 'react';
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
	BackHandler,
	Image,
	RefreshControl,
	processColor,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view'; 
import Icon from 'react-native-vector-icons/Ionicons';
import update from 'immutability-helper'; 
import {PieChart , BarChart , CombinedChart} from 'react-native-charts-wrapper';
var colors = ['#4385f4','#FFD08C','#FFF78C','#FFD08C','#FFD08C'];
export default class PieChartScreen extends React.Component {
   

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }
  constructor() {
    super();
    this._pressButton = this._pressButton.bind(this);
	BackHandler.addEventListener('hardwareBackPress', this._pressButton);
    this.state = {
      domain:'',	
	  values:[],
	  arrX:[],
      uid:'',	
	  show:true,
      BarChartA:false,
      BarChartB:false,
      BarChartC:false,	  
	  ArX:[],
      legend: {
        enabled: false,
        textSize: 8,
        form: 'CIRCLE',
        position: 'RIGHT_OF_CHART',
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [{value: 40, label: '湖北'},
            {value: 21, label: '湖南'},
            {value: 20, label: '广东'},
            {value: 9, label: '广西'},
            {value: 20, label: '上海'}],
          label: 'Pie dataset',
          config: {
            colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#FFD08C'), processColor('#FFD08C')],
            valueTextSize: 16,
            valueTextColor: processColor('red'),
            sliceSpace: 3,
            selectionShift: 13
          }
        }],
      },
      description: {
        text: '',
        textSize: 13,
        textColor: processColor('darkgray'),

      },
	   legends: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      datas: {},
      xAxiss: {},
	  legendx: {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 15,
        yEntrySpace: 5,
        wordWrapEnabled: true
      },
      datax: {},
      xAxisx: {},
	  
	  xAxisz: {}, 
	  dataz: {}
    };
  }
  
    componentDidMount() {  
		this.setState({domain:data.data.domain.slice(0,-6),uid:data.data.uid})
        this.timer = setTimeout(() => {this.getData();},800);
		
    }
	
	getData(){  
	 
	var arrY = [];
	var data = {};
	var cons = {};
	var indexA = null;
	var indexB = null;
	var name = [];
	var names = [];
	var ar = [];
	
    fetch('' + this.state.domain + 'app00aee5aa1cc1bf0ecd5d41/dashboard/getBoard2DataService.do?id='+this.props.data.id+'&userId='+this.state.uid+'&access_token=32886e81a349f1ef')
		  .then((response) => response.json())
		  .then((responseData) => { 
		       data = JSON.parse(responseData.data);
		       cons = JSON.parse(responseData.boardInfo);
			   console.log(data)
			   console.log(cons)
			   cons.layout.rows.forEach((info,i)=>{ 
				   if(info.type == 'widget'){
					   data.data[0].forEach((ds,j)=>{ 
					     info.widgets[0].widget.data.config.keys.forEach((ke,v)=>{
							 if(ds == ke.col){
								 name.push(j);
								 console.log(name)
							 }
						 })
						 if(data.data[0].length-1 == j){
							data.data.forEach((ns,sj)=>{ 
							 if(sj != 0){
								 var _name = '';
								  name.forEach((index,n)=>{
									
									  
										_name += ns[index];
										if(name.length-1 == n){
											names.push(_name);  
											ar =  [...new Set(names)];
											this.setState({
												ArX:ar,
											})
										}
										
									
								 })
								 }
							 }) 
						 }
						 
						 if(ds == info.widgets[0].widget.data.config.values[0].cols[0].col){
							    indexB = j;
						 }
						 
					     if(info.widgets[0].widget.data.config.groups.length != 0){ 
							 if(ds == info.widgets[0].widget.data.config.groups[0].col){ 
								indexA = j; 	  
						     } 
							 var arrX = [];
							 var arrX1 = [];
							 info.widgets[0].widget.data.config.groups[0].values.forEach((s,x)=>{
								 var obj={values:[],label: s,config: {drawValues: false, colors: [processColor(colors[x])]}};
                                 var objs={values:[],label: s,config: {drawValues: false,colors: [processColor(colors[x])],mode: "CUBIC_BEZIER",drawCircles: true,lineWidth: 2,}};								 
								 
								 data.data.forEach((main,y)=>{
									 
										 if(s == main[indexA]){
											 obj.values.push(Number(main[indexB])); 
                                             objs.values.push(Number(main[indexB])); 											 
										 }
										 if(data.data.length-1 == y){
											 arrX.push(obj); 
                                             arrX1.push(objs); 											 
										 } 
										 if(info.widgets[0].widget.data.config.groups[0].values.length-1 == x && data.data.length-1 == y && data.data[0].length-1 == j){ 
											 this.setState({
												 ArX:ar,
												 show:false,
												 arrX:arrX,
												 values:info.widgets[0].widget.data.config.groups[0].values,
												 BarChartA:false,
												 BarChartB:true,
												 BarChartC:true,
												 datax: {
													dataSets: arrX,
													config: {
													  barWidth: (1-(info.widgets[0].widget.data.config.groups[0].values.length+1)*0.1)/info.widgets[0].widget.data.config.groups[0].values.length,
													  group: {
														fromX: 0,
														groupSpace: 0.1,
														barSpace: 0.1,
													  },
													}
												  },
												  xAxisx: {
													valueFormatter: ar,
													granularityEnabled: true,
													granularity: 1,
													axisMaximum: (data.data.length-1)/info.widgets[0].widget.data.config.groups[0].values.length,
													axisMinimum: 0,
													centerAxisLabels: true
												  }, 
												  dataz: { 
													lineData: {
													  dataSets: arrX1,
													}   
												  },
												  xAxisz: {
													valueFormatter: ar,
													granularityEnabled: true,
													granularity: 1
												  },
											  })
										 } 	
									 
								 })
							 })
						 }
						 else{
							 var arrbar = [];
							 var arrk = [];
							 var objr={values:[]}; 	
							 var arrd = [];
							 var objw={values:[],label: '',config: {drawValues: false,colors: [processColor('#4385f4')],mode: "CUBIC_BEZIER",drawCircles: true,lineWidth: 2,}};
							 data.data.forEach((main,y)=>{
								 var objs = {y:null};
								 objw.label = info.widgets[0].widget.data.config.values[0].cols[0].col;
								 if(y != 0){
									 objs.y = Number(main[indexB]);
									 objr.values.push(Number(main[indexB]));
									 objw.values.push(Number(main[indexB]));
									 arrbar.push(objs);
									 
									 
									 if(data.data.length-1 == y && data.data[0].length-1 == j){
										 arrk.push(objr);
										 arrd.push(objw);
										 console.log(arrd)  
										 this.setState({
											 ArX:ar,
											 show:false,
											 values:[].concat(info.widgets[0].widget.data.config.values[0].cols[0].col),
											 arrX:arrk,
											 BarChartA:true,
											 BarChartB:false,
											 BarChartC:true,
											 datas: {
												dataSets: [{
												  values: arrbar,
												  label: 'Bar dataSet',
												  config: {
													color: processColor('#4385f4'),
													barSpacePercent: 20,
													barShadowColor: processColor('lightgrey'),
													highlightAlpha: 50,
													highlightColor: processColor('red'),
												  }
												}],
											  },
											  xAxiss: {
												valueFormatter: ar,
												granularityEnabled: false,
												granularity : 10,
											  },
											  dataz: { 
													lineData: {
													  dataSets: arrd,
													}   
											  },
											  xAxisz: {
												valueFormatter: ar,
												granularityEnabled: true,
												granularity: 1
											  },
										  })
									 } 
								 }
								 
							 })
						 }
					     
						 
						})
				   }    
			   })
			   
			   
			 
		  })   
		  .catch((error) => { 
		  console.log(1)
          })
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }
  }
  
  

  render() {
    return (

      <View style={{flex: 1,backgroundColor:'#fff'}}>

       <View style={styles.card}>
			  <View style={{flex:1,justifyContent:'center'}}>
						 <TouchableOpacity onPress={this._pressButton.bind(this)}>
							  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
									<Image source={require('../imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
									<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
							  </View>
						</TouchableOpacity>
			  </View>
			  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
						<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
									<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>图表</Text>
						</View>
			  </View>
			  <View style={{flex:1,justifyContent:'center'}}>

			  </View>
		</View>
        <ScrollView  style={{flex:1,width:Dimensions.get('window').width,}}>
         
		 {this.state.BarChartC ? <CombinedChart
          data={this.state.dataz}
          xAxis={this.state.xAxisz}
          onSelect={this.handleSelect.bind(this)}
          style={styles.container}/> : null}
		  
		{this.state.BarChartA ? <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.datas}
            xAxis={this.state.xAxiss}
            animation={{durationX: 2000}}
            legend={this.state.legends}
            gridBackgroundColor={processColor('#ffffff')}
            drawBarShadow={false}
            drawValueAboveBar={false}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
          />
        </View> : null}
		
		{this.state.BarChartB ? <View style={styles.container}>
          <BarChart
            style={styles.chart}
            xAxis={this.state.xAxisx}
            data={this.state.datax}
            legend={this.state.legendx}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
          />
        </View> : null}
		<View style={{width:Dimensions.get('window').width,flexDirection:'row',marginTop:35,marginBottom:15}}>   
		  <View style={{flexDirection:'column',borderRightWidth:1,borderColor:'#ccc',}}>
		      <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{flex:1,borderBottomWidth:1,borderTopWidth:1,borderColor:'#ccc',paddingBottom:10,paddingTop:10,paddingLeft:10,paddingRight:10,}}> </Text>
			  {this.state.ArX.map((data,i)=>{
				  return <Text allowFontScaling={false} adjustsFontSizeToFit={false} key={i} style={{borderBottomWidth:1,borderColor:'#ccc',paddingBottom:10,paddingTop:10,paddingLeft:10,paddingRight:10}}>{data}</Text>
			  })}
		  </View>
		  <View style={{flex:1,flexDirection:'row',}}>
			  {this.state.arrX.map((data,x)=>{
				  return <View key={x} style={{flex:1,}}>
				          <View style={{flex:1,borderBottomWidth:1,borderTopWidth:1,borderRightWidth:1,borderColor:'#ccc',paddingBottom:10,paddingTop:10,justifyContent:'center',alignItems: 'center',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.values[x]}</Text></View>
						  {data.values.map((ds,y)=>{ 
						    return <View style={{flex:1,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,paddingBottom:10,paddingTop:10,justifyContent:'center',alignItems: 'center',}}><Text key={y} allowFontScaling={false} adjustsFontSizeToFit={false} >{ds}</Text></View>   
						  })}
				  </View>
			  })}
		  </View>
		</View>
       </ScrollView>
	   
	   {this.state.show ? <View style={{justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width, height:Dimensions.get('window').height-70,overflow:'hidden',position:'absolute',top:70,left:0, backgroundColor:'#fff'}}>
				<View style={styles.loading}>
					<ActivityIndicator color="white"/>
					<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
				</View>
		</View> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	height:300,
	marginTop:30,
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
  chart: {
    flex: 1
  }
});
