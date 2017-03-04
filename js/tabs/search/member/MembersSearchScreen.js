// @flow

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
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
          {[1,2,3,4,5].map(i => (<SurferCard key={i} style={{marginBottom: 20}}/>))}
        </ScrollView>
      </View>
    );
  }
}

export default MembersSearchScreen;
