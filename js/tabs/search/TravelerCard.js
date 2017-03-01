// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {getDateString} from '../../helpers';

type Date = {
  year: number;
  month: number;
  day: number;
}

type Props = {
  traveler: {
    name: string;
    location: string;
    references: number;
    speaks: string;
    verified: boolean;
    visiting: string;
    description: string;
    count: number;
    date: {
      arrives: Date;
      departs: Date;
    };
  },
  style?: any;
  onPress: () => void;
};

class SurferCard extends Component {
  props: Props;
  static defaultProps = {
    traveler: {
      name: 'Kirill Babich',
      location: 'Moscow, Russia',
      references: 8,
      speaks: 'English',
      verified: true,
      visiting: 'Moscow, Russia',
      date: {
        arrives: {year: 2017, month: 2, day: 31},
        departs: {year: 2017, month: 3, day: 10}
      },
      count: 1,
      description: 'Hello, Rosa! We are Polly and Kirill, two funny friendly students from Russia! We are very glad to hear from you about your life feeling, we suppose that we may find a common ground!'
    }
  }

  render() {
    const {
      name,
      location,
      date,
      count,
      references,
      speaks,
      description,
      visiting,
      verified
    } = this.props.traveler;

// 0.55 + 0.15 + 0.3
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.props.onPress}
        style={[styles.container, this.props.style]}
      >
        <Image
          style={styles.image}
          // TODO add prop for image
          source={require('./img/me.jpg')}
        >
          <View style={styles.nameArea}>
            <View style={styles.nameLine}>
              <Text style={styles.nameText}>{name}</Text>
              {
                verified
                  ?  (
                    <Image
                      style={styles.verifiedIcon}
                      source={require('./img/verified.png')}
                    />
                  ) : null
              }
            </View>
            <Text style={styles.locationText}>{`From ${location}`}</Text>
          </View>
        </Image>
        <View style={styles.visitingArea}>
          <Text style={styles.visitingText}>{`Visiting ${visiting}`}</Text>
          <Text style={styles.visitingDate}>{`${getDateString(date.arrives)} - ${getDateString(date.departs)} ${count} Traveler${count > 1 ? 's' : ''}`}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerBlock}>
            <View style={styles.statsLine}>
              <Image source={require('./img/quote.png')}/>
              <Text style={styles.statsText}>{`${references} References`}</Text>
            </View>
            <View style={styles.statsLine}>
              <Image source={require('./img/reference.png')}/>
              <Text style={styles.statsText}>{`Speaks ${speaks}`}</Text>
            </View>
          </View>
          <View style={styles.footerBlock}>
            <Text
              style={styles.description}
              numberOfLines={3}
            >
              {description}
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
  image: {
    flex: 5.5,
  },
  nameArea: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10
  },
  nameLine: {
    flexDirection: 'row'
  },
  nameText: {
    color: 'white',
    fontSize: 20
  },
  verifiedIcon: {
    marginTop: 3,
    marginLeft: 5
  },
  locationText: {
    color: 'white',
    fontSize: 18
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
    flexDirection: 'row'
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
