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

import CheckResult from "../gCommon/checkResult.js"
import Qcode from "../gCommon/Qcode"


export default class Scanner extends Component {
    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            currentUserId: '',
            modalVisible: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Qcode></Qcode>
                <View>
                    <CheckResult></CheckResult>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    }
});
