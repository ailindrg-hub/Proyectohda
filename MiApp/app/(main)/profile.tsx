import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '@/contexts/SessionContext';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function ProfileScreen() {
  const router = useRouter();
  const { email, name, setEmail, setName } = useSession();
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);

  const handleSave = () => {
    const trimmedName = localName.trim();
    const trimmedEmail = localEmail.trim();

    if (!trimmedName || !trimmedEmail) {
      alert('Ingresa tu nombre y correo antes de guardar.');
      return;
    }

    setName(trimmedName);
    setEmail(trimmedEmail);
    router.back();
  };

  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={refugioScreenStyles.heroCard}>
        <View style={refugioScreenStyles.heroRow}>
          <Ionicons name="person-circle-outline" size={24} style={refugioScreenStyles.heroIconTint} />
          <Text style={refugioScreenStyles.heroTitle}>Perfil</Text>
        </View>
        <Text style={refugioScreenStyles.heroText}>
          Revisa y modifica tus datos de usuario desde esta pantalla.
        </Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          value={localName}
          onChangeText={setLocalName}
          placeholder="Ingresa tu nombre"
          placeholderTextColor="#8DAF8B"
          style={styles.input}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          value={localEmail}
          onChangeText={setLocalEmail}
          placeholder="ejemplo@correo.com"
          placeholderTextColor="#8DAF8B"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar cambios</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D8EBD2',
  },
  label: {
    fontSize: 14,
    color: '#556D52',
    marginBottom: 8,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#F7F9F3',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: '#25342C',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#1F6829',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
