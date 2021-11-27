import React from 'react';
import {StyleSheet} from 'react-native';
import {TextButton} from './common/Button';
import {useColors} from './common/Colors/ColorsProvider';

export default () => {
  const {changeMode} = useColors();

  return (
    <TextButton
      testID={'changeColorBtn'}
      style={styles.continer}
      text={'PRESS ME TO CHANGE COLOR MODE'}
      onPress={changeMode}
    />
  );
};

const styles = StyleSheet.create({
  continer: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },
});
