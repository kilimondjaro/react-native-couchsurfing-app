// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Navigator
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import CSAvatar from '../../components/CSAvatar';
import CSInputList from '../../components/CSInputList';
import MyHomeView from './MyHomeView';
import AboutView from './AboutView';

function PhotosCell(props) {
  const count = props.album.photos.length;
  const title = props.album.title;

  return (
    <TouchableHighlight
      underlayColor="gray"
      onPress={props.onPress}
    >
      <View style={styles.photosCellContainer}>
        <View style={styles.photosCellPicture}>
          <Image
            style={{tintColor: '#bfcad2'}}
            source={count > 0 ? null : require('../../components/img/blank_picture.png')}
          />
        </View>
        <View style={styles.photosCellContent}>
          <Text style={styles.photosCellTitle}>{title}</Text>
          <Text style={styles.photosCellSubtitle}>{`${count} Photo${count > 1 ? 's' : ''}`}</Text>
        </View>
        <View style={styles.photosCellNext}>
          <Image source={require('../../components/img/next.png')}/>
        </View>
      </View>
    </TouchableHighlight>
  );
}

type Props = {
  account: {
    [name: string]: any;
  }
}

type State = {
  index: number;
  routes: Array<{key: string; title: string}>;
}

class ProfileTabsView extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'about', title: 'About' },
        { key: 'myHome', title: 'My Home' },
        { key: 'photos', title: 'Photos' }
      ]
    };
  }

  static defaultProps = {
    account: {
      firstName: 'Kirill',
      lastName: 'Babich',
      gender: 'male',
      age: 20,
      createdAt: new Date(),
      friends: [],
      location: 'Moscow, Moscow, Russian Federation',
      photoAlbums: [
        {
          title: 'Profile Photos',
          photos: [1,2,3]
        },
        {
          title: 'Couch Photos',
          photos: []
        }
      ],
      maxGuests: 1,
      preferredGender: 'Any',
      sameDayRequests: true,
      smokingAllowed: true,
      kidFriendly: false,
      petFriendly: true,
      languagesImFluentIn: ['Russian', 'English'],
      sleepingArrengements: 'Shared Room',
      petsAtHome: false,
      kidsAtHome: false,
      smoker: false,
      wheelchairAccessible: false,
      publicTransit: null,
      descriptionOfSleepingArrengements: null,
      roommateSituation: null,
      whatYouCanShareWithGuests: null,
      additionalInformation: 'My home is located near the center of the city.',
      aboutMe: 'I\'m a Russian student from Moscow.',
      experience: {
        hosted: [{reference: 'Nice guy!', star: true}],
        stayedWith: [{reference: 'Nice guy!', star: true}]
      },
      interests: ['guitar', 'music', 'The Beatles', 'Photography', 'Traveling'],
      interestsDescription: 'I like playing guitar'
    }
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'black', height: 4}}
        labelStyle={{color: '#bfcad1'}}
        tabStyle={{height: 40, borderBottomWidth: 1, borderBottomColor: '#bfcad1'}}
      />);
  };

  _renderScene = ({ route }) => {
    const {photoAlbums} = this.props.account;

    const photosView = (
      <View>
        <CSInputList
          separatorStyle={{marginLeft: 0}}
        >
          {
            photoAlbums.map((album, i) =>
              <PhotosCell
                key={i}
                onPress={() => {}}
                album={album}/>
              )
          }
        </CSInputList>
      </View>
    );

    switch (route.key) {
      case 'about':
        return <AboutView account={this.props.account} />;
      case 'myHome':
        return <MyHomeView account={this.props.account}/>;
      case 'photos':
        return photosView;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photosCellContainer: {
    height: 80,
    flexDirection: 'row'
  },
  photosCellContent: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 10
  },
  photosCellTitle: {
    fontSize: 18
  },
  photosCellSubtitle: {
    fontSize: 14
  },
  photosCellNext: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photosCellPicture: {
    width: 80,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ProfileTabsView;
