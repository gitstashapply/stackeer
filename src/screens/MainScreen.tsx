import React, {useEffect, useState} from 'react';
import {InteractionManager, SafeAreaView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import Animated, {
  Layout,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutUp,
} from 'react-native-reanimated';
import AnimatedSearchInput from '../components/AnimatedSearchInput';
import AnimatedUserCard from '../components/AnimatedUserCard';
import {TextButton} from '../components/common/Button';
import {useColors} from '../components/common/Colors/ColorsProvider';
import GreetingComponent from '../components/GreetingComponent';
import QuestionsSection from '../components/QuestionsSection';
import {Title} from '../components/Text';
import ThemeBtn from '../components/ThemeBtn';
import {isNumber} from '../helpers/inputHelpers';
import {getUserById} from '../services/apiService';
import {ItemsEntity} from '../services/types';

export default () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isInputValid, setInputValid] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [userData, setUserData] = useState<ItemsEntity | null>(null);

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  const {colors} = useColors();

  const handleReset = () => {
    setReset(true);
    setUserData(null);
    setInputValid(true);
    setInputValue('');
  };

  useEffect(() => {
    if (isNumber(inputValue)) {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [inputValue]);

  const onSubmit = async () => {
    setReset(false);
    const user = (await getUserById(parseInt(inputValue))) as
      | ItemsEntity
      | {error: true};
    //@ts-ignore
    if (!user || user.error) {
      setError(true);
      return;
    }

    InteractionManager.runAfterInteractions(() => {
      setError(false);
      setUserData(user as ItemsEntity);
    });
  };

  return (
    <SafeAreaView style={[styles.flex, {backgroundColor: colors.MAIN}]}>
      <View style={styles.flex}>
        {!userData && (
          <Animated.View
            entering={SlideInUp}
            layout={Layout.springify()}
            exiting={SlideOutUp}>
            <GreetingComponent />
          </Animated.View>
        )}
        <Animated.View
          style={styles.btnContainer}
          entering={SlideInLeft}
          layout={Layout.springify()}
          exiting={SlideOutUp}>
          <ThemeBtn />
          {userData && (
            <TextButton
              onPress={handleReset}
              text={'OMG! WANNA SEE IT AGAIN'}
            />
          )}
        </Animated.View>
        <Animated.View
          entering={SlideInRight}
          layout={Layout.springify()}
          exiting={SlideOutUp}
          style={[styles.container, {backgroundColor: colors.MAIN}]}>
          <AnimatedSearchInput
            reset={reset}
            handleSubmit={onSubmit}
            isValid={isInputValid}
            inputValue={inputValue}
            onChange={onInputChange}
          />
        </Animated.View>
        {error && (
          <Title style={[styles.errorText, {color: colors.ACCENT}]}>
            UH OH, SOMETHING WENT WRONG
          </Title>
        )}
        {userData && <AnimatedUserCard userData={userData} />}
        {userData && <QuestionsSection userId={userData?.user_id} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  questionsContainer: {
    paddingVertical: 24,
  },
  errorText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
