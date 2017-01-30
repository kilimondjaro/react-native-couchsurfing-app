// @flow
import React, { Component } from 'react';
import {
  Platform,
  TextInput,
  View,
  Image,
  StyleSheet
} from 'react-native';
import {ItemsWrapperIOS} from './CSHeader';
import type {Item} from './CSHeader';

type Props = {
  leftItem?: Array<Item>;
  rightItem?: Array<Item>;
  value: string;
  onChange: (value: string) => void;
};

class CSSearchBar extends Component {
  props: Props;

  render() {
    const { leftItem, rightItem } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.leftItem}>
          <ItemsWrapperIOS
            items={leftItem}
          />
        </View>
        <View style={styles.searchArea}>
          <Image
            style={styles.searchIcon}
            source={require('./img/search-bar.png')}
          />
          <TextInput
            clearButtonMode="always"
            style={styles.textInput}
            placeholder="Enter a Location"
            value={this.props.value}
            onChangeText={this.props.onChange}
          />
        </View>
        <View style={styles.rightItem}>
          <ItemsWrapperIOS
            items={rightItem}
          />
        </View>
      </View>
    );
  }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  searchArea: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 5
  },
  textInput: {
    flex: 1,
    height: 20,
    margin: 5,
    width: 200
  },
  searchIcon: {
    width: 20,
    height: 20
  }
});

export default CSSearchBar;
