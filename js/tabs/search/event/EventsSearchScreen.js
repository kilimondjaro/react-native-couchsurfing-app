// @flow
import React, {Component} from 'react';
import {
  View,
  ListView,
  Text,
  RefreshControl
} from 'react-native';
import EventCard from './EventCard';

type Props = {
  events: Array<{[name: string]: any}>;
}

type State = {
  refreshing: boolean;
  dataSource: ListView.DataSource;
}

class EventsSearchScreen extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    const data = {};
    props.events.forEach(e => {
      const date = e.date.toDateString();
      if (data[date]) {
        data[date].push(e);
      }
      else {
        data[date] = [e];
      }
    });

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (h1, h2) => h1 !== h2});

    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRowsAndSections(data)
    };
  }

  static defaultProps = {
    events: [
      {date: new Date(2017, 3, 13, 14, 30)},
      {date: new Date(2017, 3, 13, 14, 30)},
      {date: new Date(2017, 3, 14, 14, 30)},
      {date: new Date(2017, 3, 14, 14, 30)},
      {date: new Date(2017, 3, 15, 14, 30)}]
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          stickySectionHeadersEnabled
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (<EventCard style={{marginBottom: 20}}/>)}
          renderSectionHeader={(_, date) => {
            return (
              <View style={{height: 40, width: 150, justifyContent: 'center'}}>
                <Text style={{backgroundColor: '#35495d', padding: 5, color: 'white'}}>{date}</Text>
              </View>
            );
          }}
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
        />
      </View>
    );
  }
}

export default EventsSearchScreen;
