import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable, Image } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GuestLoginPrompt from '@/components/GuestLoginPrompt';
import LockButton from '@/components/LockButton';
import { useSession } from '@/contexts/SessionContext';
import { useGuestGate } from '@/hooks/use-guest-gate';
import { getSupabase } from '@/lib/supabase';
import { updateProfile } from '@/lib/profile';
import { isValidEmail } from '@/lib/validation';
import { refugioScreenStyles } from '@/constants/refugioScreenStyles';

export default function ProfileScreen() {
  const router = useRouter();
  const { email, name, phone, profileImage, setName, setPhone, setProfileImage, setEmail } = useSession();
  const { isGuest, promptVisible, showLoginPrompt, hideLoginPrompt } = useGuestGate();

  const leaveProfile = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/(main)/(tabs)' as Href);
  };
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [localPhone, setLocalPhone] = useState(phone);
  const [localProfileImage, setLocalProfileImage] = useState(profileImage);

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  useEffect(() => {
    setLocalEmail(email);
  }, [email]);

  useEffect(() => {
    setLocalPhone(phone);
  }, [phone]);

  useEffect(() => {
    setLocalProfileImage(profileImage);
  }, [profileImage]);

  const pickImage = async () => {
    if (isGuest) {
      showLoginPrompt();
      return;
    }
    try {
      const ImagePicker = await import('expo-image-picker');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Necesitamos permiso para acceder a tus fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        setLocalProfileImage(result.assets[0].uri);
      }
    } catch (err) {
      console.warn('[profile] image picker', err);
      alert('No se pudo abrir la galería de fotos.');
    }
  };

  const handleSave = async () => {
    if (isGuest) {
      showLoginPrompt();
      return;
    }
    const trimmedName = localName.trim();
    const trimmedEmail = localEmail.trim();
    const phoneDigits = localPhone.replace(/\D/g, '');

    if (!trimmedName) {
      alert('Ingresa tu nombre antes de guardar.');
      return;
    }

    if (!isGuest) {
      if (!trimmedEmail) {
        alert('Ingresa tu correo antes de guardar.');
        return;
      }
      if (!isValidEmail(trimmedEmail)) {
        alert('Ingresa un correo válido (ej: usuario@dominio.com)');
        return;
      }
    }

    if (phoneDigits.length > 0 && phoneDigits.length !== 10) {
      alert('El teléfono debe tener exactamente 10 dígitos.');
      return;
    }

    const supabase = getSupabase();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user?.id) {
      console.warn('[profile] getUser failed', userError?.message ?? 'no user');
      setName(trimmedName);
      setPhone(phoneDigits);
      setProfileImage(localProfileImage);
      leaveProfile();
      return;
    }

    const currentEmail = userData.user.email ?? '';
    if (trimmedEmail !== currentEmail) {
      const { error: updateError } = await supabase.auth.updateUser({ email: trimmedEmail });
      if (updateError) {
        alert('No se pudo actualizar el correo: ' + updateError.message);
        return;
      }
      alert(
        'Se envió un correo de confirmación a ' +
          trimmedEmail +
          '. Tu correo seguirá siendo ' +
          currentEmail +
          ' hasta que confirmes.'
      );
    }

    setName(trimmedName);
    setPhone(phoneDigits);
    setProfileImage(localProfileImage);

    const nameParts = trimmedName.split(/\s+/).filter(Boolean);
    const firstName = nameParts.length > 0 ? nameParts[0] : '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const result = await updateProfile(userData.user.id, {
      nombre: firstName || null,
      apellido: lastName || null,
      phone: phoneDigits || null,
    });

    if (result.error) {
      alert('No se pudo guardar el teléfono: ' + result.error);
      return;
    }

    setEmail(trimmedEmail);
    leaveProfile();
  };

  return (
    <ScrollView
      style={refugioScreenStyles.scroll}
      contentContainerStyle={refugioScreenStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.titleRow}>
        <Pressable onPress={leaveProfile} hitSlop={12} accessibilityLabel="Volver">
          <Ionicons name="arrow-back" size={28} color="#1F6829" />
        </Pressable>
        <Text style={styles.screenTitle}>Perfil</Text>
      </View>

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
            <Ionicons
              name={isGuest ? 'lock-closed' : 'camera-outline'}
              size={20}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Nombre</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={localName}
            onChangeText={setLocalName}
            placeholder="Ingresa tu nombre"
            placeholderTextColor="#8DAF8B"
            style={[styles.input, { flex: 1 }]}
            editable={!isGuest}
          />
          {isGuest ? <LockButton onPress={showLoginPrompt} /> : null}
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Correo electrónico</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={localEmail}
            onChangeText={setLocalEmail}
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#8DAF8B"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { flex: 1 }]}
            editable={!isGuest}
          />
          {isGuest ? <LockButton onPress={showLoginPrompt} /> : null}
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Teléfono</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={localPhone}
            onChangeText={(text) => setLocalPhone(text.replace(/\D/g, ''))}
            placeholder="6000000000"
            placeholderTextColor="#8DAF8B"
            keyboardType="phone-pad"
            style={[styles.input, { flex: 1 }]}
            maxLength={10}
            editable={!isGuest}
          />
          {isGuest ? <LockButton onPress={showLoginPrompt} /> : null}
        </View>
      </View>

      <Pressable
        style={[styles.saveButton, isGuest && styles.saveButtonLocked]}
        onPress={handleSave}
      >
        {isGuest ? (
          <>
            <Ionicons name="lock-closed" size={20} color="#FFFFFF" style={styles.saveButtonIcon} />
            <Text style={styles.saveButtonText}>Inicia sesión para guardar</Text>
          </>
        ) : (
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        )}
      </Pressable>

      <GuestLoginPrompt visible={promptVisible} onCancel={hideLoginPrompt} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 28,
    marginTop: 8,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F6829',
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    flexDirection: 'row',
    gap: 8,
  },
  saveButtonLocked: {
    backgroundColor: '#57A145',
  },
  saveButtonIcon: {
    marginRight: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
