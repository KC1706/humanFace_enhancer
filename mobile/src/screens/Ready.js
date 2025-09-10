import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function Ready({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#1f1447', padding: 24, justifyContent: 'space-between' }}>
      <View />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 8 }}>Ready to see your Peak Self?</Text>
        <Text style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>We'll guide you to capture photos for best analysis.</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('CameraFlow')} style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' }}>
        <Text style={{ fontWeight: '700' }}>Begin My Scan</Text>
      </TouchableOpacity>
    </View>
  );
}


