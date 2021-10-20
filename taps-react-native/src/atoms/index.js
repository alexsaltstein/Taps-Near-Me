import { atom } from 'recoil';
import { COLORS } from '../styles/COLORS';

export const dateOfBirthState = atom({
  key: 'dateOfBirth',
  default: ''
});

export const statusBarColor = atom({
  key: 'statusBarColor',
  default: COLORS.white
});

export const bottomBarColor = atom({
  key: 'bottomBarColor',
  default: COLORS.white
});