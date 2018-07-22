/**
 * 主路由器
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Platform,
  BackAndroid,
  ToastAndroid,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import TabNavigator from 'react-native-tab-navigator';
import { Navigator } from "react-native-deprecated-custom-components"
// import Test from './test.js';
import Login from '../gPage/login.js';
import DeviceStorage from "../gCommon/deviceStorage.js";


export default class MainNavigator extends Component {
  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    // this.state = {
    //   defaultName: '',
    //   defaultComponent: Login,
    // }
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    const navigator = this.refs.navigator;
    const routers = navigator.getCurrentRoutes();
    if (routers.length > 2) {
      navigator.pop();
      return true;//接管默认行为
    } else {

      //到了主页了
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
    // return false;//默认行为

  };

  

  render() {
    //   alert(this.props.defaultName);
    const NoBackSwipe = {
      ...Navigator.SceneConfigs.FloatFromRight,
      gestures: {
        pop: {}
      }
    };
    var defaultName = "Login";
    var defaultComponent = Login;
    // var defaultName = this.props.defaultName;
    // var defaultComponent =  this.props.defaultComponent;

    return (
      <Navigator
        initialRoute={{ name:  defaultName, component: defaultComponent }}
        //配置场景
        ref="navigator"
        configureScene=
        {
          (route) => {
            //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
            return NoBackSwipe;
          }
        }
        renderScene={
          (route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }
        } />


    );
  }
}


const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },

  startupButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    margin: 8,
    padding: 8,
  },


  progressBarContainer: {
    height: 10,
    margin: 10,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },
  progressBar: {
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#ff0000',
  },
  viewPager: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
  },
});


AppRegistry.registerComponent('NianGao', () => NianGao);
