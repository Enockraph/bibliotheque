import { supabase } from './supabase.js';

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getProfile(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
}

export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/index.html' }
  });
  if (error) throw error;
}

export async function loginWithEmail(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function registerWithEmail(email, password, nom) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: nom } }
  });
  if (error) throw error;
}

export async function logout() {
  await supabase.auth.signOut({ scope: 'global' });
  localStorage.clear();
  sessionStorage.clear();
  window.location.replace('index.html');
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) { window.location.href = '../auth.html'; return null; }
  const profile = await getProfile(session.user.id);
  if (!profile || profile.role !== 'admin') {
    window.location.href = '../index.html';
    return null;
  }
  return profile;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) { window.location.href = 'auth.html'; return null; }
  return session;
}
