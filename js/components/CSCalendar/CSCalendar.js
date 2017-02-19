// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import CalendarRow from './CalendarRow';

const monthArray = ['янв', 'февр.', 'март',
  'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'];

type Props = {
  dates: Array<{
    month: number;
    year: number;
    dates: Array<Array<?number>>;
  }>;
  type: string;
  selectedDates: any;
  onPress: (year: number, month: number, day: number) => void;
}

class CSCalendar extends Component {
  props: Props;

  render() {
    const {dates} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.daysHeader}>
            {
              ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'].map((day, i) => (
                <View key={i} style={styles.headerCell}>
                  <Text style={styles.headerCellText}>{day}</Text>
                </View>
              ))
            }
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}
        >
          {
            dates.map((month, monthNum) => (
                <View key={month.month} style={{marginBottom: 30}}>
                  <View style={styles.monthHeader}>
                    <Text
                      style={styles.monthHeaderText}>
                      {`${monthArray[month.month].toUpperCase()} ${month.year}`}
                    </Text>
                  </View>
                  {
                    month.dates.map((week, wKey) => (
                      <View key={wKey} style={{flex: 1, flexDirection: 'column'}}>
                        <CalendarRow
                          {...this.props}
                          monthNum={monthNum}
                          month={month.month}
                          year={month.year}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  daysHeader: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerCellText: {
    fontSize: 12,
    color: '#c7c7c7'
  },
  monthHeader: {
    marginBottom: 25,
    alignItems:'center'
  },
  monthHeaderText: {
    fontSize: 15,
    color: '#eb6648',
    fontWeight: 'bold'
  },
  scrollView: {
    marginTop: 25,
    flex: 1
  }
});

export default connect(state => ({dates: state.calendar.dates}))(CSCalendar);
