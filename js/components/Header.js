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
  icons?: Array<Object>;
  onPress?: () => void;
};

export type Props = {
  title?: string;
  leftItem?: Item;
  rightItem?: Item;
  style?: any;
  children?: any;
};

class HeaderAndroid extends Component {

}

class ItemWrapperIOS extends Component {
  props: {
    item: Item;
  };

  render() {
    if (!this.props.item) {
      return null;
    }

    const {text, icons, onPress} = this.props.item;

    const itemElement = text
      ? (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.itemText}>{text}</Text>
      </TouchableOpacity>)
      : icons ? icons.map(icon => (
      <TouchableOpacity onPress={onPress}>
        <Image source={icon}/>
      </TouchableOpacity>)) : null;
    return (
      <View style={styles.itemWrapper}>
        {itemElement}
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
      <View style={styles.header}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS
            item={leftItem}
          />
        </View>
        { titleElement }
        <View style={styles.rightItem}>
          <ItemWrapperIOS
            item={rightItem}
          />
        </View>
      </View>
    );
  }
}

const Header = Platform.OS === 'ios' ? HeaderIOS : HeaderAndroid;

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
    fontSize: 20
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

export default Header;
