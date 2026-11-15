const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://riyupzmllltjrelqytwi.supabase.co';
const supabaseKey = 'sb_publishable_df32CqJ5bqDNCHU4OKGRPQ_7LiJvWV0';
const supabase = createClient(supabaseUrl, supabaseKey);

function stringToSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function generateSitemap() {
  const { data: places, error } = await supabase
    .from('places')
    .select('name');

  if (error) {
    console.error('Gagal mengambil data places:', error);
    process.exit(1);
  }

  const { data: articles } = await supabase
    .from('articles')
    .select('slug');

  const baseUrl = 'https://spottribebali.com';
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/category.html', changefreq: 'weekly', priority: '0.8' },
    { url: '/community.html', changefreq: 'daily', priority: '0.8' },
    { url: '/journal.html', changefreq: 'daily', priority: '0.8' }
  ];

  staticPages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  if (places) {
    places.forEach(place => {
      if (place.name) {
        const slug = stringToSlug(place.name);
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/spot-detail.html?slug=${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    });
  }

  if (articles) {
    articles.forEach(article => {
      if (article.slug) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/article.html?slug=${article.slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    });
  }

  xml += `</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
  console.log('Sitemap.xml berhasil diperbarui!');
}

generateSitemap();
