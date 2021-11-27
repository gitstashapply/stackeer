import React, {ReactElement, useContext} from 'react';
import Animated, {Layout, LightSpeedInRight} from 'react-native-reanimated';
import {SCRREN_WIDTH} from '../helpers/screenHelpers';
import {ItemQuestions} from '../services/types';
import {Caption, Text, Title} from './Text';
import {unixToFormatedDate} from '../helpers/dateHelpers';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {ColorPalette} from '../Themes/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AnsweredBadge from './AnsweredBadge';
import {WebViewModalContext} from './common/WebView/WebViewModalProvider';
import {useColors} from './common/Colors/ColorsProvider';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Tag = ({tag}: {tag: string}): ReactElement => {
  const {colors} = useColors();

  return (
    <View key={tag} style={[styles.tag, {borderColor: colors.MAIN}]}>
      <Caption style={{color: colors.MAIN}}>{tag}</Caption>
    </View>
  );
};

export default ({data}: {data: ItemQuestions}): ReactElement => {
  const {handleOpen} = useContext(WebViewModalContext);
  const {colors} = useColors();

  const handleWebViewModalOpen = () => {
    handleOpen(data.link);
  };

  return (
    <Animated.View entering={LightSpeedInRight} style={styles.shadowWrapper}>
      <View style={[styles.container, {backgroundColor: colors.SECONDARY}]}>
        <AnsweredBadge isAnswered={data.is_answered} />
        <Title style={{fontSize: 18, color: colors.MAIN}}>{data.title}</Title>
        <Caption style={{color: '#808080'}}>{`Created: ${unixToFormatedDate(
          data.creation_date,
        )}`}</Caption>
        <View style={styles.tagContainer}>
          {data.tags?.map(tag => (
            <Tag tag={tag} key={tag} />
          ))}
        </View>
        <Text
          style={{
            color: colors.MAIN,
          }}>{`Answers: ${data.answer_count}`}</Text>
        <Text
          style={{
            color: colors.MAIN,
          }}>{`Views: ${data.view_count}`}</Text>

        <View style={styles.btn}>
          <TouchableOpacity
            onPress={handleWebViewModalOpen}
            style={styles.btnContainer}>
            <Text style={[styles.btnText, {color: colors.MAIN}]}>
              OPEN QUESTION
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    flex: 1,
    width: SCRREN_WIDTH * 0.7,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
  },
  container: {
    flex: 1,
    padding: 20,
    overflow: 'hidden',
    borderRadius: 20,
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btnContainer: {
    alignSelf: 'center',
  },
  btnText: {
    textDecorationLine: 'underline',
  },
  tag: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 4,
    margin: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
