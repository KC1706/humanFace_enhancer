import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import BeforeAfterSlider from '../../components/common/BeforeAfterSlider';
import { useAuth } from '../../providers/auth';
import { createClient } from '../../services/api';

export default function PreviewScreen({ navigation }) {
  const { token } = useAuth();
  const api = createClient(token);
  const [trans, setTrans] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const r = await api.get('/api/users/me/transformation');
        setTrans(r.data);
      } catch (e) {}
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'space-between' }}>
      <View>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 8 }}>Preview Your Potential</Text>
        {trans && (
          <BeforeAfterSlider beforeUri={trans.beforeImageUrl} afterUri={trans.afterImageUrl || trans.beforeImageUrl} blurredAfter={!trans.afterImageUrl} />
        )}
        <Text style={{ color: colors.textMuted, marginTop: 12 }}>Improve your score from {trans?.initialScore?.toFixed?.(1) || '—'} to {trans?.potentialScore ? trans.potentialScore.toFixed(1) : '8.8'}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('UnlockedLook')} style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' }}>
          <Text style={{ fontWeight: '700' }}>See My Full Potential</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Main')} style={{ borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12 }}>
          <Text style={{ color: colors.text }}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
