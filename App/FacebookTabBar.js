import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FacebookTabBar = React.createClass({
  tabIcons: [],
  tabtexts: [],
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
	tabNames: React.PropTypes.array,
	 
  },

  componentDidMount() {
	 
    this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value }) {
	 
    this.tabIcons.forEach((icon, i) => {   
		 
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
	    
      
	if(value>=this.props.activeTab && value <this.tabIcons.length-1) {
	 this.tabIcons[this.props.activeTab].setNativeProps({
        style: {
          color: this.iconColor(value-this.props.activeTab),  
        },
      }); 
	 this.tabIcons[this.props.activeTab+1].setNativeProps({
        style: {
          color: this.iconColors(value-this.props.activeTab),  
        },
      }); 
	  this.tabtexts[this.props.activeTab].setNativeProps({
        style: {
          color: this.iconColor(value-this.props.activeTab),  
        },
      }); 
	 this.tabtexts[this.props.activeTab+1].setNativeProps({
        style: {
          color: this.iconColors(value-this.props.activeTab),  
        },
      }); 
     
	 
	}
	else if(value<this.props.activeTab && value >=0){
		this.tabIcons[this.props.activeTab].setNativeProps({
        style: {
          color: this.iconColor(this.props.activeTab-value),  
        },
        }); 
		this.tabIcons[this.props.activeTab-1].setNativeProps({
        style: {
          color: this.iconColors(this.props.activeTab-value),  
        },
       });  
	   this.tabtexts[this.props.activeTab].setNativeProps({
        style: {
          color: this.iconColor(this.props.activeTab-value),  
        },
        }); 
		this.tabtexts[this.props.activeTab-1].setNativeProps({
        style: {
          color: this.iconColors(this.props.activeTab-value),  
        },
       });  
	    
		 
	}
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 67 + (162 - 67) * progress;
    const green = 133 + (165 - 133) * progress;
    const blue = 244 - (244 - 171) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },
  
  iconColors(progress) {
    const a = 162 - (162 - 67) * progress;
    const b = 165 - (165 - 133) * progress;    
    const c = 171 + (244 - 171) * progress;
    return `rgb(${a}, ${b}, ${c})`;  
  },

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={28}
            color={this.props.activeTab === i ? 'rgb(67,133,244)' : 'rgb(162,165,171)'}
            ref={(icon) => { this.tabIcons[i] = icon; }}
          />
		  <Text ref={(texts) => { this.tabtexts[i] = texts; }}  style={{color: this.props.activeTab === i ? 'rgb(67,133,244)' : 'rgb(162,165,171)',fontSize:12}}>
                {this.props.tabNames[i]}
            </Text>
        </TouchableOpacity>;
      })}
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  tabs: {
    height: 60,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
});

export default FacebookTabBar;
