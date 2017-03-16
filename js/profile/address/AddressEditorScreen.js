// @flow
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Navigator
} from 'react-native';
import {CSHeader} from '../../components/CSHeader';
import CSInputList from '../../components/CSInputList';
import CSTextInput from '../../components/CSTextInput';
import CSIconCell from '../../components/CSIconCell';

type Props = {
  account: {
    [name: string]: any;
  };
  navigator: Navigator;
};

export default function AddressEditorScreen(props: Props){
  const {account} = props;

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
            <CSIconCell
              title="Find Address"
            />
          </CSInputList>
        </View>
        <View style={{marginTop: 20, marginBottom: 20}}>
          <CSInputList
            style={styles.inputList}
          >
            <CSTextInput
              placeholder="Address"
              value={''}
              onTextChange={() => {}}
            />
            <CSTextInput
              placeholder="Apt/Suite/Building"
              value={''}
              onTextChange={() => {}}
            />
            <CSTextInput
              placeholder="City"
              value={''}
              onTextChange={() => {}}
            />
            <CSTextInput
              placeholder="State"
              value={''}
              onTextChange={() => {}}
            />
            <CSTextInput
              placeholder="Country"
              value={''}
              onTextChange={() => {}}
            />
            <CSTextInput
              placeholder="Postal Code"
              value={''}
              onTextChange={() => {}}
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
