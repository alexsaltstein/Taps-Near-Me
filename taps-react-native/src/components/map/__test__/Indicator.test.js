import '../../../matchMedia.mock';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Indicator from '../Indicator';
import { RecoilRoot } from 'recoil';
import { render, fireEvent } from '@testing-library/react-native'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import ReactDOM from 'react-dom';

test('renders correctly', () => {
  const tree = renderer.create(<RecoilRoot><Indicator width= {5} onPress= {() => onPress()}/></RecoilRoot>).toJSON();
  expect(tree).toMatchSnapshot();
});