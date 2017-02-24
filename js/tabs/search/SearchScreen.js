// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  StyleSheet,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import CSTextInputList from '../../components/CSTextInputList';
import CSSearchBar from '../../components/CSSearchBar';
import {loadLocations} from '../../redux/actions/location';
import CSSegmentControl from '../../components/CSSegmentControl';
import SurferCard from './SurferCard';
import SearchModeSegment from './ModeSegment';
import CalendarSegment from './CalendarSegment';
import {getDateString} from '../../helpers';

type State = {
  onSearchFocus: boolean;
  searchMode: string;
  searchText: string;
};

type Date = {
  year: number;
  month: number;
  day: number;
}

type Props = {
  locations: Array<{description: string, id: string}>;
  dates: {arrives: ?Date, departs: ?Date};
  navigator: Navigator;
};

class SearchScreen extends Component {
  state: State;
  constructor(props: Props) {
    super(props);

    this.state = {
      onSearchFocus: false,
      searchMode: 'host',
      searchText: '',
      refreshing: false
    };
  }

  componentDidMount() {
    this.props.dispatch(loadLocations(''));
  }

  _onSearch(text: string) {
    if (this.state.searchMode !== 'member') {
      this.props.dispatch(loadLocations(text));
    }
    this.setState({searchText: text});
  }


  render() {
    const {onSearchFocus, searchMode} = this.state;

    const cancelButton = onSearchFocus
      ? [{text: 'Cancel', onPress: () => this.setState({onSearchFocus: false})}]
      : null;

    return (
      <View style={styles.container}>
        <CSSearchBar
          placeholder="Search"
          rightItem={cancelButton}
          marginTop={-20}
          value={this.state.searchText}
          onChange={(text) => this._onSearch(text)}
          onFocus={() => this.setState({onSearchFocus: true})}
          onBlur={() => this.setState({onSearchFocus: false})}
        />
        {
          !onSearchFocus ? (
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
          )
          : (
            <View style={{flex: 1}}>
              <CSSegmentControl
                onPress={(value) => this.setState({searchMode: value})}
                active={searchMode}
                style={{marginTop: 5, marginBottom: 5}}
              >
                <SearchModeSegment value="host" text="Host" icon={null}/>
                <SearchModeSegment value="traveler" text="Traveler" icon={null}/>
                <SearchModeSegment value="member" text="Member" icon={null}/>
                <SearchModeSegment value="event" text="Event" icon={null}/>
              </CSSegmentControl>
              {
                this.state.searchMode !== 'member'
                 ? (
                   <CSTextInputList
                     separatorStyle={{marginLeft: 0}}
                   >
                     {
                       this.props.locations.map((location, i) => (
                         <TouchableOpacity
                           key={i}
                           style={styles.searchItem}
                           onPress={() => null}
                         >
                           <Image style={{height: 20, width: 20}} source={require('./img/geopoint.png')}/>
                           <Text style={{fontSize: 16, marginLeft: 10}}>{location.description}</Text>
                         </TouchableOpacity>
                       ))
                     }
                   </CSTextInputList>
                 ) : null
              }
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  tipText: {
    color: '#c4cdd4',
    fontSize: 16,
    textAlign: 'center'
  },
  tipView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30
  },
  searchItem: {
    height: 50,
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
});

const mapStateToProps = function(state) {
  return {
    locations: state.location.locations,
    dates: state.filter.dates,
    search: state.search
  };
};

export default connect(mapStateToProps)(SearchScreen);
