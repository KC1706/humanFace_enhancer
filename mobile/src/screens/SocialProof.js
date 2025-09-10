import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function SocialProof({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#1f1447', padding: 24, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Text style={{ fontSize: 56, color: 'white' }}>2M</Text>
        <Text style={{ fontSize: 28, color: 'white', fontWeight: '700', textAlign: 'center' }}>Transformations and counting</Text>
        <Text style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 8 }}>The fastest-growing community of men investing in themselves.</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Referral')} style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' }}>
        <Text style={{ fontWeight: '700' }}>Transform Me</Text>
      </TouchableOpacity>
    </View>
  );
}


