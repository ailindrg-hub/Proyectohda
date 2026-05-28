import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBarIcon } from '@/components/TabBarIcon';

const TAB_LABEL_COLOR = '#8DAF8B';

export default function MainTabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TAB_LABEL_COLOR,
        tabBarInactiveTintColor: TAB_LABEL_COLOR,
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
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="mascotas"
        options={{
          title: 'Mascotas',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="paw-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="donar"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="calendar-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="voluntarios"
        options={{
          title: 'Ventas',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bag-handle-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Citas',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="mail-outline" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
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
