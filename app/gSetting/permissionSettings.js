'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Dimensions,
} from 'react-native';
import { homeUrl } from "../gCommon/common.js";
import TitleBar from "../gCommon/title.js";
const { width, height } = Dimensions.get('window');


const url = homeUrl + "/setting/toPermissionSettings.do";
export default class PermissionSettings extends Component {

    constructor(props) {
        super(props);
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
            <View>
                <TitleBar titleConfig="权限设置" leftButtonTitle="返回" navigator={this.props.navigator} _pressButton={this._pressButton.bind(this)}></TitleBar>
                <View style={styles.container}>
                    <WebView
                        style={styles.WebViewSytle}
                        source={{ uri: url, method: 'GET' }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scalesPageToFit={false}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
    },
    WebViewSytle: {
        justifyContent: 'center',
        alignItems: "center",
        width: width,
    }
});  