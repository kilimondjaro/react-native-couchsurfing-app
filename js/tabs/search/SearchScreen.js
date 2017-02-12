// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import CSSearchBar from '../../components/CSSearchBar';
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
};

type Props = {

};

class SearchScreen extends Component {
  state: State;
  constructor(props: Props) {
    super(props);

    this.state = {
      onSearchFocus: false,
      searchMode: 'host'
    };
  }
  render() {
    const {onSearchFocus, searchMode} = this.state;

    const tipView = !onSearchFocus ? (
      <View style={styles.tipView}>
        <Text style={styles.tipText}>Search for hosts, travelers, events, and members</Text>
      </View>
    ) : null;

    const cancelButton = onSearchFocus
      ? [{text: 'Cancel', onPress: () => this.setState({onSearchFocus: false})}]
      : null;

    return (
      <View style={styles.container}>
        <CSSearchBar
          placeholder="Search"
          rightItem={cancelButton}
          marginTop={-20}
          onFocus={() => this.setState({onSearchFocus: true})}
          onBlur={() => this.setState({onSearchFocus: false})}
        />
        <CSSegmentControl
          onPress={(value) => this.setState({searchMode: value})}
          active={searchMode}
          style={{marginTop: 10}}
        >
          <SearchModeSegment value="host" text="Host" icon={null}/>
          <SearchModeSegment value="traveler" text="Traveler" icon={null}/>
          <SearchModeSegment value="member" text="Member" icon={null}/>
          <SearchModeSegment value="event" text="Event" icon={null}/>
        </CSSegmentControl>
        {tipView}
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
  }
});

export default SearchScreen;
