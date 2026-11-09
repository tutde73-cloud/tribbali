// database.js - SpotTribe Bali Live Database (Supabase Integration)

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Kredensial Supabase Anda
const SUPABASE_URL = 'https://riyupzmllltjrelqytwi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_df32CqJ5bqDNCHU4OKGRPQ_7LiJvWV0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const categoryNames = {
  'villas': 'Villas & Houses',
  'coliving': 'Coliving Hubs',
  'hotels': 'Hotels & Resorts',
  'waterfall': 'Waterfalls',
  'beach-surf': 'Beaches & Surf Spots',
  'volcano-trekking': 'Volcano & Hiking Spots',
  'wildlife': 'Wildlife & Nature',
  'rental': 'Vehicle Rentals',
  'cafe': 'Cafés & Brunch',
  'coworking': 'Coworking Spaces',
  'visa-agency': 'Visa Agencies',
  'medical': 'Medical Clinics',
  'nightclub': 'Nightclubs',
  'beach-club': 'Beach Clubs',
  'temples': 'Temples & Culture',
  'yoga-wellness': 'Yoga & Wellness'
};

// Fungsi untuk mengambil data asli secara real-time dari Supabase
export async function getPlacesByCategory(categoryKey) {
  try {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('category', categoryKey);

    if (error) throw error;

    // Jika data di database ditemukan, format agar cocok dengan frontend
    if (data && data.length > 0) {
      return data.map(place => ({
        name: place.name,
        area: place.area,
        rating: place.rating,
        priceVal: place.price,
        price: place.price_label,
        image: place.image_url,
        amenity: place.amenity,
        latitude: place.latitude,
        longitude: place.longitude
      }));
    }
    
    return [];
  } catch (err) {
    console.error('Error fetching data from Supabase:', err);
    return [];
  }
}
