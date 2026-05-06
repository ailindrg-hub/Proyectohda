import { StyleSheet } from 'react-native';

/** Padding horizontal unificado en pantallas del refugio */
export const REFUGIO_PAD_H = 24;

export const refugioScreenStyles = StyleSheet.create({
  scroll: {
    flex: 1,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  scrollContentGrow: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: REFUGIO_PAD_H,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F6829',
    marginBottom: 12,
  },
  sub: {
    fontSize: 16,
    lineHeight: 24,
    color: '#3E5D39',
  },
});
