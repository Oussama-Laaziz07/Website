// --- SPA PAGE ROUTING ---
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`section-${sectionId}`);
    if (target) target.classList.remove('hidden');
}

// --- RENDER ADS GRID ---
function renderAds(adsToRender = ads) {
    const grid = document.getElementById('ads-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (adsToRender.length === 0) {
        grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">Aucune annonce trouvée.</p>';
        return;
    }

    adsToRender.forEach(ad => {
        grid.innerHTML += `
            <div class="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                <img src="${ad.image}" class="h-48 w-full object-cover" alt="Image">
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-semibold uppercase text-orange-600 bg-orange-50 px-2 py-1 rounded">${ad.category}</span>
                        <h3 class="font-bold text-lg text-gray-900 mt-2 line-clamp-1">${ad.title}</h3>
                        <p class="text-xl font-extrabold text-gray-900 mt-1">${ad.price} <span class="text-sm text-gray-500 font-normal">DH</span></p>
                        <p class="text-xs text-gray-400 mt-1"><i class="fa-solid fa-location-dot mr-1"></i>${ad.city}</p>
                    </div>
                    <div class="mt-4 pt-3 border-t flex justify-between items-center">
                        <button onclick="viewAdDetails(${ad.id})" class="text-orange-main font-semibold text-sm hover:underline">Voir détails &rarr;</button>
                        <button onclick="deleteAd(${ad.id})" class="text-red-500 hover:text-red-700 text-sm"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

// --- FILTER & SEARCH LOGIC ---
function filterAds() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const cat = document.getElementById('category-filter').value;
    const city = document.getElementById('city-filter').value;

    const filtered = ads.filter(ad => {
        const matchesSearch = ad.title.toLowerCase().includes(query);
        const matchesCat = cat === '' || ad.category === cat;
        const matchesCity = city === '' || ad.city === city;
        return matchesSearch && matchesCat && matchesCity;
    });

    renderAds(filtered);
}

// --- VIEW DETAILS ---
function viewAdDetails(id) {
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    document.getElementById('detail-img').src = ad.image;
    document.getElementById('detail-category').innerText = ad.category;
    document.getElementById('detail-title').innerText = ad.title;
    document.getElementById('detail-price').innerText = `${ad.price} DH`;
    document.getElementById('detail-city').innerText = `Ville: ${ad.city}`;
    document.getElementById('detail-desc').innerText = ad.description;

    showSection('details');
}

// --- POST NEW AD ---
function handlePostAd(e) {
    e.preventDefault();
    const newAd = {
        id: Date.now(),
        title: document.getElementById('post-title').value,
        price: document.getElementById('post-price').value,
        category: document.getElementById('post-category').value,
        city: document.getElementById('post-city').value,
        image: document.getElementById('post-img').value,
        description: document.getElementById('post-desc').value
    };

    ads.unshift(newAd);
    renderAds();
    alert('Annonce publiée avec succès !');
    showSection('home');
}

// --- DELETE AD ---
function deleteAd(id) {
    if (confirm("Supprimer cette annonce ?")) {
        ads = ads.filter(a => a.id !== id);
        renderAds();
    }
}

// --- SEND MESSAGE ---
function sendMessage(e) {
    e.preventDefault();
    alert("Message envoyé à l'annonceur avec succès !");
    document.getElementById('msg-text').value = '';
}

// --- INITIALIZE PAGE ON LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
    renderAds();
});