import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Navigator
} from 'react-native';
import {CSHeader} from '../../components/CSHeader';
import ProfileProgressBar from './ProfileProgressBar';

class ProfileScreen extends Component {
  static defaultProps = {
    account: {
      firstName: 'Kirill',
      lastName: 'Babich'
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
        <ProfileProgressBar completion={0.75}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ProfileScreen;
