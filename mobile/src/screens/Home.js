import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../auth';
import { createClient } from '../api';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function Home({ navigation }) {
  const { token } = useAuth();
  const api = createClient(token);
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const r = await api.get('/api/users/me/transformation');
        setData(r.data);
      } catch (e) {}
    })();
  }, []);

  const locked = data?.locked;

  return (
    <View style={{ flex: 1, backgroundColor: '#1f1447', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Look.</Text>
      {data && (
        <BeforeAfterSlider beforeUri={data.beforeImageUrl} afterUri={data.afterImageUrl || data.beforeImageUrl} blurredAfter={locked} />
      )}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
        <TouchableOpacity disabled={locked} onPress={() => navigation.navigate('Plan')} style={{ flex: 1, backgroundColor: 'white', borderRadius: 12, padding: 14, alignItems: 'center', opacity: locked ? 0.5 : 1 }}>
          <Text style={{ fontWeight: '700' }}>Your Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={locked} onPress={() => navigation.navigate('FaceAnalysis')} style={{ flex: 1, backgroundColor: 'white', borderRadius: 12, padding: 14, alignItems: 'center', opacity: locked ? 0.5 : 1 }}>
          <Text style={{ fontWeight: '700' }}>Analysis</Text>
        </TouchableOpacity>
      </View>
      {locked && (
        <TouchableOpacity onPress={() => navigation.navigate('UnlockedLook')} style={{ backgroundColor: '#FFD54D', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 16 }}>
          <Text style={{ fontWeight: '700' }}>Unlock at $9.99/week</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}


