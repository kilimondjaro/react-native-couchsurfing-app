// @flow
import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import CSSearchBar from '../../components/CSSearchBar';
import CSInputList from '../../components/CSInputList';
import {loadLocations, loadLocationByCoordinates} from '../../redux/actions/location';

class LocationPickerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onSearchFocus: false,
      searchText: ''
    };
  }

  _onSearch(text: string) {
    this.props.dispatch(loadLocations(text));
    this.setState({searchText: text});
  }

  onSetState(name, value) {
    this.props.dispatch({
      type: 'SET_TRIP_DATA',
      name,
      value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CSSearchBar
          placeholder="Enter a Location"
          value={this.state.searchText}
          leftItem={[{text: 'Back', onPress: () => this.props.navigator.pop()}]}
          onChange={(text) => this._onSearch(text)}
          returnKeyType="search"
          onFocus={() => this.setState({onSearchFocus: true})}
          onBlur={() => this.setState({onSearchFocus: false})}
        />
        <CSInputList
          separatorStyle={{marginLeft: 0}}
        >
          {
            this.state.searchText
              ? this.props.locations.map((loc, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.searchItem}
                  onPress={() => {
                    this.onSetState('location', loc)
                    this.props.navigator.pop();
                  }}
                >
                  <Image
                    source={require('../../components/img/geopoint.png')}
                  />
                  <Text
                    style={{fontSize: 16, marginLeft: 10}}
                   >
                     {loc.description}
                  </Text>
                </TouchableOpacity>
              ))
              : (<TouchableOpacity
                style={styles.searchItem}
                onPress={() => this.props.dispatch(loadLocationByCoordinates())}
              >
                <Image
                  source={require('../../components/img/geopoint.png')}
                />
                <Text
                  style={{fontSize: 16, marginLeft: 10}}
                 >
                  Current Location
                </Text>
              </TouchableOpacity>)
          }
        </CSInputList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
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

export default connect(
  state => ({locations: state.location.locations, trip: state.trip})
)(LocationPickerScreen);
