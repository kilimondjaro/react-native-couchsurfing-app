// @flow
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {CSHeader} from '../../components/CSHeader';
import CSInputList from '../../components/CSInputList';
import CSIconCell from '../../components/CSIconCell';
import CSAvatar from '../../components/CSAvatar';

class AccountScreen extends Component {
  static defaultProps = {
    account: {
      firstName: 'Kirill',
      lastName: 'Babich',
      location: 'Russian Federation',
      verified: false
    }
  }

  onCellPress(name: string) {
    this.props.navigator.push({screen: name});
  }

  render() {
    const {firstName, lastName, location, verified} = this.props.account;

    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="account"
          rightItem={[{title: 'Log Out'}]}
        />
        <ScrollView
          automaticallyAdjustContentInsets={false}
        >
          <CSAvatar
            style={styles.avatar}
            image={require('../search/img/me.jpg')}
            firstLine={`${firstName} ${lastName}`}
            secondLine={location}
            verified={verified}
          />
          <View>
            <CSInputList separatorStyle={{marginLeft: 5}}>
              <CSIconCell
                onPress={null}
                title="Get Verified"
              />
              <CSIconCell
                onPress={() => this.onCellPress('profile')}
                title="Profile"
              />
              <CSIconCell
                onPress={null}
                title="Friends"
              />
              <CSIconCell
                onPress={() => this.onCellPress('accountSettings')}
                title="Account & Settings"
              />
              <CSIconCell
                onPress={null}
                title="Notification Settings"
              />
            </CSInputList>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{marginLeft: 5, color: '#696a6d'}}>{'about couchsurfing'.toUpperCase()}</Text>
            <CSInputList separatorStyle={{marginLeft: 5}}>
              <CSIconCell
                onPress={null}
                title="About"
              />
              <CSIconCell
                onPress={null}
                title="Back"
              />
              <CSIconCell
                onPress={null}
                title="Safety"
              />
              <CSIconCell
                onPress={null}
                title="Feedback"
              />
            </CSInputList>
          </View>
          <View style={{height: 60}}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  avatar: {
    height: 180,
  },
  nameArea: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10
  },
  nameLine: {
    flexDirection: 'row'
  },
  nameText: {
    color: 'white',
    fontSize: 20
  },
  locationText: {
    color: 'white',
    fontSize: 18
  },
});

export default AccountScreen;
