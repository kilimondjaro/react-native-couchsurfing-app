import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import TravelerCard from './TravelerCard';

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
