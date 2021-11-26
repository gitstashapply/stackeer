import React, {useEffect, useState} from 'react';
import {InteractionManager, SafeAreaView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import AnimatedSearchInput from '../components/AnimatedSearchInput';
import AnimatedUserCard from '../components/AnimatedUserCard';
import {useColors} from '../components/common/Colors/ColorsProvider';
import GreetingComponent from '../components/GreetingComponent';
import QuestionCard from '../components/QuestionCard';
import {Text, Title} from '../components/Text';
import {isNumber} from '../helpers/inputHelpers';
import {SCREEN_HEIGHT, SCRREN_WIDTH} from '../helpers/screenHelpers';
import {getQuestionsByUserId, getUserById} from '../services/apiService';
import {ItemQuestions, ItemsEntity} from '../services/types';

export default () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isInputValid, setInputValid] = useState<boolean>(false);

  const [userData, setUserData] = useState<ItemsEntity | null>(null);
  const [questonsData, setQuestonsData] = useState<ItemQuestions[] | null>(
    null,
  );

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  const {colors, changeMode} = useColors();

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
  }, [userData]);

  const renderQuestions = () => {
    return questonsData?.map(q => (
      <QuestionCard key={q.question_id} data={q} />
    ));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.MAIN}}>
      <View style={{flex: 1}}>
        {!userData && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <GreetingComponent />
          </Animated.View>
        )}
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            marginVertical: 12,
          }}
          onPress={() => {
            changeMode();
          }}>
          <Text style={{textDecorationLine: 'underline'}}>
            PRESS ME TO CHANGE COLORS MODE
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[styles.container, {backgroundColor: colors.MAIN}]}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionsContainer: {
    paddingVertical: 24,
  },
});
