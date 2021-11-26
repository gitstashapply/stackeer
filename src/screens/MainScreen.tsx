import React, {useEffect, useState} from 'react';
import {InteractionManager} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  LightSpeedInRight,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import AnimatedSearchInput from '../components/AnimatedSearchInput';
import AnimatedUserCard from '../components/AnimatedUserCard';
import GreetingComponent from '../components/GreetingComponent';
import QuestionCard from '../components/QuestionCard';
import {Text, Title} from '../components/Text';
import {isNumber} from '../helpers/inputHelpers';
import {SCREEN_HEIGHT, SCRREN_WIDTH} from '../helpers/screenHelpers';
import {getQuestionsByUserId, getUserById} from '../services/apiService';
import {ItemQuestions, ItemsEntity} from '../services/types';
import {ColorPalette} from '../Themes/Colors';

export default () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isInputValid, setInputValid] = useState<boolean>(false);

  const [userData, setUserData] = useState<ItemsEntity | null>(null);
  const [questonsData, setQuestonsData] = useState<ItemQuestions[] | null>(
    null,
  );

  const animation = useSharedValue(0);

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (isNumber(inputValue)) {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [inputValue]);

  const onSubmit = async () => {
    const user = await getUserById(parseInt(inputValue));

    if (user) {
      InteractionManager.runAfterInteractions(() => {
        setUserData(user);
      });
    }
  };

  useEffect(() => {
    if (userData) {
      (() => {
        InteractionManager.runAfterInteractions(async () => {
          const res = await getQuestionsByUserId(userData.user_id);
          setQuestonsData(res);
        });
      })();
    }
    // GET USER's Questions
  }, [userData]);

  const renderQuestions = () => {
    return questonsData?.map(q => (
      <QuestionCard key={q.question_id} data={q} />
    ));
  };

  return (
    <>
      {!userData && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <GreetingComponent />
        </Animated.View>
      )}
      <Animated.View style={styles.container}>
        <AnimatedSearchInput
          handleSubmit={onSubmit}
          isValid={isInputValid}
          inputValue={inputValue}
          onChange={onInputChange}
        />
        {userData && <AnimatedUserCard userData={userData} />}
        {questonsData && (
          <ScrollView style={styles.questionsContainer} horizontal>
            {renderQuestions()}
          </ScrollView>
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.MAIN,
  },
  questionsContainer: {
    paddingVertical: 24,
  },
});
