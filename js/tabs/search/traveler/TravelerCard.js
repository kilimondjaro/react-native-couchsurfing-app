// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {getDateString} from '../../../helpers';
import CSAvatar from '../../../components/CSAvatar';

type Props = {
  traveler: {
    traveler: {
      firstName: string;
      lastName: string;
      location: {
        description: string;
      };
      verified: boolean;
      references: number;
      speaks: string;
    },
    location: {
      description: string;
    };
    tripDetail: string;
    numberOfTravelers: number;
    arrives: Date;
    departs: Date;
  },
  style?: any;
  onPress: () => void;
};

class SurferCard extends Component {
  props: Props;

  render() {
    const {
      traveler,
      location,
      arrives,
      departs,
      numberOfTravelers,
      tripDetail
    } = this.props.traveler;


    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.props.onPress}
        style={[styles.container, this.props.style]}
      >
        <CSAvatar
          style={styles.avatar}
          image={require('../img/me.jpg')}
          firstLine={`${traveler.firstName} ${traveler.lastName}`}
          secondLine={`From ${traveler.location.description}`}
          verified={traveler.verified}
        />
        <View style={styles.visitingArea}>
          <Text style={styles.visitingText}>{`Visiting ${location.description}`}</Text>
          <Text style={styles.visitingDate}>{`${getDateString(arrives)} - ${getDateString(departs)} ${numberOfTravelers} Traveler${numberOfTravelers > 1 ? 's' : ''}`}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerBlock}>
            <View style={styles.statsLine}>
              <Image source={require('../img/references.png')}/>
              <Text style={styles.statsText}>{`${traveler.experience.hosted.length + traveler.experience.stayedWith.length} References`}</Text>
            </View>
            <View style={styles.statsLine}>
              <Image source={require('../../../components/img/speaks.png')}/>
              <Text style={styles.statsText}>{`Speaks ${Object.keys(traveler.languagesImFluentIn).filter(key => traveler.languagesImFluentIn[key] === true).join(', ')}`}</Text>
            </View>
          </View>
          <View style={styles.footerBlock}>
            <Text
              style={styles.description}
              numberOfLines={3}
            >
              {tripDetail}
          </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    borderBottomWidth: 1,
    borderColor: '#c7d0d7'
  },
  avatar: {
    flex: 5.5,
  },
  visitingArea: {
    flex: 1.5,
    backgroundColor: '#2f81b7',
    justifyContent: 'space-around',
    paddingLeft: 10
  },
  visitingText: {
    color: 'white',
    fontSize: 20
  },
  visitingDate: {
    color: 'white',
    fontSize: 18
  },
  footer: {
    flex: 3,
    justifyContent: 'space-around'
  },
  footerBlock: {
    marginLeft: 10,
    marginRight: 10
  },
  statsLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statsText: {
    fontSize: 15,
    color: '#616266',
    marginLeft: 5
  },
  description: {
    fontSize: 15,
    color: '#616266',
  }
});

export default SurferCard;
