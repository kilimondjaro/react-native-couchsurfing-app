// @flow
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {CSHeader} from '../../components/CSHeader';
import CSInputList from '../../components/CSInputList';
import CSIconCell from '../../components/CSIconCell';
import CSAvatar from '../../components/CSAvatar';
import {logOut} from '../../redux/actions';

class AccountScreen extends Component {
  onCellPress(name: string) {
    this.props.navigator.push({screen: name});
  }

  render() {
    const {firstName, lastName, location, verified, avatar} = this.props.account;

    const isVerified = Object.keys(verified.parts)
      .findIndex(key => verified.parts[key] === true) >= 0;

    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title="account"
          rightItem={[{
            text: 'Log Out',
            onPress: () => this.props.dispatch(logOut())
              .then(() => this.props.navigator.push({screen: 'enter'}))
          }]}
        />
        <ScrollView
          automaticallyAdjustContentInsets={false}
        >
          <CSAvatar
            style={styles.avatar}
            image={avatar || require('../../components/img/blank_picture.png')}
            firstLine={`${firstName} ${lastName}`}
            secondLine={location.description}
            verified={isVerified}
          />
          <View>
            <CSInputList separatorStyle={{marginLeft: 5}}>
              <CSIconCell
                onPress={null}
                title="Get Verified"
              />
              <CSIconCell
                onPress={() => this.props.navigator.push({screen: 'profile', data: {type: 'self'}})}
                title="Profile"
              />
              <CSIconCell
                onPress={null}
                title="Friends"
              />
              <CSIconCell
                onPress={() => {
                  this.onCellPress('accountSettings');
                }}
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

export default connect(
  (state) => ({account: state.account})
)(AccountScreen);
