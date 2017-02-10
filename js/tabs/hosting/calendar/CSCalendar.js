// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import CalendarCell from './CalendarCell';
import CalendarRow from './CalendarRow';

const monthArray = ['янв', 'февр.', 'март',
  'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'];

class CSCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.daysHeader}>
            {
              ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'].map((day, i) => (
                <CalendarCell
                  key={i}
                  disabled
                  labelStyle={{fontSize: 12}}
                  label={day}
                />
              ))
            }
        </View>
        <ScrollView
          style={styles.scrollView}
        >
          {
            this.props.calendar.dates.map((month, monthNum) => (
                <View key={month.month} style={{marginBottom: 30}}>
                  <View style={styles.monthHeader}>
                    <Text
                      style={styles.monthHeaderText}>
                      {`${monthArray[month.month].toUpperCase()} ${month.year}`}
                    </Text>
                  </View>
                  {
                    month.dates.map((week, wKey) => (
                      <View key={week[wKey]} style={{flex: 1, flexDirection: 'column'}}>
                        <CalendarRow
                          month={monthNum}
                          week={week}
                        />
                      </View>
                    ))
                  }
                </View>
            ))
          }
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
  },
  monthHeader: {
    marginBottom: 30,
    alignItems:'center'
  },
  monthHeaderText: {
    fontSize: 15,
    color: '#eb6648',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1
  }
};

export default connect(state => ({calendar: state.calendar}))(CSCalendar);
