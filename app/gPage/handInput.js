'use strict';


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableHighlight,
    ToastAndroid,
    DeviceEventEmitter,
} from 'react-native';

import t from 'tcomb-form-native';
import TitleBar from "../gCommon/title.js";
import DeviceStorage from "../gCommon/deviceStorage.js"
import CheckResult from "../gCommon/checkResult.js"

var Form = t.form.Form;
// here we are: define your domain model
var Tax = t.struct({
    '发票号码': t.Number,              // a required string
    '税前金额': t.Number,  // an optional string
    // '发票代码': t.Number,               // a required number
    // '校验码': t.Number,       // a boolean
    // '开票日期': t.Number,
});

var options = { auto: 'placeholders' };
export default class HandInput extends Component {
    constructor(props) {
        super(props);//这一句不能省略，照抄即可 
        this.state = {
            isUpdatePass: false,
            currentUserId: '',
            flag: false,
            data: {
            },

        };
    }

    componentDidMount() {
        // give focus to the name textbox
        this.refs.form.getComponent('发票号码').refs.input.focus();
        var that = this;
        DeviceStorage.get("currentUserId").then((result) => {
            that.setState({
                currentUserId: result,
            });
        }).done;
    }


    commitData(value) {
        let { 发票号码: tnumber, 税前金额: tmoney, 发票代码: tcode, 校验码: tcheckcode, 开票日期: tdate } = value;
        fetch('http://192.168.158.1:8080/apollo/ticket/fetchInsert.do'
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "tnumber": tnumber,
                    "tmoney": tmoney,
                    "tcode": tcode,
                    "tcheckcode": tcheckcode,
                    "tdate": tdate,
                    "userId": this.state.currentUserId,
                })
            }
        ).then((response) => response.text())
            .then((textdata) => {
                let message = "message";
                //-1为第一次 0为未通过 1为通过
                if (textdata == "1") {
                    message = "通过";
                } if (textdata == "00") {
                    message = "验证过";
                } if (textdata == "01") {
                    message = "数据错误";
                } if (textdata == "-1") {
                    message = "第一次录入";
                }
                ToastAndroid.show(message, ToastAndroid.LONG);
                this.setState({
                    flag: true,
                    isUpdatePass: true,
                })
            }).then(() => { DeviceEventEmitter.emit('userPassDidChange', "result")})
            .catch((error) => {
                alert(error)
                // alert("数据查询失败");
                console.warning(error);
            });

    }

    _pressButton() {
        const { navigator } = this.props;
        if (navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:了
            navigator.pop();
        }
    }

    onClick = () => {
        // call getValue() to get the values of the form
        var formValue = this.refs.form.getValue();
        this.setState({ formValue })
        if (formValue) { // if validation fails, value will be null
            this.commitData(formValue);
        }
    }


    render() {
        return (
            <View>
                <TitleBar titleConfig="手工输入" leftButtonTitle="返回" navigator={this.props.navigator} _pressButton={this._pressButton.bind(this)} ></TitleBar>
                <View style={styles.container}>
                    <Form
                        ref="form"
                        type={Tax}
                        options={options}
                        value={this.state.formValue}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onClick} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>提交</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <CheckResult data={this.state.formValue} modalVisible={this.state.flag}></CheckResult>
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
    }
});

