// @flow
import React, { Component } from 'react';
import {
  View,
  NetInfo,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {getCalendarDates} from './helpers';
import {calendarUpdate, setStatus} from './redux/actions';
import Navigator from './CSNavigator';

class CouchsurfingApp extends Component {
  componentWillMount() {
    const {dispatch} = this.props;

    const curMonth = new Date().getMonth();

    if (this.props.calendar.firstMonth !== curMonth) {
      dispatch(calendarUpdate({firstMonth: curMonth, dates: getCalendarDates()}));
    }

    NetInfo.addEventListener('change',
      (networkType) => {
        dispatch(setStatus('connection', networkType));
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(
  state => ({calendar: state.calendar})
)(CouchsurfingApp);
