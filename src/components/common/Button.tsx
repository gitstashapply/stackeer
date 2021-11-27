import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../Text';

export const TextButton = (props: any) => {
  const {text, onPress} = props;

  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <Text style={{textDecorationLine: 'underline'}}>{text}</Text>
    </TouchableOpacity>
  );
};
