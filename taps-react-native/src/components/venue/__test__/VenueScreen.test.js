import '../../../matchMedia.mock';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import VenueScreen from '../VenueScreen';
import { RecoilRoot } from 'recoil';
import { render, fireEvent } from '@testing-library/react-native'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import ReactDOM from 'react-dom';

const mockNavigation = {
  navigate: jest.fn(),
  addListener: jest.fn()
}

const mockRoute = {
    params: jest.fn()
}

test('renders correctly', () => {
  const tree = renderer.create(<RecoilRoot><VenueScreen navigation= {mockNavigation} route= {mockRoute}/></RecoilRoot>).toJSON();
  expect(tree).toMatchSnapshot();
});