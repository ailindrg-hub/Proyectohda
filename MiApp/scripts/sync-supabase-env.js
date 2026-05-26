/**
 * Lee MiApp/.env y genera lib/supabase-credentials.ts para que la app
 * tenga las credenciales en el bundle (Expo Go / web / móvil).
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const envPath = path.join(root, '.env');
const outPath = path.join(root, 'lib', 'supabase-credentials.ts');

function parseEnv(content) {
  const vars = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

function pick(vars) {
  const url =
    vars.EXPO_PUBLIC_SUPABASE_URL ||
    vars.NEXT_PUBLIC_SUPABASE_URL ||
    '';
  const key =
    vars.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
    vars.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    vars.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    vars.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    '';
  return { url: url.trim(), key: key.trim() };
}

if (!fs.existsSync(envPath)) {
  console.warn('[sync-supabase-env] No existe MiApp/.env — usa .env.example');
  process.exit(0);
}

const { url, key } = pick(parseEnv(fs.readFileSync(envPath, 'utf8')));

if (!url || !key) {
  console.warn('[sync-supabase-env] Faltan EXPO_PUBLIC_SUPABASE_URL o EXPO_PUBLIC_SUPABASE_ANON_KEY en .env');
  process.exit(0);
}

const file = `/**
 * Generado desde MiApp/.env — no editar a mano.
 * Ejecuta: node scripts/sync-supabase-env.js
 */
export const SUPABASE_URL = ${JSON.stringify(url)};
export const SUPABASE_ANON_KEY = ${JSON.stringify(key)};
`;

fs.writeFileSync(outPath, file, 'utf8');
console.log('[sync-supabase-env] Credenciales sincronizadas en lib/supabase-credentials.ts');
