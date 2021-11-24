import React, {createRef} from 'react';
import {
  View,
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
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default () => {
  const animatedValue = useSharedValue(0);
  const inputRef = createRef<TextInput>();

  const animatedStylesContainer = useAnimatedStyle(() => {
    return {
      width: withSpring(animatedValue.value === 0 ? 70 : width * 0.8),
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSearchBtnPress}>
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
            onChangeText={() => {}}
            selectionColor={'white'}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
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
    backgroundColor: 'black',
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
