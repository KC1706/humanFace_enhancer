import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useAuth } from '../auth';
import { createClient } from '../api';

export default function UnlockedLook({ navigation }) {
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
    <View style={{ flex: 1, backgroundColor: '#1f1447', padding: 24 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Unlock your full transformation</Text>
      <BeforeAfterSlider beforeUri={'https://picsum.photos/seed/paywall1/800/800'} afterUri={'https://picsum.photos/seed/paywall2/800/800'} blurredAfter={false} />
      <TouchableOpacity onPress={purchase} style={{ backgroundColor: '#FFD54D', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 24 }}>
        <Text style={{ fontWeight: '700' }}>Unlock at $9.99/week</Text>
      </TouchableOpacity>
    </View>
  );
}


