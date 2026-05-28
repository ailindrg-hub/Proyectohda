import type { ImageSourcePropType } from 'react-native';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

import conejo1 from '@/assets/images/mascotas/conejo1.jfif';
import conejo2 from '@/assets/images/mascotas/conejo2.jfif';
import gato1 from '@/assets/images/mascotas/gato1.jfif';
import gato2 from '@/assets/images/mascotas/gato2.webp';
import perro1 from '@/assets/images/mascotas/perro1.jfif';
import perro2 from '@/assets/images/mascotas/perro2.jfif';
import perro3 from '@/assets/images/mascotas/perro3.jfif';
import perro4 from '@/assets/images/mascotas/perro4.jfif';
import perro5 from '@/assets/images/mascotas/perro5.jfif';
import perro6 from '@/assets/images/mascotas/perro6.jfif';
import perro7 from '@/assets/images/mascotas/perro7.jfif';
import perro8 from '@/assets/images/mascotas/perro8.jfif';

const CARD_GAP = 12;
const CARD_COLS = 2;

/** 12 archivos locales: una imagen por tarjeta (orden fijo alfabetico, sin relacion con el texto de la tarjeta) */
const MASCOTA_IMAGES: ImageSourcePropType[] = [
  conejo1,
  conejo2,
  gato1,
  gato2,
  perro1,
  perro2,
  perro3,
  perro4,
  perro5,
  perro6,
  perro7,
  perro8,
];

const PETS_RAW = [
  {
    id: 'rabbit-1',
    nombre: 'Nube',
    tipo: 'Conejo',
    edad: '8 meses',
    nota: 'Curioso y muy tierno.',
  },
  {
    id: 'rabbit-2',
    nombre: 'Pelusa',
    tipo: 'Conejo',
    edad: '9 meses',
    nota: 'Amigable y súper suave.',
  },
  {
    id: 'cat-1',
    nombre: 'Luna',
    tipo: 'Gato',
    edad: '1 año',
    nota: 'Tranquila, ideal para departamento.',
  },
  {
    id: 'cat-2',
    nombre: 'Mia',
    tipo: 'Gato',
    edad: '2 años',
    nota: 'Cariñosa y compañera.',
  },
  {
    id: 'dog-1',
    nombre: 'Max',
    tipo: 'Perro',
    edad: '2 años',
    nota: 'Juguetón y muy sociable.',
  },
  {
    id: 'dog-2',
    nombre: 'Rocky',
    tipo: 'Perro',
    edad: '3 años',
    nota: 'Le encantan los paseos largos.',
  },
  {
    id: 'dog-3',
    nombre: 'Toby',
    tipo: 'Perro',
    edad: '4 años',
    nota: 'Obediente y protector.',
  },
  {
    id: 'dog-4',
    nombre: 'Bruno',
    tipo: 'Perro',
    edad: '5 años',
    nota: 'Noble y leal con niños.',
  },
  {
    id: 'dog-5',
    nombre: 'Simba',
    tipo: 'Perro',
    edad: '1 año',
    nota: 'Activo y amigable con todos.',
  },
  {
    id: 'dog-6',
    nombre: 'Lolo',
    tipo: 'Perro',
    edad: '2 años',
    nota: 'Le gusta correr y jugar.',
  },
  {
    id: 'dog-7',
    nombre: 'Polo',
    tipo: 'Perro',
    edad: '3 años',
    nota: 'Muy noble y obediente.',
  },
  {
    id: 'dog-8',
    nombre: 'Kira',
    tipo: 'Perro',
    edad: '2 años',
    nota: 'Le encanta jugar con pelotas.',
  },
];

const PETS = PETS_RAW.map((pet, index) => ({
  ...pet,
  image: MASCOTA_IMAGES[index],
}));

export default function MascotasScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const contentWidth = width - 24 * 2;
  const cardWidth = (contentWidth - CARD_GAP) / CARD_COLS;

  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={refugioScreenStyles.heroCard}>
        <View style={refugioScreenStyles.heroRow}>
          <Ionicons name="paw" size={24} style={refugioScreenStyles.heroIconTint} />
          <Text style={refugioScreenStyles.heroTitle}>Mascotas</Text>
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Explora perritos, gatitos y conejitos en adopción, con información clara y fotos destacadas.
        </Text>
      </View>

      <View style={[styles.grid, { rowGap: CARD_GAP, columnGap: CARD_GAP }]}>
        {PETS.map((pet) => (
          <View key={pet.id} style={[styles.card, { width: cardWidth }]}>
            <Image source={pet.image} style={styles.squareImage} contentFit="cover" transition={150} />
            <View style={styles.infoBlock}>
              <Text style={styles.petName}>{pet.nombre}</Text>
              <Text style={styles.petMeta}>
                {pet.tipo} - {pet.edad}
              </Text>
              <Text style={styles.petNote}>{pet.nota}</Text>
              
              <Pressable 
                style={styles.adoptButton}
                onPress={() => router.push({
                  pathname: '/(main)/adopcion-form',
                  params: { nombreMascota: pet.nombre }
                })}
              >
                <Text style={styles.adoptButtonText}>AGENDAR ADOPCIÓN</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: '#D8EBD2',
  },
  squareImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#EEF8EC',
  },
  infoBlock: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: 90,
  },
  petName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F6829',
    marginBottom: 4,
  },
  petMeta: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B7750',
    marginBottom: 4,
  },
  petNote: {
    fontSize: 12,
    lineHeight: 17,
    color: '#3E5D39',
    marginBottom: 10,
  },
  adoptButton: {
    backgroundColor: '#1F6829',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  adoptButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '800',
  },
});
