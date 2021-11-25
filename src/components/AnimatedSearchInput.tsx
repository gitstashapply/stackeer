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
  const inputRef = createRef<TextInput>();

  const validationAnimatedValue = useSharedValue<number | string>('black');

  const setValidationAnimatedValue = () => {
    console.log(validationAnimatedValue, isValid);
    if (isValid) {
      validationAnimatedValue.value = withTiming('green', {duration: 250});
    } else if (!isValid && !!!inputValue) {
      validationAnimatedValue.value = withTiming('black', {duration: 250});
    } else {
      validationAnimatedValue.value = withTiming('red', {duration: 250});
    }
  };

  useEffect(() => {
    setValidationAnimatedValue();
  }, [isValid, inputValue]);

  const animatedStylesContainer = useAnimatedStyle(() => {
    return {
      width: withSpring(animatedValue.value === 0 ? 70 : width * 0.8),
      backgroundColor: validationAnimatedValue.value,
    };
  });

  const searchIconAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(
            animatedValue.value ? -((width * 0.8) / 3) : 0,
          ),
        },
      ],
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
          color={'white'}
        />
        <AnimatedTextInput
          ref={inputRef}
          style={[textInputAnimatedStyles, styles.input]}
          onChangeText={onChange}
          value={inputValue}
          selectionColor={'white'}
          placeholder="useless placeholder"
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
  },
  input: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
  },
});
