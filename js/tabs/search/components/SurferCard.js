// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const statusMap = {
  accepting: {
    label: 'Accepting Guests',
    textColor: 'white',
    areaColor: '#43b667'
  },
  maybe: {
    label: 'Maybe Accepting Guests',
    textColor: 'white',
    areaColor: '#273c53'
  },
  not: {
    label: 'Not Accepting Guests',
    textColor: 'black',
    areaColor: '#bfcad1'
  },
  meetUp: {
    label: 'Want to Meet Up',
    textColor: 'black',
    areaColor: '#bfcad1'
  }
};

type Props = {
  user: {
    name: string;
    location: string;
    status: string;
    references: number;
    speaks: string;
    active: string;
    responseRate: number;
    verified: boolean;
  },
  style?: any;
};

class SurferCard extends Component {
  props: Props;
  static defaultProps = {
    user: {
      name: 'Kirill Babich',
      status: 'accepting',
      location: 'Moscow, Russia',
      references: 8,
      speaks: 'English',
      responseRate: 100,
      active: 'Today',
      verified: true
    }
  }

  render() {
    const {
      name,
      location,
      status,
      references,
      speaks,
      active,
      responseRate,
      verified
    } = this.props.user;

    const statusAreaStyle = {backgroundColor: statusMap[status].areaColor};
    const statusTextColor = {color: statusMap[status].textColor};

    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          style={styles.image}
          // TODO add prop for image
          source={require('../img/me.jpg')}
        >
          <View style={styles.statusArea}>
            <View style={[styles.status, statusAreaStyle]}>
              <Text style={[styles.statusText, statusTextColor]}>{statusMap[status].label}</Text>
            </View>
          </View>
          <View style={styles.nameArea}>
            <View style={styles.nameLine}>
              <Text style={styles.nameText}>{name}</Text>
              {
                verified
                  ?  (
                    <Image
                      style={styles.verifiedIcon}
                      source={require('../img/verified.png')}
                    />
                  ) : null
              }
            </View>
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </Image>
        <View style={styles.footer}>
          <View style={styles.footerBlock}>
            <View style={styles.leftFooterBlock}>
              <Image source={require('../img/references.png')}/>
              <Text style={styles.leftFooterBlockText}>{`${references} References`}</Text>
            </View>
            <View style={styles.leftFooterBlock}>
              <Image source={require('../img/speaks.png')}/>
              <Text style={styles.leftFooterBlockText}>{`Speaks ${speaks}`}</Text>
            </View>
          </View>
          <View style={styles.footerBlock}>
            <Text style={styles.rightFooterBlockText}>{`Response rate: ${responseRate}%`}</Text>
            <Text style={styles.rightFooterBlockText}>{`Active ${active}`}</Text>
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
    alignItems: 'center',
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
    padding: 5,
    opacity: 0.85,
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
