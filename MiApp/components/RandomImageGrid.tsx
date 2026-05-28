import type { ImageSourcePropType } from 'react-native';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { REFUGIO_PAD_H } from '@/constants/refugioScreenStyles';

import perro1 from '@/assets/images/mascotas/perro1.jfif';
import gato1 from '@/assets/images/mascotas/gato1.jfif';
import conejo1 from '@/assets/images/mascotas/conejo1.jfif';
import croquetas from '@/assets/images/mascotas/croquetas.jfif';
import shampoo from '@/assets/images/mascotas/shampoo.jfif';
import correa from '@/assets/images/mascotas/correa.jfif';

const GAP = 10;
const COLS = 2;

/** 1=perro, 2=gato, 3-4-6=productos, 5=conejo */
const GRID_IMAGES: ImageSourcePropType[] = [
  perro1,
  gato1,
  croquetas,
  shampoo,
  conejo1,
  correa,
];

type Props = {
  /** Padding lateral (debe coincidir con el contenido de la pantalla) */
  horizontalPadding?: number;
};

export default function RandomImageGrid({ horizontalPadding = REFUGIO_PAD_H }: Props) {
  const { width: windowWidth } = useWindowDimensions();

  const innerW = windowWidth - horizontalPadding * 2 - GAP;
  const cellW = innerW / COLS;
  const cellH = cellW * 0.72;

  return (
    <View style={[styles.wrap, { paddingHorizontal: horizontalPadding }]}>
      <Text style={styles.introText}>
        Explora esta app y conoce todo lo que tenemos para ti
      </Text>
      <View style={[styles.grid, { columnGap: GAP, rowGap: GAP }]}>
        {GRID_IMAGES.map((source, index) => (
          <View key={index} style={[styles.cell, { width: cellW, height: cellH }]}>
            <View style={styles.imageFrame}>
              <Image source={source} style={styles.image} contentFit="cover" transition={200} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 28,
    zIndex: 2,
  },
  introText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F6829',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    borderRadius: 12,
    padding: 3,
    backgroundColor: '#FFFEF5',
    borderWidth: 1,
    borderColor: '#1F6829',
  },
  imageFrame: {
    flex: 1,
    borderRadius: 9,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D8EBD2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
