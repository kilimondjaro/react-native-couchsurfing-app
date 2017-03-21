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
            onChangeText={(text) => {}}
            value={aboutMe}
          />
          <CSTextInput
            multiline={true}
            placeholder="One Amazing Thing I've Done"
            onChangeText={(text) => {}}
            value={oneAmazingThingIveDone}
          />
          <CSTextInput
            multiline={true}
            placeholder="Music, Movies & Books"
            onChangeText={(text) => {}}
            value={musicMoviesBooks}
          />
          <CSTextInput
            multiline={true}
            placeholder="Teach, Learn, Share"
            onChangeText={(text) => {}}
            value={teachLearnShare}
          />
          <CSTextInput
            multiline={true}
            placeholder="Why I'm on Couchsurfing"
            onChangeText={(text) => this.setState({val: text})}
            value={whyImOnCouchsurfing}
          />
          <CSTextInput
            multiline={true}
            placeholder="What I Can Share With Hosts"
            onChangeText={(text) => {}}
            value={whatYouCanShareWithGuests}
          />
          <CSTextInput
            multiline={true}
            placeholder="My Interests"
            onChangeText={(text) => this.setState({val: text})}
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
            onChange={() => {}}
            value={kidsAtHome}
          />
          <CSSwitchCell
            title="I have pets"
            onChange={() => {}}
            value={petsAtHome}
          />
          <CSSwitchCell
            title="I'm a smoker"
            onChange={() => {}}
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
