/**
 * 主页+side
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
} from 'react-native';
import Camera from 'react-native-camera';
import TabNavigator from 'react-native-tab-navigator';
import Home from '../gPage/home.js';
import TitleBar from "../gCommon/title.js";
import SideMenu from 'react-native-side-menu';
import Menu from '../gPage/Menu.js';//导入 菜单 组件
import ModalCheck from "../gCommon/modalCheck.js"


export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedItem: 'About',
        };
    }

    title() {
        return (
            <Image style={styles.img2} source={require('../home_sideView.png')} />
        )
    }

    _pressButton() {
        this.setState({
            isOpen: !this.state.isOpen,

        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen: isOpen });
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }



    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} navigator={this.props.navigator} />;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <View style={styles.container}>
                    <View style={[styles.flex, styles.homeBackgroundColor]}>
                        <TitleBar titleConfig="主页" leftButtonTitle={this.title()} ></TitleBar>
                        <Home navigator={this.props.navigator} ></Home>
                    </View>
                </View> 
                <Button style={styles.button} onPress={() => this._pressButton()}>
                    <Image
                        source={{ uri: '../home_sideView.png', width: 40, height: 40, }} />
                </Button>

            </SideMenu>
            // <View style={styles.container}>
            //     <ModalCheck></ModalCheck>
            // </View>

        )
    }

}


class Button extends Component {
    handlePress(e) {
        if (this.props.onPress) {
            this.props.onPress(e);
        }
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.handlePress.bind(this)}
                style={this.props.style}>
                <Text>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
}



const styles = StyleSheet.create({

    button: {
        position: 'absolute',
        padding: 20,
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    flex: {
        flex: 1,
    },
    homeBackgroundColor: {
        backgroundColor: '#eee',
    },

    img2: {
        width: 80,
        height: 80,
    },

});


