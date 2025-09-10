import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { useAuth } from '../../providers/auth';
import { createClient } from '../../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth();
  const api = createClient();

  async function login() {
    if (!email || !password) return;
    setLoading(true);
    try {
      const r = await api.post('/api/users/login', { email, password });
      await setToken(r.data.token);
      navigation.replace('Ready');
    } catch (e) {
      Alert.alert('Login failed', e.response?.data?.error || 'Please try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 12 }}>Welcome back</Text>
      <TextInput autoCapitalize='none' keyboardType='email-address' value={email} onChangeText={setEmail} placeholder='Email' placeholderTextColor='#aaa' style={{ color: colors.text, borderColor: colors.text, borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 }} />
      <TextInput secureTextEntry value={password} onChangeText={setPassword} placeholder='Password' placeholderTextColor='#aaa' style={{ color: colors.text, borderColor: colors.text, borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 }} />
      <TouchableOpacity onPress={login} disabled={loading} style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' }}>
        <Text style={{ fontWeight: '700' }}>{loading ? 'Signing in...' : 'Sign In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: colors.text }}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}
