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
import {StatusBar} from 'react-native';
import MainScreen from './src/screens/MainScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import WebViewModalProvider from './src/components/common/WebView/WebViewModalProvider';
import {ColorsProvider} from './src/components/common/Colors/ColorsProvider';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Can']); // there is a reason for it, don't worry I know what I'm doing. I will not break anything. Everyone secured! I'm promise. Really. Please contact me if you read this comment. Cause it means you looking my code. And its cool. Cheers! Bye!

Icon.loadFont();

const App = () => {
  return (
    <ColorsProvider>
      <>
        <StatusBar barStyle={'default'} />
        <WebViewModalProvider>
          <MainScreen />
        </WebViewModalProvider>
      </>
    </ColorsProvider>
  );
};

export default App;
