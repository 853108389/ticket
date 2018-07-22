/**
 * 用户设置
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ScrollView,
    Platform,
    BackAndroid,
    View,
    ListView,
    TouchableHighlight,
    Dimensions,
    AsyncStorage,
    Image,
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';
import TitleBar from "../gCommon/title.js";
import t from 'tcomb-form-native';
import Pie from '../gCommon/pie.js'
import DeviceStorage from "../gCommon/deviceStorage.js"
import { homeUrl } from "../gCommon/common.js";
import DataSettingListView from "../gCommon/dataSettingListView"


export default class UserSettings extends Component {

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            flag:0,
            rows: [],
        };
    }

    componentDidMount() {
        var that = this;
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
        DeviceStorage.get("currentUserId").then((result) => {
            that.setState({
                currentUserId: result,
            });
            that.fetchUserByUserId();
        }).done;
    }

    fetchUserByUserId() {
        fetch(homeUrl + '/user/fetchUserByUserId.do'
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userId": this.state.currentUserId,
                })
            }
        ).then((response) => response.json())
            .then((jsondata) => {
                let { truename, password, loginname, unit: { uname } } = jsondata;
                // let {uname} = unit;
                // alert(JSON.stringify(jsondata))
                var rows = ['真实姓名: ' + truename, '登录名: ' + loginname, '密码: ' + password, '单位名称: ' + uname];
                this.setState({
                    rows: rows,
                    flag:1,
                });
                // alert(this.state.rows)

            })
            .catch((error) => {
                alert("tj" + error)
                // alert("数据查询失败");
                console.warning(error);
            });
    }

    DataSettingListView(){
        if(this.state.flag ==1){
            return <DataSettingListView rows={this.state.rows}></DataSettingListView>
        }
    }

     _pressButton() {
        const { navigator } = this.props;
        if (navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:了
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar titleConfig="用户信息" leftButtonTitle="返回" navigator={this.props.navigator} _pressButton={this._pressButton.bind(this)}></TitleBar>
                   <View style={styles.img}>
                    <Image source={require('../home_side_user.png')}></Image>
                    <Text style={styles.name}>
                        {this.state.currentUser}( {this.state.uname} )
                    </Text>
                </View>
                {this.DataSettingListView()}
            </View>
        );
    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    img: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    name: {
        lineHeight: 46,
        fontSize: 20,
        marginLeft: 10,
    },
});
