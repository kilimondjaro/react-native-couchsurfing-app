// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import CSAvatar from '../../../components/CSAvatar';
import {statusMap} from '../../../helpers';

type Props = {
  account: {
    firstName: string;
    lastName: string;
    location: {
      description: string;
    };
    status: string;
    experience: {
      hosted: Array<any>;
      stayedWith: Array<any>;
    };
    languagesImFluentIn: {[name: string]: boolean};
    active: Date;
    responseRate: number;
    verified: boolean;
  },
  style?: any;
  onPress: () => void;
};

class SurferCard extends Component {
  props: Props;

  render() {
    const {
      firstName,
      lastName,
      location,
      status,
      experience,
      languagesImFluentIn,
      active,
      responseRate,
      verified
    } = this.props.account;

    const statusAreaStyle = {backgroundColor: statusMap[status].areaColor};
    const statusTextColor = {color: statusMap[status].textColor};

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <CSAvatar
          style={styles.avatar}
          image={require('../img/me.jpg')}
          firstLine={`${firstName} ${lastName}`}
          secondLine={`From ${location.description}`}
          verified={verified}
        >
          <View style={styles.statusArea}>
            <View style={[styles.status, statusAreaStyle]}>
              <Text style={[styles.statusText, statusTextColor]}>{statusMap[status].label}</Text>
            </View>
          </View>
        </CSAvatar>
        <View style={styles.footer}>
          <View style={styles.footerBlock}>
            <View style={styles.leftFooterBlock}>
              <Image source={require('../img/references.png')}/>
              <Text
                style={styles.leftFooterBlockText}
              >
                {`${experience.hosted.length + experience.stayedWith.length} References`}
              </Text>
            </View>
            <View style={styles.leftFooterBlock}>
              <Image source={require('../../../components/img/speaks.png')}/>
              <Text
                style={styles.leftFooterBlockText}
              >
                {`Speaks ${Object.keys(languagesImFluentIn).filter(key => languagesImFluentIn[key] === true).join(', ')}`}
              </Text>
            </View>
          </View>
          <View style={styles.footerBlock}>
            <Text style={styles.rightFooterBlockText}>{`Response rate: ${responseRate}%`}</Text>
            <Text
              style={styles.rightFooterBlockText}
            >
              {`Active ${Math.round(Math.abs((active.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)))} days ago`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderBottomWidth: 1,
    borderColor: '#c7d0d7'
  },
  avatar: {
    flex: 4,
  },
  statusArea: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 20
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
