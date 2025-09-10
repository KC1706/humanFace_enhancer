import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function NpsSheet({ visible, onRate, onClose }) {
  if (!visible) return null;
  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20 }}>
      <View style={{ backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 }}>
        <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 8 }}>Enjoying your experience</Text>
        <Text style={{ color: '#555', marginBottom: 16 }}>Tap to leave rating and make our day!</Text>
        <TouchableOpacity onPress={onRate} style={{ backgroundColor: '#FFD54D', padding: 14, borderRadius: 12, alignItems: 'center' }}>
          <Text style={{ fontWeight: '700' }}>Rate Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={{ padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 }}>
          <Text>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
