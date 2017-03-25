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
import {setSetting} from '../../redux/actions';

type Props = {
  sleepingArrangement: string;
  navigator: Navigator;
};

const sleepingArrengements = [
  'Private Room',
  'Public Room',
  'Shared Room',
  'Shared Sleeping Surface'
]

function SleepingArrangementsScreen(props: Props){
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
            {
              sleepingArrengements.map(sleepingArrengement => (
                <CSCheckCell
                  key={sleepingArrengement}
                  title="Private Room"
                  value={props.sleepingArrangement === sleepingArrengement}
                  onPress={() =>
                    props.dispatch(
                      setSetting('sleepingArrangement', sleepingArrengement))
                  }
                />
              ))
            }
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
