import '../../../matchMedia.mock';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import HomeScreen from '../HomeScreen';
import { render, fireEvent } from '@testing-library/react-native'
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn()
}

test('renders correctly', () => {
    const tree = renderer.create(<RecoilRoot><HomeScreen navigation={mockNavigation}/></RecoilRoot>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders default element', () => {
    const { getAllByText } = render(<RecoilRoot><HomeScreen navigation={ mockNavigation }/></RecoilRoot>);
    expect(getAllByText('What are we looking to drink?').length).toBe(1);
});

test('goes to map when map is selected', () => {
    const tree = renderer.create(<RecoilRoot><HomeScreen navigation={mockNavigation}/></RecoilRoot>);
    const root = tree.root;
    const prop = root.findByProps({testID:'Map.Button'});
    prop.props.onPress();
    expect(mockNavigation.navigate).toBeCalledWith('Map');
});

