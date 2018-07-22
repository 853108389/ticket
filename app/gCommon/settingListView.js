/**
 * 设置主页面
 * ListView
 */
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
    TouchableHighlight
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';
import t from 'tcomb-form-native';
import PermissionSettings from "../gSetting/permissionSettings"
import UserSettings from "../gSetting/userSettings"
import AboutSettings from "../gSetting/aboutSettings"
import HelpSettings from "../gSetting/helpSettings"
import UnitSettings from "../gSetting/unitSettings"

export default class SettingListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
       * Will be called when refreshing
       * Should be replaced by your own logic
       * @param {number} page Requested page to fetch
       * @param {function} callback Should pass the rows
       * @param {object} options Inform if first load
       */
    _onFetch(page = 1, callback, options) {
        // var header = 'Header ';
        // var rows = {};
        // rows[header] = ['row ' + ((page - 1) * 3 + 1), 'row ' + ((page - 1) * 3 + 2), 'row ' + ((page - 1) * 3 + 3)];
        var rows = {
            "用户设置": {
                PermissionSettings: "权限查看",
                UnitSettings: "单位信息",
                UserSettings: "用户信息",
            },
            "用户反馈": {
                AboutSettings: "关于产品",
                HelpSettings: "帮助与反馈",
            }
        }
         callback(rows);
    }

    /**
     * When a row is touched
     * @param {object} rowData Row data
     */
    _onPress(rowData, sid, rid) {
        // alert(rid)
        const { navigator } = this.props;
        if (navigator) {
            if (rid == "PermissionSettings") {
                navigator.push({
                    name: rid,
                    component: PermissionSettings,
                })
            }
            if (rid == "UserSettings") {
                navigator.push({
                    name: rid,
                    component: UserSettings,
                })
            }
            if (rid == "AboutSettings") {
                navigator.push({
                    name: rid,
                    component: AboutSettings,
                })
            }
            if (rid == "HelpSettings") {
                navigator.push({
                    name: rid,
                    component: HelpSettings,
                })
            }
            if (rid == "UnitSettings") {
                navigator.push({
                    name: rid,
                    component: UnitSettings,
                })
            }
        }
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData, sid, rid) {
        return (
            <TouchableHighlight
                style={customStyles.row}
                underlayColor='#c8c7cc'
                onPress={() => this._onPress(rowData, sid, rid)}
            >
                <Text>{rowData}</Text>
            </TouchableHighlight>
        );
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderSectionHeaderView(sectionData, sectionID) {
        return (
            <View style={customStyles.header}>
                <Text style={customStyles.headerTitle}>
                    {sectionID}
                </Text>
            </View>
        );
    }

    /**
     * Render the refreshable view when waiting for refresh
     * On Android, the view should be touchable to trigger the refreshCallback
     * @param {function} refreshCallback The function to call to refresh the listview
     */
    _renderRefreshableWaitingView(refreshCallback) {
        if (Platform.OS !== 'android') {
            return (
                <View style={customStyles.refreshableView}>
                    <Text style={customStyles.actionsLabel}>
                        ↓
          </Text>
                </View>
            );
        } else {
            return (
                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                    style={customStyles.refreshableView}
                >
                    <Text style={customStyles.actionsLabel}>
                        ↻
          </Text>
                </TouchableHighlight>
            );
        }
    }

    /**
     * Render the refreshable view when the pull to refresh has been activated
     * @platform ios
     */
    _renderRefreshableWillRefreshView() {
        return (
            <View style={customStyles.refreshableView}>
                <Text style={customStyles.actionsLabel}>
                    ↻
        </Text>
            </View>
        );
    }

    /**
     * Render the refreshable view when fetching
     */
    _renderRefreshableFetchingView() {
        return (
            <View style={customStyles.refreshableView}>
                <GiftedSpinner />
            </View>
        );
    }

    /**
     * Render the pagination view when waiting for touch
     * @param {function} paginateCallback The function to call to load more rows
     */
    _renderPaginationWaitingView(paginateCallback) {
        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={paginateCallback}
                style={customStyles.paginationView}
            >
                <Text style={[customStyles.actionsLabel, { fontSize: 13 }]}>
                    Load more
        </Text>
            </TouchableHighlight>
        );
    }

    /**
     * Render the pagination view when fetching
     */
    _renderPaginationFetchigView() {
        return (
            <View style={customStyles.paginationView}>
                <GiftedSpinner />
            </View>
        );
    }

    /**
     * Render the pagination view when end of list is reached
     */
    _renderPaginationAllLoadedView() {
        return (
            <View style={customStyles.paginationView}>
                <Text style={customStyles.actionsLabel}>
                    ~
        </Text>
            </View>
        );
    }

    /**
     * Render a view when there is no row to display at the first fetch
     * @param {function} refreshCallback The function to call to refresh the listview
     */
    _renderEmptyView(refreshCallback) {
        return (
            <View style={customStyles.defaultView}>
                <Text style={customStyles.defaultViewTitle}>
                    Sorry, there is no content to display
        </Text>

                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                >
                    <Text>
                        ↻
          </Text>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * Render a separator between rows
     */
    _renderSeparatorView() {
        return (
            <View style={customStyles.separator} />
        );
    }

    render() {
        return (
            <View style={screenStyles.container}>
                <GiftedListView
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    initialListSize={12} // the maximum number of rows displayable without scrolling (height of the listview / height of row)
                    firstLoader={true} // display a loader for the first fetching

                    pagination={false} // enable infinite scrolling using touch to load more
                    paginationFetchigView={this._renderPaginationFetchigView}
                    paginationAllLoadedView={this._renderPaginationAllLoadedView}
                    paginationWaitingView={this._renderPaginationWaitingView}

                    refreshable={false} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    refreshableViewHeight={50} // correct height is mandatory
                    refreshableDistance={40} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
                    refreshableFetchingView={this._renderRefreshableFetchingView}
                    refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
                    refreshableWaitingView={this._renderRefreshableWaitingView}

                    emptyView={this._renderEmptyView}

                    renderSeparator={this._renderSeparatorView}

                    withSections={true} // enable sections
                    sectionHeaderView={this._renderSectionHeaderView}

                    PullToRefreshViewAndroidProps={{
                        colors: ['#fff'],
                        progressBackgroundColor: '#003e82',
                    }}

                    rowHasChanged={(r1, r2) => {
                        r1.id !== r2.id
                    }}

                />
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
    }
});


var customStyles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#CCC'
    },
    refreshableView: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsLabel: {
        fontSize: 20,
        color: '#007aff',
    },
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    defaultView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    row: {
        padding: 10,
        height: 44,
        backgroundColor: "#fff"
    },
    header: {
        marginTop: 30,
        backgroundColor: '#50a4ff',
        padding: 10,
    },
    headerTitle: {
        color: '#fff',
    },
});

var screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    navBar: {
        height: 64,
        backgroundColor: '#007aff',

        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitle: {
        color: '#fff',
        fontSize: 16,
        marginTop: 12,
    }
});








