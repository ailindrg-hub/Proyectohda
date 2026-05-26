import { getSupabase } from '@/lib/supabase';

export type Profile = {
  id: string;
  nombre: string | null;
  apellido: string | null;
  phone: string | null;
  avatar_url: string | null;
  updated_at: string | null;
};

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await getSupabase()
    .from('profiles')
    .select('id, nombre, apellido, phone, avatar_url, updated_at')
    .eq('id', userId)
    .single();

  if (error) {
    console.warn('fetchProfile:', error.message);
    return null;
  }
  return data;
}

export async function updateProfile(
  userId: string,
  fields: Partial<Pick<Profile, 'nombre' | 'apellido' | 'phone' | 'avatar_url'>
  >
): Promise<{ error: string | null }> {
  const { error } = await getSupabase()
    .from('profiles')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', userId);

  return { error: error?.message ?? null };
}

export async function uploadAvatar(
  userId: string,
  fileUri: string,
  mimeType = 'image/jpeg'
): Promise<{ publicUrl: string | null; error: string | null }> {
  const path = `${userId}/avatar.jpg`;

  const response = await fetch(fileUri);
  const blob = await response.blob();
  const arrayBuffer = await new Response(blob).arrayBuffer();

  const { error: uploadError } = await getSupabase().storage
    .from('avatars')
    .upload(path, arrayBuffer, { contentType: mimeType, upsert: true });

  if (uploadError) {
    return { publicUrl: null, error: uploadError.message };
  }

  const { data } = getSupabase().storage.from('avatars').getPublicUrl(path);
  return { publicUrl: data.publicUrl, error: null };
}
