// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {getDateString} from '../../helpers';

function UpcomingTravel(props) {
  const {
    travels
  } = props;
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.header}>
        <View style={styles.headerLeftSide}>
          <Image source={require('./img/plane.png')}/>
          <Text style={styles.title}>{'Upcoming Travel'.toUpperCase()}</Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigator.push({screen: 'tripEditor', create: true})}
          style={styles.addButton}
        >
          <Image source={require('../search/img/plus.png')}/>
        </TouchableOpacity>
      </View>
      <View>
        {travels.length > 0 ? props.travels.map((travel, i) => (
          <View style={styles.travel} key={i}>
            <View style={styles.locationArea}>
              <Image
                style={{tintColor: '#eb6547'}}
                source={require('../../components/img/geopoint.png')}
              />
              <Text style={styles.location}>{travel.location.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.informationArea}
            >
              <Image source={require('./img/circlePlane.png')}/>
              <View style={styles.tripInfo}>
                <Text style={{fontSize: 16}}>Public Trip</Text>
                <Text>
                  {`${getDateString(travel.from)} - ${getDateString(travel.to)}`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )) : (
          <Text>No Upcoming Trips or Hosts</Text>
        )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#bcc8d0',
    borderTopWidth: 1,
    borderTopColor: '#bcc8d0'
  },
  header: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ebebeb'
  },
  headerLeftSide: {
    flexDirection: 'row',
    marginLeft: 10
  },
  title: {
    marginLeft: 10
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#2f81b7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  travel: {
    backgroundColor: 'white'
  },
  informationArea: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  locationArea: {
    height: 35,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ebebeb'
  },
  location: {
    color: '#eb6547',
    marginLeft: 5
  },
  tripInfo: {
    marginLeft: 10
  }
});

UpcomingTravel.defaultProps = {
  travels: [
    {
      description: 'Just new travel',
      location: {
        description: 'Russia, Moscow'
      },
      from: new Date(2017, 5, 6),
      to: new Date(2017, 5, 9),
    },
    {
      description: 'Just new travel',
      location: {
        description: 'England, London'
      },
      from: new Date(2017, 5, 14),
      to: new Date(2017, 5, 19),
    }
  ]
};

export default connect()(UpcomingTravel);
