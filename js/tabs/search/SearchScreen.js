// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import CSTextInputList from '../../components/CSTextInputList';
import CSSearchBar from '../../components/CSSearchBar';
import {loadLocations, loadLocationByCoordinates} from '../../redux/actions/location';
import CSSegmentControl from '../../components/CSSegmentControl';
import SearchModeSegment from './components/ModeSegment';
import HostsSearchScreen from './host/HostsSearchScreen';
import TravelersSearchScreen from './traveler/TravelersSearchScreen';
import MembersSearchScreen from './member/MembersSearchScreen';
import EventsSearchScreen from './event/EventsSearchScreen';

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


    var searchScreen;
    if (searchMode === 'host') {
      searchScreen = (
        <HostsSearchScreen
          dates={this.props.dates}
          navigator={this.props.navigator}
        />
      );
    }
    else if (searchMode === 'traveler') {
      searchScreen = (
        <TravelersSearchScreen
          dates={this.props.dates}
          navigator={this.props.navigator}
        />
      );
    }
    else if (searchMode === 'member') {
      searchScreen = (
        <MembersSearchScreen
          dates={this.props.dates}
          navigator={this.props.navigator}
        />
      );
    }
    else {
      searchScreen = (
        <EventsSearchScreen
          dates={this.props.dates}
          navigator={this.props.navigator}
        />
      );
    }

    return (
      <View style={styles.container}>
        <CSSearchBar
          placeholder={searchMode === 'member' ? 'Name, Username or Keyword' : 'Search Location'}
          rightItem={cancelButton}
          marginTop={-20}
          value={this.state.searchText}
          onChange={(text) => this._onSearch(text)}
          onFocus={() => this.setState({onSearchFocus: true})}
          onBlur={() => this.setState({onSearchFocus: false})}
        />
        {
          !onSearchFocus ? searchScreen
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
                       this.state.searchText
                         ? this.props.locations.map((loc, i) => (
                           <TouchableOpacity
                             key={i}
                             style={styles.searchItem}
                             onPress={() => null}
                           >
                             <Image
                               source={require('./img/geopoint.png')}
                             />
                             <Text
                               style={{fontSize: 16, marginLeft: 10}}
                              >
                                {loc.description}
                             </Text>
                           </TouchableOpacity>
                         ))
                         : (<TouchableOpacity
                           style={styles.searchItem}
                           onPress={() => this.props.dispatch(loadLocationByCoordinates())}
                         >
                           <Image
                             source={require('./img/geopoint.png')}
                           />
                           <Text
                             style={{fontSize: 16, marginLeft: 10}}
                            >
                             Current Location
                           </Text>
                         </TouchableOpacity>)
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
    location: state.location.location,
    dates: state.filter.dates,
    search: state.search
  };
};

export default connect(mapStateToProps)(SearchScreen);
