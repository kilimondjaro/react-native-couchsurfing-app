// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Navigator,
  Text,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import {loadLocations} from '../redux/actions/location';
import CSSearchBar from '../components/CSSearchBar';
import CSInputList from '../components/CSInputList';
import {signupUpdate} from '../redux/actions/signup';

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

        <CSInputList
          separatorStyle={{marginLeft: 0}}
        >
          {
            this.props.locations.map((location, i) => (
              <TouchableOpacity
                key={i}
                style={styles.searchItem}
                onPress={() => {
                  this.props.dispatch(
                    signupUpdate({
                      location: this.props.locations[i]
                    })
                  );
                  this.props.navigator.pop();
                }}
              >
                <Image style={{height: 20, width: 20}} source={require('./img/geopoint.png')}/>
                <Text style={{fontSize: 16, marginLeft: 10}}>{location.description}</Text>
              </TouchableOpacity>
            ))
          }
        </CSInputList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default connect(mapStateToProps)(SignUpSearchScreen);
