/**
 * 查询通过发票界面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Image,
    View,
    ScrollView,
    ListView,
    TouchableHighlight,
    AsyncStorage,
} from 'react-native';
import t from 'tcomb-form-native';
import TitleBar from "../gCommon/title.js";
import DeviceStorage from "../gCommon/deviceStorage.js"

var Form = t.form.Form;
// here we are: define your domain model
var Tax = t.struct({
    '起始时间': t.Number,              // a required string
    '结束时间': t.Number,  // an optional string  
});

export default class UserPass extends Component {
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


    fetchYear(currentUserId) {
        fetch('http://192.168.158.1:8080/apollo/ticket/fetchNoPassDetail.do'
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userId": currentUserId,
                    // "checkResult": this.state.checkResult,
                })
            }
        ).then((response) => response.json())
            .then((jsondata) => {
                const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({ dataSource: ds.cloneWithRows(jsondata) });

            })
            .catch((error) => {
                alert(error);
                console.warning(error);
            });

    }

    componentDidMount() {
        var that = this;
        DeviceStorage.get("currentUserId").then((result) => {
            that.setState({
                currentUserId: result,
            });
            that.fetchYear(result);
        });

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
                <TitleBar titleConfig="失败发票" leftButtonTitle="返回" navigator={this.props.navigator} _pressButton={this._pressButton.bind(this)} ></TitleBar>
                <ListView style={{ flex: 5 }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <CELL
                            tnumber={rowData.tnumber}
                            tmoney={rowData.tmoney}
                            checkuser={rowData.checkuser}
                            checkreason={rowData.checkreason}
                            checktimeFormat={rowData.checktimeFormat}
                        >
                        </CELL>}
                />
            </View>
        );
    }
}

class CELL extends Component {

    constructor(props) {
        super(props);
        this.state = { detailTitle: 'aaaa' };
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'column', backgroundColor: '#eee', marginLeft: -10 }}>
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center', flex: 1, alignItems: 'center' }} >
                        <Text style={{ flex: 1, color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.tnumber}</Text>
                        <Text style={{ flex: 1, color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.tmoney}</Text>
                        <Text style={{ flex: 1, color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.checkuser}</Text>
                        <Text style={{ flex: 1, color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.checkreason}</Text>
                        <Text style={{ flex: 1, color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.checktimeFormat}</Text>
                    </View>
                    <View style={{ height: .5, alignSelf: 'stretch', backgroundColor: 'gray' }}></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

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
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    }
});
