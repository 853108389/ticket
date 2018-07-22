'use strict';
import React, { Component } from 'react';

import {
    StyleSheet,    
    Text,
    ScrollView,
    View,
    ListView,
    TouchableHighlight,
} from 'react-native';
import RefreshableListView from 'react-native-refreshable-listview';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

import React, { Component } from 'react';

export default class ArticlesScreen extends Component {
  propTypes: {
    // eg. props mapped from store state
    articles: React.PropTypes.array.isRequired,
    isRefreshingArticles: React.PropTypes.bool.isRequired,
    // eg. a bound action creator
    refreshArticles: React.PropTypes.func.isRequired,
  },
  getInitialState() {
    return {dataSource: ds.cloneWithRows(this.props.articles)}
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.articles !== nextProps.articles) {
      this.setState({dataSource: ds.cloneWithRows(nextProps.articles)})
    }
  },
  renderArticle(article) {
    return <ArticleView article={article} />
  },
  render() {
    return (
      <ControlledRefreshableListView
        dataSource={this.state.dataSource}
        renderRow={this.renderArticle}
        isRefreshing={this.props.isRefreshingArticles}
        onRefresh={this.props.refreshArticles}
        refreshDescription="Refreshing articles"
      />
    )
  }
}


