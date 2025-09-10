import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../../theme/colors';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import BeforeAfterSlider from '../../components/common/BeforeAfterSlider';
import NotificationPromptSheet from '../../components/sheets/NotificationPromptSheet';
import NpsSheet from '../../components/sheets/NpsSheet';
import { useAuth } from '../../providers/auth';
import { createClient } from '../../services/api';

export default function HomeScreen({ navigation }) {
  const { token } = useAuth();
  const api = createClient(token);
  const [data, setData] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [showNps, setShowNps] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get('/api/users/me/transformation');
        setData(r.data);
        setTimeout(() => setShowNotif(true), 600); // prompt shortly after open
      } catch (e) {}
    })();
  }, []);

  const locked = data?.locked;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700' }}>Maxx.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={{ color: colors.text, fontSize: 20 }}>⚙︎</Text>
        </TouchableOpacity>
      </View>

      {data && (
        <BeforeAfterSlider beforeUri={data.beforeImageUrl} afterUri={data.afterImageUrl || data.beforeImageUrl} blurredAfter={locked} />
      )}

      <Card style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: '700', marginBottom: 6 }}>Start Transformation Today</Text>
        <View style={{ height: 8, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 999 }}>
          <View style={{ height: 8, width: `${Math.min(100, (data?.completedToday || 0) / (data?.totalToday || 1) * 100)}%`, backgroundColor: '#6C62E6', borderRadius: 999 }} />
        </View>
      </Card>

      <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
        <Card style={{ flex: 1 }}>
          <TouchableOpacity disabled={locked} onPress={() => navigation.navigate('Plan')} style={{ opacity: locked ? 0.5 : 1 }}>
            <Text style={{ fontWeight: '700' }}>Your Plan</Text>
            <Text style={{ color: '#666', marginTop: 4 }}>View Daily Task</Text>
          </TouchableOpacity>
        </Card>
        <Card style={{ flex: 1 }}>
          <TouchableOpacity disabled={locked} onPress={() => navigation.navigate('FaceAnalysis')} style={{ opacity: locked ? 0.5 : 1 }}>
            <Text style={{ fontWeight: '700' }}>Analysis</Text>
            <Text style={{ color: '#666', marginTop: 4 }}>See Breakdown</Text>
          </TouchableOpacity>
        </Card>
      </View>

      {locked && (
        <Button title="Unlock at $9.99/week" onPress={() => navigation.navigate('UnlockedLook')} style={{ marginTop: 16 }} />
      )}

      <NotificationPromptSheet
        visible={showNotif}
        onEnable={() => { setShowNotif(false); setTimeout(() => setShowNps(true), 600); }}
        onSkip={() => setShowNotif(false)}
      />

      <NpsSheet
        visible={showNps}
        onRate={() => { setShowNps(false); Linking.openURL('https://example.com/rate'); }}
        onClose={() => setShowNps(false)}
      />
    </View>
  );
}
