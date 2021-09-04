import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Text from '@components/Text';
import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../../config';
import {theme} from '@utils/theme';

function Activity(props) {
  const id = props.route.params.id;
  const name = props.route.params.name;

  const [historyAbsensi, setHistoryAbsensi] = useState([]);

  useEffect(() => {
    getDataHistory();
  }, []);

  const getDataHistory = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    };

    fetch(URL + `/absensi/cek-history/${id}`, {headers})
      .then(response => response.json())
      .then(responseData => {
        console.log('responseData', responseData);
        setHistoryAbsensi(responseData.result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderHistory = ({item}) => (
    <>
      <View style={styles.containerFlatList}>
        <Text type="semibold" size={9}>
          {name}
        </Text>
        <Text type="regular" size={8}>
          Masuk: {item.masuk}
        </Text>
        <Text type="regular" size={8}>
          Pulang: {item.masuk}
        </Text>
        <Text type="regular" size={8}>
          Keterlambatan: {item.keterlambatan}
        </Text>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#D5D5D5',
          marginVertical: 10,
        }}
      />
    </>
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
            History Absensi
          </Text>
        </View>
      </View>
      <FlatList
        data={historyAbsensi}
        renderItem={renderHistory}
        ListEmptyComponent={
          <View style={styles.emptyComponent}>
            <Image
              style={styles.image}
              source={require('@assets/icons/empty_store.png')}
            />
            <Text type="semibold" style={styles.textUps}>
              Ups!
            </Text>
            <Text type="semibold" style={styles.textEmpty}>
              Belum ada history absensi
            </Text>
          </View>
        }
      />
    </View>
  );
}

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  containerFlatList: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 5,
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
  emptyComponent: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    resizeMode: 'contain',
    width: '30%',
    height: 100,
  },
  textUps: {
    marginTop: 20,
  },
  textEmpty: {
    textAlign: 'center',
    width: 200,
  },
});
