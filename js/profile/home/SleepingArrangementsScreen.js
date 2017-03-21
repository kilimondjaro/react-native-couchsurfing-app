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
import CSCheckCell from '../../components/CSCheckCell';

type Props = {
  sleepingArrangement: string;
  navigator: Navigator;
};

function SleepingArrangementsScreen(props: Props){
  const checkValue = value => value === props.sleepingArrangement;

  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../../components/img/back.png'),
          onPress: () => props.navigator.pop()
        }]}
        title="Sleeping Arrangements"
      />
      <ScrollView>
        <View style={{marginTop: 40, marginBottom: 40}}>
          <CSInputList
            style={styles.inputList}
          >
            <CSCheckCell
              title="Private Room"
              value={checkValue('Private Room')}
              onPress={() => {}}
            />
            <CSCheckCell
              title="Public Room"
              value={checkValue('Public Room')}
              onPress={() => {}}
            />
            <CSCheckCell
              title="Shared Room"
              value={checkValue('Shared Room')}
              onPress={() => {}}
            />
            <CSCheckCell
              title="Shared Sleeping Surface"
              value={checkValue('Shared Sleeping Surface')}
              onPress={() => {}}
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
  (state) => ({sleepingArrangement: state.account.sleepingArrangement})
)(SleepingArrangementsScreen)
