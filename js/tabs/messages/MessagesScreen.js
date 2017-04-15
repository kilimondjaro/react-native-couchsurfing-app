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
import {loadRequests, acceptRequest, removeRequest} from '../../redux/actions';
import {getDateString, daysOfWeek} from '../../helpers';

function getDateStringWithDay(date: Date) {
  return `${getDateString(date)} ${daysOfWeek[date.getDay()]}`;
}

function RequestCell(props) {
  const {
    request
  } = props;

  const isTraveler = request.type === 'traveler';
  const {
    firstName,
    lastName
  } = isTraveler ? request.host : request.traveler;

  var acceptText;
  var onPressIsWorking = false;
  if (isTraveler) {
    acceptText = request.hostAccepted
     ? 'Accepted' : 'Wait for accept';
  } else {
    onPressIsWorking = !request.hostAccepted && true;
    acceptText = request.hostAccepted
      ? 'Accepted' : 'Press to accept';
  }

  return (
    <View style={{borderBottomWidth: 0.5}}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{height: 85, flexDirection: 'row'}}
      >
        <View style={{width: 90}}/>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <Text style={{fontSize: 17}}>{`${isTraveler ? 'To' : 'From'} ${firstName} ${lastName}`}</Text>
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
      <View style={{height: 30, flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
        <Text>Status: </Text>
        <TouchableOpacity
          disabled={!onPressIsWorking}
          onPress={props.onAcceptPress}
          style={{height: 22, width: 150, borderRadius: 2, alignItems: 'center', justifyContent: 'center', marginLeft: 28, backgroundColor: '#2f81b7'}}
        >
          <Text style={{color: 'white'}}>{acceptText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onRemovePress}
          style={{height: 22, width: 80, borderRadius: 2, alignItems: 'center', justifyContent: 'center', marginLeft: 5, backgroundColor: '#b3b3b3'}}
        >
          <Text style={{color: 'white'}}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
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
                onRemovePress={() => this.props.dispatch(removeRequest(request.id))}
                onAcceptPress={() => this.props.dispatch(acceptRequest(request.id, request.type))}
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
