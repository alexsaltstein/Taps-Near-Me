import '../../../matchMedia.mock';
import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../HomeScreen';
import ReactDOM from 'react-dom';

test('renders correctly', () => {
    const tree = renderer.create(HomeScreen).toJSON();
    expect(tree).toMatchSnapshot();
});