// @flow
import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native';
import CalendarCell from './CalendarCell';

class CalendarRow extends Component {
  getCellWidth() {
    var {width} = Dimensions.get('window');
    return width / 7;
  }

  getSeparatorMargin() {
    const {week} = this.props;
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
    const separatorStyle = this.getSeparatorMargin();

    return (
      <View style={styles.container}>
        <View style={[styles.separator, separatorStyle]} />
        <View style={styles.row}>
          {
            this.props.week.map((day, i) => {

              const todayStyle = this.props.month === 0
                && new Date().getDate() === day
                ? { color: '#eb684b'} : null;

              return (
                <CalendarCell
                  width={this.getCellWidth()}
                  key={i}
                  disabled={day === null ? true : false}
                  label={day}
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

export default CalendarRow;
