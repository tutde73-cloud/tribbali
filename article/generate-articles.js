const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Ambil kunci Supabase dari Environment Variables GitHub Actions
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function generateStaticArticles() {
    console.log('Fetching articles from Supabase...');
    const { data: articles, error } = await supabase.from('articles').select('*');

    if (error) {
        console.error('Error fetching articles:', error);
        process.exit(1);
    }

    // Pastikan folder 'article' ada
    const outputDir = path.join(__dirname, 'article');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Template HTML standar untuk setiap artikel
    articles.forEach((article) => {
        const slug = article.slug;
        const title = article.title || 'SpotTribe Bali Article';
        const description = article.description || 'Explore Bali guides on SpotTribe Bali.';
        
        // Ambil gambar cover dari database atau fallback ke logo utama
        const coverImage = article.cover_image || article.image_url || article.thumbnail || 'https://spottribebali.com/favicon.png';
        const canonicalUrl = `https://spottribebali.com/article/ ${slug}`; // sesuaikan struktur URL Anda

        const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | SpotTribe Bali</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="https://spottribebali.com/article.html?slug=${slug}">
    <link rel="icon" type="image/png" href="../favicon.png">

    <!-- Open Graph / Facebook Share Meta Tags (Server-Generated & Crawler Friendly) -->
    <meta property="og:site_name" content="SpotTribe Bali">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title} | SpotTribe Bali">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${coverImage}">
    <meta property="og:url" content="https://spottribebali.com/article.html?slug=${slug}">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} | SpotTribe Bali">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${coverImage}">

    <!-- Tailwind CSS & Lucide Icons -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

    <style>
        body { background-color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; }
        .glass-nav-dark { background: rgba(15, 23, 42, 0.90); backdrop-filter: blur(16px); }
        .article-body p { margin-bottom: 1.5rem; line-height: 1.8; color: #334155; font-size: 1.05rem; }
        .article-body h2 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem; }
        .article-body img { border-radius: 1.5rem; width: 100%; height: auto; margin: 2rem 0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
    </style>
</head>
<body class="flex flex-col min-h-screen text-slate-800">
    <header class="glass-nav-dark border-b border-slate-800 px-6 h-[72px] flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-md flex items-center justify-center shrink-0">
                <img src="../favicon.png" alt="Logo" class="w-full h-full object-cover">
            </div>
            <div>
                <h1 class="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
                    SpotTribe <span class="text-emerald-400 text-[11px] font-mono uppercase px-2 py-0.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">BALI</span>
                </h1>
                <p class="text-[10px] text-slate-400 font-medium">Elite Island Journal & Guides</p>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <a href="../journal.html" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700">Journal</a>
            <a href="../index.html" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700">Map</a>
        </div>
    </header>

    <main class="max-w-3xl mx-auto px-6 py-12 flex-grow w-full">
        <a href="../journal.html" class="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 mb-6 transition">
            ← Back to Journal
        </a>
        <article class="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8">
            <div class="space-y-4 border-b border-slate-100 pb-8">
                <div class="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600">
                    <span class="px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-200">SpotTribe Editorial</span>
                    <span class="text-slate-400">• ${new Date(article.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    ${article.title}
                </h1>
            </div>
            <div class="article-body">
                ${article.content || '<p>No content available.</p>'}
            </div>
        </article>
    </main>

    <footer class="bg-slate-900 text-slate-300 py-8 px-6 border-t border-slate-800 text-center text-xs">
        <p>© 2026 SpotTribe BALI. All rights reserved.</p>
    </footer>
    <script>lucide.createIcons();</script>
</body>
</html>`;

        // Simpan file dengan nama berdasarkan slug artikel, misal: article/panduan-bali.html
        const filePath = path.join(outputDir, `${slug}.html`);
        fs.writeFileSync(filePath, htmlContent, 'utf8');
        console.log(`Generated static page for: ${slug}`);
    });
}

generateStaticArticles();
