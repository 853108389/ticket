/**
 * 顶部title
 */
import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

export default class TitleBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            titleConfig :this.props.titleConfig,  
            leftButtonTitle:this.props.leftButtonTitle,
            rightButtonTitle:this.props.rightButtonTitle,
            _pressButton:this.props._pressButton,
            leftButtonConfig:this.props.leftButtonConfig,
        };
    }

    render() {
        const rightButtonConfig = {
            title: this.state.rightButtonTitle||'',
            handler: () => alert('hello!'),
        };

        const leftButtonConfig = {
            title: this.state.leftButtonTitle||'',
            handler: this.state._pressButton,
        };
        //   const leftButtonConfig = {
        //     title: <Image style={styles.img} source={require('../home_sideView.png')} />
        // };

        const titleConfig = {
            title: this.state.titleConfig,
        };

        return (
            <View >
                <NavigationBar
                    title={titleConfig}
                    leftButton={leftButtonConfig}
                    rightButton={rightButtonConfig}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        width: 80,
        height: 80,
    },
});


