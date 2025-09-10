import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../auth';
import { createClient } from '../api';

export default function Referral({ navigation }) {
  const [code, setCode] = useState('');
  const { token, setToken } = useAuth();
  const api = createClient(token);

  async function handleContinue(without) {
    if (!token) {
      const email = `user${Date.now()}@demo.app`;
      const password = 'demo1234';
      try {
        const r = await api.post('/api/users/register', { email, password });
        await setToken(r.data.token);
      } catch (e) { /* ignore */ }
    }
    if (!without && code.length === 4) {
      try {
        const v = await api.post('/api/referrals/validate', { code });
        if (!v.data.valid) {
          Alert.alert('Invalid code');
          return;
        }
      } catch (e) { /* ignore */ }
    }
    navigation.navigate('Ready');
  }

  const disabled = code.length !== 4;

  return (
    <View style={{ flex: 1, backgroundColor: '#1f1447', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 12 }}>Enter your referral code</Text>
      <TextInput value={code} onChangeText={(t) => setCode(t.replace(/\D/g, '').slice(0, 4))} keyboardType="number-pad" placeholder="0000" placeholderTextColor="#aaa" style={{ color: 'white', borderColor: 'white', borderWidth: 1, borderRadius: 12, padding: 16, letterSpacing: 8, textAlign: 'center', fontSize: 20 }} />
      <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>Don't have referral code?</Text>
      <TouchableOpacity disabled={disabled} onPress={() => handleContinue(false)} style={{ opacity: disabled ? 0.5 : 1, backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 16 }}>
        <Text style={{ fontWeight: '700' }}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleContinue(true)} style={{ borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12 }}>
        <Text style={{ color: 'white' }}>I don't have referral code</Text>
      </TouchableOpacity>
    </View>
  );
}


