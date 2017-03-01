import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import CalendarSegment from './CalendarSegment';
import CSSegmentControl from '../../components/CSSegmentControl';
import SurferCard from './SurferCard';
import {getDateString} from '../../helpers';

class HostsSearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <CSSegmentControl
          onPress={() => this.props.navigator.push({searchFilter: true, data: {
            showCalendar: true
          }})}
          style={{margin: 5, marginBottom: 0}}
        >
          <CalendarSegment title="Arrives" date={getDateString(this.props.dates.arrives)}/>
          <CalendarSegment title="Departs" date={getDateString(this.props.dates.departs)}/>
        </CSSegmentControl>
        <View style={{padding: 10, height: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#68696c'}}>123 hosts found</Text>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({searchFilter: true, data: {
              showCalendar: false
            }})}
          >
            <Text style={{color: '#006faf', fontSize: 15}}>More Filters</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              title="Pull to refresh..."
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                setTimeout(() => this.setState({refreshing: false}), 1000);
              }}
            />
          }
        >
          {[1,2,3,4,5].map(i => (<SurferCard key={i} style={{marginBottom: 20}}/>))}
        </ScrollView>
      </View>
    );
  }
}

export default HostsSearchScreen;
