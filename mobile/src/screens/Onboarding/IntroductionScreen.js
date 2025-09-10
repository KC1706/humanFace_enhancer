import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { colors } from '../../theme/colors';
import BeforeAfterSlider from '../../components/common/BeforeAfterSlider';

export default function IntroductionScreen({ navigation }) {
  return (
    <ImageBackground source={{ uri: 'https://picsum.photos/seed/introbg/900/1600' }} style={{ flex: 1, backgroundColor: colors.bg, padding: 20, justifyContent: 'space-between' }}>
      <View />
      <View>
        <Text style={{ color: colors.text, fontSize: 32, fontWeight: '700', marginBottom: 8 }}>Preview Your Potential</Text>
        <Text style={{ color: colors.textMuted, marginBottom: 16 }}>Discover your ultimate look and the steps to achieve it.</Text>
        <BeforeAfterSlider beforeUri={'https://picsum.photos/seed/before1/800/800'} afterUri={'https://picsum.photos/seed/after1/800/800'} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SocialProof')} style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center' }}>
        <Text style={{ fontWeight: '700' }}>Continue</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
