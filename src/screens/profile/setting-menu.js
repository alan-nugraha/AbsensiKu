import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BottomTab from '@components/BottomTab';
import {theme} from '@utils/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import BackIcon from 'react-native-vector-icons/dist/Ionicons';
import Text from '@components/Text';
import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../../config';
import {CommonActions} from '@react-navigation/native';

function Setting(props) {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [roles, setRoles] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    console.log('data token', data.token);

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
        setRoles(responseData.result.roles);
        setEmail(responseData.result.email);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('data');
    await AsyncStorage.removeItem('@token_absen');

    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'Login'},
          {
            name: 'Login',
          },
        ],
      }),
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.containerHeader}>
        <View style={styles.statusbar}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <BackIcon name="arrow-back" size={30} />
          </TouchableOpacity>
          <Text
            size={10}
            color="black"
            type="semibold"
            style={styles.titleHeader}>
            Setting
          </Text>
        </View>
      </View>
      <View style={styles.containerProfile}>
        <View>
          <Image source={{uri: `${URL}/${avatar}`}} style={styles.profile} />
        </View>
        <View>
          <Text size={10} type="semibold">
            {name}
          </Text>
          <Text size={8} type="regular" style={styles.textCapitalize}>
            {roles}
          </Text>
          <Text size={9} type="regular">
            {email}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.menuList}
        onPress={() => navigation.navigate('Profile')}>
        <Text size={9} type="regular">
          Profile
        </Text>
        <Icon
          name="right"
          size={18}
          color={theme.colors.blackSemiTransparent}
        />
      </TouchableOpacity>
      {roles === 'manager' && (
        <TouchableOpacity
          style={styles.menuList}
          onPress={() => navigation.navigate('Manage')}>
          <Text size={9} type="regular">
            Activity
          </Text>
          <Icon
            name="right"
            size={18}
            color={theme.colors.blackSemiTransparent}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.menuList}
        onPress={() => navigation.navigate('TrackAbsensi')}>
        <Text size={9} type="regular">
          Track Absensi
        </Text>
        <Icon
          name="right"
          size={18}
          color={theme.colors.blackSemiTransparent}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuList} onPress={() => setModal(true)}>
        <Text size={9} type="regular">
          Logout
        </Text>
        <Icon
          name="right"
          size={18}
          color={theme.colors.blackSemiTransparent}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        statusBarTranslucent
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text size={8}>Apakah anda yakin untuk logout?</Text>
            <View style={styles.modalRow}>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => handleLogout()}>
                <Text size={7} color="white" type="regular">
                  Ya
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{
                  ...styles.buttonModal,
                  backgroundColor: theme.colors.red,
                }}>
                <Text size={7} color="white" type="regular">
                  Tidak
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BottomTab screen="Setting" />
    </View>
  );
}

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  menuList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerProfile: {
    padding: 16,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 20,
  },
  statusbar: {
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  titleHeader: {
    textAlign: 'center',
    marginRight: 30,
    flex: 1,
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonModal: {
    backgroundColor: theme.colors.primary,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 20,
  },
  containerHeader: {
    paddingTop: 0,
  },
});
