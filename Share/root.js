
import React, {Component} from 'react';
import {
    StyleSheet, 
    StatusBar,
    BackAndroid,
    InteractionManager,
    View,
    Platform,
    AsyncStorage,
} from 'react-native';
import Storage from 'react-native-storage';
import {Navigator} from 'react-native-deprecated-custom-components';
import Share from './share';
var _navigator;



export default class Root extends Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);

        this.state={num:1,}
    }

    componentDidMount() {

    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    renderScene(route, navigator) {
        let Component = route.component;
        _navigator = navigator;
        return (
                <Component navigator={navigator} {...route.params} route={route} />
                );
    }

    configureScene(route){
      if (route.sceneConfig) {
        return route.sceneConfig;
      }
      var conf = Navigator.SceneConfigs.FloatFromBottom;
      conf.gestures = null;
      return conf;
    }

    render() {


        return (
                <View style={{flex: 1}}>
				       
                      <Navigator
                        ref='navigator'
                        style={styles.navigator}
                        configureScene={this.configureScene}
                        renderScene={this.renderScene}
                        initialRoute={{
                          component: Share,
                          name: 'Share'
                        }}
                      />
                </View>
                );
    }
}
let styles = StyleSheet.create({
   navigator: {
      flex: 1,
   }
});
