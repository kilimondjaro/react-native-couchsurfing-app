// @flow
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import {CSHeader} from '../../components/CSHeader';
import CSInputList from '../../components/CSInputList';
import CSTextInput from '../../components/CSTextInput';
import CSSettingCell from '../../components/CSSettingCell';
import CSSwitchCell from '../../components/CSSwitchCell';
import {setSetting, toggleSetting, checkSetting} from '../../redux/actions';

type Props = {
  account: {
    [name: string]: any;
  };
  navigator: Navigator;
};

function getAvailableNihtsToHostValue(availableNightsToHost: any) {
  const len = Object.keys(availableNightsToHost)
    .filter(key => availableNightsToHost[key] === true).length;

  if (len > 0) {
    return len === Object.keys(availableNightsToHost).length
      ? 'All'
      : 'Custom';
  }
  return 'None';
}

function AboutMeEditorScreen(props) {
  const {
    availableNightsToHost,
    maxGuests,
    multipleGroupsOk,
    preferredGender,
    kidFriendly,
    petFriendly,
    wheelchairAccessible,
    smokingAllowed,
    whatYouCanShareWithGuests,
    descriptionOfSleepingArrengements,
    roommateSituation,
    publicTransit,
    additionalInformation
  } = props.account;
  const dispatch = props.dispatch;

  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../../components/img/back.png'),
          onPress: () => props.navigator.pop()
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
              value={getAvailableNihtsToHostValue(availableNightsToHost)}
              onPress={() => props.navigator.push({screen: 'availableNightsToHost'})}
            />
            <CSSettingCell
              title="Maximum Guests"
              value={maxGuests === 16 ? 'Any' : maxGuests}
              onPress={() => props.navigator.push({screen: 'maximumGuests'})}
            />
            <CSSwitchCell
              title="Multiple Groups Okay"
              onChange={() => dispatch(toggleSetting('multipleGroupsOk'))}
              value={multipleGroupsOk}
            />
            <CSSettingCell
              title="Preferred Gender"
              value={preferredGender}
              onPress={() => props.navigator.push({screen: 'preferredGender'})}
            />
            <CSSwitchCell
              title="Kid Friendly"
              onChange={() => dispatch(toggleSetting('kidFriendly'))}
              value={kidFriendly}
            />
            <CSSwitchCell
              title="Pet Friendly"
              onChange={() => dispatch(toggleSetting('petFriendly'))}
              value={petFriendly}
            />
            <CSSwitchCell
              title="Wheelchair Accessible"
              onChange={() => dispatch(toggleSetting('wheelchairAccessible'))}
              value={wheelchairAccessible}
            />
            <CSSwitchCell
              title="Smoking Allowed"
              onChange={() => dispatch(toggleSetting('smokingAllowed'))}
              value={smokingAllowed}
            />
            <CSSettingCell
              title="Sleeping Arrangments"
              value={''}
              onPress={() => props.navigator.push({screen: 'sleepingArrangements'})}
            />
            <CSTextInput
              placeholder="What You Can Offer Guests"
              onChangeText={(text) => dispatch(setSetting('whatYouCanShareWithGuests', text))}
              value={whatYouCanShareWithGuests}
            />
            <CSTextInput
              placeholder="Description Of Sleeping Arrangement"
              onChangeText={(text) => dispatch(setSetting('descriptionOfSleepingArrengements', text))}
              value={descriptionOfSleepingArrengements}
            />
            <CSTextInput
              placeholder="Roommate Situation"
              onChangeText={(text) => dispatch(setSetting('roommateSituation', text))}
              value={roommateSituation}
            />
            <CSTextInput
              placeholder="Public Transit Options"
              onChangeText={(text) => dispatch(setSetting('publicTransit', text))}
              value={publicTransit}
            />
            <CSTextInput
              placeholder="Additional Information"
              onChangeText={(text) => dispatch(setSetting('additionalInformation', text))}
              value={additionalInformation}
            />
          </CSInputList>
        </View>
      </ScrollView>
    </View>
  );
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

export default connect(
  state => ({account: state.account})
)(AboutMeEditorScreen);
