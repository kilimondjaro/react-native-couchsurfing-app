// @flow
import React, {Component} from 'react';
import {
  View,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import CSNavigationSearchBar from '../components/CSNavigationSearchBar';
import {signupUpdate} from '../redux/actions/signup';

type Props = {
  navigator: Navigator;
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

  _onSearch(text: string) {
    this.setState({searchText: text});
  }

  render() {
    return (
      <View>
        <CSNavigationSearchBar
          leftItem={[{
            icon: require('../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          value={this.state.searchText}
          onChange={(text) => this._onSearch(text)}
          enable
          onPress={(location) => {
            this.props.dispatch(
              signupUpdate({
                location
              })
            );
            this.props.navigator.pop();
          }}
        />
      </View>
    );
  }
}

export default connect()(SignUpSearchScreen);
