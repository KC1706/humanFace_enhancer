import React, { useRef, useState } from 'react';
import { View, Image, PanResponder } from 'react-native';

export default function BeforeAfterSlider({ beforeUri, afterUri, height = 260, radius = 12, blurredAfter = false }) {
  const [ratio, setRatio] = useState(0.5);
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        const x = Math.max(0, Math.min(g.moveX, 320));
        setRatio(x / 320);
      }
    })
  ).current;

  return (
    <View style={{ width: '100%', height, borderRadius: radius, overflow: 'hidden' }} {...pan.panHandlers}>
      <Image source={{ uri: beforeUri }} style={{ position: 'absolute', width: '100%', height }} resizeMode="cover" />
      <View style={{ width: `${ratio * 100}%`, height, overflow: 'hidden' }}>
        <Image source={{ uri: afterUri || beforeUri }} style={{ width: '100%', height }} resizeMode="cover" blurRadius={afterUri && blurredAfter ? 10 : 0} />
      </View>
      <View style={{ position: 'absolute', left: `${ratio * 100}%`, top: 0, bottom: 0, width: 2, backgroundColor: 'white' }} />
    </View>
  );
}


