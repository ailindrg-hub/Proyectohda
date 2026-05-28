import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

/** Activa: silueta amarilla. Inactiva: silueta verde. */
const ACTIVE_COLOR = '#FFC107';
const INACTIVE_COLOR = '#1F6829';
const ICON_SIZE = Platform.OS === 'android' ? 28 : 24;

type TabBarIconProps = {
  focused: boolean;
  name: IoniconName;
};

export function TabBarIcon({ focused, name }: TabBarIconProps) {
  return (
    <Ionicons
      name={name}
      size={ICON_SIZE}
      color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
    />
  );
}
