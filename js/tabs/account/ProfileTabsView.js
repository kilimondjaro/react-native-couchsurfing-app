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
      photoAlbums: [
        {
          title: 'Profile Photos',
          photos: [1,2,3]
        },
        {
          title: 'Couch Photos',
          photos: []
        }
      ]
    }
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'black', height: 3}}
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
        return <View style={[ {flex: 1, height: 300}, { backgroundColor: '#ff4081' } ]} />;
      case 'myHome':
        return <View style={[ {flex: 1, height: 300}, { backgroundColor: '#673ab7' } ]} />;
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
