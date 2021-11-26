import React from 'react';
import {View} from 'react-native';
import {StatusBar} from 'react-native';
import WebView from 'react-native-webview';

export default ({url}: {url: string}) => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: url}}
        style={{marginTop: StatusBar.currentHeight}}
      />
    </View>
  );
};
