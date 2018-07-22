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
    TouchableHighlight,
    Image,
    AsyncStorage,
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';
import SettingListView from "../gCommon/settingListView.js"
import t from 'tcomb-form-native';
import TitleBar from "../gCommon/title.js";
import DeviceStorage from "../gCommon/deviceStorage.js"

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        var _that = this;
        DeviceStorage.get("currentUser").then((result) => {
            _that.setState({
                currentUser: result
            });
        });
        DeviceStorage.get("uname").then((result) => {
            _that.setState({
                uname: result
            });
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <TitleBar titleConfig="设置" ></TitleBar>
                <View style={styles.img}>
                    <Image source={require('../home_side_user.png')}></Image>
                    <Text style={styles.name}>
                        {this.state.currentUser}( {this.state.uname} )
                    </Text>
                </View>
                <SettingListView navigator={this.props.navigator}></SettingListView>
            </View>

        );
    }
}


var styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#eee',
    },
    img: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    name: {
        lineHeight: 46,
        fontSize: 20,
        marginLeft: 10,
    },
});


