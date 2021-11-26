import React, {ReactChild} from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {ColorPalette} from '../Themes/Colors';
import {useColors} from './common/Colors/ColorsProvider';

export enum Fonts {
  POPPINS_BLACK = 'Poppins-Bold',
  POPPINS_REGULAR = 'Poppins-Regular',
  POPPINS_THIN = 'Poppins-Medium',
}

type Props = TextProps & {
  children: ReactChild;
};

export const Title = (props: Props) => {
  const {colors} = useColors();

  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: Fonts.POPPINS_BLACK,
          fontSize: 24,
          color: colors.SECONDARY,
        },
        props.style,
      ]}>
      {props.children}
    </RNText>
  );
};

export const Text = (props: Props) => {
  const {colors} = useColors();

  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: Fonts.POPPINS_REGULAR,
          fontSize: 16,
          color: colors.SECONDARY,
        },
        props.style,
      ]}>
      {props.children}
    </RNText>
  );
};

export const Caption = (props: Props) => {
  const {colors} = useColors();

  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: Fonts.POPPINS_THIN,
          fontSize: 14,
          color: colors.CAPTION,
        },
        props.style,
      ]}>
      {props.children}
    </RNText>
  );
};
