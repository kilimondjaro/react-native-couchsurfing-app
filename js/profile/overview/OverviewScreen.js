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
import CSSettingCell from '../../components/CSSettingCell';
import CSTextInput from '../../components/CSTextInput';
import {setSetting} from '../../redux/actions';

type Props = {
  account: {
    [name: string]: any;
  };
  navigator: Navigator;
};

function OverviewScreen(props: Props){
  const {location} = props.account;

  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../../components/img/back.png'),
          onPress: () => props.navigator.pop()
        }]}
        title="Overview"
      />
      <ScrollView
        keyboardDismissMode="on-drag"
      >
        <View style={{marginTop: 20, marginBottom: 20}}>
          <CSInputList
            style={styles.inputList}
          >
            <CSSettingCell
              title="Countries I've visited"
              value={'None'}
              onPress={() => {}}
            />
            <CSSettingCell
              title="Countries I've lived in"
              value={'None'}
              onPress={() => {}}
            />
            <CSSettingCell
              title="Languages I'm fluent in"
              value={'None'}
              onPress={() => {}}
            />
            <CSSettingCell
              title="Languages I'm learning"
              value={'None'}
              onPress={() => {}}
            />
          </CSInputList>
        </View>
        <View style={{marginTop: 40, marginBottom: 40}}>
          <CSInputList
            style={styles.inputList}
          >
            <CSTextInput
              placeholder="Hometown"
              onChangeText={(text) =>
                props.dispatch(setSetting('location', text))}
              value={location.description}
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
)(OverviewScreen);
