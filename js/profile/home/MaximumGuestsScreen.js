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
import CSCheckCell from '../../components/CSCheckCell';

type Props = {
  navigator: Navigator;
};

export default function MaximumGuestsScreen(props: Props){
  const guestsCountArray = ['Any'];
  for (let i = 1; i <= 15; i++) {
    guestsCountArray.push(`${i}`);
  }

  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../../components/img/back.png'),
          onPress: () => props.navigator.pop()
        }]}
        title="Maximum Guests"
      />
      <ScrollView>
        <View style={{marginTop: 40, marginBottom: 40}}>
          <CSInputList
            style={styles.inputList}
          >
            {
              guestsCountArray
                .map(key => (
                  <View
                    key={key}
                  >
                    <CSCheckCell
                      title={`${key[0].toUpperCase()}${key.slice(1)}`}
                      value={true}
                      onPress={() => {}}
                  />
                  </View>
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
