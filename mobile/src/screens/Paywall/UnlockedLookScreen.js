import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import BeforeAfterSlider from '../../components/common/BeforeAfterSlider';
import { useAuth } from '../../providers/auth';
import { createClient } from '../../services/api';

export default function UnlockedLookScreen({ navigation }) {
  const { token } = useAuth();
  const api = createClient(token);

  async function purchase() {
    try {
      await api.post('/api/subscriptions/create', {});
      Alert.alert('Subscription active');
      navigation.replace('Main');
    } catch (e) {}
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 24 }}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Unlock your full transformation</Text>
      <BeforeAfterSlider beforeUri={'https://picsum.photos/seed/paywall1/800/800'} afterUri={'https://picsum.photos/seed/paywall2/800/800'} blurredAfter={false} />
      <TouchableOpacity onPress={purchase} style={{ backgroundColor: colors.accent, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 24 }}>
        <Text style={{ fontWeight: '700' }}>Unlock at $9.99/week</Text>
      </TouchableOpacity>
    </View>
  );
}
