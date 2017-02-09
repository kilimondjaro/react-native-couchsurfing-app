// @flow
import React, {Component} from 'react';
import {
  View
} from 'react-native';
import CSCalendar from './calendar/CSCalendar';
import AcceptingStatusBar from './AcceptingStatusBar';
import {CSHeader} from '../../components/CSHeader';


class HostingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="hosting"
        />
        <AcceptingStatusBar style={styles.acceptingStatusBar} />
        <CSCalendar />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  header: {
    backgroundColor: 'white'
  },
  acceptingStatusBar: {
    margin: 10
  }
};

export default HostingScreen;
