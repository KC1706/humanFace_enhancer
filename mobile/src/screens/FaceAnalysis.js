import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../auth';
import { createClient } from '../api';

export default function FaceAnalysis() {
  const { token } = useAuth();
  const api = createClient(token);
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const r = await api.get('/api/users/me/transformation');
      setData(r.data);
    })();
  }, []);
  const ratings = data?.featureRatings || {};
  return (
    <View style={{ flex: 1, backgroundColor: '#1f1447', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Analysis</Text>
      {Object.keys(ratings).length ? (
        Object.entries(ratings).map(([k, v]) => (
          <Text key={k} style={{ color: 'white', marginBottom: 8 }}>{k}: {v}</Text>
        ))
      ) : (
        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Subscribe to view detailed breakdown.</Text>
      )}
    </View>
  );
}


