// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Navigator,
  Text,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import {loadLocations} from '../redux/actions/location';
import CSSearchBar from '../components/CSSearchBar';
import CSTextInputList from '../components/CSTextInputList';

type Props = {
  navigator: Navigator;
  locations: Array<{description: string, id: string}>;
  loadLocations: (text: string) => void;
  dispatch: (action: any) => void;
};

class SignUpSearchScreen extends Component {
  props: Props;
  state: {
    searchText: string;
  };

  constructor(props: Props) {
    super(props);
    this._onSearch.bind(this);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(loadLocations(''));
  }

  _onSearch(text: string) {
    this.props.dispatch(loadLocations(text));
    this.setState({searchText: text});
  }

  render() {
    return (
      <View>
        <CSSearchBar
          leftItem={[{
            icon: require('../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          value={this.state.searchText}
          onChange={(text) => this._onSearch(text)}
        />

        <CSTextInputList
          separatorStyle={{marginLeft: 0}}
        >
          {
            this.props.locations.map((location, i) => (
              <View key={i} style={{height: 50, flex: 1, padding: 15, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
                <Image style={{height: 20, width: 20}} source={require('./img/geopoint.png')}/>
                <Text style={{fontSize: 16, marginLeft: 10}}>{location.description}</Text>
              </View>
            ))
          }
        </CSTextInputList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

const mapStateToProps = function(state) {
  return {
    locations: state.location.locations
  };
};
//
// const mapDispatchToProps = function(dispatch) {
//   return {
//     loadLocations: () => loadLocations(dispatch)
//   };
// };

export default connect(mapStateToProps)(SignUpSearchScreen);
