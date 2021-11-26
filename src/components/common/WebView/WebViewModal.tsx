import React, {useContext} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SCREEN_HEIGHT} from '../../../helpers/screenHelpers';
import {ColorPalette} from '../../../Themes/Colors';
import {Text} from '../../Text';
import WebView from './WebView';
import {WebViewModalContext} from './WebViewModalProvider';

export default () => {
  const {isModalOpened, url, handleClose} = useContext(WebViewModalContext);

  if (!isModalOpened) {
    return <View />;
  }

  return (
    <Modal
      onRequestClose={handleClose}
      animationType={'fade'}
      visible={isModalOpened}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.btnWrapper}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={{color: 'white'}}>Close</Text>
            </TouchableOpacity>
          </View>
          {<WebView url={url} />}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.MAIN,
  },
  btnWrapper: {
    height: SCREEN_HEIGHT * 0.07,
    justifyContent: 'center',
    marginLeft: 16,
  },
});
