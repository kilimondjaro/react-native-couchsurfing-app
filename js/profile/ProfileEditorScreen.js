// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {CSHeader} from '../components/CSHeader';
import CSInputList from '../components/CSInputList';
import CSSettingCell from '../components/CSSettingCell';

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
          <CSSettingCell
            title="Status"
            onPress={() => {}}
          />
        </CSInputList>
        <CSInputList
          style={[styles.inputList, {marginTop: 40}]}
        >
          <CSSettingCell
            title="About Me"
            onPress={() => this.props.navigator.push({aboutMeEditor: true})}
          />
          <CSSettingCell
            title="Your Home & Preferences"
            onPress={() => {}}
          />
          <CSSettingCell
            title="Overview"
            onPress={() => {}}
          />
          <CSSettingCell
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
