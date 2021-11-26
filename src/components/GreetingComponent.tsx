import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ColorPalette} from '../Themes/Colors';
import WebViewModal from './common/WebView/WebViewModal';
import {
  useWebViewModal,
  WebViewModalContext,
} from './common/WebView/WebViewModalProvider';
import {Title} from './Text';

export default () => {
  const {handleOpen} = useContext(WebViewModalContext);

  const openWebView = () => {
    handleOpen(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
    );
  };

  return (
    <View style={{padding: 20, flex: 0}}>
      <Title style={{fontSize: 52, color: 'white'}}>STACKEER</Title>
      <Title style={{fontSize: 36, color: ColorPalette.SECONDARY}}>
        ITS VERY IMPORTANT APP
      </Title>
      <TouchableOpacity onPress={openWebView}>
        <Title
          style={{
            fontSize: 24,
            color: 'white',
            textDecorationLine: 'underline',
          }}>
          ABOUT US
        </Title>
      </TouchableOpacity>
    </View>
  );
};
