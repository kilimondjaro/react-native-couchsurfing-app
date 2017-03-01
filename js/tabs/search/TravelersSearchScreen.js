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
import TravelerCard from './TravelerCard';
import {getDateString} from '../../helpers';

class TravelersSearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{padding: 10, height: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#68696c'}}>123 hosts found</Text>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({travelersFilter: true})}
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
          {[1,2,3,4,5].map(i => (<TravelerCard key={i} style={{marginBottom: 20}}/>))}
        </ScrollView>
      </View>
    );
  }
}

export default TravelersSearchScreen;
