import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {ItemsEntity} from '../services/types';
import {ColorPalette} from '../Themes/Colors';
import UserCard from './UserCard';

interface Props {
  userData: ItemsEntity;
}

Animated.addWhitelistedNativeProps({text: true});

export default ({userData}: Props) => {
  return (
    <Animated.View entering={ZoomIn} style={[styles.container]}>
      <UserCard user={userData} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '30%',
    backgroundColor: ColorPalette.SECONDARY,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 24,
  },
});
