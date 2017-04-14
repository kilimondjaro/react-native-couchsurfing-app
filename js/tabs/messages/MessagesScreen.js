// @flow
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {CSHeader} from '../../components/CSHeader';
import {loadRequests} from '../../redux/actions';
import {getDateString, daysOfWeek} from '../../helpers';

function getDateStringWithDay(date: Date) {
  return `${getDateString(date)} ${daysOfWeek[date.getDay()]}`;
}

function RequestCell(props) {
  const {
    request
  } = props;

  const {
    firstName,
    lastName
  } = request.type === 'traveler' ? request.host : request.traveler;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{height: 85, flexDirection: 'row', borderBottomWidth: 0.5}}
    >
      <View style={{width: 90}}/>
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <Text style={{fontSize: 17}}>{`${request.type === 'traveler' ? 'To' : 'From'} ${firstName} ${lastName}`}</Text>
        <Text style={{color: '#b6c3cb'}}>
          {
            `${getDateStringWithDay(request.arrives)} - ${
              getDateStringWithDay(request.departs)
            }`
          }
        </Text>
        <Text style={{color: '#00002b'}}>{request.tripDetail}</Text>
        <Text style={{color: '#b3b3b3'}}>{getDateString(request.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}

class MessagesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="Requests"
        />
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={styles.container}
          refreshControl={
            <RefreshControl
              title="Pull to refresh..."
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this.props.dispatch(loadRequests())
                  .then(() => this.setState({refreshing: false}));
              }}
            />
          }
        >
          {
            this.props.requests.map((request, i) => (
              <RequestCell
                key={i}
                request={request}
                onPress={() => this.props.navigator.push({
                  screen: 'profile',
                  data: {
                    type: 'member',
                    account: request.type === 'traveler' ? request.host : request.traveler
                  }
                })}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: 'white'
  }
});

export default connect(
  state => ({requests: state.request.requests})
)(MessagesScreen);
