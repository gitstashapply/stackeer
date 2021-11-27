import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {Layout, ZoomIn} from 'react-native-reanimated';
import {ItemsEntity} from '../services/types';
import {useColors} from './common/Colors/ColorsProvider';
import UserCard from './UserCard';

interface Props {
  userData: ItemsEntity;
}

Animated.addWhitelistedNativeProps({text: true});

export default ({userData}: Props) => {
  const {colors} = useColors();

  return (
    <Animated.View
      entering={ZoomIn}
      layout={Layout.springify()}
      style={[styles.container, {backgroundColor: colors.SECONDARY}]}>
      <UserCard user={userData} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    // height: '30%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 24,
  },
});
