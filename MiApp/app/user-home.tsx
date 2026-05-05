import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

function HamburgerMenuIcon() {
  return (
    <View style={hamburgerStyles.icon} accessibilityElementsHidden>
      <View style={hamburgerStyles.line} />
      <View style={hamburgerStyles.line} />
      <View style={hamburgerStyles.line} />
    </View>
  );
}

const hamburgerStyles = StyleSheet.create({
  icon: {
    width: 26,
    height: 18,
    justifyContent: 'space-between',
  },
  line: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1F6829',
    width: '100%',
  },
});

export default function UserHomeScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const displayEmail = typeof email === 'string' && email.length > 0 ? email : 'Usuario';
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    setMenuOpen(false);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.topBar}>
        <Text style={styles.emailText} numberOfLines={1}>
          {displayEmail}
        </Text>
        <Pressable
          onPress={() => setMenuOpen(true)}
          style={styles.menuButton}
          hitSlop={12}
          accessibilityLabel="Abrir menú"
        >
          <HamburgerMenuIcon />
        </Pressable>
      </View>

      <View style={styles.decorationLayer} pointerEvents="none">
        <Ionicons name="paw" size={300} color="rgba(71, 170, 87, 0.08)" style={styles.pawTopLeft} />
        <Ionicons name="paw" size={240} color="rgba(253, 214, 69, 0.12)" style={styles.pawMiddleRight} />
        <Ionicons name="paw" size={200} color="rgba(255, 235, 59, 0.1)" style={styles.pawBottomLeft} />
      </View>

      <View style={styles.body}>
        <Text style={styles.welcomeTitle}>Bienvenido</Text>
        <Text style={styles.welcomeSubtitle}>
          Ya iniciaste sesión. Aquí irá el contenido principal de la app.
        </Text>
      </View>

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={styles.menuOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setMenuOpen(false)}
            accessibilityLabel="Cerrar menú"
          />
          <View style={styles.menuAnchor}>
            <View style={styles.menuCard}>
              <Pressable style={styles.menuItem} onPress={handleSignOut}>
                <Ionicons name="log-out-outline" size={22} color="#C62828" />
                <Text style={styles.menuItemTextDanger}>Cerrar sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFEF5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#FFFEF5',
    zIndex: 2,
  },
  emailText: {
    flex: 1,
    marginRight: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#233627',
  },
  menuButton: {
    padding: 4,
  },
  decorationLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: 'hidden',
  },
  pawTopLeft: {
    position: 'absolute',
    top: -50,
    left: -60,
    transform: [{ rotate: '-15deg' }],
  },
  pawMiddleRight: {
    position: 'absolute',
    top: '25%',
    right: -80,
    transform: [{ rotate: '20deg' }],
  },
  pawBottomLeft: {
    position: 'absolute',
    bottom: -40,
    left: 20,
    transform: [{ rotate: '10deg' }],
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F6829',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3E5D39',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  menuAnchor: {
    position: 'absolute',
    top: 8,
    right: 12,
    zIndex: 1,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    minWidth: 200,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D8EBD2',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemTextDanger: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C62828',
  },
});
