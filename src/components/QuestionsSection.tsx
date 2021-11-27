import React, {useEffect, useState} from 'react';
import {View, FlatList, InteractionManager, StyleSheet} from 'react-native';
import {getQuestionsByUserId} from '../services/apiService';
import {questionSectionSortingMetadata, sortBy} from '../services/tranfomers';
import {ItemQuestions} from '../services/types';
import {TextButton} from './common/Button';
import QuestionCard from './QuestionCard';
import {Text} from './Text';

export default ({userId}: any) => {
  const [questonsData, setQuestonsData] = useState<ItemQuestions[] | null>(
    null,
  );

  useEffect(() => {
    if (userId) {
      (() => {
        InteractionManager.runAfterInteractions(async () => {
          const res = await getQuestionsByUserId(userId);
          setQuestonsData(res);
        });
      })();
    }
  }, [userId]);

  const renderSortingSection = () => {
    if (!questonsData) return;

    return questionSectionSortingMetadata.map(d => {
      const onPress = () => {
        const sortedArr = sortBy(d.sortingKey, questonsData);
        !!sortedArr && setQuestonsData(sortedArr);
      };

      return <TextButton key={d.id} onPress={onPress} text={d.title} />;
    });
  };

  const renderQuestionItem = (q: ItemQuestions) => {
    return <QuestionCard key={q.question_id} data={q} />;
  };

  if (!questonsData) return <></>;

  return (
    <>
      <View style={styles.container}>
        <View style={{flex: 0}}>
          <Text>SORT:</Text>
        </View>
        <View style={styles.sortingContainer}>{renderSortingSection()}</View>
      </View>
      <FlatList
        style={styles.questionsContainer}
        horizontal
        data={questonsData}
        renderItem={({item}) => renderQuestionItem(item)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  questionsContainer: {
    flex: 1,
    paddingVertical: 24,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 12,
    justifyContent: 'flex-end',
  },
  sortingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
