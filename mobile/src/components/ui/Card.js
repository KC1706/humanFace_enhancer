import React from 'react';
import { View } from 'react-native';
import { colors } from '../../theme/colors';

export default function Card({ children, style }) {
  return (
    <View style={[{
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16
    }, style]}
    >
      {children}
    </View>
  );
}
