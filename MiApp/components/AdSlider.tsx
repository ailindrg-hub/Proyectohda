import { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  type ListRenderItemInfo,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';

/** Sustituye estas URLs por require(...) a tus banners en assets/images/ads/ */
const AD_IMAGE_SOURCES = [
  require('@/assets/images/logo_huellitas.png'),
  { uri: 'https://picsum.photos/id/237/600/400' },
  { uri: 'https://picsum.photos/id/1025/600/400' },
  { uri: 'https://picsum.photos/id/1062/600/400' },
  { uri: 'https://picsum.photos/id/1084/600/400' },
  { uri: 'https://picsum.photos/id/219/600/400' },
] as const;

type AdImageSource = (typeof AD_IMAGE_SOURCES)[number];
type AdSlide = readonly [AdImageSource, AdImageSource];

function chunkPairs<T>(arr: readonly T[]): [T, T][] {
  const out: [T, T][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    out.push([arr[i], arr[i + 1]]);
  }
  return out;
}

const AD_SLIDES: AdSlide[] = chunkPairs(AD_IMAGE_SOURCES);
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
        {item.map((src, idx) => (
          <View key={idx} style={styles.adImageWrap}>
            <Image source={src} style={styles.adImage} contentFit="cover" transition={200} />
          </View>
        ))}
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
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E8F5E3',
    borderWidth: 1,
    borderColor: '#D8EBD2',
  },
  adSlide: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 8,
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
