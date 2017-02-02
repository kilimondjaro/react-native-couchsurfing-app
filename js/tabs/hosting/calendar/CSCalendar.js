import React, { Component } from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import CalendarCell from './CalendarCell';
import {CSHeader} from '../../../components/CSHeader';

class CSCalendar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._calculateDates();
  }

  _calculateDates() {
    const currentDate = new Date();
    const curMonth = currentDate.getMonth();
    const curYear = currentDate.getFullYear();
    const dates = [];

    for (let i = curMonth; i < curMonth + 12; i++) {
      const days = new Date(curYear, i + 1, 0).getDate();
      const month = [];

      for (let d = 1; d <= days; d++) {
        month.push({
          dayOfWeek: new Date(curYear, i, d).getDay(),
          date: d
        });
      }
      dates.push(month);
    }

    console.log(dates);
  }

  render() {
    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="sign up"
        />
        <View style={styles.daysHeader}>
            {
              ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'].map((day, i) => (
                <CalendarCell
                  key={i}
                  disabled
                  label={day}
                />
              ))
            }
        </View>
        <ScrollView>

        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  daysHeader: {
    flexDirection: 'row',
    height: 40
  }
};

export default CSCalendar;
