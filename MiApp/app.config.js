const path = require('path');
const fs = require('fs');
const appJson = require('./app.json');

const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  console.warn('[MiApp] No existe MiApp/.env — crea el archivo desde .env.example');
}

function env(name) {
  return (process.env[name] ?? '').trim();
}

const supabaseUrl =
  env('EXPO_PUBLIC_SUPABASE_URL') || env('NEXT_PUBLIC_SUPABASE_URL');

const supabaseAnonKey =
  env('EXPO_PUBLIC_SUPABASE_ANON_KEY') ||
  env('EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY') ||
  env('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
  env('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');

if (supabaseUrl && supabaseAnonKey) {
  console.log('[MiApp] Supabase configurado:', supabaseUrl);
} else {
  console.warn(
    '[MiApp] Faltan EXPO_PUBLIC_SUPABASE_URL o EXPO_PUBLIC_SUPABASE_ANON_KEY en MiApp/.env'
  );
}

module.exports = {
  expo: {
    ...appJson.expo,
    extra: {
      ...appJson.expo?.extra,
      supabaseUrl,
      supabaseAnonKey,
    },
  },
};
