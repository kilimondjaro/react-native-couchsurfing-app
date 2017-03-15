// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SegmentedControlIOS,
  Navigator
} from 'react-native';
import CSTextInput from '../../components/CSTextInput';
import CSInputList from '../../components/CSInputList';
import CSDatePickerIOS from '../../components/CSDatePickerIOS';
import {CSHeader} from '../../components/CSHeader';
import CSSettingCell from '../../components/CSSettingCell';

function SettingsBlock(props) {
  return (
    <View style={styles.settingsBlock}>
      <Text style={styles.settingsBlockText}>{props.title.toUpperCase()}</Text>
      {props.children}
    </View>
  );
}

const genderTypes = ['Male', 'Female', 'Other'];

type Account = {
  birthday: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyEmail: string;
  emergencyNotes: string;
}

type Props = {
  account: Account;
  navigator: Navigator;
}

type State = {
  birthday: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyEmail: string;
  emergencyNotes: string;
  datePickerIsVisible: boolean;
}

class AccountSettingsScreen extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      firstName: props.account.firstName,
      lastName: props.account.lastName,
      birthday: props.account.birthday,
      email: props.account.email,
      phone: props.account.phone,
      gender: props.account.gender,
      emergencyName: props.account.emergencyName,
      emergencyPhone: props.account.emergencyPhone,
      emergencyEmail: props.account.emergencyEmail,
      emergencyNotes: props.account.emergencyNotes,
      datePickerIsVisible: false
    };
  }

  static defaultProps = {
    account: {
      firstName: 'Kirill',
      lastName: 'Babich',
      birthday: new Date(),
      email: 'email@gmail.com',
      phone: '+71234567890',
      gender: 'Male'
    }
  };

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
    } = this.state;

    const alertMessage = 'Are you shure you want to cancel and lose any unsaved change?';
    return (
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
            onPress: () => {}
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
                onChangeText={(text) => this.setState({firstName: text})}
                value={firstName}
              />
              <CSTextInput
                placeholder="Last name"
                onChangeText={(text) => this.setState({lastName: text})}
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
                onChangeText={(text) => this.setState({email: text})}
                value={email}
              />
              <CSTextInput
                placeholder="Phone"
                onChangeText={(text) => this.setState({phone: text})}
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
                  this.setState({gender: genderTypes[index]});
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
                onChangeText={(text) => this.setState({emergencyName: text})}
                value={emergencyName}
              />
              <CSTextInput
                placeholder="Phone Number"
                onChangeText={(text) => this.setState({emergencyPhone: text})}
                value={emergencyPhone}
              />
              <CSTextInput
                placeholder="Email Adress"
                onChangeText={(text) => this.setState({emergencyEmail: text})}
                value={emergencyEmail}
              />
              <CSTextInput
                placeholder="Notes"
                onChangeText={(text) => this.setState({emergencyNotes: text})}
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
          date={this.state.birthday}
          onDateChange={(date) => this.setState({birthday: date})}
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

export default AccountSettingsScreen;
