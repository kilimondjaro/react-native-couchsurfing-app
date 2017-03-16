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

export default function PreferredGenderScreen(props: Props){
  const {account} = props;

  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../components/img/back.png'),
          onPress: () => props.navigator.pop()
        }]}
        title="Preferred Gender"
      />
      <ScrollView>
        <View style={{marginTop: 40, marginBottom: 40}}>
          <CSInputList
            style={styles.inputList}
          >
            <CSCheckCell
              title="Female"
              value={true}
              onPress={() => {}}
            />
            <CSCheckCell
              title="Male"
              value={true}
              onPress={() => {}}
            />
            <CSCheckCell
              title="Any"
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
