/**
 * 二维码扫描
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    AsyncStorage,
    View,
    ToastAndroid,
} from 'react-native';

import { QRScannerView } from 'ac-qrcode';
import CheckResult from "./checkResult.js"
import DeviceStorage from "../gCommon/deviceStorage.js"

export default class Qcode extends Component {
    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            currentUserId: '',
            modalVisible:false,
        }
    }

    componentDidMount() {
        var that = this;
          DeviceStorage.get("currentUserId").then((result) => {
            that.setState({
                currentUserId: result,
            });
        }).done;
    }

    render() {
        return (
                <QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()}
                 />
            
        )
    }

    _renderTitleBar() {
        return (
            <Text
                style={{ color: 'white', textAlignVertical: 'center', textAlign: 'center', font: 20, padding: 12 }}
            >二维码扫描</Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{ color: 'white', textAlignVertical: 'center', textAlign: 'center', font: 20, padding: 12 }}
            >二维码扫描(底部)</Text>
        )
    }


    barcodeReceived(e) {

        ToastAndroid.show( this.state.currentUserId + 'Type: ' + e.type + '\nData: ' + e.data, ToastAndroid.LONG);
        let str = e.data;
        // alert(str)
        //TODO 验证不是发票的二维码
        let array = str.split(",");
        let [, , tcode, tnumber, tmoney, tdate, tcheckcode] = array;
        var value = {
            "tcode": tcode,
            "tnumber": tnumber,
            "tmoney": tmoney,
            "tdate": tdate,
            "tcheckcode": tcheckcode,
            "userId": this.state.scurrentUserId,
        }
        this.commitData(value);
    }

    commitData(value) {
        let { tcode, tnumber, tmoney, tdate, tcheckcode } = value;
        fetch('http://192.168.158.1:8080/apollo/ticket/fetchInsert.do'
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    value
                )
            }
        ).then((response) => response.text())
            .then((textdata) => {
                let message = "";
                //-1为第一次 0为未通过 1为通过
                if (textdata == "1") {
                    message = "通过";
                }if (textdata == "00") {
                    message = "验证过";
                }if (textdata == "01") {
                    message = "数据错误";
                }if (textdata == "-1") {
                    message = "第一次录入";
                }
                alert(message)
                this.setState({
                    modalVisible:true,
                })


            })
            .catch((error) => {
                // alert(error)
                alert("数据查询失败");
                console.warning(error);
            });

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    }
});