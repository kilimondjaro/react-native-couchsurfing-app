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

const GENDER = ['Male', 'Female', 'Any'];

function PreferredGenderScreen(props: Props){
  return (
    <View style={styles.container}>
      <CSHeader
        leftItem={[{
          icon: require('../../components/img/back.png'),
          onPress: () => props.navigator.pop()
        }]}
        title="Preferred Gender"
      />
      <ScrollView>
        <View style={{marginTop: 40, marginBottom: 40}}>
          <CSInputList
            style={styles.inputList}
          >
            {
              GENDER.map(gender => (
                <CSCheckCell
                  title={gender}
                  value={props.preferredGender === gender}
                  onPress={() =>
                    props.dispatch(setSetting('preferredGender', gender))
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
  state => ({preferredGender: state.account.preferredGender})
)(PreferredGenderScreen);
