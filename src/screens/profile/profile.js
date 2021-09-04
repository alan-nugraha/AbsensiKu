import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import TextInput from '@components/TextInput';
import {theme} from '@utils/theme';
import Button from '@components/Button';
import Text from '@components/Text';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {URL} from '../../config';

function Profile(props) {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [password, setPassword] = useState('');

  const getProfile = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    };

    fetch(URL + '/auth/profile', {headers})
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        setName(responseData.result.name);
        setAvatar(responseData.result.avatar);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateAccount = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    var formdata = new FormData();
    formdata.append('name', name);
    formdata.append('avatar', {
      uri: avatar,
      type: 'image/jpeg', // or photo.type
      name: 'avatar.jpg',
    });
    formdata.append('password', password);
    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    };

    axios
      .put(URL + '/auth/update-profile', formdata, {
        headers,
      })
      .then(response => {
        if (response.data.status === 200) {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          props.navigation.navigate('Home');
        } else {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => console.log(error.message));
  };

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then(value => {
        setPreviewAvatar(value.path);
        setAvatar(value.path);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.containerStatusbar}>
        <View style={styles.statusbar}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity>
          <Text
            size={10}
            color="black"
            type="semibold"
            style={styles.textTitle}>
            Profile
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={styles.buttonChoosePicture}>
            {previewAvatar ? (
              <Image
                style={styles.image}
                source={{
                  uri: previewAvatar,
                }}
              />
            ) : (
              <Image source={{uri: `${URL}/${avatar}`}} style={styles.image} />
            )}
            <View style={styles.iconCamera}>
              <Icon name="camera" size={22} color="#fff" />
            </View>
          </TouchableOpacity>
          <TextInput
            value={name}
            onChangeText={val => setName(val)}
            placeholder="Nama anda"
          />
          <TextInput
            placeholder="password anda"
            onChangeText={val => setPassword(val)}
            value={password}
            isPassword
          />
        </ScrollView>
      </View>
      <View style={styles.buttonWrapper}>
        <Button mode="default" onPress={() => updateAccount()}>
          <Text style={styles.buttonText}>SIMPAN</Text>
        </Button>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    margin: 16,
    flex: 1,
  },
  scrollView: {
    marginBottom: 100,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: 'Jost-SemiBold',
  },
  statusbar: {
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  buttonChoosePicture: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 70,
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  iconCamera: {
    position: 'absolute',
    right: -30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    top: -10,
    backgroundColor: 'rgba(91,91,91, 0.8)',
  },
  containerStatusbar: {
    paddingTop: 0,
  },
  textTitle: {
    textAlign: 'center',
    marginRight: 30,
    flex: 1,
  },
});
