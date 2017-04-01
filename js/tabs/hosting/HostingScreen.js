// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import CSCalendar from '../../components/CSCalendar';
import AcceptingStatusBar from './AcceptingStatusBar';
import {CSHeader} from '../../components/CSHeader';
import {toggleDay, saveAccount} from '../../redux/actions';

class HostingScreen extends Component {
  render() {
    const {connection} = this.props.status;
    const {account} = this.props;

    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="hosting"
        />
        <AcceptingStatusBar style={styles.acceptingStatusBar} />
        <CSCalendar
          selectedDates={account.reservedDates}
          type="hosting"
          onPress={(year, month, day) => {
            if (connection === 'wifi' || connection === 'cell') {
              this.props.dispatch(toggleDay({year, month, day}));
            }
          }}
        />
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
  acceptingStatusBar: {
    margin: 5,
    marginBottom: 0
  }
});

export default connect(
  state => ({
    status: state.status,
    account: state.account
  })
)(HostingScreen);
