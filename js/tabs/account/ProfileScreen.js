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
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import {CSHeader} from '../../components/CSHeader';
import CSAvatar from '../../components/CSAvatar';
import ProfileProgressBar from './ProfileProgressBar';
import CSInputList from '../../components/CSInputList';
import {statusMap} from '../../helpers';
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
  static defaultProps = {
    account: {
      firstName: 'Kirill',
      lastName: 'Babich',
      location: 'Moscow',
      references: [
        {wouldStayAgain: true},
        {wouldStayAgain: true},
        {wouldStayAgain: false}
      ],
      status: 'accepting',
      responseRate: 100,
      active: 'Today',
      verified: {
        status: 'Partially Verified',
        parts: {
          payment: true,
          phone: false,
          governmentId: false,
          address: false
        }
      }
    }
  }

  render() {
    const {account} = this.props;
    const status = statusMap[account.status];

    const verifiedText = Object.keys(account.verified.parts)
      .map(part => <Text key={part} style={account.verified.parts[part] ? {color: '#47b769'} : null}>{`• ${verifiedStatuses[part]} `}</Text>);

    return (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            icon: require('../../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          rightItem={[{
            text: 'Edit',
            onPress: () => this.props.navigator.push({editProfile: true})
          }]}
          style={styles.header}
          title={`${account.firstName} ${account.lastName}`}
        />
        <ScrollView>
          <ProfileProgressBar completion={0.75} />
          <CSAvatar
            style={styles.avatarContainer}
            image={require('../search/img/me.jpg')}
            firstLine={`${account.firstName} ${account.lastName}`}
            secondLine={account.location}
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
              icon={require('../search/img/references.png')}
            >
              {
                account.references.length > 0
                  ? (
                    <View style={styles.referenceCell}>
                      <View style={styles.referencesContainer}>
                        <Text style={styles.referenceText}>{`${account.references.length} References`}</Text>
                        <View style={styles.wouldStayAgainContainer}>
                          <Image style={{marginRight: 5}} source={require('./img/star.png')} />
                          <Text>{account.references.filter(r => r.wouldStayAgain === true).length}</Text>
                        </View>
                      </View>
                      <Image source={require('../../components/img/next.png')}/>
                    </View>
                  )
                  : (
                    <Text>No References</Text>
                  )
              }
            </CellWithIcon>
            <CellWithIcon
              icon={require('../search/img/references.png')}
            >
              <View>
                {/* Fix status color bug!!!! */}
                <Text style={{color: status.areaColor}}>{status.label}</Text>
                <Text style={{fontSize: 12}}>{`Response rate: ${account.responseRate}% • Active ${account.active}`}</Text>
              </View>
            </CellWithIcon>
            <CellWithIcon
              icon={require('../search/img/references.png')}
            >
              <View>
                {/* Fix status color bug!!!! */}
                <Text style={{color: status.areaColor}}>{account.verified.status}</Text>
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

export default ProfileScreen;
