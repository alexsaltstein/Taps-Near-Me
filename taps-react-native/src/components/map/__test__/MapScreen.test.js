import '../../../matchMedia.mock';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import MapScreen from '../MapScreen';
import { RecoilRoot } from 'recoil';
import { render, fireEvent } from '@testing-library/react-native'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import ReactDOM from 'react-dom';

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn()
  }

test('renders correctly', () => {
  const tree = renderer.create(<RecoilRoot><MapScreen navigation={mockNavigation}/></RecoilRoot>).toJSON();
  expect(tree).toMatchSnapshot();
});