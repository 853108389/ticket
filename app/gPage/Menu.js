

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';

const window = Dimensions.get('window');
const uri = '../home_side_user.png';
import { homeUrl } from "../gCommon/common.js";
import DeviceStorage from "../gCommon/deviceStorage.js"

export default class Menu extends Component {

  constructor(props) {
    super(props);//这一句不能省略，照抄即可 
    this.state = {
      currentUser: ""
    };
  }

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };// 注意这里有分号

  componentDidMount() {

    var _that = this;
    DeviceStorage.get("currentUser").then((result) => {
      _that.setState({
        currentUser: result
      });
    });

    DeviceStorage.get("uname").then((result) => {
      _that.setState({
        uname: result
      });
    });

  }

  Logout() {
    /**
     * 全部移除
     */
    var _that = this;
    DeviceStorage.clear().then((result) => {
        _that.setState({
          currentUser: "",
        });
        //弹路由
        const { navigator } = _that.props;
        const routers = navigator.getCurrentRoutes();
        for (let i = routers.length; i > 1; i--) {
          navigator.pop();
        }
    });
  }


  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image source={require('../home_side_user.png')}></Image>
          <Text style={styles.name}>
            {this.state.currentUser}( {this.state.uname} )
          </Text>
        </View>
        <TouchableHighlight onPress={() => this.props.onItemSelected('联系年糕')} underlayColor='#99d9f4'>
          <Text
            style={styles.item}>
            操作
        </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.Logout.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.item}>注销</Text>
        </TouchableHighlight>


      </ScrollView>
    );
  }
};


var styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 10,
    color: '#fff',
  },

});

