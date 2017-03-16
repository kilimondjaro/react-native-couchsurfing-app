// @flow
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import {CSHeader} from '../../components/CSHeader';
import CSInputList from '../../components/CSInputList';
import CSTextInput from '../../components/CSTextInput';
import CSSettingCell from '../../components/CSSettingCell';
import CSSwitchCell from '../../components/CSSwitchCell';

type Props = {
  account: {
    [name: string]: any;
  }
};

export default class AboutMeEditorScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  static defaultProps = {
    account: {
      availableNightsToHost: {
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true
      },
      maxGuests: 1
    }
  }

  getAvailableNihtsToHostValue(availableNightsToHost: any) {
    const len = Object.keys(availableNightsToHost)
      .filter(key => availableNightsToHost[key] === true).length;

    if (len > 0) {
      return len === Object.keys(availableNightsToHost).length
        ? 'All'
        : 'Custom';
    }
    return 'None';
  }

  render() {
    const {account} = this.props;

    return (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            icon: require('../../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          title="Your Home & Preferences"
        />
        <ScrollView
          keyboardDismissMode="on-drag"
        >
          <View style={{marginTop: 20, marginBottom: 20}}>
            <CSInputList
              style={styles.inputList}
            >
              <CSSettingCell
                title="Available Nights to Host"
                value={this.getAvailableNihtsToHostValue(account.availableNightsToHost)}
                onPress={() => this.props.navigator.push({screen: 'availableNightsToHost'})}
              />
              <CSSettingCell
                title="Maximum Guests"
                value={account.maxGuests}
                onPress={() => this.props.navigator.push({screen: 'maximumGuests'})}
              />
              <CSSwitchCell
                title="Multiple Groups Okay"
                onChange={() => {}}
                value={true}
              />
              <CSSettingCell
                title="Preferred Gender"
                value={'Any'}
                onPress={() => this.props.navigator.push({screen: 'preferredGender'})}
              />
              <CSSwitchCell
                title="Kid Friendly"
                onChange={() => {}}
                value={false}
              />
              <CSSwitchCell
                title="Pet Friendly"
                onChange={() => {}}
                value={false}
              />
              <CSSwitchCell
                title="Wheelchair Accessible"
                onChange={() => {}}
                value={false}
              />
              <CSSwitchCell
                title="Smoking Allowed"
                onChange={() => {}}
                value={false}
              />
              <CSSettingCell
                title="Sleeping Arrangments"
                value={''}
                onPress={() => this.props.navigator.push({screen: 'sleepingArrangements'})}
              />
              <CSTextInput
                placeholder="What You Can Offer Guests"
                onChangeText={(text) => {}}
                value={''}
              />
              <CSTextInput
                placeholder="Description Of Sleeping Arrangement"
                onChangeText={(text) => {}}
                value={''}
              />
              <CSTextInput
                placeholder="Roommate Situation"
                onChangeText={(text) => {}}
                value={''}
              />
              <CSTextInput
                placeholder="Public Transit Options"
                onChangeText={(text) => {}}
                value={''}
              />
              <CSTextInput
                placeholder="Additional Information"
                onChangeText={(text) => {}}
                value={''}
              />
            </CSInputList>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf1f2'
  },
  inputList: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC'
  }
});
