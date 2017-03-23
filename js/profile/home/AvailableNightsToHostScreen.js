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
import {checkSetting} from '../../redux/actions';

type Props = {
  account: {
    [name: string]: any;
  },
  navigator: Navigator;
};

function AvailableNightsToHostScreen(props: Props){
  const {
    availableNightsToHost
  } = props.account;

  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../../components/img/back.png'),
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
              Object.keys(availableNightsToHost)
                .map(key => (
                  <CSCheckCell
                    key={key}
                    title={`${key[0].toUpperCase()}${key.slice(1)}`}
                    value={availableNightsToHost[key]}
                    onPress={() => props.dispatch(checkSetting('availableNightsToHost', key))}
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

export default connect(
  (state) => ({account: state.account})
)(AvailableNightsToHostScreen)
