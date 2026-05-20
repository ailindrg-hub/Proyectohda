import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSession } from '@/contexts/SessionContext';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function ProfileScreen() {
  const router = useRouter();
  const { email, name, phone, profileImage, setEmail, setName, setPhone, setProfileImage } = useSession();
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [localPhone, setLocalPhone] = useState(phone);
  const [localProfileImage, setLocalProfileImage] = useState(profileImage);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Necesitamos permiso para acceder a tus fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setLocalProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const trimmedName = localName.trim();
    const trimmedEmail = localEmail.trim();
    const trimmedPhone = localPhone.trim();

    if (!trimmedName || !trimmedEmail) {
      alert('Ingresa tu nombre y correo antes de guardar.');
      return;
    }

    setName(trimmedName);
    setEmail(trimmedEmail);
    setPhone(trimmedPhone);
    setProfileImage(localProfileImage);
    router.back();
  };

  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.screenTitle}>Perfil</Text>

      <View style={styles.profilePictureContainer}>
        <View style={styles.profilePictureWrapper}>
          {localProfileImage ? (
            <Image source={{ uri: localProfileImage }} style={styles.profilePicture} />
          ) : (
            <View style={styles.profilePictureDefault}>
              <Ionicons name="person-circle-outline" size={90} color="#8DAF8B" />
            </View>
          )}
          <Pressable style={styles.editPictureButton} onPress={pickImage}>
            <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
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

      <View style={styles.inputSection}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          value={localPhone}
          onChangeText={setLocalPhone}
          placeholder="+34 600 000 000"
          placeholderTextColor="#8DAF8B"
          keyboardType="phone-pad"
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
  screenTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F6829',
    marginBottom: 28,
    marginTop: 8,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profilePictureWrapper: {
    position: 'relative',
  },
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#F7F9F3',
    borderWidth: 3,
    borderColor: '#1F6829',
  },
  profilePictureDefault: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#F7F9F3',
    borderWidth: 3,
    borderColor: '#D8EBD2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editPictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1F6829',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
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
    marginBottom: 20,
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
