import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../providers/auth';
import { createClient } from '../../services/api';
import { colors } from '../../theme/colors';

export default function CameraFlowScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const api = createClient(token);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant photo library access to select images.');
      }
    })();
  }, []);

  async function addFromLibrary() {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        quality: 0.7,
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
      if (!res.canceled && res.assets) {
        const selected = res.assets.map(a => a.uri);
        setImages(prev => [...prev, ...selected]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select images. Please try again.');
    }
  }

  async function uploadAndAnalyze() {
    if (images.length === 0) {
      Alert.alert('No images', 'Please select at least one image to analyze.');
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      images.forEach((uri, idx) => {
        form.append('images', {
          uri,
          name: `img_${idx}.jpg`,
          type: 'image/jpeg'
        });
      });
      await api.post('/api/users/me/images', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigation.replace('Analysis');
    } catch (error) {
      Alert.alert('Error', `Failed to upload images: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  function removeImage(index) {
    setImages(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 24 }}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Guided photos</Text>
      <Text style={{ color: colors.textMuted, marginBottom: 24 }}>Pick 2-4 clear photos for best analysis.</Text>

      <TouchableOpacity onPress={addFromLibrary} style={{ backgroundColor: 'white', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontWeight: '700' }}>Select From Gallery</Text>
      </TouchableOpacity>

      {images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {images.map((uri, index) => (
            <View key={index} style={{ marginRight: 12, position: 'relative' }}>
              <Image source={{ uri }} style={{ width: 100, height: 100, borderRadius: 8 }} />
              <TouchableOpacity
                onPress={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: colors.danger,
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <Text style={{ color: colors.textSubtle, marginBottom: 16 }}>
        Selected: {images.length} photo{images.length !== 1 ? 's' : ''}
      </Text>

      <TouchableOpacity
        onPress={uploadAndAnalyze}
        disabled={images.length === 0 || loading}
        style={{
          opacity: images.length === 0 || loading ? 0.5 : 1,
          backgroundColor: colors.accent,
          borderRadius: 12,
          padding: 14,
          alignItems: 'center',
          marginTop: 'auto'
        }}
      >
        <Text style={{ fontWeight: '700' }}>{loading ? 'Analyzing...' : 'Analyze Photos'}</Text>
      </TouchableOpacity>
    </View>
  );
}
