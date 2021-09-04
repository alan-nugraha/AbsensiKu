import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '@utils/theme';

const CustomButton = ({onPress, loading, mode, style, children}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        {
          backgroundColor: loading
            ? theme.colors.disabled
            : theme.colors.primary,
        },
        mode && styles[mode],
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: wp(8),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.defaultBorderColor,
  },
  default: {},
  link: {
    borderWidth: 0,
    backgroundColor: theme.colors.white,
  },
  outlined: {
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
  },
});

export default CustomButton;
