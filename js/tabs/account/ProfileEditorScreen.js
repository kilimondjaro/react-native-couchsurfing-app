// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {CSHeader} from '../../components/CSHeader';
import CSInputList from '../../components/CSInputList';
import SettingCell from './SettingCell';

class ProfileEditorScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            text: 'Cancel',
            onPress: () => this.props.navigator.pop()
          }]}
          rightItem={[{
            text: 'Save',
            onPress: () => {}
          }]}
          title="edit profile"
        />

        <Text style={styles.header}>{'Accepting Guests?'.toUpperCase()}</Text>
        <CSInputList
          style={styles.inputList}
        >
          <SettingCell
            title="Status"
            onPress={() => {}}
          />
        </CSInputList>
        <CSInputList
          style={[styles.inputList, {marginTop: 40}]}
        >
          <SettingCell
            title="About Me"
            onPress={() => {}}
          />
          <SettingCell
            title="Your Home & Preferences"
            onPress={() => {}}
          />
          <SettingCell
            title="Overview"
            onPress={() => {}}
          />
          <SettingCell
            title="Address"
            onPress={() => {}}
          />
        </CSInputList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf1f2'
  },
  header: {
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 10,
    color: '#8e9baa',
    fontWeight: 'bold'
  },
  inputList: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC'
  }
});

export default ProfileEditorScreen;
