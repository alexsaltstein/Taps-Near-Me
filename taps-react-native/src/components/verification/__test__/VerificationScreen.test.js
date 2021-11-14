import '../../../matchMedia.mock';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import VerificationScreen from '../VerificationScreen';
import { RecoilRoot } from 'recoil';
import { render, fireEvent } from '@testing-library/react-native'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import ReactDOM from 'react-dom';

const mockNavigation = {
  navigate: jest.fn(),
  addListener: jest.fn()
}

test('renders correctly', () => {
  const tree = renderer.create(<RecoilRoot><VerificationScreen navigation= {mockNavigation}/></RecoilRoot>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders default elements', () => {
  const { getAllByText } = render(<RecoilRoot><VerificationScreen navigation= {mockNavigation}/></RecoilRoot>);
  expect(getAllByText('Can I see some ID?').length).toBe(1);
  expect(getAllByText('You must be of legal drinking age to use this app.').length).toBe(1);
  expect(getAllByText('Enter Now').length).toBe(1);

});

// test('display error if the user is not 21', () => {
//   const { getByTestId } = render(<RecoilRoot><VerificationScreen navigation= {mockNavigation}/></RecoilRoot>);
//   fireEvent.changeText(getByTestId('Verification.DOB'), '10012021');
//   fireEvent.press(getByTestId('Verification.Submit'));
// })