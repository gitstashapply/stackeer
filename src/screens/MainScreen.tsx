import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import AnimatedSearchInput from '../components/AnimatedSearchInput';
import {isNumber} from '../helpers/inputHelpers';
import {getUserById} from '../services/apiService';

export default () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isInputValid, setInputValid] = useState<boolean>(false);

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

  const validateId = () => {};

  const onSubmit = async () => {
    const user = await getUserById(parseInt(inputValue));
    console.log(user);
  };

  return (
    <View style={styles.container}>
      <AnimatedSearchInput
        handleSubmit={onSubmit}
        isValid={isInputValid}
        inputValue={inputValue}
        onChange={onInputChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
