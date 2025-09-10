import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { useAuth } from '../../providers/auth';
import { createClient } from '../../services/api';

export default function FaceAnalysisScreen() {
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
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Analysis</Text>
      {Object.keys(ratings).length ? (
        Object.entries(ratings).map(([k, v]) => (
          <Text key={k} style={{ color: colors.text, marginBottom: 8 }}>{k}: {v}</Text>
        ))
      ) : (
        <Text style={{ color: colors.textMuted }}>Subscribe to view detailed breakdown.</Text>
      )}
    </View>
  );
}
