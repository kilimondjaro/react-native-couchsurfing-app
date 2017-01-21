// @flow
import React, { Component } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet
} from 'react-native';

export type Item = {
  text?: string;
  icon?: Object;
  onPress?: () => void;
};

export type Props = {
  title?: string;
  leftItem?: Array<Item>;
  rightItem?: Array<Item>;
  style?: any;
  children?: any;
};

class HeaderAndroid extends Component {

}

class ItemsWrapperIOS extends Component {
  props: {
    items?: Array<Item>;
  };

  render() {
    if (!this.props.items) {
      return null;
    }

    return (
      <View style={styles.itemWrapper}>
        {this.props.items.map((itemElement, i) => {
          const {text, icon, onPress} = itemElement;

          if (!text && !icon) {
            return null;
          }

          return (
            <TouchableOpacity key={i} onPress={onPress}>
              {
                text
                  ? (<Text style={styles.itemText}>{text}</Text>)
                  : (<Image source={icon}/>)
              }
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

class HeaderIOS extends Component {
  props: Props;

  render() {
    const { title, leftItem, rightItem } = this.props;
    const titleElement = title
      ? (<View style={styles.centerItem}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
        </View>)
      : null;

    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemsWrapperIOS
            items={leftItem}
          />
        </View>
        { titleElement }
        <View style={styles.rightItem}>
          <ItemsWrapperIOS
            items={rightItem}
          />
        </View>
      </View>
    );
  }
}

const CSHeader = Platform.OS === 'ios' ? HeaderIOS : HeaderAndroid;

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
    alignItems: 'center'
  },
  title: {
    fontSize: 16
  },
  itemText: {
    fontSize: 15
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10
  },
  itemWrapper: {
    flexDirection: 'row'
  }
});

export default CSHeader;
