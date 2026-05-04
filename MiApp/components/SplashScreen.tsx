import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationFinish: () => void;
}

export default function SplashScreen({ onAnimationFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Aparecer suavemente
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // 2. Esperar 3 segundos y luego animar efecto remolino hacia arriba
    const timer = setTimeout(() => {
      Animated.parallel([
        // Desvanecer
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
        // Subir
        Animated.timing(slideAnim, {
          toValue: -height,
          duration: 1500,
          useNativeDriver: true,
        }),
        // Girar (Remolino)
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        // Encogerse (Efecto de deshacerse)
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
        onAnimationFinish();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'], // 3 vueltas completas
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { rotate: spin },
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/logo_huellitas.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFEF5',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    borderRadius: 125, // Asegura que se vea circular si hay fondo blanco sobrante
  },
});
