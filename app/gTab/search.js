/**
 * 查询界面
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
} from 'react-native';
import t from 'tcomb-form-native';
import TitleBar from "../gCommon/title.js";
import DeviceStorage from "../gCommon/deviceStorage.js"
import { homeUrl } from "../gCommon/common.js";

var Form = t.form.Form;
// here we are: define your domain model
var Tax = t.struct({
    '起始时间': t.Number,              // a required string
    '结束时间': t.Number,  // an optional string  
});

export default class Search extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([
            ]),
            viewHidden: true,
            value: '↓',
            options: {
                auto: 'placeholders',
                fields: {
                    '结束时间': {
                        help: '格式:20170102 |201701 |2017',
                    },
                    '起始时间': {
                    }
                }
            },// optional rendering options (see documentation)
            formValue: {

            }
        };
    }


    onClick = () => {
        if (this.state.viewHidden) {
            var value2 = '↑'
        } else {
            var value2 = '↓'
        }

        this.setState({
            viewHidden: !this.state.viewHidden,
            value: value2
        });
    }

    onClick2 = () => {
        // call getValue() to get the values of the form
        var formValue = this.refs.form.getValue();
        this.setState({ formValue })
        if (formValue) {
            this.fetchYear(formValue["起始时间"], formValue["结束时间"]);
        }
    }


    fetchYear(startYear, endYear,currentUserId) {
        fetch(homeUrl + '/ticket/fetchByYears.do'
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "startYear": startYear,
                    "endYear": endYear,
                    "userId": this.state.currentUserId,
                })
            }
        ).then((response) => response.json())
            .then((jsondata) => {
                // alert(Object.keys(jsondata[0]))
                const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({ dataSource: ds.cloneWithRows(jsondata) });

            })
            .catch((error) => {
                alert(error);
                console.warning(error);
            });

    }



    hiddenForm() {
        if (this.state.viewHidden) {
            return null
        }
        return (
            <View>
                <Form
                    ref="form"
                    type={Tax}
                    options={this.state.options}
                    value={this.state.formValue}
                />
                <TouchableHighlight style={styles.button} onPress={this.onClick2} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>查询</Text>
                </TouchableHighlight>

            </View>

        )
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
            <View style={styles.container}>
                <TitleBar titleConfig="查询" rightButtonTitle="数据导出"></TitleBar>
                {this.hiddenForm()}
                <TouchableHighlight style={styles.button} onPress={this.onClick} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>{this.state.value}</Text>
                </TouchableHighlight>
                <Text style={{ textAlign: 'center', alignSelf: 'center' }} >起始日期:{this.state.formValue["起始时间"]}     结束日期:{this.state.formValue["结束时间"]}</Text>
                <ListView style={{ flex: 5 }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <CELL
                            tnumber={rowData.tnumber}
                            tmoney={rowData.tmoney}
                            checkuser={rowData.checkuser}
                            checkresult={rowData.checkresult}
                            tdate={rowData.tdate}
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
                        <Text style={{ flex: 1, color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.checkresult}</Text>
                        <Text style={{ flex: 1, color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.tdate}</Text>
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
