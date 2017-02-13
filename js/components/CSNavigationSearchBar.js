// @flow
import React, { Component } from 'react';
import {
  Platform,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {ItemsWrapperIOS} from './CSHeader';
import {loadLocations} from '../redux/actions/location';
import CSTextInputList from './CSTextInputList';
import type {Item} from './CSHeader';

type Props = {
  leftItem?: Array<Item>;
  rightItem?: Array<Item>;
  value: string;
  onChange: (value: string) => void;
  enable: boolean;
  locations: Array<{description: string, id: string}>;
  loadLocations: (text: string) => void;
  onPress: () => void;
  dispatch: (action: any) => void;
};

class CSNavigationSearchBar extends Component {
  props: Props;

  componentDidMount() {
    this.props.dispatch(loadLocations(''));
  }

  _onSearch(text: string) {
    if (this.props.enable) {
      this.props.dispatch(loadLocations(text));
    }
    this.props.onChange(text);
  }

  render() {
    const { leftItem, rightItem, onPress, locations } = this.props;

    return (
      <View>
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
              onChangeText={(text) => this._onSearch(text)}
            />
          </View>
          <View style={styles.rightItem}>
            <ItemsWrapperIOS
              items={rightItem}
            />
          </View>
        </View>
        <CSTextInputList
          separatorStyle={{marginLeft: 0}}
        >
          {
            locations.map((location, i) => (
              <TouchableOpacity
                key={i}
                style={styles.searchItem}
                onPress={() => onPress(location)}
              >
                <Image style={{height: 20, width: 20}} source={require('./img/geopoint.png')}/>
                <Text style={{fontSize: 16, marginLeft: 10}}>{location.description}</Text>
              </TouchableOpacity>
            ))
          }
        </CSTextInputList>
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
  },
  searchItem: {
    height: 50,
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
});

const mapStateToProps = function(state) {
  return {
    locations: state.location.locations
  };
};

export default connect(mapStateToProps)(CSNavigationSearchBar);
