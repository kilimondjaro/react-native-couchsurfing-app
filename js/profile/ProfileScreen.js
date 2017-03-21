// @flow
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  StyleSheet,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import {CSHeader} from '../components/CSHeader';
import CSAvatar from '../components/CSAvatar';
import ProfileProgressBar from './ProfileProgressBar';
import CSInputList from '../components/CSInputList';
import {statusMap} from '../helpers';
import ProfileTabsView from './ProfileTabsView';

const verifiedStatuses = {
  payment: 'Payment',
  phone: 'Phone',
  governmentId: 'Government ID',
  address: 'Address'
};

function CellWithIcon(props) {
  return (
    <TouchableHighlight
      underlayColor="gray"
      onPress={props.onPress}
    >
      <View style={styles.cellContainer}>
        <Image style={{margin: 20}} source={props.icon}/>
        <View style={styles.cellsRightSide}>
          {
            props.children
          }
        </View>
      </View>
    </TouchableHighlight>
  );
}

class ProfileScreen extends Component {
  render() {
    const {
      status,
      verified,
      experience,
      firstName,
      lastName,
      location,
      responseRate,
      active
    } = this.props.account;
    const currentStatus = statusMap[status];

    const verifiedText = Object.keys(verified.parts)
      .map(part => <Text key={part} style={verified.parts[part] ? {color: '#47b769'} : null}>{`• ${verifiedStatuses[part]} `}</Text>);

    const referencesCount = experience.hosted.length + experience.stayedWith.length;
    const starsCount = experience.hosted.filter(obj => obj.star === true).length
      + experience.stayedWith.filter(obj => obj.star === true).length;

    return (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            icon: require('../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          rightItem={[{
            text: 'Edit',
            onPress: () => this.props.navigator.push({screen: 'editProfile'})
          }]}
          style={styles.header}
          title={`${firstName} ${lastName}`}
        />
        <ScrollView>
          <ProfileProgressBar completion={0.75} />
          <CSAvatar
            style={styles.avatarContainer}
            image={require('../tabs/search/img/me.jpg')}
            firstLine={`${firstName} ${lastName}`}
            secondLine={location}
          >
            <View style={styles.zoomAvatartButtonContainer}>
              <TouchableOpacity
                onPress={() => {}}
                activeOpacity={0.2}
                style={styles.zoomAvatartButton}>
              </TouchableOpacity>
            </View>
          </CSAvatar>
          <CSInputList
            separatorStyle={{marginLeft: 0}}
            style={styles.inputList}
          >
            <CellWithIcon
              onPress={() => {}}
              icon={require('../tabs/search/img/references.png')}
            >
              {
                referencesCount > 0
                  ? (
                    <View style={styles.referenceCell}>
                      <View style={styles.referencesContainer}>
                        <Text style={styles.referenceText}>{`${referencesCount} References`}</Text>
                        <View style={styles.wouldStayAgainContainer}>
                          <Image style={{marginRight: 5}} source={require('./img/star.png')} />
                          <Text>{starsCount}</Text>
                        </View>
                      </View>
                      <Image source={require('../components/img/next.png')}/>
                    </View>
                  )
                  : (
                    <Text>No References</Text>
                  )
              }
            </CellWithIcon>
            <CellWithIcon
              icon={require('../tabs/search/img/references.png')}
            >
              <View>
                {/* Fix status color bug!!!! */}
                <Text style={{color: currentStatus.areaColor}}>{currentStatus.label}</Text>
                <Text style={{fontSize: 12}}>{`Response rate: ${responseRate}% • Active ${active.toDateString()}`}</Text>
              </View>
            </CellWithIcon>
            <CellWithIcon
              icon={require('../tabs/search/img/references.png')}
            >
              <View>
                {/* Fix status color bug!!!! */}
                <Text style={{color: currentStatus.areaColor}}>{verified.status}</Text>
                <Text style={{fontSize: 12}}>{verifiedText}</Text>
              </View>
            </CellWithIcon>
          </CSInputList>
          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestText}>Request to Stay</Text>
          </TouchableOpacity>
          <ProfileTabsView />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarContainer: {
    height: 320
  },
  zoomAvatartButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    opacity: 0.2
  },
  zoomAvatartButton: {
    width: 45,
    height: 45,
    backgroundColor: 'black',
    margin: 10
  },
  cellContainer: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row'
  },
  cellsRightSide: {
    flex: 1
  },
  referenceCell: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  referencesContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  wouldStayAgainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  referenceText: {
    color: '#2f81b7'
  },
  requestButton: {
    height: 50,
    backgroundColor: '#2f81b7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  requestText: {
    fontSize: 18,
    color: 'white'
  }
});

export default connect(
  (state) => ({account: state.account})
)(ProfileScreen);
