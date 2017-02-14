// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

class SurferCard extends Component {

  render() {
    const {width} = Dimensions.get('window');
    console.log(width);
    return (
      <View style={styles.container}>
        <Image

          style={styles.image}
          source={require('./img/me.jpg')}
        >
          <View style={styles.statusArea}>
            <View style={styles.status}>
              <Text style={styles.statusText}>Accepting Guests</Text>
            </View>
          </View>
          <View style={styles.nameArea}>
            <Text style={styles.nameText}>Kirill Babich</Text>
            <Text style={styles.locationText}>Moscow, Russia</Text>
          </View>
        </Image>
        <View style={styles.footer}>
          <View style={styles.footerBlock}>
            <View style={styles.leftFooterBlock}>
              <Image source={require('./img/quote.png')}/>
              <Text style={styles.leftFooterBlockText}>24 References</Text>
            </View>
            <View style={styles.leftFooterBlock}>
              <Image source={require('./img/reference.png')}/>
              <Text style={styles.leftFooterBlockText}>Speaks English</Text>
            </View>
          </View>
          <View style={styles.footerBlock}>
            <Text style={styles.rightFooterBlockText}>Response rate: 100%</Text>
            <Text style={styles.rightFooterBlockText}>Active Today</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderBottomWidth: 1,
    borderColor: '#c7d0d7'
  },
  image: {
    flex: 4,
  },
  statusArea: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 20
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
  locationText: {
    color: 'white',
    fontSize: 18
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerBlock: {
    margin: 10
  },
  leftFooterBlock: {
    flexDirection: 'row'
  },
  leftFooterBlockText: {
    fontSize: 16,
    color: '#616266',
    marginLeft: 5
  },
  rightFooterBlockText: {
    fontSize: 14,
    color: '#c9d2d8',
    textAlign: 'right'
  },
  status: {
    height: 30,
    width: 150,
    backgroundColor: '#5eb573',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusText: {
    color: 'white',
    fontSize: 16
  }
});

export default SurferCard;
