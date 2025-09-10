import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

export default function SocialProofScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Text style={{ fontSize: 56, color: colors.text }}>2M</Text>
        <Text style={{ fontSize: 28, color: colors.text, fontWeight: '700', textAlign: 'center' }}>Transformations and counting</Text>
        <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: 8 }}>The fastest-growing community of men investing in themselves.</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Referral')} style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' }}>
        <Text style={{ fontWeight: '700' }}>Transform Me</Text>
      </TouchableOpacity>
    </View>
  );
}
