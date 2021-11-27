import React, {ReactElement} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Text} from '../Text';

export const TextButton = (
  props: {
    text: string | ReactElement;
    onPress: () => void;
  } & TouchableOpacityProps,
) => {
  const {text, onPress} = props;

  return (
    <TouchableOpacity testID={'textBtn'} {...props} onPress={onPress}>
      <Text testID={'textBtnText'} style={{textDecorationLine: 'underline'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
