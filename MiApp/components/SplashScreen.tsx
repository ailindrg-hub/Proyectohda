import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RefugioBackground from '@/components/RefugioBackground';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationFinish: () => void;
}

export default function SplashScreen({ onAnimationFinish }: SplashScreenProps) {
  const logoFadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.8)).current;
  const [isVisible, setIsVisible] = useState(true);

  // Generamos posiciones aleatorias para las huellitas que llenarán la pantalla
  const paws = useRef([...Array(25)].map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    scale: 0.6 + Math.random() * 1.2,
    rotation: (Math.random() * 360).toFixed(0) + 'deg',
    anim: new Animated.Value(0),
    color: ['rgba(71, 170, 87, 0.25)', 'rgba(253, 214, 69, 0.3)', 'rgba(255, 235, 59, 0.25)'][Math.floor(Math.random() * 3)]
  }))).current;

  useEffect(() => {
    // 1. Aparecer logo suavemente con un ligero rebote
    Animated.parallel([
      Animated.timing(logoFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();

    // 2. Después de un momento, empezar a llenar de huellitas con efecto cascada
    const pawTimer = setTimeout(() => {
      const animations = paws.map((paw, i) => 
        Animated.timing(paw.anim, {
          toValue: 1,
          duration: 500,
          delay: i * 60, // Aparecen una tras otra
          useNativeDriver: true,
        })
      );
      Animated.parallel(animations).start();
    }, 1200);

    // 3. Finalmente desvanecer todo para dar paso a la app
    const finishTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoFadeAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
        ...paws.map(paw => Animated.timing(paw.anim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }))
      ]).start(() => {
        setIsVisible(false);
        onAnimationFinish();
      });
    }, 4800);

    return () => {
      clearTimeout(pawTimer);
      clearTimeout(finishTimer);
    };
  }, [logoFadeAnim, logoScaleAnim, onAnimationFinish, paws]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <RefugioBackground />
      
      {/* Huellitas animadas que llenan la pantalla */}
      {paws.map((paw, i) => (
        <Animated.View
          key={i}
          style={[
            styles.paw,
            {
              left: paw.x - 40,
              top: paw.y - 40,
              opacity: paw.anim,
              transform: [
                { scale: paw.anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, paw.scale] }) },
                { rotate: paw.rotation }
              ]
            }
          ]}
        >
          <Ionicons name="paw" size={80} color={paw.color} />
        </Animated.View>
      ))}

      <Animated.View 
        style={[
          styles.logoContainer, 
          { 
            opacity: logoFadeAnim,
            transform: [{ scale: logoScaleAnim }]
          }
        ]}
      >
        <Image 
          source={require('../assets/images/logo_huellitas.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </Animated.View>
    </View>
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
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 150,
    padding: 10,
    // Sombra suave para el logo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  paw: {
    position: 'absolute',
    zIndex: 50,
  }
});
