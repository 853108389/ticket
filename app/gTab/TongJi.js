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
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';
import TitleBar from "../gCommon/title.js";
import t from 'tcomb-form-native';
import Pie from '../gCommon/pie.js'
import DeviceStorage from "../gCommon/deviceStorage.js"
import { homeUrl } from "../gCommon/common.js";

var Form = t.form.Form;
// here we are: define your domain model
var Tax = t.struct({
    '年份': t.Number,              // a required string
});

export default class Searchg2 extends Component {

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            viewHidden: true,
            year: '',
            passperc: '',
            sumMoney: '',
            pass: '',
            nopass: '',
            options: {
                auto: 'placeholders',
            },
            value: {

            }
        };
    }

    // componentDidMount() {
    //     // give focus to the name textbox
    //     this.refs.form.getComponent('年份').refs.input.focus();
    // }

    componentDidMount() {
        var that = this;
        DeviceStorage.get("currentUserId").then((result) => {
            that.setState({
                currentUserId: result,
            });
        }).done;
    }

    onClick = () => {
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();
        this.setState({ value })
        this.state.viewHidden = false;
        if (value) {
            this.fetchYear(value["年份"]);
        }
    }

    fetchYear(year) {
        fetch(homeUrl + '/ticket/fetchSumByYear.do'
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "year": year,
                    "userId": this.state.currentUserId,
                })
            }
        ).then((response) => response.json())
            .then((jsondata) => {
                let { passperc, sumMoney, pass, nopass } = jsondata

                if (passperc == '无') {
                    this.state.viewHidden = true;
                }
                // alert(this.state.viewHidden)
                this.setState({
                    year: year,
                    passperc: passperc,
                    sumMoney: sumMoney,
                    pass: pass,
                    nopass: nopass,
                });
                // alert(this.state.value)

            })
            .catch((error) => {
                alert("tj" + error)
                // alert("数据查询失败");
                console.warning(error);
            });

    }


    _onFetch(page = 1, callback, options) {
        let { year, passperc, sumMoney, pass, nopass } = this.state
        var rows = ['年份: ' + year, '通过率: ' + passperc, '总额: ' + sumMoney, '通过数量: ' + pass, '未通过数量: ' + nopass];
        if (page === 5) {
            callback(rows, {
                allLoaded: true, // the end of the list is reached
            });
        } else {
            callback(rows);
        }
    }






    /**
     * When a row is touched
     * @param {object} rowData Row data
     */
    _onPress(rowData) {
        console.log(rowData + ' pressed');
        alert(rowData)
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData) {
        return (
            <TouchableHighlight
                style={styles.row}
                underlayColor='#c8c7cc'
                onPress={() => this._onPress(rowData)}
            >
                <Text>{rowData}</Text>
            </TouchableHighlight>

        );
    }

    hiddenPie() {
        if (this.state.viewHidden) {
            return null
        }
        return (
            <Pie pass={this.state.pass} nopass={this.state.nopass}></Pie>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar titleConfig="统计" ></TitleBar>
                <View>
                    <Form
                        ref="form"
                        type={Tax}
                        options={this.state.options}
                        value={this.state.value}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onClick} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>查询</Text>
                    </TouchableHighlight>

                </View>
                <GiftedListView
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    firstLoader={true} // display a loader for the first fetching
                    pagination={false} // enable infinite scrolling using touch to load more
                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    withSections={false} // enable sections
                    customStyles={{
                        paginationView: {
                            backgroundColor: '#eee',
                        },
                    }}
                    refreshableTintColor="blue"
                />
                {this.hiddenPie()}
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
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    navBar: {
        height: 64,
        backgroundColor: '#CCC'
    },
    row: {
        padding: 10,
        height: 35,
    },
});