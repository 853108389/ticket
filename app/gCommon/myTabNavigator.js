/**
 * 底部导航
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
    TextInput,
    Button,
} from 'react-native';
import t from 'tcomb-form-native';
import Camera from 'react-native-camera';
import TabNavigator from 'react-native-tab-navigator';
import Search from '../gTab/search.js';
import TitleBar from "../gCommon/title.js";
import TongJi from '../gTab/TongJi.js'
import Searchg2 from '../searchg2.js'
import Homepage from "../gTab/homepage.js";
import Login from "../gPage/login";
import CheckResult from "../gCommon/checkResult";
import Settings from "../gTab/settings.js";
import DeviceStorage from "../gCommon/deviceStorage.js";


export default class MyTabNavigator extends Component {
    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            selectedTab: 'home',
        };
    }

    render() {
        var homeView = (
            <Homepage navigator={this.props.navigator}></Homepage>
        );

        var searchView = (
            <View style={[styles.flex, { backgroundColor: '#ffff0033' }]}>
                <Search></Search>
            </View>
        );

        var tongView = (<TongJi></TongJi>);

        var settingView = (
            <View style={[styles.flex, { backgroundColor: '#fff' }]}>
                <Settings navigator={this.props.navigator} ></Settings>
            </View>
        );

        return (
            <TabNavigator
                tabBarStyle={{ height: 60, bottom: 0 }}
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="主页"
                    renderIcon={() => <Image style={styles.img} source={require('../home_tab_home_normal.png')} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require('../home_tab_home_pressed.png')} />}
                    badgeText=""
                    onPress={() => {
                        {/*this.fetchData(this.state.currentUserId)*/ }
                        this.setState({ selectedTab: 'home' })
                    }}

                >
                    {homeView}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'xhome'}
                    title="查询"
                    renderIcon={() => <Image style={styles.img} source={require('../home_tab_search_normal.png')} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require('../home_tab_search_pressed.png')} />}
                    badgeText=""

                    onPress={() => this.setState({ selectedTab: 'xhome' })}

                >
                    {searchView}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'ghome'}
                    title="统计"
                    renderIcon={() => <Image style={styles.img} source={require('../home_tab_pie_normal.png')} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require('../home_tab_pie_pressed.png')} />}
                    badgeText=""

                    onPress={() => this.setState({ selectedTab: 'ghome' })}
                >
                    {tongView}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'setting'}
                    title="设置"
                    renderIcon={() => <Image style={styles.img} source={require('../home_tab_setting_normal.png')} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={require('../home_tab_setting_pressed.png')} />}
                    renderBadge={() => <Text></Text>}
                    onPress={() => this.setState({ selectedTab: 'setting' })}
                >

                    {settingView}
                </TabNavigator.Item>
            </TabNavigator>

        )
    }

}





const styles = StyleSheet.create({

    flex: {
        flex: 1,
    },

    img2: {
        width: 80,
        height: 80,
    },

    img: {
        width: 32,
        height: 32,
    },

    box1: {
        width: 175,
        height: 120,
        backgroundColor: "darkcyan",
        marginRight: 2.5,
        marginLeft: 2.5
    },
    box2: {
        width: 115,
        height: 120,
        backgroundColor: "#eee",
        marginRight: 2.5,
        marginLeft: 2.5
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

