/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import MainScreen from './src/screens/MainScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ColorPalette} from './src/Themes/Colors';
import WebViewModalProvider from './src/components/common/WebView/WebViewModalProvider';
import {View} from 'react-native';

Icon.loadFont();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorPalette.MAIN}}>
      <View style={{flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <WebViewModalProvider>
          <MainScreen />
        </WebViewModalProvider>
      </View>
    </SafeAreaView>
  );
};

export default App;
