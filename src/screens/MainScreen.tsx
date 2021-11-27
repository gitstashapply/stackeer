import React, {useEffect, useState} from 'react';
import {InteractionManager, SafeAreaView, View, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import AnimatedSearchInput from '../components/AnimatedSearchInput';
import AnimatedUserCard from '../components/AnimatedUserCard';
import {useColors} from '../components/common/Colors/ColorsProvider';
import GreetingComponent from '../components/GreetingComponent';
import QuestionCard from '../components/QuestionCard';
import QuestionsSection from '../components/QuestionsSection';
import {Text} from '../components/Text';
import {isNumber} from '../helpers/inputHelpers';
import {getQuestionsByUserId, getUserById} from '../services/apiService';
import {ItemQuestions, ItemsEntity} from '../services/types';

export default () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isInputValid, setInputValid] = useState<boolean>(false);

  const [userData, setUserData] = useState<ItemsEntity | null>(null);

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
          <QuestionsSection userId={userData?.user_id} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  questionsContainer: {
    paddingVertical: 24,
  },
});
