import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../auth';
import { createClient } from '../api';

export default function CameraFlow({ navigation }) {
  const [images, setImages] = useState([]);
  const { token } = useAuth();
  const api = createClient(token);

  async function addFromLibrary() {
    const res = await ImagePicker.launchImageLibraryAsync({ allowsMultipleSelection: true, quality: 0.7 });
    if (!res.canceled) {
      const selected = res.assets.map(a => a.uri);
      setImages(prev => [...prev, ...selected]);
    }
  }

  async function uploadAndAnalyze() {
    const form = new FormData();
    images.forEach((uri, idx) => {
      form.append('images', { uri, name: `img_${idx}.jpg`, type: 'image/jpeg' });
    });
    await api.post('/api/users/me/images', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    navigation.replace('Analysis');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1f1447', padding: 24 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Guided photos</Text>
      <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>Pick 2-4 clear photos or use camera.</Text>
      <TouchableOpacity onPress={addFromLibrary} style={{ backgroundColor: 'white', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontWeight: '700' }}>Select From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadAndAnalyze} disabled={images.length === 0} style={{ opacity: images.length === 0 ? 0.5 : 1, backgroundColor: '#FFD54D', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 'auto' }}>
        <Text style={{ fontWeight: '700' }}>Analyze</Text>
      </TouchableOpacity>
    </View>
  );
}


