import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '@/contexts/SessionContext';

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

export default function MainHeader() {
  const router = useRouter();
  const { email, clearSession } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const displayEmail = email.trim().length > 0 ? email : 'Usuario';

  const handleSignOut = () => {
    setMenuOpen(false);
    clearSession();
    router.replace('/');
  };

  return (
    <>
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

      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
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
    </>
  );
}

const styles = StyleSheet.create({
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
