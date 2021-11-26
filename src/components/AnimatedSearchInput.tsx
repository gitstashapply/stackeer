import React, {createRef, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {ColorPalette} from '../Themes/Colors';

const {width} = Dimensions.get('screen');

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface AnimatedInputProps {
  onChange: (value: string) => void;
  inputValue: string;
  isValid: boolean;
  handleSubmit: () => void;
}

export default ({
  onChange,
  inputValue,
  isValid,
  handleSubmit,
}: AnimatedInputProps) => {
  const animatedValue = useSharedValue(0);
  const translationAnimation = useSharedValue(0);
  const validationAnimatedValue = useSharedValue<number | string>(
    ColorPalette.SECONDARY,
  );

  const inputRef = createRef<TextInput>();

  useEffect(() => {
    setValidationAnimatedValue();
  }, [isValid, inputValue]);

  const setValidationAnimatedValue = () => {
    validationAnimatedValue.value = withTiming(ColorPalette.SECONDARY, {
      duration: 250,
    });
  };

  const animatedStylesContainer = useAnimatedStyle(() => {
    return {
      width: withSpring(animatedValue.value === 0 ? 70 : width * 0.87),
      backgroundColor: validationAnimatedValue.value,
    };
  });

  const searchIconAnimatedStyles = useAnimatedStyle(() => {
    return {
      marginHorizontal: animatedValue.value ? 12 : 0,
    };
  });

  const textInputAnimatedStyles = useAnimatedStyle(() => {
    return {
      width: withSpring(animatedValue.value ? width * 0.6 : 0),
      height: withSpring(animatedValue.value ? 40 : 0),
      padding: animatedValue.value ? 10 : 0,
      alignSelf: 'flex-end',
    };
  });

  const onSearchBtnPress = () => {
    animatedValue.value = animatedValue.value ? 0 : 1;
    inputRef.current?.focus();
  };

  const handlePress = () => {
    if (isValid) {
      handleSubmit();
    } else {
      onSearchBtnPress();
    }
  };

  return (
    <TouchableOpacity
      disabled={!isValid && !!animatedValue.value}
      onPress={handlePress}>
      <Animated.View style={[animatedStylesContainer, styles.btnContainer]}>
        <AnimatedIcon
          style={searchIconAnimatedStyles}
          size={40}
          name={'search'}
          color={ColorPalette.CAPTION}
        />
        <AnimatedTextInput
          ref={inputRef}
          style={[textInputAnimatedStyles, styles.input]}
          onChangeText={onChange}
          value={inputValue}
          selectionColor={ColorPalette.MAIN}
          keyboardType="numeric"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
  },
  input: {
    // position: 'absolute',
    alignSelf: 'center',
    color: ColorPalette.MAIN,
  },
});
