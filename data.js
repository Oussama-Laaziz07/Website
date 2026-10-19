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