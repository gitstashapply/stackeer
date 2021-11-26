import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  useSharedValue,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import AnimatedText from './AnimatedText';
import {useColors} from './common/Colors/ColorsProvider';
import {Fonts} from './Text';

export default ({badgeCount, image}: any) => {
  const animated = useSharedValue(0);
  const {colors} = useColors();

  useEffect(() => {
    if (badgeCount) {
      animated.value = withTiming(badgeCount, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
  }, [badgeCount]);

  const countText = useDerivedValue(() => {
    return String(animated.value.toFixed(0));
  });

  return (
    <View>
      <Image resizeMode={'contain'} style={styles.image} source={image} />
      <AnimatedText
        style={[styles.badgeText, {color: colors.MAIN}]}
        text={countText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 40,
  },
  badgeText: {
    alignSelf: 'center',
    fontFamily: Fonts.POPPINS_BLACK,
  },
});
