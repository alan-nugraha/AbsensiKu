import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  TextStyle,
  StyleProp,
  ImageStyle,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '@utils/theme';

const CustomTextInput = ({
  placeholder,
  autoFocus,
  isNumber,
  isPassword,
  onChangeText,
  type,
  style,
  icon,
  value,
  ...props
}) => {
  const [state, setState] = useState({
    hide: true,
  });

  const dynamicStyle = {
    paddingLeft: icon ? 60 : 25,
    borderColor: theme.colors.defaultBorderColor,
  };

  // const borderColor = state.focus && !props.errorText ? {borderColor: theme.colors.primary} : {}
  return (
    <View style={styles.container}>
      <View style={styles.wrapInput}>
        <TextInput
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          style={[styles.input, dynamicStyle, styles[type || 'default'], style]}
          keyboardType={isNumber ? 'phone-pad' : 'default'}
          secureTextEntry={isPassword ? state.hide : false}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setState({...state, hide: !state.hide})}
            style={styles.hideButton}>
            <Feather
              color={theme.colors.grey}
              name={state.hide ? 'eye-off' : 'eye'}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* {props.errorText ? <Text style={styles.error}>{props.errorText}</Text> : null} */}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderColor: theme.colors.defaultBorderColor,
    backgroundColor: theme.colors.white,
    fontFamily: 'Jost-Regular',
    color: theme.colors.black,
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 13,
    height: 50,
    flex: 1,
  },
  wrapInput: {flexDirection: 'row'},
  error: {
    color: theme.colors.error,
    paddingHorizontal: 4,
    fontSize: 14,
    paddingTop: 4,
  },
  wrapIcon: {
    zIndex: 5,
    elevation: 5,
  },
  icon: {
    zIndex: 5,
    position: 'absolute',
    resizeMode: 'contain',
    width: 35,
    height: 26,
    left: 17,
    top: 15,
    bottom: 8,
  },
  round: {
    borderRadius: 25,
  },
  default: {
    borderRadius: 10,
  },
  hideButton: {position: 'absolute', right: 18, top: 14},
});
