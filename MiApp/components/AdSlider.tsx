import { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  Text,
  type ListRenderItemInfo,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';
import perro1 from '@/assets/images/mascotas/perro1.jfif';
import perro2 from '@/assets/images/mascotas/perro2.jfif';
import gato1 from '@/assets/images/mascotas/gato1.jfif';
import anuncio1 from '@/assets/images/mascotas/ANUNCIO1.png';
import anuncio2 from '@/assets/images/mascotas/ANUNCIO2.png';
import anuncio3 from '@/assets/images/mascotas/ANUNCIO3.png';
/** Contenido del slider: anuncios, imágenes y la invitación */
type ImageSource = number | { uri: string };
type AdContent =
  | { kind: 'image'; src: ImageSource }
  | { kind: 'announcement'; title: string; date?: string }
  | { kind: 'invite'; text: string };

function chunkPairs<T>(arr: readonly T[]): [T, T][] {
  const out: [T, T][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    out.push([arr[i], arr[i + 1]]);
  }
  return out;
}

const AD_ITEMS: AdContent[] = [
  { kind: 'image', src: anuncio1 },
  { kind: 'image', src: perro1 },
  { kind: 'image', src: anuncio2 },
  { kind: 'image', src: perro2 },
  { kind: 'image', src: gato1 },
  { kind: 'image', src: anuncio3 },
];

type AdSlide = readonly [AdContent, AdContent];
const AD_SLIDES: AdSlide[] = chunkPairs(AD_ITEMS);
const AUTO_ADVANCE_MS = 4500;
const AD_SLIDER_MARGIN_H = 24;

type Props = { sliderHeight: number };

export default function AdSlider({ sliderHeight }: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const listRef = useRef<FlatList<AdSlide>>(null);
  const slideWidth = windowWidth - AD_SLIDER_MARGIN_H * 2;
  const [activeIndex, setActiveIndex] = useState(0);

  const getItemLayout = useCallback(
    (_data: ArrayLike<AdSlide> | null | undefined, index: number) => ({
      length: slideWidth,
      offset: slideWidth * index,
      index,
    }),
    [slideWidth]
  );

  useEffect(() => {
    if (AD_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % AD_SLIDES.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [slideWidth]);

  const onScrollMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const i = Math.round(x / slideWidth);
      setActiveIndex(Math.min(Math.max(i, 0), AD_SLIDES.length - 1));
    },
    [slideWidth]
  );

  const renderSlide = useCallback(
    ({ item }: ListRenderItemInfo<AdSlide>) => (
      <View style={[styles.adSlide, { width: slideWidth, height: sliderHeight }]}>
        {item.map((content, idx) => {
          if (content.kind === 'image') {
            return (
              <View key={idx} style={styles.adImageWrap}>
                <Image source={content.src} style={styles.adImage} contentFit="cover" transition={200} />
              </View>
            );
          }

          if (content.kind === 'announcement') {
            return (
              <View key={idx} style={[styles.adImageWrap, styles.announcementWrap]}>
                <Text style={styles.announcementTitle}>{content.title}</Text>
                {content.date ? <Text style={styles.announcementDate}>{content.date}</Text> : null}
              </View>
            );
          }

          return (
            <View key={idx} style={[styles.adImageWrap, styles.inviteWrap]}>
              <Text style={styles.inviteText}>{content.text}</Text>
            </View>
          );
        })}
      </View>
    ),
    [slideWidth, sliderHeight]
  );

  return (
    <View style={[styles.adSliderSection, { height: sliderHeight }]}>
      <FlatList
        style={styles.adFlatList}
        ref={listRef}
        data={AD_SLIDES}
        keyExtractor={(_, index) => `ad-slide-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={slideWidth}
        snapToAlignment="start"
        getItemLayout={getItemLayout}
        renderItem={renderSlide}
        onMomentumScrollEnd={onScrollMomentumEnd}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            listRef.current?.scrollToIndex({ index: info.index, animated: true });
          }, 350);
        }}
      />
      <View style={styles.adDots} pointerEvents="none">
        {AD_SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.adDot, i === activeIndex ? styles.adDotActive : styles.adDotInactive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adFlatList: {
    flex: 1,
  },
  adSliderSection: {
    zIndex: 2,
    marginHorizontal: AD_SLIDER_MARGIN_H,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF1E6',
    borderWidth: 1,
    borderColor: '#FFCC80',
    shadowColor: '#FFB74D',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  adSlide: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  adImageWrap: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8FFF7',
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  announcementWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: '#FFF3E0',
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D84315',
    textAlign: 'center',
  },
  announcementDate: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#BF360C',
  },
  inviteWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: '#E1F5FE',
  },
  inviteText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16521F',
    textAlign: 'center',
  },
  adDots: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  adDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  adDotActive: {
    backgroundColor: '#1F6829',
    transform: [{ scale: 1.15 }],
  },
  adDotInactive: {
    backgroundColor: 'rgba(31, 104, 41, 0.35)',
  },
});
