import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import RefugioScreenShell from '@/components/RefugioScreenShell';
import MainHeader from '@/components/MainHeader';

export default function MainLayout() {
  const insets = useSafeAreaInsets();

  return (
    <RefugioScreenShell>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <MainHeader />
        <Tabs
          screenOptions={{
            headerShown: false,
            sceneContainerStyle: { backgroundColor: 'transparent' },
            tabBarActiveTintColor: '#1F6829',
            tabBarInactiveTintColor: '#8DAF8B',
            tabBarStyle: {
              ...styles.tabBar,
              height: 58 + insets.bottom,
              paddingBottom: Math.max(insets.bottom, 8),
              paddingTop: 6,
            },
            tabBarLabelStyle: styles.tabLabel,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="mascotas"
            options={{
              title: 'Mascotas',
              tabBarIcon: ({ color, size }) => <Ionicons name="paw" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="donar"
            options={{
              title: 'Donar',
              tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="voluntarios"
            options={{
              title: 'Voluntarios',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="people-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="info"
            options={{
              title: 'Info',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="information-circle-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </RefugioScreenShell>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabBar: {
    backgroundColor: '#FFFEF5',
    borderTopColor: '#D8EBD2',
    borderTopWidth: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
});
