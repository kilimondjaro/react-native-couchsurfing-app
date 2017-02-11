// @flow
import React, {Component} from 'react';
import {
  View
} from 'react-native';
import {connect} from 'react-redux';
import CSCalendar from '../../components/CSCalendar';
import AcceptingStatusBar from './AcceptingStatusBar';
import {CSHeader} from '../../components/CSHeader';
import {toggleDay} from '../../redux/actions';

class HostingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="hosting"
        />
        <AcceptingStatusBar style={styles.acceptingStatusBar} />
        <CSCalendar
          selectedDates={this.props.reservedDates}
          type="hosting"
          onPress={(year, month, day) => this.props.dispatch(toggleDay({year, month, day}))}
        />
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

export default connect(
  state => ({reservedDates: state.hosting.reservedDates})
)(HostingScreen);
