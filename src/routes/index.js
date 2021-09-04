import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Register} from '@screens/auth';
import {Setting, Profile} from '@screens/profile';
import {Home, Absensi} from '@screens/home';
import {Manage, Activity, TrackAbsensi} from '@screens/manage';
import Splash from '@screens/splash';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Activity"
        component={Activity}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Absensi"
        component={Absensi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Manage"
        component={Manage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TrackAbsensi"
        component={TrackAbsensi}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Routes;
