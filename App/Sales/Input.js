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
	BackAndroid,
	Image,
  TextInput,
	RefreshControl,
	ListView,
} from 'react-native'; 
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
var array = [];
var aa=[];
let NUMS=null;
var NUMSk=null;
export default class qus extends React.Component {

    constructor(props) {
        super(props);

    		this.state = {
            number:this.props.num,
    	  };
    }

    static propTypes = {
        ...View.propTypes,
        number: React.PropTypes.string
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
    		   number: nextProps.num
    	   });
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
       NUMS=this.state.number;
       this.props.Onclick.bind(this,NUMS)();
    }

    minus(){
      NUMS=this.state.number;
       NUMS--;

         if(NUMS<=this.props.min){
           NUMS=this.props.min;
           this.setState({number:NUMS,});
           this.props.Onclick.bind(this,NUMS)();
         }else{
           this.setState({number:NUMS,});
           this.props.Onclick.bind(this,NUMS)();
         }


    }
    add(){

      NUMS=this.state.number;
      NUMS++;

        if(NUMS>=this.props.max){
          NUMS=this.props.max;
          this.setState({number:NUMS,});
          this.props.Onclick.bind(this,NUMS)();
        }else{
          this.setState({number:NUMS,});
          this.props.Onclick.bind(this,NUMS)();
        }


    }

    changs(text){


        if(text>this.props.max){
          console.log(1)
          NUMS=this.props.max;
          this.setState({number:this.props.max,});
          this.props.Onclick.bind(this,this.props.max)();
        }else if(text<this.props.min){
          NUMS=this.props.min;
          this.setState({number:this.props.min,});
          this.props.Onclick.bind(this,this.props.min)();
        }else{ 
          NUMS=text;
          this.setState({number:text,});
          this.props.Onclick.bind(this,text)();
        }



    }







    render() {
           return (
                <View style={[{width:150,flexDirection:'row',borderWidth:1,borderColor:'#ddd',borderRadius:3,justifyContent:'center',alignItems:'center',height:40},this.props.styles]}>
                  <TouchableHighlight underlayColor="#ddd" onPress={this.minus.bind(this)} style={{paddingLeft:9,paddingRight:9,}}>
                     <View style={{justifyContent:'center',alignItems:'center',paddingTop:2,}}><Icon name="ios-remove" color="#555"size={30}  /></View>
                  </TouchableHighlight>
                  <View style={{flex:1,borderLeftWidth:1,borderRightWidth:1,borderColor:'#ddd'}}>
                    <TextInput
                    ref='text'
                    defaultValue={String(this.state.number)}
                    underlineColorAndroid = 'transparent'
                    keyboardType = 'numeric'
                    placeholderTextColor = {'#ccc'}
                    onChangeText={(text) => this.changs.bind(this,text)()}
                    style={{paddingBottom:3,paddingTop:3,lineHeight:15,color:'#333',textAlign:'center',flex:1,fontSize:14,borderRadius:3}}/>
                  </View>
                  <TouchableHighlight onPress={this.add.bind(this)} underlayColor="#ddd" style={{paddingLeft:10,paddingRight:10,}}>
                     <View style={{justifyContent:'center',alignItems:'center',paddingTop:2}}><Icon name="ios-add" color="#555"size={30}  /></View>
                  </TouchableHighlight>
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
    height:65,
    paddingTop:20,
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
