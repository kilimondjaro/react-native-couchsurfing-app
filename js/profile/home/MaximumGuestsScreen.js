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
  navigator: Navigator;
};

const maxGuestsCount = 15;
const guestsCountArray = [maxGuestsCount + 1];
function MaximumGuestsScreen(props: Props){
  for (let i = 1; i <= 15; i++) {
    guestsCountArray.push(i);
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
                      title={key === maxGuestsCount + 1 ? 'Any' : key}
                      value={props.maxGuests === key}
                      onPress={() =>
                        props.dispatch(setSetting('maxGuests', key))
                      }
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

export default connect(
  state => ({maxGuests: state.account.maxGuests})
)(MaximumGuestsScreen);
