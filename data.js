// --- CENTRAL DATA STORE ---
let cities = ["Casablanca", "Rabat", "Tanger", "Marrakech", "Agadir"];
let categories = ["Automobile", "Immobilier", "Informatique", "Maison & Déco", "Sports & Loisirs"];
let users = [
    { id: 1, name: "Sarah Bennani", email: "sarah@gmail.com" },
    { id: 2, name: "Omar Amrani", email: "omar@gmail.com" }
];

let ads = [
    {
        id: 1,
        title: "Vélo de ville vintage - Bon état",
        price: 1200,
        category: "Sports & Loisirs",
        city: "Casablanca",
        image: "/images/velo.jpg",
        description: "Vélo vert en très bon état. Vendu avec panier avant. À récupérer sur place."
    },
    {
        id: 2,
        title: "PC Portable Lenovo LOQ RTX 3050",
        price: 7500,
        category: "Informatique",
        city: "Tanger",
        image: "/images/pc.jpg",
        description: "PC de jeu et développement. Ryzen 5, 16 Go RAM, 1 TB SSD."
    },
    {
        id: 3,
        title: "Appartement 2 pièces meublé",
        price: 4500,
        category: "Immobilier",
        city: "Tanger",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
        description: "Bel appartement lumineux situé au centre-ville. Proche de toutes commodités, idéal pour étudiant ou couple."
    },
    {
        id: 4,
        title: "Voiture Dacia Logan - Diesel",
        price: 65000,
        category: "Automobile",
        city: "Casablanca",
        image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&auto=format&fit=crop&q=80",
        description: "Dacia Logan modèle 2017, faible kilométrage, climatisée, entretien régulier fait chez la maison."
    },
    {
        id: 5,
        title: "Canapé 3 places moderne",
        price: 2300,
        category: "Maison & Déco",
        city: "Rabat",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
        description: "Canapé confortable en tissu gris clair, très bon état, presque neuf. À venir récupérer sur place."
    },
    {
        id: 6,
        title: "PlayStation 4 Slim + 2 Manettes",
        price: 2200,
        category: "Informatique",
        city: "Marrakech",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80",
        description: "Console en excellent état avec deux manettes DualShock 4 et trois jeux inclus."
    },
    {
        id: 7,
        title: "Salon de jardin en rotin",
        price: 3400,
        category: "Maison & Déco",
        city: "Agadir",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
        description: "Salon de jardin complet comprenant une table basse et des coussins étanches. Idéal pour terrasse ou balcon."
    }
];

// --- POPULATE SELECT DROPDOWNS ---
function populateDropdowns() {
    const catFilter = document.getElementById('category-filter');
    const cityFilter = document.getElementById('city-filter');
    const postCat = document.getElementById('post-category');
    const postCity = document.getElementById('post-city');

    if (!catFilter || !cityFilter) return;

    catFilter.innerHTML = '<option value="">Toutes les catégories</option>';
    cityFilter.innerHTML = '<option value="">Toutes les villes</option>';
    postCat.innerHTML = '';
    postCity.innerHTML = '';

    categories.forEach(c => {
        catFilter.innerHTML += `<option value="${c}">${c}</option>`;
        postCat.innerHTML += `<option value="${c}">${c}</option>`;
    });

    cities.forEach(c => {
        cityFilter.innerHTML += `<option value="${c}">${c}</option>`;
        postCity.innerHTML += `<option value="${c}">${c}</option>`;
    });

    renderAdminLists();
}

// --- ADMIN DASHBOARD FUNCTIONS ---
function addCity() {
    const name = document.getElementById('new-city-input').value.trim();
    if (name) { 
        cities.push(name); 
        document.getElementById('new-city-input').value = ''; 
        populateDropdowns(); 
    }
}

function deleteCity(name) {
    cities = cities.filter(c => c !== name); 
    populateDropdowns();
}

function addCategory() {
    const name = document.getElementById('new-cat-input').value.trim();
    if (name) { 
        categories.push(name); 
        document.getElementById('new-cat-input').value = ''; 
        populateDropdowns(); 
    }
}

function deleteCategory(name) {
    categories = categories.filter(c => c !== name); 
    populateDropdowns();
}

function deleteUser(id) {
    users = users.filter(u => u.id !== id); 
    renderAdminLists();
}

function renderAdminLists() {
    const citiesList = document.getElementById('admin-cities-list');
    const catList = document.getElementById('admin-categories-list');
    const usersList = document.getElementById('admin-users-list');

    if (citiesList) citiesList.innerHTML = cities.map(c => `<li class="py-2 flex justify-between text-sm"><span>${c}</span><button onclick="deleteCity('${c}')" class="text-red-500"><i class="fa-solid fa-trash"></i></button></li>`).join('');
    if (catList) catList.innerHTML = categories.map(c => `<li class="py-2 flex justify-between text-sm"><span>${c}</span><button onclick="deleteCategory('${c}')" class="text-red-500"><i class="fa-solid fa-trash"></i></button></li>`).join('');
    if (usersList) usersList.innerHTML = users.map(u => `<li class="py-2 flex justify-between text-sm"><span>${u.name} (${u.email})</span><button onclick="deleteUser(${u.id})" class="text-red-500"><i class="fa-solid fa-user-xmark"></i> Supprimer</button></li>`).join('');
}