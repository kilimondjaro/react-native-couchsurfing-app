// @flow
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {daysOfWeek, monthNames} from '../../../helpers';
import CSAvatar from '../../../components/CSAvatar';

type Props = {
  event: {
    name: string;
    attendance: number;
    date: Date;
    location: string;
  },
  style?: any;
};

export default function EventCard(props: Props) {
  const {
    name,
    attendance,
    date,
    location
  } = props.event;

  const fullDate = `${daysOfWeek[date.getDay()]}, ${date.getDay()} ${monthNames[date.getMonth()]} at ${date.getHours()}:${date.getMinutes()}`;
  return (
    <View style={[styles.container, props.style]}>
      <CSAvatar
        style={styles.avatar}
        image={require('../img/me.jpg')}
        firstLine={name}
      />
      <View style={styles.footer}>
        <View style={styles.footerBlock}>
          <View style={styles.blockElement}>
            <Image source={require('../../../components/img/geopoint.png')} />
            <Text
              numberOfLines={1}
              style={[styles.footerText, {marginLeft: 5}]}
            >
              {location}
            </Text>
          </View>
        </View>
        <View style={styles.footerBlock}>
          <View style={styles.blockElement}>
            <Image source={require('../img/time.png')}/>
            <Text style={[styles.footerText, {marginLeft: 5}]}>{fullDate}</Text>
          </View>
          <Text style={styles.footerText}>{`${attendance} Attending`}</Text>
        </View>
      </View>
    </View>
  );
}

EventCard.defaultProps = {
  event: {
    name: 'Kirill Babich',
    attendance: 1,
    date: new Date(2017, 3, 13, 14, 30),
    location: 'Moscow',
  }
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderBottomWidth: 1,
    borderColor: '#c7d0d7'
  },
  avatar: {
    flex: 4,
  },
  footerText: {
    fontSize: 15,
    color: '#bcc7cf',
  },
  footerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  blockElement: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-around'
  }
});
