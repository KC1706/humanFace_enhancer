import React from 'react';
import { View, Text, TouchableOpacity, Linking, Switch, Image } from 'react-native';
import { colors } from '../../theme/colors';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../providers/auth';

export default function SettingsScreen() {
  const { setToken } = useAuth();
  const [enabled, setEnabled] = React.useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Settings</Text>

      <Card style={{ marginBottom: 12 }}>
        <Text style={{ fontWeight: '700', marginBottom: 6 }}>Referral</Text>
        <Text style={{ color: '#555', marginBottom: 12 }}>Invite your friends to join</Text>
        <Button title="Invite now" onPress={() => {}} kind="primary" />
      </Card>

      <Card style={{ marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontWeight: '700' }}>Enable Push Notification</Text>
          <Text style={{ color: '#555' }}>Turn on to get updates</Text>
        </View>
        <Switch value={enabled} onValueChange={setEnabled} />
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <TouchableOpacity>
          <Text style={{ fontWeight: '700' }}>Manage Plan & Payments</Text>
        </TouchableOpacity>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/privacy')}>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/terms')} style={{ marginTop: 12 }}>
          <Text>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/guidelines')} style={{ marginTop: 12 }}>
          <Text>Community Guidelines</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/about')} style={{ marginTop: 12 }}>
          <Text>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/help')} style={{ marginTop: 12 }}>
          <Text>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/faqs')} style={{ marginTop: 12 }}>
          <Text>FAQs</Text>
        </TouchableOpacity>
      </Card>

      <TouchableOpacity style={{ backgroundColor: '#ffeded', padding: 16, borderRadius: 12, marginTop: 'auto' }} onPress={() => setToken(null)}>
        <Text style={{ color: '#c00', fontWeight: '700', textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
        <Text style={{ color: colors.text }}>ⓘ</Text>
        <Text style={{ color: colors.text }}>🐦</Text>
      </View>
      <Text style={{ color: colors.textSubtle, textAlign: 'center', marginTop: 8 }}>App Version 2.0.770</Text>
    </View>
  );
}
