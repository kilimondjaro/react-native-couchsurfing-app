// @flow
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {CSHeader} from '../../components/CSHeader';
import CalendarSegment from '../../components/CalendarSegment';
import GuestsCountPicker from '../../components/GuestsCountPicker';
import CSSegmentControl from '../../components/CSSegmentControl';
import {monthNames, getDateString, calendarSelectedDates} from '../../helpers';
import CSCalendar from '../../components/CSCalendar';
import CSTextInput from '../../components/CSTextInput';
import CSInputList from '../../components/CSInputList';
import {addDate} from '../../redux/actions/filter';
import {createTrip} from '../../redux/actions';

function SettingsBlock(props) {
  return (
    <View style={{marginTop: 20}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{props.title}</Text>
      </View>
      <View style={{backgroundColor: 'white', marginTop: 5}}>
        {props.children}
      </View>
    </View>
  );
}

type State = {
  showCalendar: boolean;
  numberOfTravelers: number;
  tripDetail: string;
}

class TripEditor extends Component {
  state: State;

  static defaultProps = {
    create: true
  };

  constructor(props) {
    super(props);

    this.state = {
      showCalendar: false
    };
  }

  componentWillMount() {
    this.props.dispatch({type: 'RESET_FILTER'});
    this.props.dispatch({type: 'RESET_TRIP'});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.travelDates.departs) {
      this.setState({showCalendar: false});
    }
  }

  onCalendarSegmentPress() {
    this.setState({showCalendar: true});
  }

  onSetState(name, value) {
    this.props.dispatch({
      type: 'SET_TRIP_DATA',
      name,
      value
    });
  }

  render() {
    let travelDates, trip;

    if (this.props.create) {
      travelDates = this.props.travelDates;
      trip = this.props.trip;
    }
    else {
      travelDates = {
        arrives: this.props.data.arrives,
        departs: this.props.data.departs
      };
      trip = this.props.data;
    }

    var calendar;
    if (this.state.showCalendar) {
      calendar = (
        <View style={{height: 360}}>
          <CSCalendar
            selectedDates={calendarSelectedDates(travelDates.arrives, travelDates.departs)}
            type="search"
            onPress={(year, month, day) => this.props.dispatch(addDate({
              year, month, day
            }))}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="Edit public Trip"
          rightItem={!this.props.create && [{text: 'Save', onPress: () => {}}]}
          leftItem={[{text: 'Cancel', onPress: () => this.props.navigator.pop()}]}
        />
        <ScrollView>
          <SettingsBlock title="Destination">
            <TouchableHighlight
              onPress={() => this.props.navigator.push({screen: 'locationSearch'})}
              style={[styles.destination, styles.block]}
            >
              <Text>{trip.location ? trip.location.description : 'Enter Destination'}</Text>
            </TouchableHighlight>
          </SettingsBlock>
          <SettingsBlock title="Travel Dates">
            <CSSegmentControl
              onPress={() => this.onCalendarSegmentPress()}
              active="arrives"
              style={{margin: 5, marginBottom: 0}}
            >
              <CalendarSegment value="arrives" title="Arrives" date={getDateString(travelDates.arrives)}/>
              <CalendarSegment value="departs" title="Departs" date={getDateString(travelDates.departs)}/>
            </CSSegmentControl>
            {calendar}
          </SettingsBlock>
          <SettingsBlock title="Number of Travelers">
            <GuestsCountPicker
              value={trip.numberOfTravelers}
              onPress={(value) => this.onSetState('numberOfTravelers', value)}
            />
          </SettingsBlock>
          <SettingsBlock title="Trip Detail">
            <CSInputList
              style={styles.inputList}
            >
              <CSTextInput
                multiline
                placeholder="Trip Detail"
                onChangeText={(text) => this.onSetState('tripDetail', text)}
                value={trip.tripDetail}
              />
            </CSInputList>
          </SettingsBlock>
          {this.props.create ? (
            <TouchableOpacity
              onPress={() => {
                this.props.dispatch(createTrip({...trip, ...travelDates}))
                  .then(() => this.props.navigator.pop());
              }}
              style={[styles.actionButton, {borderWidth: 0, backgroundColor: '#3482b5'}]}
            >
              <Text style={{color: 'white', fontSize: 18}}>{'Create Public Trip'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {}}
              style={styles.actionButton}
            >
              <Text style={{fontSize: 18}}>{'Delete'}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  block: {
    borderBottomWidth: 1,
    borderBottomColor: '#bcc8d0'
  },
  destination: {
    height: 50,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    margin: 15,
    borderWidth: 0.5,
    borderRadius: 5
  }
});

export default connect(
  state => ({travelDates: state.filter.dates, trip: state.trip})
)(TripEditor);
