import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

const PRODUCTS = [
  {
    id: '1',
    name: 'Croquetas Adulto Pro',
    description: 'Bulto de 15kg. Nutrición completa para perros adultos de raza mediana.',
    price: '$850 MXN',
    image: require('@/assets/images/mascotas/perro1.jfif'),
  },
  {
    id: '2',
    name: 'Shampoo Antipulgas',
    description: 'Fórmula natural de 500ml. Protege y suaviza el pelaje de tu mascota.',
    price: '$120 MXN',
    image: require('@/assets/images/mascotas/perro2.jfif'),
  },
  {
    id: '3',
    name: 'Correa de Entrenamiento',
    description: 'Correa reforzada de 2 metros. Ideal para paseos seguros y controlados.',
    price: '$250 MXN',
    image: require('@/assets/images/mascotas/perro3.jfif'),
  },
  {
    id: '4',
    name: 'Arena para Gato Premium',
    description: 'Bolsa de 5kg. Alta absorción y control de olores cítricos.',
    price: '$180 MXN',
    image: require('@/assets/images/mascotas/gato1.jfif'),
  },
  {
    id: '5',
    name: 'Cama Ortopédica S',
    description: 'Para mascotas pequeñas. Espuma de memoria para máximo descanso.',
    price: '$550 MXN',
    image: require('@/assets/images/mascotas/perro4.jfif'),
  },
  {
    id: '6',
    name: 'Plato de Acero Inox',
    description: 'Capacidad de 1L. Base antideslizante, fácil de lavar y duradero.',
    price: '$150 MXN',
    image: require('@/assets/images/mascotas/perro5.jfif'),
  },
  {
    id: '7',
    name: 'Juguete Mordedor KONG',
    description: 'Caucho ultra resistente. Ayuda a la salud dental y reduce ansiedad.',
    price: '$320 MXN',
    image: require('@/assets/images/mascotas/perro6.jfif'),
  },
  {
    id: '8',
    name: 'Cepillo para Pelaje',
    description: 'Cerdas suaves para eliminar pelo muerto en gatos y perros.',
    price: '$95 MXN',
    image: require('@/assets/images/mascotas/perro7.jfif'),
  },
  {
    id: '9',
    name: 'Transportadora Mediana',
    description: 'Plástico rígido con ventilación. Cumple normas para viajes.',
    price: '$1,200 MXN',
    image: require('@/assets/images/mascotas/perro8.jfif'),
  },
  {
    id: '10',
    name: 'Snacks de Pollo Natural',
    description: 'Paquete de 200g. Sin conservadores, 100% proteína natural.',
    price: '$65 MXN',
    image: require('@/assets/images/mascotas/conejo1.jfif'),
  }
];

export default function VoluntariosScreen() {
  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.warningBanner}>
        <Ionicons name="alert-circle" size={20} color="#C62828" />
        <Text style={styles.warningText}>LAS VENTAS SON SOLO EN TIENDA FISICA</Text>
      </View>

      <View style={refugioScreenStyles.heroCard}>
        <View style={refugioScreenStyles.heroRow}>
          <Ionicons name="bag-handle" size={24} style={refugioScreenStyles.heroIconTint} />
          <Text style={refugioScreenStyles.heroTitle}>Nuestra Tienda</Text>
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Visítanos en nuestra tienda física para adquirir estos productos. Todo lo recaudado apoya directamente a nuestros rescatados.
        </Text>
      </View>

      <View style={styles.productsGrid}>
        {PRODUCTS.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productImageWrap}>
              <Image source={product.image} style={styles.productImage} contentFit="cover" />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  warningBanner: {
    backgroundColor: '#FFEBEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#EF9A9A',
    gap: 10,
    shadowColor: '#C62828',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  warningText: {
    color: '#C62828',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.8,
  },
  productsGrid: {
    gap: 16,
    marginTop: 10,
  },
  productCard: {
    backgroundColor: '#FFFDF5',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3E3B8',
    shadowColor: '#F5CC7C',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  productImageWrap: {
    width: 90,
    height: 90,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#F3F7F1',
    marginRight: 16,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F6829',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#4B7750',
    lineHeight: 18,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#57A145',
  },
});
