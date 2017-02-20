// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import CalendarSegment from './CalendarSegment';
import CSSegmentControl from '../../components/CSSegmentControl';
import CSCalendar from '../../components/CSCalendar';
import GuestsCountPicker from './GuestsCountPicker';
import ModeSegment from './ModeSegment';
import CSTextInputList from '../../components/CSTextInputList';
import CSSearchBar from '../../components/CSSearchBar';
import DistanceSlider from './DistanceSlider';
import RangeCell from './RangeCell';
import CheckCell from './CheckCell';

function SettingsBlock(props) {
  return (
    <View style={[{margin: 5, marginTop: 20}, props.style]}>
      <Text style={styles.title}>{props.title.toUpperCase()}</Text>
      {props.children}
    </View>
  );
}

class FilterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCalendar: false,
      dates: {
        arrives: '',
        departs: ''
      },
      guestsCount: 1,
      hasReferences: false,
      rangeCell: 'Any',
      maultipleRangeCell: []
    };
  }

  onCalendarSegmentPress(value) {
    this.setState({showCalendar: true});
  }

  render() {

    var calendar;
    if (this.state.showCalendar) {
      calendar = (
        <View style={{height: 360}}>
          <CSCalendar
            selectedDates={[[],[],[],[],[],[],[],[],[],[],[],[]]}
            type="search"
            onPress={(year, month, day) => null}
          />
        </View>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
        <TouchableOpacity
          onPress={() => this.props.navigator.pop()}
          activeOpacity={0.8}
        >
          <CSSearchBar
            placeholder="Search"
            editable={false}
            rightItem={[{text: 'Cancel'}]}
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
              <CalendarSegment value="arrives" title="Arrives" date={this.state.dates.arrives}/>
              <CalendarSegment value="departs" title="Departs" date={this.state.dates.departs}/>
            </CSSegmentControl>
            {calendar}
            <SettingsBlock title="# of travelers">
              <GuestsCountPicker
                value={this.state.guestsCount}
                onPress={(value) => this.setState({guestsCount: value})}
              />
            </SettingsBlock>
            <SettingsBlock title="accommodation">
              <CSSegmentControl
                onPress={(value) => null}
                active="arrives"
              >
                <ModeSegment value="private" text="Private" icon={null}/>
                <ModeSegment value="public" text="Public" icon={null}/>
                <ModeSegment value="shared" text="Shared" icon={null}/>
              </CSSegmentControl>
            </SettingsBlock>
            <SettingsBlock title="host">
              <CSTextInputList
                separatorStyle={{marginLeft: 0}}
              >
                <CheckCell
                  checked={this.state.hasReferences}
                  onPress={() => this.setState({hasReferences: !this.state.hasReferences})}
                  text="Has References"
                />
                <CheckCell onPress={() => null} text="Verified Member"/>
                <RangeCell
                  values={['Male', 'Female', 'Other']}
                  selected={[]}
                  onPress={(value) => {
                    this.setState({})
                  }}
                  text="Gender"
                />
                <CheckCell onPress={() => null} text="Languages Spoken"/>
                <RangeCell
                  multipleChoice={false}
                  values={['Any', '18-24', '25-34', '35-44', '45-54', '55+']}
                  selected={this.state.rangeCell}
                  onPress={(value) => this.setState({rangeCell: value})}
                  text="Age Range"
                />
              </CSTextInputList>
            </SettingsBlock>
            <SettingsBlock title="availlability">
              <CSTextInputList
                separatorStyle={{marginLeft: 0}}
              >
                <CheckCell onPress={() => null} text="Accepting Guests"/>
                <CheckCell onPress={() => null} text="Mayber Accepting Guests"/>
                <CheckCell onPress={() => null} text="Wants to Meet Up"/>
              </CSTextInputList>
            </SettingsBlock>
            <SettingsBlock title="distance">
              <DistanceSlider
                value={5}
                onChange={(value) => null}
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

export default FilterScreen;
