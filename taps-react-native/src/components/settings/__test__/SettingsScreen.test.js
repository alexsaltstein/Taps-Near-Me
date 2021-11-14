import '../../../matchMedia.mock';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import SettingsScreen from '../SettingsScreen';
import { render, fireEvent } from '@testing-library/react-native'
import { RecoilRoot } from 'recoil';
import Constants from 'expo-constants';
import ReactDOM from 'react-dom';

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn()
};

test('renders correctly', () => {
    const tree = renderer.create(<RecoilRoot><SettingsScreen navigation={mockNavigation}/></RecoilRoot>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders default element', () => {
    const { getAllByText } = render(<RecoilRoot><SettingsScreen navigation={ mockNavigation }/></RecoilRoot>);
    expect(getAllByText('Settings').length).toBe(1);
});