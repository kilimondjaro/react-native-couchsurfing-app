import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import TravelerCard from './TravelerCard';
import {searchTravelers} from '../../../redux/actions';

class TravelersSearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }
  render() {
    const {travelers} = this.props.search;

    return (
      <View style={{flex: 1}}>
        <View style={{padding: 10, height: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#68696c'}}>123 hosts found</Text>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({screen: 'travelersFilter'})}
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
                this.props.dispatch(searchTravelers(this.props.search.locationId, this.props.filter))
                  .then(() => this.setState({refreshing: false}));
              }}
            />
          }
        >
          {travelers.map((traveler, i) => (
            <TravelerCard
              onPress={() => this.props.navigator.push({screen: 'profile', data: {
                type: 'member',
                account: traveler.traveler
              }})}
              traveler={traveler}
              key={i}
              style={{marginBottom: 20}}/>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({filter: state.filter, search: state.search})
)(TravelersSearchScreen);
