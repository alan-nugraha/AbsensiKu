import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Text from '@components/Text';
import {theme} from '@utils/theme';
import Button from '@components/Button';
import BottomTab from '@components/BottomTab';
import moment from 'moment';

function Home(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.containerHome}>
        <Text size={20} color="white" type="semibold" style={styles.textCenter}>
          {moment().format('h:mm')}
        </Text>
        <Text size={9} color="white" type="regular" style={styles.textCenter}>
          {moment().format('dddd, D MMMM YYYY')}
        </Text>
        <Text size={9} color="white" type="regular" style={styles.greeting}>
          Selamat Datang di Aplikasi AbsensiKu Silahkan Check-in sebelum anda
          masuk dan pulang bekerja
        </Text>
      </View>
      <View style={styles.containerButton}>
        <Button
          onPress={() =>
            props.navigation.navigate('Absensi', {title: 'Masuk'})
          }>
          <Text color="white">Masuk</Text>
        </Button>
        <Button
          onPress={() =>
            props.navigation.navigate('Absensi', {title: 'Pulang'})
          }>
          <Text color="white">Pulang</Text>
        </Button>
      </View>
      <BottomTab screen="Home" />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  containerHome: {
    flex: 1 / 2,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  greeting: {
    textAlign: 'center',
    marginTop: 90,
    paddingHorizontal: '5%',
  },
  containerButton: {
    padding: 32,
  },
});
