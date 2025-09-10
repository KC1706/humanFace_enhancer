import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function Introduction({ navigation }) {
  return (
    <ImageBackground source={{ uri: 'https://picsum.photos/seed/introbg/900/1600' }} style={{ flex: 1, backgroundColor: '#1f1447', padding: 20, justifyContent: 'space-between' }}>
      <View />
      <View>
        <Text style={{ color: 'white', fontSize: 32, fontWeight: '700', marginBottom: 8 }}>From today's you, to your peak potential</Text>
        <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>Discover your ultimate look and the steps to achieve it.</Text>
        <BeforeAfterSlider beforeUri={'https://picsum.photos/seed/before1/800/800'} afterUri={'https://picsum.photos/seed/after1/800/800'} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SocialProof')} style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' }}>
        <Text style={{ fontWeight: '700' }}>Continue</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}


