// @flow
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Navigator
} from 'react-native';
import {CSHeader} from '../components/CSHeader';
import CSInputList from '../components/CSInputList';
import CSCheckCell from '../components/CSCheckCell';

type Props = {
  account: {
    [name: string]: any;
  };
  navigator: Navigator;
};

export default function SleepingArrangementsScreen(props: Props){
  const {account} = props;

  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../components/img/back.png'),
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
              value={true}
              onPress={() => {}}
            />
            <CSCheckCell
              title="Public Room"
              value={true}
              onPress={() => {}}
            />
            <CSCheckCell
              title="Shared Room"
              value={true}
              onPress={() => {}}
            />
            <CSCheckCell
              title="Shared Sleeping Surface"
              value={true}
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
