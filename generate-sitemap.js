import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://riyupzmllltjrelqytwi.supabase.co'
const supabaseKey = 'sb_publishable_df32CqJ5bqDNCHU4OKGRPQ_7LiJvWV0'
const supabase = createClient(supabaseUrl, supabaseKey)

// Fungsi helper untuk mengubah nama tempat menjadi format slug (contoh: "The Edge Bali" -> "the-edge-bali")
function stringToSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Hapus simbol khusus
    .trim()
    .replace(/\s+/g, '-')     // Ganti spasi dengan tanda -
}

async function generateSitemap() {
  // Ambil kolom 'name' dari tabel places
  const { data: places, error } = await supabase
    .from('places')
    .select('name')

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

  // Halaman Dinamis Berdasarkan Kolom 'name' dari Supabase
  if (places) {
    places.forEach(place => {
      if (place.name) {
        const slug = stringToSlug(place.name)
        const currentDate = new Date().toISOString().split('T')[0]
        
        xml += `  <url>\n`
        xml += `    <loc>${baseUrl}/spot-detail.html?slug=${slug}</loc>\n`
        xml += `    <lastmod>${currentDate}</lastmod>\n`
        xml += `    <changefreq>weekly</changefreq>\n`
        xml += `    <priority>0.7</priority>\n`
        xml += `  </url>\n`
      }
    })
  }

  xml += `</urlset>`

  // Simpan ke file sitemap.xml di root folder
  await Deno.writeTextFile('sitemap.xml', xml)
  console.log('Sitemap.xml berhasil di-generate otomatis dari kolom name Supabase!')
}

generateSitemap()
