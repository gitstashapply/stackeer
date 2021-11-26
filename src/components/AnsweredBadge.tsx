import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {ColorPalette} from '../Themes/Colors';
import {Caption} from './Text';

export default ({isAnswered}: {isAnswered: boolean}): ReactElement => {
  return (
    <View
      style={{
        width: 120,
        height: 20,
        position: 'absolute',
        top: 20,
        right: -30,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{rotate: '45deg'}],
        backgroundColor: isAnswered ? ColorPalette.MAIN : ColorPalette.ACCENT,
      }}>
      <Caption
        style={{
          color: ColorPalette.SECONDARY,
          fontSize: 10,
          textAlign: 'center',
        }}>
        {isAnswered ? 'ANSWERED' : 'NOT ANSWERED'}
      </Caption>
    </View>
  );
};
