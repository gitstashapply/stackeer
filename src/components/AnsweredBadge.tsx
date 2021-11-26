import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {ColorPalette} from '../Themes/Colors';
import {useColors} from './common/Colors/ColorsProvider';
import {Caption} from './Text';

export default ({isAnswered}: {isAnswered: boolean}): ReactElement => {
  const {colors} = useColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isAnswered ? colors.MAIN : colors.ACCENT,
        },
      ]}>
      <Caption
        style={{
          color: colors.SECONDARY,
          fontSize: 10,
          textAlign: 'center',
        }}>
        {isAnswered ? 'ANSWERED' : 'NOT ANSWERED'}
      </Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 20,
    position: 'absolute',
    top: 20,
    right: -30,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '45deg'}],
  },
});
