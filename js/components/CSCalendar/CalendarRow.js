// @flow
import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet
} from 'react-native';
import CalendarCell from './CalendarCell';

type Props  = {
  selectedDates: any;
  month: number;
  monthNum: number;
  year: number;
  type: string;
  week: Array<?number>;
  onPress: (year: number, month: number, day: number) => void;
}

class CalendarRow extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props) {
    if (this.props.selectedDates[this.props.month] === nextProps.selectedDates[nextProps.month]) {
      return false;
    }
    return true;
  }

  getCellWidth() {
    var {width} = Dimensions.get('window');
    return width / 7;
  }

  getSeparatorMargin(week: Array<?number>) {
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
    const {week, month, monthNum, year, selectedDates, type} = this.props;
    const separatorStyle = this.getSeparatorMargin(week);

    return (
      <View style={styles.container}>
        <View style={[styles.separator, separatorStyle]} />
        <View style={styles.row}>
          {
            this.props.week.map((day, i) => {

              const curDay = new Date().getDate();
              const todayStyle = monthNum === 0
                && curDay === day
                ? { color: '#eb684b'} : null;

              const disabled = day === null || (day < curDay && monthNum === 0)
                ? true : false;

              const reserved = day !== null ?
                selectedDates[month][day] || false
                : false;

              return (
                <CalendarCell
                  width={this.getCellWidth()}
                  key={i}
                  reserved={reserved}
                  disabled={disabled}
                  label={day ? day.toString() : ''}
                  onPress={() => this.props.onPress(year, month, day)}
                  labelStyle={todayStyle}
                  type={type}
                />
              );
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
});

export default CalendarRow;
