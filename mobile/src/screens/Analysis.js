import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const steps = [
  'Measuring your features',
  'Calculating your masculine potential',
  'Generating your transformation'
];

export default function Analysis({ navigation }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % steps.length), 1200);
    const done = setTimeout(() => navigation.replace('Preview'), 6000);
    return () => { clearInterval(id); clearTimeout(done); };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: '#1f1447', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20 }}>{steps[index]}</Text>
      <Text style={{ color: 'white', marginTop: 8 }}>Analyzing...</Text>
    </View>
  );
}


