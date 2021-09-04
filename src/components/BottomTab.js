/* eslint-disable */

import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function BottomTab(props) {
  const navigation = useNavigation();
  return (
    <View style={{bottom: 0, position: 'absolute', width: '100%'}}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.bottomMenu}
          onPress={() => navigation.navigate('Home')}>
          <Image
            style={{
              ...styles.icon,
              tintColor: props.screen === 'Home' ? '#14274E' : '#999999',
            }}
            source={require('@assets/icons/ic_homebar.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomMenu}
          onPress={() => navigation.navigate('Setting')}>
          <Image
            style={{
              ...styles.icon,
              tintColor: props.screen === 'Setting' ? '#14274E' : '#999999',
            }}
            source={require('@assets/icons/ic_profilebar.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0967CF',
    flex: 1,
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  bottomMenu: {
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  bottomCircle: {
    backgroundColor: '#0967CF',
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
