import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../theme/colors';

const steps = [
  'Analyzing your features',
  'Calculating your potential',
  'Generating your transformation'
];

export default function AnalysisScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % steps.length), 1200);
    const done = setTimeout(() => navigation.replace('Preview'), 6000);
    return () => { clearInterval(id); clearTimeout(done); };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text, fontSize: 20 }}>{steps[index]}</Text>
      <Text style={{ color: colors.text, marginTop: 8 }}>Analyzing...</Text>
    </View>
  );
}
