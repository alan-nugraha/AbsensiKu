import React from 'react';
import {Text, Dimensions, StyleSheet} from 'react-native';
import {RFValue as fs} from 'react-native-responsive-fontsize';
const {width} = Dimensions.get('window');

const Typography = ({color, size, maxLines, children, style, type}) => {
  const TextStyles = styles[type || 'default'];

  const colors = {
    color: color || '#333333',
  };

  const sizeText = {
    fontSize: size ? fs(size, width) : fs(8, width),
  };

  return (
    <Text
      numberOfLines={maxLines}
      style={[TextStyles, colors, sizeText, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: fs(7, width),
    fontFamily: 'Jost-Regular',
  },
  thin: {
    fontSize: fs(9, width),
    fontFamily: 'Jost-Thin',
  },
  regular: {
    fontSize: fs(9, width),
    fontFamily: 'Jost-Regular',
  },
  semibold: {
    fontSize: fs(9, width),
    fontFamily: 'Jost-SemiBold',
  },
  bold: {
    fontSize: fs(9, width),
    fontFamily: 'Jost-Bold',
  },
});

export default Typography;
