import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Inisialisasi Supabase menggunakan kunci yang Anda berikan
const supabaseUrl = 'https://riyupzmllltjrelqytwi.supabase.co'
const supabaseKey = 'sb_publishable_df32CqJ5bqDNCHU4OKGRPQ_7LiJvWV0'
const supabase = createClient(supabaseUrl, supabaseKey)

async function generateSitemap() {
  // Mengambil data slug dari tabel places
  const { data: places, error } = await supabase
    .from('places')
    .select('slug, updated_at')

  if (error) {
    console.error('Gagal mengambil data dari Supabase:', error)
    process.exit(1)
  }

  const baseUrl = 'https://spottribebali.com'
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  // Halaman Statis Utama
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/category.html', changefreq: 'weekly', priority: '0.8' },
    { url: '/community.html', changefreq: 'daily', priority: '0.8' }
  ]

  staticPages.forEach(page => {
    xml += `  <url>\n`
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`
    xml += `    <priority>${page.priority}</priority>\n`
    xml += `  </url>\n`
  })

  // Halaman Dinamis berdasarkan Slug dari Supabase
  if (places) {
    places.forEach(place => {
      if (place.slug) {
        const lastmod = place.updated_at ? place.updated_at.split('T')[0] : new Date().toISOString().split('T')[0]
        xml += `  <url>\n`
        xml += `    <loc>${baseUrl}/spot-detail.html?slug=${place.slug}</loc>\n`
        xml += `    <lastmod>${lastmod}</lastmod>\n`
        xml += `    <changefreq>weekly</changefreq>\n`
        xml += `    <priority>0.7</priority>\n`
        xml += `  </url>\n`
      }
    })
  }

  xml += `</urlset>`

  // Simpan hasilnya ke file sitemap.xml di root folder repository
  await Deno.writeTextFile('sitemap.xml', xml)
  console.log('Sitemap.xml berhasil di-generate secara otomatis dari Supabase!')
}

generateSitemap()
