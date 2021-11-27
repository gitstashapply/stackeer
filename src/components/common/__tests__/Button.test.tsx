import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';
import {TextButton} from '../Button';

const handlePressMock = jest.fn();
const btnText = 'Baruh aShem ani noshem!';
describe('Buttons', () => {
  describe('Text Button', () => {
    it('Should render text inside button', async () => {
      const {findByText} = render(
        <TextButton onPress={handlePressMock} text={btnText} />,
      );
      const text = await findByText(btnText);

      expect(text).toBeTruthy();
    });

    it('Should invoke callback onPress', async () => {
      const {findByTestId} = render(
        <TextButton onPress={handlePressMock} text={btnText} />,
      );
      const Btn = await findByTestId('textBtn');
      fireEvent.press(Btn);

      expect(handlePressMock).toBeCalled();
    });
  });
});
