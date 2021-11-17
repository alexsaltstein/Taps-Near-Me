import '../../../matchMedia.mock';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import NavIcons from '../NavIcons';
import { render, fireEvent } from '@testing-library/react-native'
import ReactDOM from 'react-dom';

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn()
}

test('renders correctly', () => {
    const tree = renderer.create(<NavIcons/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('navigates to screens correctly', () => {
    const tree = renderer.create(<NavIcons source={'filter'} to={'settings'} navigation={ mockNavigation } />);
    const root = tree.root;
    const prop = root.findByProps({testID:'NavIcons.Button'});
    prop.props.onPress();
    expect(mockNavigation.navigate).toBeCalledWith('settings');
})