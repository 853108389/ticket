/**
 * 查询通过发票界面
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ListView,
    TouchableHighlight,
    AsyncStorage,
} from 'react-native';
import t from 'tcomb-form-native';
import TitleBar from "../gCommon/title.js";



export default class AboutSettings extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([
            ]),
            // checkResult: this.props.checkResult || '',
        };
    }


    componentDidMount() {

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
                <TitleBar titleConfig="关于产品" leftButtonTitle="返回" navigator={this.props.navigator} _pressButton={this._pressButton.bind(this)} ></TitleBar>
                <View style={styles.memo}>
                    <Text>本产品由&nbsp;年糕&nbsp;开发</Text>
                    <Text>联系邮箱:853108389@qq.com</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    memo:{
        justifyContent: 'center',
        fontSize :25,
        alignSelf: 'center',
    }
});
