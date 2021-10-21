import '../../../matchMedia.mock';
import React from 'react';
import renderer from 'react-test-renderer';
import VerificationScreen from '../VerificationScreen';
import ReactDOM from 'react-dom';

test('renders correctly', () => {
  const tree = renderer.create(<VerificationScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});