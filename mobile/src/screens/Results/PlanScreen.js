import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { useAuth } from '../../providers/auth';
import { createClient } from '../../services/api';

export default function PlanScreen() {
  const { token } = useAuth();
  const api = createClient(token);
  const [plan, setPlan] = useState({ tasks: [] });
  useEffect(() => {
    (async () => {
      const r = await api.get('/api/users/me/plan');
      setPlan(r.data);
    })();
  }, []);

  async function toggle(id) {
    await api.post(`/api/users/me/plan/tasks/${id}/toggle`);
    const r = await api.get('/api/users/me/plan');
    setPlan(r.data);
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Your Plan</Text>
      {plan.tasks.map(t => (
        <TouchableOpacity key={t.id} onPress={() => toggle(t.id)} style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <Text style={{ fontWeight: '700' }}>{t.title}</Text>
          <Text>{t.description}</Text>
          <Text style={{ marginTop: 6 }}>{t.isCompleted ? 'Completed' : 'Tap to complete'}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
