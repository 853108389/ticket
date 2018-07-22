'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,    Text,
    ScrollView,
    Platform,
    BackAndroid,
    View,
    ListView,
    TouchableHighlight,
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';
import t from 'tcomb-form-native';


export default class Searchg2 extends Component {
   
     constructor(props) {
        super(props);//这一句不能省略，照抄即可
        // this.state = {
        //    year: '',
        //    passperc: '',
        //    sumMoney: '',
        //    pass: '',
        //    nopass: ',',
        // };
    }

    buttonTap = () => {
        // http://192.168.158.1:8080/apollo/ticket/test.do
        fetch('http://192.168.158.1:8080/apollo/ticket/fetchSumByYear.do'
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                })
            }
        ).then((response) => response.json())
            .then((jsondata) => {
                 let {year,passperc,sumMoney,pass,nopass} = jsondata
                 alert(passperc)
                 this.setState({
                     year:year,
                     passperc:passperc,
                     sumMoney:sumMoney,
                     pass:pass,
                     nopass:nopass,
                 });
            })
            .catch((error) => {
                alert(error);
                console.warning(error);
            });

    };

    _onFetch(page = 1, callback, options) {    
        fetch('http://192.168.158.1:8080/apollo/ticket/fetchSumByYear.do'
            , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                })
            }
        ).then((response) => response.json())
            .then((jsondata) => {
                 let {year,passperc,sumMoney,pass,nopass} = jsondata
                //  this.setState({
                //      year:year,
                //      passperc:passperc,
                //      sumMoney:sumMoney,
                //      pass:pass,
                //      nopass:nopass,
                //  });
                //  var rows = ['year: '+this.state.year,'passperc: '+this.state.passperc,'sumMoney: '+this.state.sumMoney ,'pass: '+ this.state.pass, 'nopass: '+this.state.nopass];
                var rows = ['year: '+year,'passperc: '+passperc,'sumMoney: '+sumMoney ,'pass: '+ pass, 'nopass: '+nopass];
                callback(rows);
            })
            .catch((error) => {
                alert(error);
                console.warning(error);
            });


        // setTimeout(() => {
        
        
        //     // if (page === 3) {
        //     //     callback(rows, {
        //     //         allLoaded: true, // the end of the list is reached
        //     //     });
        //     // } else {
        //         callback(rows);
        //     // }
        // }, 1000); // simulating network fetching
    }


    /**
     * When a row is touched
     * @param {object} rowData Row data
     */
    _onPress(rowData) {
        console.log(rowData + ' pressed');
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navBar} />
                <GiftedListView
                    rowView={this._renderRowView}
                    onFetch={this._onFetch}
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
                <View style={{ flexDirection: 'column', backgroundColor: '#eee' ,marginLeft:-50}}>
                    <View style={{ flexDirection: 'row', padding:10,justifyContent: 'center', flex: 1, alignItems: 'center' }} >
                        <Text style={{ flex: 1,  color: 'gray', fontSize:12, textAlign: 'center' }} >{this.props.count}</Text>
                        <Text style={{ flex: 1,  color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.tnumber}</Text>
                        <Text style={{ flex: 1,  color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.tmoney}</Text>
                        <Text style={{ flex: 1, color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.tcode}</Text>
                        <Text style={{ flex: 1, color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.tnopass}</Text>
                        <Text style={{ flex: 1,  color: 'gray', fontSize: 12, textAlign: 'center' }}>{this.props.tpass}</Text>
                    </View>
                    <View style={{ height: .5, alignSelf: 'stretch', backgroundColor: 'gray' }}></View>
                </View>
            </View>
        );
    }
}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    navBar: {
        height: 64,
        backgroundColor: '#CCC'
    },
    row: {
        padding: 10,
        height: 44,
    },
});