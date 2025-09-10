import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

export default function ReadyScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'space-between' }}>
      <View />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 8 }}>Ready to see your Peak Self?</Text>
        <Text style={{ color: colors.textMuted, textAlign: 'center' }}>We'll guide you to capture photos for best analysis.</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('CameraFlow')} style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' }}>
        <Text style={{ fontWeight: '700' }}>Begin My Scan</Text>
      </TouchableOpacity>
    </View>
  );
}
