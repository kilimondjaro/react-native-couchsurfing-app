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
import CalendarSegment from '../components/CalendarSegment';
import CSSegmentControl from '../../../components/CSSegmentControl';
import CSCalendar from '../../../components/CSCalendar';
import GuestsCountPicker from '../components/GuestsCountPicker';
import ModeSegment from '../components/ModeSegment';
import CSInputList from '../../../components/CSInputList';
import CSSearchBar from '../../../components/CSSearchBar';
import DistanceSlider from '../components/DistanceSlider';
import RangeCell from '../components/RangeCell';
import CheckCell from '../components/CheckCell';
import {addDate, toggleFilter} from '../../../redux/actions/filter';
import type {Dispatch} from '../../../redux/actions/types';
import type {Filters} from '../../../redux/reducers/filter';
import {getDateString} from '../../../helpers';

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
  data: {
    showCalendar: boolean;
  }
};

type State = {
  showCalendar: boolean;
}

class HostsFilterScreen extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      showCalendar: props.data.showCalendar
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filters.dates.departs) {
      this.setState({showCalendar: false});
    }
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
        <TouchableOpacity
          onPress={() => this.props.navigator.pop()}
          activeOpacity={0.8}
        >
          <CSSearchBar
            placeholder="Search"
            editable={false}
            value={'Search line'} // Take from redux
          />
        </TouchableOpacity>
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
            <SettingsBlock title="# of travelers">
              <GuestsCountPicker
                value={filters.numberOfTravelers}
                onPress={(value) => dispatch(toggleFilter({name: 'numberOfTravelers', value}))}
              />
            </SettingsBlock>
            <SettingsBlock title="accommodation">
              <CSSegmentControl
                onPress={(value) => dispatch(toggleFilter({name: 'accommodation', value}))}
                active={filters.accommodation}
              >
                <ModeSegment icon={require('../img/private.png')} value="private" text="Private"/>
                <ModeSegment value="public" text="Public" icon={null}/>
                <ModeSegment value="shared" text="Shared" icon={null}/>
              </CSSegmentControl>
            </SettingsBlock>
            <SettingsBlock title="host">
              <CSInputList
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
              </CSInputList>
            </SettingsBlock>
            <SettingsBlock title="preferences">
              <CSInputList
                separatorStyle={{marginLeft: 0}}
              >
                <CheckCell
                  checked={filters.kidsAtHome}
                  onPress={() => dispatch(toggleFilter({name: 'kidsAtHome'}))}
                  text="Kids at Home"
                />
                <CheckCell
                  checked={filters.kidsFriendly}
                  onPress={() => dispatch(toggleFilter({name: 'kidsFriendly'}))}
                  text="Kids-Friendly"
                />
                <CheckCell
                  checked={filters.petFree}
                  onPress={() => dispatch(toggleFilter({name: 'petFree'}))}
                  text="Pet-free"/>
                <CheckCell
                  checked={filters.petFriendly}
                  onPress={() => dispatch(toggleFilter({name: 'petFriendly'}))}
                  text="Pet-Friendly"/>
                <CheckCell
                  checked={filters.allowsSmoking}
                  onPress={() => dispatch(toggleFilter({name: 'allowsSmoking'}))}
                  text="Allow Smoking"/>
                <CheckCell
                  checked={filters.wheelchairAccessible}
                  onPress={() => dispatch(toggleFilter({name: 'wheelchairAccessible'}))}
                  text="Wheelchair Accessible"/>
              </CSInputList>
            </SettingsBlock>
            <SettingsBlock title="availlability">
              <CSInputList
                separatorStyle={{marginLeft: 0}}
              >
                <CheckCell
                  checked={filters.status.accepting}
                  onPress={() => dispatch(toggleFilter({name: 'status', value: 'accepting'}))}
                  text="Accepting Guests"/>
                <CheckCell
                  checked={filters.status.maybe}
                  onPress={() => dispatch(toggleFilter({name: 'status', value: 'maybe'}))}
                  text="Mayber Accepting Guests"/>
                <CheckCell
                  checked={filters.status.wantsToMeetUp}
                  onPress={() => dispatch(toggleFilter({name: 'status', value: 'wantsToMeetUp'}))}
                  text="Wants to Meet Up"/>
              </CSInputList>
            </SettingsBlock>
            <SettingsBlock title="distance">
              <DistanceSlider
                value={filters.distance}
                onChange={(value) => dispatch(toggleFilter({name: 'distance', value}))}
              />
            </SettingsBlock>
            <SettingsBlock title="sort by">
              <CSSegmentControl
                onPress={(value) => dispatch(toggleFilter({name: 'sortBy', value}))}
                active={filters.sortBy}
              >
                <ModeSegment value="bestMatch" text="Best Match" icon={null}/>
                <ModeSegment value="experience" text="Experience" icon={null}/>
                <ModeSegment value="lastLogin" text="Last Login" icon={null}/>
              </CSSegmentControl>
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
)(HostsFilterScreen);
