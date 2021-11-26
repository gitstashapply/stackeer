import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ColorPalette} from '../Themes/Colors';
import {useColors} from './common/Colors/ColorsProvider';
import WebViewModal from './common/WebView/WebViewModal';
import {
  useWebViewModal,
  WebViewModalContext,
} from './common/WebView/WebViewModalProvider';
import {Title} from './Text';

export default () => {
  const {handleOpen} = useContext(WebViewModalContext);
  const {colors} = useColors();

  const openWebView = () => {
    handleOpen(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
    );
  };

  console.log(colors.MAIN);

  return (
    <View style={{padding: 20, flex: 0, backgroundColor: colors.MAIN}}>
      <Title style={{fontSize: 52, color: colors.SECONDARY}}>STACKEER</Title>
      <Title style={{fontSize: 36, color: colors.SECONDARY}}>
        ITS VERY IMPORTANT APP
      </Title>
      <TouchableOpacity onPress={openWebView}>
        <Title
          style={{
            fontSize: 24,
            color: colors.SECONDARY,
            textDecorationLine: 'underline',
          }}>
          ABOUT US
        </Title>
      </TouchableOpacity>
    </View>
  );
};
