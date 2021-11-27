import 'react-native';
import React from 'react';
import MainScreen from '../MainScreen';

import {render} from '@testing-library/react-native';

const text = {
  stack: 'STACK',
  err: 'ERR',
  itsVeryImportant: 'ITS VERY IMPORTANT APP',
  aboutUs: 'ABOUT US',
};
describe('<MainScreen /> content', () => {
  it('renders correctly', () => {
    render(<MainScreen />);
  });

  it('Should render all content', () => {
    const {getByTestId, getByText} = render(<MainScreen />);

    getByText(text.stack);
    getByText(text.itsVeryImportant);
    getByText(text.aboutUs);
    getByTestId('animatedSearchInput');
    getByTestId('changeColorBtn');
  });

  xit('Should open webView on about_us btn press', () => {});
  xit('Should trigger search animation on search icon press', () => {});
  xit('Should change colors on change color btn press', () => {});
});
