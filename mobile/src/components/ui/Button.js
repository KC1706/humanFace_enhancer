import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../../theme/colors';

export default function Button({ title, onPress, style, textStyle, kind = 'primary', disabled }) {
  const bg = kind === 'primary' ? colors.accent : 'transparent';
  const color = kind === 'primary' ? '#000' : colors.text;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[{
        backgroundColor: bg,
        opacity: disabled ? 0.5 : 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: kind === 'ghost' ? 1 : 0,
        borderColor: 'rgba(255,255,255,0.2)'
      }, style]}
    >
      <Text style={[{ fontWeight: '700', color }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
