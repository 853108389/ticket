/**
 * 主页
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    View,
    PixelRatio,
    DeviceEventEmitter,
} from 'react-native';
import Camera from 'react-native-camera';
import TabNavigator from 'react-native-tab-navigator';
import Qcode from '../gCommon/Qcode.js';
import HandInput from '../gPage/handInput.js';
import UserPass from "./userPass.js"
import UserNoPass from "./userNoPass.js"
import scanner from "../gPage/scanner.js"
import DeviceStorage from "../gCommon/deviceStorage.js"


export default class Home extends Component {
    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
        };
    }

    componentDidMount() {
        var that = this;
        DeviceStorage.get("currentUserId").then((result) => {
            that.fetchData(result);
            that.setState({
                currentUserId:result,
            })
        });
        this.subscription = DeviceEventEmitter.addListener('userPassDidChange', (result) => {
            that.fetchData(this.state.currentUserId)
            // that.fetchData(result);   
        })
    }

    componentWillUnmount() {
        // 移除
        this.subscription.remove();
    }

    show(txt) {
        alert(txt);
    }

    onClickQcode = () => {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if (navigator) {
            navigator.push({
                name: 'scanner',
                component: scanner,
            })
        }
    }

    onClickHandInput = () => {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if (navigator) {
            navigator.push({
                name: 'HandInput',
                component: HandInput,
                params: {
                }
            })
        }
    }

    onClickPass = () => {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if (navigator) {
            navigator.push({
                name: 'UserPass',
                component: UserPass,
            })
        }
    }

    onClickNoPass = () => {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if (navigator) {
            navigator.push({
                name: 'UserNoPass',
                component: UserNoPass,
            })
        }
    }

    fetchData(result) {
        fetch('http://192.168.158.1:8080/apollo/user/fetchPassNoPassByUserId.do'
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userId": result,
                })
            }
        ).then((response) => response.json())
            .then((jsondata) => {
                let nopass = 0;
                let [pass, ...nopass2] = jsondata;
                for (let i = 0; i < nopass2.length; i++) {
                    nopass += nopass2[i];
                }
                this.setState({
                    pass: pass,
                    nopass: nopass,
                });

            })
            .catch((error) => {
                alert(error)
                ToastAndroid.show('连接到服务器失败', ToastAndroid.LONG);
            });

    }


    render() {
        return (
            <View style={styles.home}>
                <View style={{ flexDirection: 'row', backgroundColor: "#eee" }}>
                    <TouchableHighlight underlayColor='#E1F6FF' onPress={this.onClickNoPass}>
                        <View style={[styles.box1]}>
                            <Text style={[styles.boxFont, { color: "red" }]}>{this.state.nopass}</Text>
                            <Text style={styles.boxFont}>验证失败发票</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#E1F6FF' onPress={this.onClickPass}>
                        <View style={[styles.box1]}>
                            <Text style={[styles.boxFont, { color: "green" }]}>{this.state.pass}</Text>
                            <Text style={styles.boxFont}>验证通过发票</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: "#eee", marginTop: 10 }} >
                    <TouchableHighlight underlayColor='#E1F6FF' onPress={this.show.bind(this, 'test')}>
                        <View style={[styles.box2]}>
                            <View style={styles.img}>
                                <Image source={require('../home_photo2.png')}></Image>
                            </View>
                            <Text style={styles.boxFont}>单张扫描</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#E1F6FF' onPress={this.onClickQcode} >
                        <View style={[styles.box2]}>
                            <View style={styles.img}>
                                <Image source={require('../home_photo1.png')}></Image>
                            </View>
                            <Text style={styles.boxFont}>连续扫描</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#E1F6FF' onPress={this.onClickHandInput}>
                        <View style={[styles.box2]}>
                            <View style={styles.img}>
                                <Image source={require('../home_handInput.png')}></Image>
                            </View>
                            <Text style={styles.boxFont}>手工录入</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

}




const styles = StyleSheet.create({
    img: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    home: {
        // backgroundColor:"darkgray",  
    },

    flex: {
        flex: 1,
    },

    box1: {
        borderColor: '#48BBEC',
        borderWidth: 1 / PixelRatio.get(),
        width: Dimensions.get('window').width / 2,
        height: 120,
        backgroundColor: "#fff",
        borderRadius: 4,
    },
    box2: {
        borderColor: '#48BBEC',
        borderWidth: 1 / PixelRatio.get(),
        width: Dimensions.get('window').width / 3,
        height: 120,
        backgroundColor: "#fff",
        borderRadius: 4,
    },

    boxFont: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 40
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

