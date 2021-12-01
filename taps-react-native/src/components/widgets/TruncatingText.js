import React from 'react';
import { Text } from 'react-native';

const TruncatingText = ({ text, style, max = 15 }) => (
  <Text style={style}>{text && text.length > max ? `${text.substring(0, max - 3)}...` : text}</Text>
);

export default TruncatingText;
