import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {View, Text as RNText} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useColors} from './common/Colors/ColorsProvider';
import {WebViewModalContext} from './common/WebView/WebViewModalProvider';
import {Title} from './Text';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTitle = Animated.createAnimatedComponent(RNText);

export default () => {
  const {colors} = useColors();

  const animation = useSharedValue<string | number>('#fff');

  const [rv, setRv] = useState(Math.random());

  const flashTitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: animation.value,
    };
  });

  useEffect(() => {
    animation.value = withRepeat(
      withSequence(
        withTiming(colors.SECONDARY, {duration: 100}),
        withDelay(rv * 20 * 150, withTiming(colors.BLACK, {duration: 100})),
      ),
      1,
      false,
      () => {
        runOnJS(setRv)(Math.random());
      },
    );
  }, [rv]);

  const {handleOpen} = useContext(WebViewModalContext);

  const openWebView = () => {
    handleOpen(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
    );
  };

  return (
    <View style={{padding: 20, flex: 0, backgroundColor: colors.MAIN}}>
      <View style={{flexDirection: 'row'}}>
        <Title style={{fontSize: 52, color: colors.SECONDARY}}>STACK</Title>
        <Title style={{fontSize: 52, color: colors.SECONDARY}}>
          <AnimatedTitle style={flashTitleAnimatedStyle}>{'EER'}</AnimatedTitle>
        </Title>
      </View>
      <Title style={[{fontSize: 36}]}>ITS VERY IMPORTANT APP</Title>
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
