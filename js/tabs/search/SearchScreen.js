// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import CSSearchBar from '../../components/CSSearchBar';

type State = {
  onSearchFocus: boolean;
};

type Props = {

};

class SearchScreen extends Component {
  state: State;
  constructor(props: Props) {
    super(props);

    this.state = {
      onSearchFocus: false
    };
  }
  render() {
    const {onSearchFocus} = this.state;

    const tipView = !onSearchFocus ? (
      <View style={styles.tipView}>
        <Text style={styles.tipText}>Search for hosts, travelers, events, and members</Text>
      </View>
    ) : null;

    const cancelButton = onSearchFocus
      ? [{text: 'Cancel', onPress: () => this.setState({onSearchFocus: false})}]
      : null;

    return (
      <View style={styles.container}>
        <CSSearchBar
          placeholder="Search"
          rightItem={cancelButton}
          marginTop={-20}
          onFocus={() => this.setState({onSearchFocus: true})}
          onBlur={() => this.setState({onSearchFocus: false})}
        />
        {tipView}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  tipText: {
    color: '#c4cdd4',
    fontSize: 16,
    textAlign: 'center'
  },
  tipView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30
  }
};

export default SearchScreen;
