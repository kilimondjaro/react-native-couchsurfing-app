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
import AccountCell from './AccountCell';
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
    this.props.navigator.push({[name]: true});
  }

  render() {
    const {firstName, lastName, location, verified} = this.props.account;

    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="account"
          rightItem={[{text: 'Log Out'}]}
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
              <AccountCell
                onPress={null}
                text="Get Verified"
              />
              <AccountCell
                onPress={() => this.onCellPress('profile')}
                text="Profile"
              />
              <AccountCell
                onPress={null}
                text="Friends"
              />
              <AccountCell
                onPress={() => this.onCellPress('accountSettings')}
                text="Account & Settings"
              />
              <AccountCell
                onPress={null}
                text="Notification Settings"
              />
            </CSInputList>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{marginLeft: 5, color: '#696a6d'}}>{'about couchsurfing'.toUpperCase()}</Text>
            <CSInputList separatorStyle={{marginLeft: 5}}>
              <AccountCell
                onPress={null}
                text="About"
              />
              <AccountCell
                onPress={null}
                text="Back"
              />
              <AccountCell
                onPress={null}
                text="Safety"
              />
              <AccountCell
                onPress={null}
                text="Feedback"
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
