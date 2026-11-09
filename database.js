// database.js - SpotTribe Bali Local Database (Commercial & Services Only)

const categoryNames = {
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

const mockDatabase = {
  'villas': [
    { name: "Villa Sunset Breeze", area: "Seminyak, Bali", rating: 4.9, priceVal: 1200, price: "$1,200 / mo", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80", amenity: "🏊 Private Pool • 📶 Wifi 300Mbps" },
    { name: "Jungle Canopy Villa", area: "Ubud, Bali", rating: 4.95, priceVal: 980, price: "$980 / mo", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80", amenity: "🌿 Valley View • ☕ Kitchen" },
    { name: "Echo Beach Modern Villa", area: "Canggu, Bali", rating: 4.8, priceVal: 1500, price: "$1,500 / mo", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", amenity: "🌊 Near Beach • 🛏️ 3 Bedrooms" },
    { name: "Uluwatu Cliffside Estate", area: "Uluwatu, Bali", rating: 4.98, priceVal: 2400, price: "$2,400 / mo", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", amenity: "🌅 Ocean View • 🏊 Infinity Pool" }
  ],
  'coliving': [
    { name: "Griya Taman Gulingan", area: "Jimbaran, Bali", rating: 4.9, priceVal: 380, price: "$380 / mo", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80", amenity: "📶 Wifi 200Mbps • 🏊 Pool" },
    { name: "Villa Satay", area: "Canggu, Bali", rating: 4.8, priceVal: 520, price: "$520 / mo", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80", amenity: "📶 Wifi 150Mbps • 🛵 Free Parking" },
    { name: "The Lemon House", area: "Pererenan, Bali", rating: 4.95, priceVal: 650, price: "$650 / mo", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", amenity: "📶 Wifi 300Mbps • 🌿 Garden" }
  ],
  'hotels': [
    { name: "The Apurva Kempinski", area: "Nusa Dua, Bali", rating: 4.9, priceVal: 250, price: "$250 / night", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80", amenity: "⭐ 5-Star Luxury • 🏖️ Private Beach" },
    { name: "Capella Ubud", area: "Ubud, Bali", rating: 4.95, priceVal: 450, price: "$450 / night", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80", amenity: "⛺ Luxury Tents • 🌿 Rainforest" }
  ],
  'waterfall': [
    { name: "Tegenungan Waterfall", area: "Gianyar, Bali", rating: 4.7, priceVal: 2, price: "IDR 20k entry", image: "https://images.unsplash.com/photo-1532188904184-1fa917d5d718?auto=format&fit=crop&w=600&q=80", amenity: "🌊 Easy Access • 📸 Scenic View" },
    { name: "Sekumpul Waterfall", area: "Buleleng, Bali", rating: 4.9, priceVal: 3, price: "IDR 30k entry", image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=600&q=80", amenity: "🌿 Twin Waterfalls • 🥾 Trekking" }
  ],
  'cafe': [
    { name: "Seniman Coffee Studio", area: "Ubud, Bali", rating: 4.8, priceVal: 10, price: "$$ • Coffee & Work", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80", amenity: "📶 Wifi 150Mbps • 🔌 Power Outlets" },
    { name: "Milu By Nook", area: "Canggu, Bali", rating: 4.7, priceVal: 12, price: "$$ • Brunch", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80", amenity: "🌾 Rice Field View • ☕ Artisan Coffee" }
  ],
  'coworking': [
    { name: "Dojo Bali Coworking", area: "Canggu, Bali", rating: 4.85, priceVal: 220, price: "$220 / mo", image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80", amenity: "📶 High-Speed Fiber • 🏊 Pool & Café" },
    { name: "Outpost Ubud", area: "Penestanan, Ubud", rating: 4.9, priceVal: 200, price: "$200 / mo", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80", amenity: "🌿 Jungle View • 🛜 AC & Ergonomic" }
  ],
  'rental': [
    { name: "Bata Scooter Rental", area: "Seminyak, Bali", rating: 4.8, priceVal: 70, price: "$70 / mo", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80", amenity: "🛵 Nmax / PCX • 🪖 Free Helmets" },
    { name: "Bali Bike Delivery", area: "Canggu, Bali", rating: 4.75, priceVal: 65, price: "$65 / mo", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80", amenity: "🛵 Scoopy / Vario • 🔧 Free Maintenance" }
  ]
};
