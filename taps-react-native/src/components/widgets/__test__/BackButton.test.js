import '../../../matchMedia.mock';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import BackButton from '../BackButton';
import { render, fireEvent } from '@testing-library/react-native'
import ReactDOM from 'react-dom';
import { COLORS } from '../../../styles/COLORS';

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn(), 
    goBack: jest.fn()
}

test('renders correctly', () => {
    const tree = renderer.create(<BackButton/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('navigates to screens correctly', () => {
    const tree = renderer.create(<BackButton color={COLORS.black} relative={false} navigation={ mockNavigation } />);
    const root = tree.root;
    const prop = root.findByProps({testID:'BackButton.Navigate'});
    prop.props.onPress();
    expect(mockNavigation.goBack).toHaveBeenCalled();
})