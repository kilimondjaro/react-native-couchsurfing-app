// @flow
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {CSHeader} from '../../components/CSHeader';
import CSInputList from '../../components/CSInputList';
import CSTextInput from '../../components/CSTextInput';
import CSSettingCell from '../../components/CSSettingCell';
import CSSwitchCell from '../../components/CSSwitchCell';
import {toggleSetting, setSetting} from '../../redux/actions';

type Props = {
  account: {
    [name: string]: any;
  }
};

function AboutMeEditorScreen(props) {
  const {
    aboutMe,
    oneAmazingThingIveDone,
    musicMoviesBooks,
    teachLearnShare,
    whatYouCanShareWithGuests,
    whyImOnCouchsurfing,
    interestsDescription,
    interests,
    kidsAtHome,
    petsAtHome,
    smoker
  } = props.account;

  const dispatch = props.dispatch;

  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../../components/img/back.png'),
          onPress: () => props.navigator.pop()
        }]}
        title="About Me"
      />
      <ScrollView
        keyboardDismissMode="on-drag"
      >
        <CSInputList
          style={[styles.inputList, {marginTop: 20}]}
        >
          <CSTextInput
            multiline={true}
            placeholder="About Me"
            onChangeText={(text) => dispatch(setSetting('aboutMe', text))}
            value={aboutMe}
          />
          <CSTextInput
            multiline={true}
            placeholder="One Amazing Thing I've Done"
            onChangeText={(text) => dispatch(setSetting('oneAmazingThingIveDone', text))}
            value={oneAmazingThingIveDone}
          />
          <CSTextInput
            multiline={true}
            placeholder="Music, Movies & Books"
            onChangeText={(text) => dispatch(setSetting('musicMoviesBooks', text))}
            value={musicMoviesBooks}
          />
          <CSTextInput
            multiline={true}
            placeholder="Teach, Learn, Share"
            onChangeText={(text) => dispatch(setSetting('teachLearnShare', text))}
            value={teachLearnShare}
          />
          <CSTextInput
            multiline={true}
            placeholder="Why I'm on Couchsurfing"
            onChangeText={(text) => dispatch(setSetting('whyImOnCouchsurfing', text))}
            value={whyImOnCouchsurfing}
          />
          <CSTextInput
            multiline={true}
            placeholder="What I Can Share With Hosts"
            onChangeText={(text) => dispatch(setSetting('whatYouCanShareWithGuests', text))}
            value={whatYouCanShareWithGuests}
          />
          <CSTextInput
            multiline={true}
            placeholder="My Interests"
            onChangeText={(text) => dispatch(setSetting('interestsDescription', text))}
            value={interestsDescription}
          />
          <CSSettingCell
            title="Interests"
            showIcon={false}
            onPress={() => {}}
            value={interests.length > 0 ? interests.length : 'None'}
          />
          <CSSwitchCell
            title="I have children"
            onChange={() => dispatch(toggleSetting('kidsAtHome'))}
            value={kidsAtHome}
          />
          <CSSwitchCell
            title="I have pets"
            onChange={() => dispatch(toggleSetting('petsAtHome'))}
            value={petsAtHome}
          />
          <CSSwitchCell
            title="I'm a smoker"
            onChange={() => dispatch(toggleSetting('smoker'))}
            value={smoker}
          />
        </CSInputList>
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
