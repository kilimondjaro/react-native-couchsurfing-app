// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  SegmentedControlIOS,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import CSTextInput from '../../components/CSTextInput';
import CSInputList from '../../components/CSInputList';
import CSLoadingView from '../../components/CSLoadingView';
import CSDatePickerIOS from '../../components/CSDatePickerIOS';
import {CSHeader} from '../../components/CSHeader';
import CSSettingCell from '../../components/CSSettingCell';
import {setSetting, saveAccount, loadAccount} from '../../redux/actions';

function SettingsBlock(props) {
  return (
    <View style={styles.settingsBlock}>
      <Text style={styles.settingsBlockText}>{props.title.toUpperCase()}</Text>
      {props.children}
    </View>
  );
}

const genderTypes = ['Male', 'Female', 'Other'];

type Props = {
  account: Account; //FIXME
  navigator: Navigator;
}

type State = {
  datePickerIsVisible: boolean;
  loading: boolean;
}

class AccountSettingsScreen extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      datePickerIsVisible: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    this.props.dispatch(loadAccount())
      .then(() => this.setState({loading: false}));
  }

  _onScroll() {
    if (this.state.datePickerIsVisible) {
      this.setState({datePickerIsVisible: false});
    }
  }

  render() {
    const {
      birthday,
      firstName,
      lastName,
      email,
      phone,
      gender,
      emergencyName,
      emergencyPhone,
      emergencyEmail,
      emergencyNotes
    } = this.props.account;

    const dispatch = this.props.dispatch;

    const alertMessage = 'Are you shure you want to cancel and lose any unsaved change?';
    return this.state.loading ? <CSLoadingView /> : (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            text: 'Cancel',
            onPress: () => Alert.alert(
              'Edit Account',
              alertMessage,
              [
                {text: 'No', onPress: () => {}},
                {text: 'Yes', onPress: () => this.props.navigator.pop()}
              ]
          )}]}
          rightItem={[{
            text: 'Save',
            onPress: () => {
              saveAccount(this.props.account)
                .then(this.props.navigator.pop)
                .catch((err) => console.log(err));
            }
          }]}
          style={styles.header}
          title="edit account"
        />
        <ScrollView
          keyboardDismissMode="on-drag"
          onScroll={() => this._onScroll()}
        >
          <SettingsBlock title="name">
            <CSInputList
              style={styles.inputList}
            >
              <CSTextInput
                placeholder="First name"
                onChangeText={(text) =>
                  dispatch(setSetting('firstName', text))}
                value={firstName}
              />
              <CSTextInput
                placeholder="Last name"
                onChangeText={(text) =>
                  dispatch(setSetting('lastName', text))}
                value={lastName}
              />
            </CSInputList>
            <CSInputList
              style={[styles.inputList, {marginTop: 40}]}
            >
              <CSSettingCell
                title="Birthday"
                onPress={() => this.setState({datePickerIsVisible: true})}
                value={birthday.toDateString()}
                showIcon={false}
              />
            </CSInputList>
          </SettingsBlock>
          <SettingsBlock title="contact details">
            <CSInputList
              style={styles.inputList}
            >
              <CSTextInput
                placeholder="Email"
                onChangeText={(text) =>
                  dispatch(setSetting('email', text))}
                value={email}
              />
              <CSTextInput
                placeholder="Phone"
                onChangeText={(text) =>
                  dispatch(setSetting('phone', text))}
                value={phone}
              />
            </CSInputList>
          </SettingsBlock>
          <SettingsBlock title="gender">
            <CSInputList
              style={styles.inputList}
            >
              <SegmentedControlIOS
                style={styles.segment}
                tintColor="#2f81b7"
                values={genderTypes}
                selectedIndex={genderTypes.indexOf(gender)}
                onChange={(event) => {
                  const index = event.nativeEvent.selectedSegmentIndex;
                  dispatch(setSetting('gender', genderTypes[index]));
                }}
              />
            </CSInputList>
          </SettingsBlock>
          <SettingsBlock title="emergency contact info">
            <CSInputList
              style={styles.inputList}
            >
              <CSTextInput
                placeholder="Name"
                multiline
                onChangeText={(text) =>
                  dispatch(setSetting('emergencyName', text))}
                value={emergencyName}
              />
              <CSTextInput
                placeholder="Phone Number"
                multiline
                onChangeText={(text) =>
                  dispatch(setSetting('emergencyPhone', text))}
                value={emergencyPhone}
              />
              <CSTextInput
                placeholder="Email Adress"
                multiline
                onChangeText={(text) => {}}
                value={emergencyEmail}
              />
              <CSTextInput
                placeholder="Notes"
                multiline
                onChangeText={(text) =>
                  dispatch(setSetting('emergencyNotes', text))}
                value={emergencyNotes}
              />
            </CSInputList>
          </SettingsBlock>
          <Text
            style={styles.emergencyText}
            numberOfLines={4}
          >
            Enter the name and contact information of the person or
            people to contact in the case of an emergency. This information
            will ONLY be used in th case of an emergency.
          </Text>
        </ScrollView>
        <CSDatePickerIOS
          visible={this.state.datePickerIsVisible}
          date={birthday}
          onDateChange={(date) =>
            dispatch(setSetting('birthday', date))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf1f2'
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  inputList: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC'
  },
  settingsBlockText: {
    marginLeft: 20,
    marginBottom: 10,
    color: '#8e9baa',
    fontWeight: 'bold'
  },
  settingsBlock: {
    marginTop: 20
  },
  emergencyText: {
    margin: 10,
    fontSize: 16,
    color: '#8e9baa'
  }
});

export default connect(
  (state) => ({account: state.account})
)(AccountSettingsScreen);
