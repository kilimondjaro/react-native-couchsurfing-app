// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import CalendarSegment from './CalendarSegment';
import CSSegmentControl from '../../components/CSSegmentControl';
import CSCalendar from '../../components/CSCalendar';
import CSTextInputList from '../../components/CSTextInputList';
import DistanceSlider from './DistanceSlider';
import RangeCell from './RangeCell';
import CheckCell from './CheckCell';
import {addDate, toggleFilter} from '../../redux/actions/filter';
import type {Dispatch} from '../../redux/actions/types';
import type {Filters} from '../../redux/reducers/filter';
import {getDateString} from '../../helpers';

function SettingsBlock(props) {
  return (
    <View style={[{margin: 5, marginTop: 20}, props.style]}>
      <Text style={styles.title}>{props.title.toUpperCase()}</Text>
      {props.children}
    </View>
  );
}

type Props = {
  filters: Filters;
  dispatch: Dispatch;
  navigator: Navigator;
};

class TravelersFilterScreen extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      showCalendar: false
    };
  }

  onCalendarSegmentPress(value) {
    this.setState({showCalendar: true});
  }

  getCalendarDates() {
    const {arrives, departs} = this.props.filters.dates;
    const calendarDates = {};
    for (let i = 0; i < 12; i++) {
      calendarDates[i] = {};
    }

    if (arrives) {
      calendarDates[arrives.month][arrives.day] = true;
    }
    if (departs) {
      for (let i = arrives.month; i <= departs.month; i++) {
        var start = 1;
        var end = 31;
        if (i === arrives.month) {
          start = arrives.day;
        }
        if (i === departs.month) {
          end = departs.day;
        }
        for (let j = start; j <= end; j++) {
          calendarDates[i][j] = true;
        }
      }
    }
    return calendarDates;
  }

  render() {
    var calendar;
    if (this.state.showCalendar) {
      calendar = (
        <View style={{height: 360}}>
          <CSCalendar
            selectedDates={this.getCalendarDates()}
            type="search"
            onPress={(year, month, day) => this.props.dispatch(addDate({
              year, month, day
            }))}
          />
        </View>
      );
    }

    const {filters, dispatch} = this.props;
    const {
      dates
    } = filters;

    return (
      <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
        <View style={{flex: 1}}>
          <ScrollView>
            <CSSegmentControl
              onPress={(value) => this.onCalendarSegmentPress(value)}
              active="arrives"
              style={{margin: 5, marginBottom: 0}}
            >
              <CalendarSegment value="arrives" title="Arrives" date={getDateString(dates.arrives)}/>
              <CalendarSegment value="departs" title="Departs" date={getDateString(dates.departs)}/>
            </CSSegmentControl>
            {calendar}
            <SettingsBlock title="host">
              <CSTextInputList
                separatorStyle={{marginLeft: 0}}
              >
                <CheckCell
                  checked={filters.hasReferences}
                  onPress={() => dispatch(toggleFilter({name: 'hasReferences'}))}
                  text="Has References"
                />
                <CheckCell
                  checked={filters.verifiedMember}
                  onPress={() => dispatch(toggleFilter({name: 'verifiedMember'}))}
                  text="Verified Member"
                />
                <RangeCell
                  values={[
                    {label: 'Male', value: 'male'},
                    {label: 'Female', value: 'female'},
                    {label: 'Other', value: 'other'}
                  ]}
                  selected={filters.gender}
                  onPress={(value) => dispatch(toggleFilter({name: 'gender', value}))}
                  text="Gender"
                />
                <CheckCell
                  checked={filters.languageSpoken}
                  onPress={() => dispatch(toggleFilter({name: 'languageSpoken'}))}
                  text="Languages Spoken"
                />
                <RangeCell
                  multipleChoice={false}
                  values={['Any', '18-24', '25-34', '35-44', '45-54', '55+']}
                  selected={filters.ageRange}
                  onPress={(value) => dispatch(toggleFilter({name: 'ageRange', value}))}
                  text="Age Range"
                />
              </CSTextInputList>
            </SettingsBlock>
            <SettingsBlock title="distance">
              <DistanceSlider
                value={filters.distance}
                onChange={(value) => dispatch(toggleFilter({name: 'distance', value}))}
              />
            </SettingsBlock>
            <View style={{height: 100}} />
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigator.pop()}
          style={{height: 50, backgroundColor: '#2f81b7', alignItems: 'center', justifyContent: 'center'}}
        >
          <Text style={{color: 'white', fontSize: 18}}>Save Selection</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: '#6d6e71',
    marginBottom: 5
  }
});

export default connect(
  (state) => ({filters: state.filter})
)(TravelersFilterScreen);
