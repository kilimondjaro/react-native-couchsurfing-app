// @flow
import React from 'react';
import {
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import {CSHeader} from '../components/CSHeader';
import CSInputList from '../components/CSInputList';
import CSCheckCell from '../components/CSCheckCell';

type Props = {
  account: {
    [name: string]: any;
  }
};

const days = ['']

export default function AvailableNightsToHostScreen(props){
  const {account} = props;

  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../components/img/back.png'),
          onPress: () => props.navigator.pop()
        }]}
        title="Available Nights to Host"
      />
      <ScrollView>
        <View style={{marginTop: 40}}>
          <CSInputList
            style={styles.inputList}
          >
            {
              Object.keys(props.account.availableNightsToHost)
                .map(key => (
                  <CSCheckCell
                    key={key}
                    title={`${key[0].toUpperCase()}${key.slice(1)}`}
                    value={true}
                    onPress={() => {}}
                  />
                ))
            }
          </CSInputList>
        </View>
      </ScrollView>
    </View>
  );
}

AvailableNightsToHostScreen.defaultProps = {
  account: {
    availableNightsToHost: {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true
    }
  }
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
