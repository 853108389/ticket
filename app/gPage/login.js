'use strict';


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid,
    AsyncStorage,
} from 'react-native';

import t from 'tcomb-form-native';
import TitleBar from "../gCommon/title.js";
import MyTabNavigator from "../gCommon/myTabNavigator";
import { setCurrentUser, getCurrentUser, homeUrl } from "../gCommon/common.js";
import DeviceStorage from "../gCommon/deviceStorage.js"

var Form = t.form.Form;
// here we are: define your domain model
var Tax = t.struct({
    '用户名': t.String,              // a required string
    '密码': t.Number,  // an optional string
});

var options = { auto: 'placeholders' };
export default class Login extends Component {
    constructor(props) {
        super(props);//这一句不能省略，照抄即可 
        this.state = {
            formValue: {

            }
        };
    }

    componentDidMount() {
        var _that = this;
        // give focus to the name textbox
        this.refs.form.getComponent('用户名').refs.input.focus();
        DeviceStorage.get("usernameAndPassword").then((result) => {
            _that.fetchLogin(result)
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
                    const { navigator } = this.props;
                    if (navigator) {
                        navigator.push({
                            name: 'MyTabNavigator',
                            component: MyTabNavigator,
                        })
                    }
                } else {
                    ToastAndroid.show('用户名或密码错误', ToastAndroid.LONG);
                }
            })
            .catch((error) => {
                alert(error)
                // ToastAndroid.show('连接到服务器失败', ToastAndroid.LONG);
            });
    }

    onClick2 = () => {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'MyTabNavigator',
                component: MyTabNavigator,
            })
        }
    }


    onClick = () => {
        // call getValue() to get the values of the form
        var formValue = this.refs.form.getValue();
        this.setState({ formValue })
        //  alert([...value]);
        if (formValue) { // if validation fails, value will be null
            this.fetchLogin(formValue)
        }
    }



    render() {

        return (
            <View>
                <TitleBar titleConfig="登入" navigator={this.props.navigator}  ></TitleBar>
                <Image style={styles.img} source={require('../home_side_user.png')}></Image>
                <View style={styles.container}>
                    {/* display */}
                    <Form
                        ref="form"
                        type={Tax}
                        options={options}
                        value={this.state.formValue}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onClick} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>登入</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this.onClick2} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>登入无密码</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

}


var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    img: {
        alignSelf: 'center'
    }

});

