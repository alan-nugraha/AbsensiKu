import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Text from '@components/Text';
import Button from '@components/Button';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {theme} from '@utils/theme';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {URL} from '../../config';

function Absensi(props) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    getProfile();
  });

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
        setName(responseData.result.name);
        setAvatar(responseData.result.avatar);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleAbsenMasuk = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    console.log(data.token);

    // method: 'POST',
    let headers = {
      Authorization: `Bearer ${data.token}`,
    };

    axios
      .post(URL + '/absensi/masuk', {}, {headers})
      .then(response => {
        AsyncStorage.setItem(
          '@token_absen',
          response.data.result[0].tokenAbsen,
        );
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      })
      .catch(error => console.log(error));
  };

  const handleAbsenPulang = async () => {
    const value = await AsyncStorage.getItem('@token_absen');
    console.log(value);

    let headers = {
      Authorization: `Bearer ${value}`,
    };

    axios
      .put(URL + '/absensi/pulang', {}, {headers})
      .then(response => {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      })
      .catch(error => console.log(error, 'pulang'));
  };

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
            style={styles.textTItle}>
            Absensi {props.route.params.title}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={{uri: `${URL}/${avatar}`}} />
          </View>
          <Text size={10} style={styles.text}>
            Anda Terdeteksi sebagai {name}, silahkan melanjutkan untuk proses
            absensi
          </Text>
        </ScrollView>
      </View>
      <View style={styles.buttonWrapper}>
        {props.route.params.title === 'Masuk' ? (
          <Button mode="default" onPress={() => handleAbsenMasuk()}>
            <Text style={styles.buttonText}>MASUK</Text>
          </Button>
        ) : (
          <Button mode="default" onPress={() => handleAbsenPulang()}>
            <Text style={styles.buttonText}>PULANG</Text>
          </Button>
        )}
      </View>
    </View>
  );
}

export default Absensi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  statusbar: {
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
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
  containerStatusbar: {
    paddingTop: 0,
  },
  textTItle: {
    textAlign: 'center',
    marginRight: 30,
    flex: 1,
  },
  containerImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 150,
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
  },
});
