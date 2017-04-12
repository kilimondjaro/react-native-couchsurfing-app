// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {CSHeader} from '../../components/CSHeader';
import UpcomingTravel from './UpcomingTravel';

class DashboardScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="dashboard"
        />
        <UpcomingTravel navigator={this.props.navigator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  header: {
    backgroundColor: 'white'
  },
});

export default connect()(DashboardScreen);
