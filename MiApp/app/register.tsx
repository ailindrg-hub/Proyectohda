import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contacto, setContacto] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Capa de decoración (Burbujas) */}
      <View style={styles.decorationLayer} pointerEvents="none">
        <View style={styles.greenBubble} />
        <View style={styles.yellowGlow} />
        <View style={styles.softAccent} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Encabezado con Icono */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <Ionicons name="person-add" size={72} color="#266B2E" />
              </View>
              <Text style={styles.title}>Registro</Text>
            </View>

            {/* Formulario */}
            <View style={styles.form}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                value={nombre}
                onChangeText={setNombre}
                placeholder="Tu nombre"
                placeholderTextColor="#8DAF8B"
                style={styles.input}
              />

              <Text style={styles.label}>Apellido</Text>
              <TextInput
                value={apellido}
                onChangeText={setApellido}
                placeholder="Tu apellido"
                placeholderTextColor="#8DAF8B"
                style={styles.input}
              />

              <Text style={styles.label}>Número o Correo</Text>
              <TextInput
                value={contacto}
                onChangeText={setContacto}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="correo@ejemplo.com o número"
                placeholderTextColor="#8DAF8B"
                style={styles.input}
              />
            </View>

            {/* Botones de Acción */}
            <View style={styles.actionsRow}>
              <Pressable 
                style={[styles.button, styles.leftButton]}
                onPress={() => router.back()}
              >
                <Text style={[styles.buttonText, styles.leftButtonText]}>Volver</Text>
              </Pressable>
              <Pressable 
                style={[styles.button, styles.rightButton]}
                onPress={() => console.log('Registro:', { nombre, apellido, contacto })}
              >
                <Text style={[styles.buttonText, styles.rightButtonText]}>Registrarse</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  decorationLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  greenBubble: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(71, 170, 87, 0.16)',
    top: -80,
    left: -90,
  },
  yellowGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(253, 214, 69, 0.18)',
    top: 120,
    right: -100,
  },
  softAccent: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(130, 194, 142, 0.12)',
    bottom: -60,
    right: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E7F6E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F6829',
  },
  form: {
    gap: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3E5D39',
    marginBottom: 8,
  },
  input: {
    height: 54,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#D8EBD2',
    borderRadius: 16,
    backgroundColor: '#F8FFF7',
    color: '#233627',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  leftButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6BB55A',
  },
  rightButton: {
    backgroundColor: '#57A145',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  leftButtonText: {
    color: '#57A145',
  },
  rightButtonText: {
    color: '#FFFFFF',
  },
});
