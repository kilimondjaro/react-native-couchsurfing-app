// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import CSTextInputList from '../../components/CSTextInputList';
import CSSearchBar from '../../components/CSSearchBar';
import {loadLocations} from '../../redux/actions/location';
import CSSegmentControl from '../../components/CSSegmentControl';

function SearchModeSegment(props) {
  const {icon, text, value, onPress, active} = props;
  const isActive = active === value;
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      activeOpacity={0.8}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <Image sourse={icon} />
      <Text style={isActive ? {color: 'blue'} : null}>{text}</Text>
    </TouchableOpacity>
  );
}


type State = {
  onSearchFocus: boolean;
  searchMode: string;
  searchText: string;
};

type Props = {
  locations: Array<{description: string, id: string}>;
};

class SearchScreen extends Component {
  state: State;
  constructor(props: Props) {
    super(props);

    this.state = {
      onSearchFocus: false,
      searchMode: 'host',
      searchText: ''
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
            <View style={styles.tipView}>
              <Text style={styles.tipText}>Search for hosts, travelers, events, and members</Text>
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
    locations: state.location.locations
  };
};

export default connect(mapStateToProps)(SearchScreen);
