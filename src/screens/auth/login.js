import React, {useState, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {theme} from '@utils/theme';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import Text from '@components/Text';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../../config/';

export default function Login(props) {
  const [password, setPassword] = useState('');
  const [nik, setNik] = useState('');

  const handleLogin = async () => {
    let validation = [
      {name: 'NIK', value: nik},
      {name: 'Password', value: password},
    ];

    let emptyField = validation.find(field => field.value === '');

    if (!emptyField) {
      let requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          nik: nik,
          password: password,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      await fetch(URL + '/auth/login', requestOptions)
        .then(response => response.json())
        .then(async responseData => {
          if (responseData.status === 200) {
            await AsyncStorage.setItem(
              'data',
              JSON.stringify(responseData.result),
            );
            ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
            props.navigation.navigate('Home');
          } else {
            ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
          }
        })
        .catch(e => console.log(e));
    } else {
      alert(`Kolom ${emptyField.name} wajib di isi`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainerStyle}>
        <KeyboardAvoidingView
          style={{marginBottom: wp(20)}}
          keyboardVerticalOffset={20}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.title} type="bold" size={14}>
            AbsensiKu
          </Text>
          <Text style={[styles.title, {marginBottom: 32}]}>
            Silahkan masuk untuk melanjutkan
          </Text>
          <TextInput
            placeholder="Ketik NIK anda"
            onChangeText={val => setNik(val)}
            value={nik}
          />
          <TextInput
            placeholder="Ketik password anda"
            onChangeText={val => setPassword(val)}
            value={password}
            isPassword
          />
          <Button onPress={() => handleLogin()}>
            <Text color="white" type="semibold">
              Login
            </Text>
          </Button>
          <View style={[styles.row, {alignSelf: 'center'}]}>
            <Text style={styles.label}>Tidak punya akun? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Register')}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    borderBottomWidth: 2,
    borderColor: theme.colors.defaultBorderColor,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    top: 10,
  },
  title: {
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: -10,
  },
  wrapTextOR: {
    zIndex: 2,
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  wrapOR: {
    alignItems: 'center',
    height: 70,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.grey,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  logo: {alignSelf: 'center', height: wp(35), top: 10},
});
