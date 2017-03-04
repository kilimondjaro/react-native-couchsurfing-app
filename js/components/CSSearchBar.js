// @flow
import React, { Component } from 'react';
import {
  Platform,
  TextInput,
  View,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import {ItemsWrapperIOS} from './CSHeader';
import type {Item} from './CSHeader';

type Props = {
  leftItem?: Array<Item>;
  rightItem?: Array<Item>;
  value: string;
  editable: boolean;
  placeholder?: string;
  marginTop?: number; // Manual fix for changing status bar size bug
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

class CSSearchBar extends Component {
  props: Props;

  render() {
    const {
      leftItem,
      rightItem,
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      marginTop,
      editable
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={{marginTop: marginTop}}
        >
          <View style={styles.header}>
            {
              leftItem
                ? (
                  <View style={styles.leftItem}>
                    <ItemsWrapperIOS
                      items={leftItem}
                    />
                  </View>
                ) : null
            }
            <View style={styles.searchArea}>
              <Image
                style={styles.searchIcon}
                source={require('./img/search-bar.png')}
              />
              <TextInput
                clearButtonMode="always"
                style={styles.textInput}
                placeholder={placeholder || ''}
                autoCorrect={false}
                value={value}
                editable={this.props.editable}
                onChangeText={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </View>
            {
              rightItem
                ? (
                  <View style={styles.rightItem}>
                    <ItemsWrapperIOS
                      items={rightItem}
                    />
                  </View>
                ) : null
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  rightItem: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 10
  },
  searchArea: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 5,
    backgroundColor: '#ebecee',
    borderRadius: 6

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
