/**
 * Sample React Native App
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
import Login from './gPage/login.js';
import DeviceStorage from "./gCommon/deviceStorage.js";
import MainNavigator from "./gCommon/mainNavigator.js"

export default class NianGao extends Component {
  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      defaultName: '',
      defaultComponent: null,
    }
  }

  componentWillMount() {
    DeviceStorage.get("usernameAndPassword").then((result) => {
      _that.fetchLogin(result)
      this.setState({
        defaultName: 'MyTabNavigator',
        defaultComponent: MyTabNavigator,
      })
    }).catch(() => {
      this.setState({
        defaultName: 'Login',
        defaultComponent: Login,
      })
    })
  }


  fetchLogin(value) {
    let { 用户名: username, 密码: password, } = value;
    fetch(homeUrl + '/user/login.do'
      , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": username,
          "password": password,
        })
      }
    ).then((response) => response.text())
      .then((textdata) => {
        textdata = textdata.split(",");
        if (textdata[0] == 1) {
          // alert(textdata)
          // 登录成功 保存当前登录用户 TODO
          var currentUser = textdata[1];
          var currentUserId = textdata[2];
          var uname = textdata[3];
          DeviceStorage.save("currentUser", currentUser).then(() => {
          });
          DeviceStorage.save("currentUserId", currentUserId).then(() => {
          });
          DeviceStorage.save("uname", uname).then(() => {
          });
          DeviceStorage.save("usernameAndPassword", value).then(() => {
          });
          this.setState({
            defaultName: 'MyTabNavigator',
            defaultComponent: MyTabNavigator,
          })
        } else {
          this.setState({
            defaultName: 'Login',
            defaultComponent: Login,
          })
        }
      })
      .catch((error) => {
        alert(error)
        // ToastAndroid.show('连接到服务器失败', ToastAndroid.LONG);
      });
  }



  render() {
    return (
      <MainNavigator defaultName={this.state.defaultName} defaultComponent={this.state.defaultComponent} ></MainNavigator>
    );
  }
}


AppRegistry.registerComponent('NianGao', () => NianGao);
