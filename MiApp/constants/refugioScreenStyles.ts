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
  heroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderWidth: 1,
    borderColor: '#D8EBD2',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginHorizontal: REFUGIO_PAD_H,
    marginTop: 14,
    marginBottom: 16,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  heroIconTint: {
    color: '#FDD645',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F6829',
  },
  heroText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#3E5D39',
  },
});
