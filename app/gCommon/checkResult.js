/**
 * 验证结果
 * 遮罩
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, Text,
    ScrollView,
    Platform,
    BackAndroid,
    View,
    ListView,
    TouchableHighlight,
    Dimensions,
    Modal,
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import TitleBar from "../gCommon/title.js";
import DataSettingListView from "../gCommon/dataSettingListView.js";
import { window } from "../gCommon/common.js";
export default class CheckResult extends Component {

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            data: this.props.data || {},
            animationType: 'none',//none slide fade
            modalVisible: this.props.modalVisible,//模态场景是否可见(修改此处)
            transparent: true,//是否透明显示
        };
    }


    componentDidMount() {
        let { 发票号码: tnumber, 税前金额: tmoney, 发票代码: tcode, 校验码: tcheckcode, 开票日期: tdate, message } = this.state.data;
        // let { tcode, tnumber, tmoney, tdate, tcheckcode, message } = this.state.data;
        var header = '验证结果        :' + message + '\n' + "上次验证时间: " + "20170101";
        var rows = {};
        rows[header] = ['发票号码: ' + tnumber, '税前金额: ' + tmoney, '发票代码: ' + tcode, '校验码: ' + tcheckcode, '开票日期: ' + tdate];
        this.setState({
            rows: rows,
            flag: 1,
        });
    }

    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    componentWillReceiveProps() {
        if (this.props.data) {
            let { 发票号码: tnumber, 税前金额: tmoney, 发票代码: tcode, 校验码: tcheckcode, 开票日期: tdate, message } = this.props.data;
            // let { tcode, tnumber, tmoney, tdate, tcheckcode, message } = this.state.data;
            var header = '验证结果        :' + message + '\n' + "上次验证时间: " + "20170101";
            var rows = {};
            rows[header] = ['发票号码: ' + tnumber, '税前金额: ' + tmoney, '发票代码: ' + tcode, '校验码: ' + tcheckcode, '开票日期: ' + tdate];
            this.setState({
                rows: rows,
                flag: 1,
                modalVisible: this.props.modalVisible,
            });
        }

    }

    DataSettingListView() {
        if (this.state.flag == 1) {
            return <DataSettingListView rows={this.state.rows}  ></DataSettingListView>
        }
    }

    startShow = () => {
        this._setModalVisible(true)
    }

    render() {

        return (
            <View style={styles.container}>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this._setModalVisible(false) }}
                    onShow={this.startShow}
                >
                    <View style={[styles.outContainer, styles.modalBackgroundStyle]}>
                        <View style={[styles.innerContainer, styles.innerContainerTransparentStyle]}>
                            {this.DataSettingListView()}
                            <TouchableHighlight onPress={this._setModalVisible.bind(this, false)} style={styles.button}>
                                <Text style={styles.buttonText}> 关闭 </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>

        );
    }

}

var styles = StyleSheet.create({
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
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    modalBackgroundStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    outContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        height: window.height / 1.5,
        width: window.width - 40,
        alignSelf: 'stretch',
    },
    innerContainerTransparentStyle: {
        width: window.width - 80,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});
