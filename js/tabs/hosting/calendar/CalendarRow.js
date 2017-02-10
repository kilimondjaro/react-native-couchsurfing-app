// @flow
import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import CalendarCell from './CalendarCell';
import {toggleDay} from '../../../redux/actions';

class CalendarRow extends Component {
  getCellWidth() {
    var {width} = Dimensions.get('window');
    return width / 7;
  }

  getSeparatorMargin(week) {
    const cellWidth = this.getCellWidth();

    if (!week.includes(null)) {
      return null;
    }

    const frontSide = week[0] !== null;

    if (frontSide) {
      return {marginRight: cellWidth * (7 - week.indexOf(null))};
    }

    return {marginLeft: cellWidth * (week.lastIndexOf(null) + 1)};
  }

  render() {
    const {week, month, reservedDates} = this.props;
    const separatorStyle = this.getSeparatorMargin(week);

    return (
      <View style={styles.container}>
        <View style={[styles.separator, separatorStyle]} />
        <View style={styles.row}>
          {
            this.props.week.map((day, i) => {

              const todayStyle = month === 0
                && new Date().getDate() === day
                ? { color: '#eb684b'} : null;

              const reserved = day !== null ?
                reservedDates[month][day] || false
                : false;

              return (
                <CalendarCell
                  width={this.getCellWidth()}
                  key={i}
                  reserved={reserved}
                  disabled={day === null ? true : false}
                  label={day}
                  onPress={() => this.props.dispatch(toggleDay({month, day}))}
                  labelStyle={todayStyle}
                />
              );
            })
          }
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    height: 50
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
};

export default connect(
  state => ({reservedDates: state.hosting.reservedDates})
)(CalendarRow);
