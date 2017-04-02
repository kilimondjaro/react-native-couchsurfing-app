// @flow

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import SurferCard from '../components/SurferCard';

type Props = {

};

type State = {
  refreshing: boolean;
};

class MembersSearchScreen extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }
  render() {
    const {members} = this.props.search;

    return (
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              title="Pull to refresh..."
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                setTimeout(() => this.setState({refreshing: false}), 1000);
              }}
            />
          }
        >
          {members.map((account, i) => (<SurferCard account={account.attributes} key={i} style={{marginBottom: 20}}/>))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({search: state.search})
)(MembersSearchScreen);
