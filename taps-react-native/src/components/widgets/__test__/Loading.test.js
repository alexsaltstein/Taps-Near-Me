import '../../../matchMedia.mock';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Loading from '../Loading';
import {Linking, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import { render, fireEvent } from '@testing-library/react-native'
import ReactDOM from 'react-dom';
import { COLORS } from '../../../styles/COLORS';

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn(), 
}

test('renders correctly', () => {
    const tree = renderer.create(<Loading/>).toJSON();
    expect(tree).toMatchSnapshot();
});