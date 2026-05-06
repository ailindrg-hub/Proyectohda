import { ScrollView, useWindowDimensions } from 'react-native';
import AdSlider from '@/components/AdSlider';
import RandomImageGrid from '@/components/RandomImageGrid';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function MainInicioScreen() {
  const { height } = useWindowDimensions();
  const sliderHeight = Math.round(height * 0.25);

  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.scrollContentGrow}
      showsVerticalScrollIndicator={false}
    >
      <AdSlider sliderHeight={sliderHeight} />
      <RandomImageGrid />
    </ScrollView>
  );
}
