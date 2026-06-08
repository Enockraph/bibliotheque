@'
import { supabase } from './supabase.js';
export async function getBooks(search = '', categorie = '') { let query = supabase.from('books').select('*').order('created_at', { ascending: false }); if (search) query = query.ilike('titre', `%${search}%`); if (categorie) query = query.eq('categorie', categorie); const { data, error } = await query; if (error) throw error; return data; }
export async function getBook(id) { const { data, error } = await supabase.from('books').select('*').eq('id', id).single(); if (error) throw error; return data; }
export async function addBook(book) { const { data, error } = await supabase.from('books').insert([book]).select().single(); if (error) throw error; return data; }
export async function updateBook(id, updates) { const { error } = await supabase.from('books').update(updates).eq('id', id); if (error) throw error; }
export async function deleteBook(id) { const { error } = await supabase.from('books').delete().eq('id', id); if (error) throw error; }
export async function getCategories() { const { data } = await supabase.from('books').select('categorie'); const cats = [...new Set(data?.map(b => b.categorie).filter(Boolean))]; return cats.sort(); }
export async function getFavorites(userId) { const { data } = await supabase.from('favorites').select('book_id, books(*)').eq('user_id', userId); return data?.map(f => f.books) || []; }
export async function toggleFavorite(userId, bookId) { const { data: existing } = await supabase.from('favorites').select('id').eq('user_id', userId).eq('book_id', bookId).single(); if (existing) { await supabase.from('favorites').delete().eq('id', existing.id); return false; } else { await supabase.from('favorites').insert([{ user_id: userId, book_id: bookId }]); return true; } }
'@ | Set-Content js\books.js -Encoding utf8