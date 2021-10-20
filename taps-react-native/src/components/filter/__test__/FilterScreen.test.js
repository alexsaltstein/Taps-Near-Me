import React from 'react';
import renderer from 'react-test-renderer';
import FilterScreen from '../FilterScreen';
import ReactDOM from 'react-dom';

test('renders correctly', () => {
  const tree = renderer.create(<FilterScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});