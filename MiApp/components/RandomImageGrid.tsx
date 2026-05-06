import { useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { REFUGIO_PAD_H } from '@/constants/refugioScreenStyles';

const GAP = 10;
const ROWS = 3;
const COLS = 2;
const TOTAL = ROWS * COLS;

/** IDs de Picsum variados; se barajan para mostrar 6 distintos al azar en cada montaje */
const PICSUM_POOL = [
  237, 1025, 1062, 1084, 219, 433, 593, 659, 718, 783, 792, 837, 866, 905, 1011, 1012, 1015, 1018,
  1020, 1024, 1029, 1031, 1033, 1035, 1036, 1038, 1040, 1041, 1043, 1044,
] as const;

function pickRandomSources(): { uri: string }[] {
  const copy = [...PICSUM_POOL];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = t;
  }
  return copy.slice(0, TOTAL).map((id) => ({
    uri: `https://picsum.photos/id/${id}/500/380`,
  }));
}

type Props = {
  /** Padding lateral (debe coincidir con el contenido de la pantalla) */
  horizontalPadding?: number;
};

export default function RandomImageGrid({ horizontalPadding = REFUGIO_PAD_H }: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const sources = useMemo(() => pickRandomSources(), []);

  const innerW = windowWidth - horizontalPadding * 2 - GAP;
  const cellW = innerW / COLS;
  const cellH = cellW * 0.72;

  return (
    <View style={[styles.wrap, { paddingHorizontal: horizontalPadding }]}>
      <View style={[styles.grid, { columnGap: GAP, rowGap: GAP }]}>
        {sources.map((src, index) => (
          <View key={`${src.uri}-${index}`} style={[styles.cell, { width: cellW, height: cellH }]}>
            <Image source={src} style={styles.image} contentFit="cover" transition={200} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 12,
    zIndex: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8FFF7',
    borderWidth: 1,
    borderColor: '#D8EBD2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
