import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

export default function NotificationPromptSheet({ visible, onEnable, onSkip }) {
  if (!visible) return null;
  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20 }}>
      <View style={{ backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 }}>
        <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 8 }}>Never miss a step</Text>
        <Text style={{ color: '#555', marginBottom: 16 }}>Turn on notifications to stay updated on your tasks and progress.</Text>
        <TouchableOpacity onPress={onEnable} style={{ backgroundColor: colors.bg, padding: 14, borderRadius: 12, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Turn On Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkip} style={{ padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 }}>
          <Text>Skip For Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
