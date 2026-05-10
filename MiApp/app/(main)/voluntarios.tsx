import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

const PRODUCTS = [
  {
    id: '1',
    name: 'Croquetas Adulto Pro',
    description: 'Bulto de 15kg. Nutrición completa para perros adultos de raza mediana.',
    price: '$850 MXN',
    icon: 'fast-food'
  },
  {
    id: '2',
    name: 'Shampoo Antipulgas',
    description: 'Fórmula natural de 500ml. Protege y suaviza el pelaje de tu mascota.',
    price: '$120 MXN',
    icon: 'water'
  },
  {
    id: '3',
    name: 'Correa de Entrenamiento',
    description: 'Correa reforzada de 2 metros. Ideal para paseos seguros y controlados.',
    price: '$250 MXN',
    icon: 'link'
  },
  {
    id: '4',
    name: 'Arena para Gato Premium',
    description: 'Bolsa de 5kg. Alta absorción y control de olores cítricos.',
    price: '$180 MXN',
    icon: 'leaf'
  },
  {
    id: '5',
    name: 'Cama Ortopédica S',
    description: 'Para mascotas pequeñas. Espuma de memoria para máximo descanso.',
    price: '$550 MXN',
    icon: 'bed'
  },
  {
    id: '6',
    name: 'Plato de Acero Inox',
    description: 'Capacidad de 1L. Base antideslizante, fácil de lavar y duradero.',
    price: '$150 MXN',
    icon: 'disc'
  },
  {
    id: '7',
    name: 'Juguete Mordedor KONG',
    description: 'Caucho ultra resistente. Ayuda a la salud dental y reduce ansiedad.',
    price: '$320 MXN',
    icon: 'basketball'
  },
  {
    id: '8',
    name: 'Cepillo para Pelaje',
    description: 'Cerdas suaves para eliminar pelo muerto en gatos y perros.',
    price: '$95 MXN',
    icon: 'brush'
  },
  {
    id: '9',
    name: 'Transportadora Mediana',
    description: 'Plástico rígido con ventilación. Cumple normas para viajes.',
    price: '$1,200 MXN',
    icon: 'airplane'
  },
  {
    id: '10',
    name: 'Snacks de Pollo Natural',
    description: 'Paquete de 200g. Sin conservadores, 100% proteína natural.',
    price: '$65 MXN',
    icon: 'nutrition'
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
            <View style={styles.iconContainer}>
              <Ionicons name={product.icon as any} size={40} color="#57A145" />
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
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D8EBD2',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: 18,
    backgroundColor: '#F1F8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
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
