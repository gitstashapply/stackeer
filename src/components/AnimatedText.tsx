import React, {ComponentType, RefAttributes} from 'react';
import {TextInput} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {AnimateProps} from 'react-native-reanimated';
import {TextInputProps} from 'react-native';
import {Fonts} from './Text';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type AnimatedTextInputProps = TextInputProps & {
  text: any;
};

const AnimatedText = (props: AnimatedTextInputProps) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: props.text.value,
    };
  });

  return (
    <AnimatedTextInput
      {...props}
      style={[{fontFamily: Fonts.POPPINS_THIN}, props.style]}
      underlineColorAndroid="transparent"
      editable={false}
      value={props.text.value}
      //@ts-ignore known propblem of reanimated typings
      animatedProps={animatedProps}
    />
  );
};

export default AnimatedText;
