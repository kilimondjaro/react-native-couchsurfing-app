// @flow
import React, { Component } from 'react';
import {
  Platform,
  TextInput,
  View,
  Image,
  ScrollView,
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
  placeholder?: string;
  marginTop?: number; // Manual fix for changing status bar size bug
  onChange: (value: string) => void;
  enable: boolean;
  locations: Array<{description: string, id: string}>;
  loadLocations: (text: string) => void;
  onPress: () => void;
  dispatch: (action: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
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
    const {
      leftItem,
      rightItem,
      placeholder,
      value,
      onFocus,
      onBlur,
      marginTop,
      onPress,
      locations
    } = this.props;

    return (
      <View>
        <View style={styles.container}>
          <ScrollView
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
                  value={value}
                  autoCorrect={false}
                  onChangeText={(text) => this._onSearch(text)}
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
