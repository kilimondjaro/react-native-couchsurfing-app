// @flow
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {daysOfWeek, monthNames} from '../../../helpers';

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
      <Image
        style={styles.image}
        // TODO add prop for image
        source={require('../img/me.jpg')}
      >
        <View style={styles.nameArea}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </Image>
      <View style={styles.footer}>
        <View style={styles.footerBlock}>
          <View style={styles.blockElement}>
            <Image source={require('../img/geopoint.png')} />
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
  image: {
    flex: 4,
  },
  nameArea: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10
  },
  nameText: {
    color: 'white',
    fontSize: 20
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
