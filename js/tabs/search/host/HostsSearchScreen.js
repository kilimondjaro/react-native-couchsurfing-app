// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import CalendarSegment from '../components/CalendarSegment';
import CSSegmentControl from '../../../components/CSSegmentControl';
import SurferCard from '../components/SurferCard';
import {getDateString} from '../../../helpers';
import {searchHosts} from '../../../redux/actions';

type Props = {
  navigator: Navigator;
  dates: any;
};

type State = {
  refreshing: boolean;
}

class HostsSearchScreen extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }
  render() {
    const {hosts} = this.props.search;

    return (
      <View style={{flex: 1}}>
        <CSSegmentControl
          onPress={() => this.props.navigator.push({screen: 'hostsFilter', data: {
            showCalendar: true
          }})}
          style={{margin: 5, marginBottom: 0}}
        >
          <CalendarSegment title="Arrives" date={getDateString(this.props.dates.arrives)}/>
          <CalendarSegment title="Departs" date={getDateString(this.props.dates.departs)}/>
        </CSSegmentControl>
        <View style={{padding: 10, height: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#68696c'}}>{`${hosts.length} hosts found`}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({screen: 'hostsFilter', data: {
              showCalendar: false
            }})}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../img/moreFilters.png')}/>
              <Text style={{marginLeft: 10, color: '#006faf', fontSize: 15}}>More Filters</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              title="Pull to refresh..."
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this.props.dispatch(searchHosts(this.props.search.locationId, this.props.filter))
                  .then(() => this.setState({refreshing: false}));
              }}
            />
          }
        >
          {hosts.map(account => (
            <SurferCard
              account={account.attributes}
              onPress={() =>
                this.props.navigator.push({screen: 'profile',
                  data: {
                    type: 'host',
                    account: account.attributes
                  }
                })}
              key={1}
              style={{marginBottom: 20}}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({filter: state.filter, search: state.search})
)(HostsSearchScreen);
