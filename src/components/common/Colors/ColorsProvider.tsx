import React, {useContext, useState} from 'react';
import {ReactChild} from 'react';
import {Appearance} from 'react-native';

export enum ColorPaletteDark {
  MAIN = '#ef8236',
  SECONDARY = '#FBF7F4',
  ACCENT = '#E71313',
  CAPTION = '#EF8236',
  GRAY = '#808080',
  BLACK = '#000',
}

export enum ColorPaletteLight {
  MAIN = '#FBF7F4',
  SECONDARY = '#ef8236',
  ACCENT = '#E71313',
  CAPTION = '#FBF7F4',
  GRAY = '#FBF7F4',
  BLACK = '#000',
}

export const _useColors = () => {
  const appearence = Appearance.getColorScheme();

  const [isDarkMode, setAppearenceMode] = useState(appearence === 'dark');

  const changeMode = () => {
    if (isDarkMode) {
      setAppearenceMode(false);
    } else {
      setAppearenceMode(true);
    }
  };

  let colors;

  if (!isDarkMode) {
    colors = ColorPaletteDark;
  } else {
    colors = ColorPaletteLight;
  }

  return {colors, changeMode};
};

const initialValues = {
  colors: ColorPaletteLight,
  changeMode: () => {},
};
export const ColorsContext =
  React.createContext<typeof initialValues>(initialValues);

export const ColorsProvider = ({children}: {children: ReactChild}) => {
  const {colors, changeMode} = _useColors();

  return (
    // @ts-ignore
    <ColorsContext.Provider value={{colors, changeMode}}>
      {children}
    </ColorsContext.Provider>
  );
};

export const useColors = () => useContext(ColorsContext);
