import React from 'react';
import { View, Text, TouchableOpacity, Linking, Switch } from 'react-native';
import { useAuth } from '../auth';

export default function Settings() {
  const { setToken } = useAuth();
  const [enabled, setEnabled] = React.useState(true);
  return (
    <View style={{ flex: 1, backgroundColor: '#1f1447', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Settings</Text>
      <TouchableOpacity style={{ backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 }} onPress={() => {}}>
        <Text style={{ fontWeight: '700' }}>Invite your friends</Text>
        <Text>Share your referral code</Text>
      </TouchableOpacity>
      <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontWeight: '700' }}>Enable Push Notifications</Text>
          <Text>Turn on to get updates</Text>
        </View>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
      <TouchableOpacity style={{ backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 }}>
        <Text style={{ fontWeight: '700' }}>Manage Plan & Payments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 }} onPress={() => Linking.openURL('https://example.com/privacy')}>
        <Text>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 }} onPress={() => Linking.openURL('https://example.com/terms')}>
        <Text>Terms of Service</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: '#ffeded', padding: 16, borderRadius: 12, marginTop: 'auto' }} onPress={() => setToken(null)}>
        <Text style={{ color: '#c00', fontWeight: '700' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}


