import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {theme} from '@utils/theme';
import Text from '@components/Text';
import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../../config';
import Icon from 'react-native-vector-icons/dist/Ionicons';

function Manage(props) {
  const [dataPegawai, setDataPegawai] = useState([]);

  useEffect(() => {
    getDataPegawai();
  }, []);

  const getDataPegawai = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    };

    fetch(URL + '/auth/semua-pegawai', {headers})
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        setDataPegawai(responseData.result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderData = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.touchable}
      onPress={() =>
        props.navigation.navigate('Activity', {id: item.id, name: item.name})
      }>
      <Image source={{uri: URL + `/${item.avatar}`}} style={styles.image} />
      <Text size={7} color="black" type="regular" style={styles.textName}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
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
            Manage Absensi
          </Text>
        </View>
      </View>
      <FlatList
        data={dataPegawai}
        style={styles.flatlist}
        renderItem={renderData}
        numColumns={3}
      />
    </View>
  );
}

export default Manage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  touchable: {
    padding: '4%',
    flexBasis: '33%',
  },
  image: {
    height: 100,
    borderRadius: 10,
    width: 100,
    marginBottom: 5,
  },
  flatlist: {
    flex: 1,
    marginVertical: 20,
  },
  containerStatusbar: {
    paddingTop: 0,
  },
  statusbar: {
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  textTitle: {
    textAlign: 'center',
    marginRight: 30,
    flex: 1,
  },
  textName: {
    textAlign: 'center',
  },
});
