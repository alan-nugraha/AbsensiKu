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

function Track(props) {
  const [history, setHistory] = useState([]);

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

    fetch(URL + '/absensi/history-pribadi', {headers})
      .then(response => response.json())
      .then(responseData => {
        setHistory(responseData.result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderHistory = ({item}) => (
    <>
      <View style={styles.containerFlatList}>
        <Text type="semibold" size={9}>
          {item.name}
        </Text>
        <Text type="regular" size={8}>
          Masuk: {item.masuk}
        </Text>
        <Text type="regular" size={8}>
          Pulang: {item.pulang}
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
            Tracking Absensi
          </Text>
        </View>
      </View>
      <FlatList
        data={history}
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

export default Track;

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
