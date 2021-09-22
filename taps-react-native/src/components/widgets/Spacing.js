import React from 'react';
import { View } from 'react-native';

const Spacing = ({ vertical, horizontal }) => {
  return (
    <View style={{ paddingHorizontal: horizontal, paddingVertical: vertical }} />
  )
}

export default Spacing;