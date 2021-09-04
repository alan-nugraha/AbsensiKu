import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '@components/Text';
import {theme} from '@utils/theme';
import AsyncStorage from '@react-native-community/async-storage';

function Splash(props) {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
  });

  const checkLogin = async () => {
    let value = await AsyncStorage.getItem('data');
    if (value != null) {
      props.navigation.replace('Home');
    } else {
      props.navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text type="bold" size={20} color="white" style={styles.title}>
        AbsensiKu
      </Text>
      <Text type="semibold" size={9} color="white" style={styles.quotes}>
        Always work had on something uncomfortably exciting
      </Text>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  quotes: {
    textAlign: 'center',
    padding: '5%',
  },
});
