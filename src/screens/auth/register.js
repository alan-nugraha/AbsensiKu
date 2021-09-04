import React, {useState} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {theme} from '@utils/theme';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import Text from '@components/Text';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {URL} from '../../config/';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nik, setNik] = useState('');

  const handleRegister = async () => {
    let validation = [
      {name: 'Name', value: name},
      {name: 'NIK', value: nik},
      {name: 'Email', value: email},
      {name: 'Password', value: password},
    ];

    let emptyField = validation.find(field => field.value === '');

    if (!emptyField) {
      let requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          nik: nik,
          email: email,
          password: password,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      await fetch(URL + '/auth/register', requestOptions)
        .then(response => response.json())
        .then(async responseData => {
          if (responseData.status === 200) {
            ToastAndroid.show('Register Success', ToastAndroid.SHORT);
            props.navigation.navigate('Login');
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
            Silahkan register untuk melanjutkan
          </Text>
          <TextInput
            placeholder="Ketik nama anda"
            onChangeText={val => setName(val)}
            value={name}
          />
          <TextInput
            placeholder="Ketik NIK anda"
            onChangeText={val => setNik(val)}
            value={nik}
          />
          <TextInput
            placeholder="Ketik email anda"
            onChangeText={val => setEmail(val)}
            value={email}
          />
          <TextInput
            placeholder="Ketik password anda"
            onChangeText={val => setPassword(val)}
            value={password}
            isPassword
          />
          <Button onPress={() => handleRegister()}>
            <Text color="white" type="semibold">
              Register
            </Text>
          </Button>
          <View style={[styles.row, {alignSelf: 'center'}]}>
            <Text style={styles.label}>Sudah punya akun? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default Register;

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
