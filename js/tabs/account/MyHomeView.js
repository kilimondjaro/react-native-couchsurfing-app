// @flow
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const template = {
  preferences: {
    maxGuests: 'Max Surfers',
    preferredGender: 'Preferred Gender',
    kidFriendly: 'Suitable for Children',
    petFriendly: 'Pets Welcome',
    smokingAllowed: 'Smoking Allowed',
    sameDayRequests: 'Same Day Requests'
  },
  home: {
    sleepingArrengements: 'Sleeping Arrangements',
    petsAtHome: 'I Have Pets',
    kidsAtHome: 'Kids at Home',
    smoker: 'Smoking at Home',
    wheelchairAccessible: 'Wheelchair Accessible',
  },
  others: {
    publicTransit: 'Public Transit',
    descriptionOfSleepingArrengements: 'Sleeping Arrengements',
    roommateSituation: 'Roommate Situation',
    whatYouCanShareWithGuests: 'What I Can Share With Guests',
    additionalInformation: 'Additional Information',
  }
};

function getValueString(key, value) {
  const type = typeof value;
  if (type === 'number' || type === 'string') {
    return value;
  }

  if (type === 'boolean') {
    if (key === 'petFriendly' || key === 'smokingAllowed'
      || key === 'sameDayRequests') {
      return value ? 'Allowed' : 'Not Allowed';
    }
    if (key === 'kidFriendly') {
      return value ? 'Suitable' : 'Not Suitable';
    }
    return value ? 'Yes' : 'No';
  }
}

type Props = {
  account: {
    [name: string]: any;
  }
};

export default function MyHomeView(props: Props) {
  return (
    <View>
      <View style={styles.preferencesGroup}>
        <Text style={styles.title}>{`${props.account.firstName} ${props.account.lastName}'s preferences`.toUpperCase()}</Text>
        {
          Object.keys(template.preferences).map(key => {
            const value = props.account[key];
            if (value === null) {
              return null;
            }

            return (
              <View key={key} style={styles.lineContainer}>
                <Text style={styles.key}>{template.preferences[key]}</Text>
                <Text style={styles.value}>{getValueString(key, value)}</Text>
              </View>
            );
          })
        }
      </View>
      <View style={styles.preferencesGroup}>
        <Text style={styles.title}>{`${props.account.firstName} ${props.account.lastName}'s home`.toUpperCase()}</Text>
        {
          Object.keys(template.home).map(key => {
            const value = props.account[key];
            if (value === null) {
              return null;
            }

            return (
              <View key={key} style={styles.lineContainer}>
                <Text style={styles.key}>{template.home[key]}</Text>
                <Text style={styles.value}>{getValueString(key, value)}</Text>
              </View>
            );
          })
        }
      </View>
      <View style={styles.preferencesGroup}>
        {
          Object.keys(template.others).map(key => {
            const value = props.account[key];
            if (value === null) {
              return null;
            }

            return (
              <View key={key}>
                <Text style={styles.title}>{`${template.others[key]}`.toUpperCase()}</Text>
                <View key={key} style={styles.lineContainer}>
                  <Text style={styles.key}>{value}</Text>
                </View>
              </View>
            );
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  preferencesGroup: {
    margin: 10
  },
  lineContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: '#eb6547'
  },
  key: {
    color: '#002042'
  },
  value: {
    color: '#a6afbb',
    textAlign: 'right'
  }
});
