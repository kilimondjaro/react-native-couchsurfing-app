// @flow
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Navigator
} from 'react-native';
import {CSHeader} from '../../components/CSHeader';
import CSAvatar from '../../components/CSAvatar';
import ProfileProgressBar from './ProfileProgressBar';

class ProfileScreen extends Component {
  static defaultProps = {
    account: {
      firstName: 'Kirill',
      lastName: 'Babich',
      location: 'Moscow'
    }
  }

  render() {
    const {account} = this.props;

    return (
      <View style={styles.container}>
        <CSHeader
          style={styles.header}
          title={`${account.firstName} ${account.lastName}`}
        />
        <ScrollView>
          <ProfileProgressBar completion={0.75} />
          <CSAvatar
            style={styles.avatarContainer}
            image={require('../search/img/me.jpg')}
            firstLine={`${account.firstName} ${account.lastName}`}
            secondLine={account.location}
          >
            <View style={styles.zoomAvatartButtonContainer}>
              <TouchableOpacity
                onPress={() => {}}
                activeOpacity={0.2}
                style={styles.zoomAvatartButton}>
              </TouchableOpacity>
            </View>
          </CSAvatar>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarContainer: {
    height: 320
  },
  zoomAvatartButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    opacity: 0.2
  },
  zoomAvatartButton: {
    width: 45,
    height: 45,
    backgroundColor: 'black',
    margin: 10
  }
});

export default ProfileScreen;
