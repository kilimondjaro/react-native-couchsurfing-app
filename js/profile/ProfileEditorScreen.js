// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {CSHeader} from '../components/CSHeader';
import CSInputList from '../components/CSInputList';
import CSSettingCell from '../components/CSSettingCell';
import {saveAccount} from '../redux/actions';

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
            onPress: () => {
              saveAccount(this.props.account)
                .then(this.props.navigator.pop)
                .catch((err) => console.log(err));
            }
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
            onPress={() => this.props.navigator.push({screen: 'aboutMeEditor'})}
          />
          <CSSettingCell
            title="Your Home & Preferences"
            onPress={() => this.props.navigator.push({screen: 'yourHomeEtidor'})}
          />
          <CSSettingCell
            title="Overview"
            onPress={() => this.props.navigator.push({screen: 'overviewEditor'})}
          />
          <CSSettingCell
            title="Address"
            onPress={() => this.props.navigator.push({screen: 'addressEditor'})}
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

export default connect(
  (state) => ({account: state.account})
)(ProfileEditorScreen);
