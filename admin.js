//hana
// Admin Scripts - Person 3
// Completely isolated Admin Management Logic (Does not interact with cart or SPA script.js)
let cachedProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Access Check
    const token = localStorage.getItem('lumiere_token');
    const user = JSON.parse(localStorage.getItem('lumiere_user') || '{}');

    if (token && user.email === 'admin@lumiere.com') {
        showDashboard();
    }

    // Dynamic Search Filter logic
    const searchInput = document.getElementById('admin-search');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = cachedProducts.filter(p => p.name.toLowerCase().includes(query));
            renderTable(filtered);
        });
    }

    // 2. Authentication Logic
    document.getElementById('admin-login-form').onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const err = document.getElementById('error');
        
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            // Verify backend logged in successfully AND identity matches admin strict constraint
            if (res.ok && data.token && email === 'admin@lumiere.com') {
                localStorage.setItem('lumiere_token', data.token);
                localStorage.setItem('lumiere_user', JSON.stringify(data.user));
                err.innerText = '';
                showDashboard();
            } else {
                err.innerText = data.error || 'Access denied. Administrative privileges strictly required.';
            }
        } catch (error) {
            err.innerText = 'Connection error. Ensure backend server is running.';
        }
    };

    // 3. Product Saving Intercept (Triggers UI Modal Instead of direct API call)
    document.getElementById('product-form').onsubmit = (e) => {
        e.preventDefault();
        const id = document.getElementById('p-id').value;
        document.getElementById('save-modal-text').innerText = id 
            ? "Are you sure you want to update this product's information?" 
            : "Are you sure you want to add this product?";
        document.getElementById('save-modal').style.display = 'flex';
    };
});

// Logout mechanism executing total data clearing and redirect routing
window.logout = function() {
    // 1. Clear ALL storage metrics explicitly
    localStorage.removeItem('lumiere_token');
    localStorage.removeItem('lumiere_user');
    sessionStorage.clear();

    // 2. Hide dashboard immediately for security before redirect finishes
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';

    // 3. Force browser relocation to exact homepage
    window.location.href = '/';
};

window.showDashboard = function() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    document.getElementById('admin-search').value = '';
    fetchProducts();
    fetchUsers();
}

async function fetchProducts() {
    try {
        const res = await fetch('/api/admin/products', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('lumiere_token')}` }
        });
        if (!res.ok) throw new Error('Unauthorized');
        
        cachedProducts = await res.json();
        renderTable(cachedProducts);
    } catch(e) {
        document.getElementById('table-body').innerHTML = `<tr><td colspan="6" style="color:#ef4444; font-weight: bold; text-align: center;">Backend authorization failed. Please log in again.</td></tr>`;
        setTimeout(logout, 2000); // Auto kick
    }
}

function renderTable(dataArray) {
    const tbody = document.getElementById('table-body');
    if (dataArray.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #666;">No products found matching your search.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = dataArray.map(p => {
        const imgStr = p.image.startsWith('/') || p.image.startsWith('http') ? p.image : `/${p.image}`;
        return `
        <tr>
            <td>${p.id}</td>
            <td><img src="${encodeURI(imgStr)}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border: 1px solid #eee;"></td>
            <td style="font-weight: 500;">${p.name}</td>
            <td><span style="background: #f4f4f5; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; text-transform: uppercase;">${p.category}</span></td>
            <td>$${p.price.toFixed(2)}</td>
            <td style="text-align: right;">
                <button class="btn" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; margin-right: 0.5rem;" onclick='editProduct(${JSON.stringify(p).replace(/'/g, "&#39;")})'>Edit</button>
                <button class="btn btn-danger" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
        </tr>`;
    }).join('');
}

// ----- Users Management -----
async function fetchUsers() {
    try {
        const res = await fetch('/api/admin/users', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('lumiere_token')}` }
        });
        if (res.ok) {
            const data = await res.json();
            renderUsersTable(data);
        }
    } catch(e) {
        document.getElementById('users-body').innerHTML = `<tr><td colspan="4" style="color:#ef4444; font-weight: bold; text-align: center;">Failed to load users.</td></tr>`;
    }
}

function renderUsersTable(dataArray) {
    const tbody = document.getElementById('users-body');
    if (dataArray.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #666;">No users found.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = dataArray.map(u => `
        <tr>
            <td style="font-weight: 500;">${u.name}</td>
            <td>${u.email}</td>
            <td><span style="background: ${u.role === 'Admin' ? '#ef4444' : '#f4f4f5'}; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: ${u.role === 'Admin' ? '#fff' : '#666'}">${u.role}</span></td>
            <td style="text-align: right;">
                ${u.role !== 'Admin' ? `<button class="btn btn-danger" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="deleteUserRow('${u.email}')">Delete</button>` : `<span style="font-size:0.8rem; color:#999; margin-right: 0.5rem;">Protected</span>`}
            </td>
        </tr>
    `).join('');
}

window.deleteUserRow = async function(email) {
    if(!confirm(`Are you sure you want to delete user ${email}?`)) return;
    try {
        const res = await fetch(`/api/admin/users/${email}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('lumiere_token')}` }
        });
        if(res.ok) {
            fetchUsers();
        } else {
            alert('Failed to execute backend deletion.');
        }
    } catch(e) {
        alert('API Pipeline Error.');
    }
};

// Modal State Accessors
window.showModal = function() {
    document.getElementById('product-form').reset();
    document.getElementById('p-id').value = '';
    document.getElementById('modal-title').innerText = 'Add New Product';
    document.getElementById('modal').style.display = 'flex';
}

window.closeModal = function() {
    document.getElementById('modal').style.display = 'none';
}

window.editProduct = function(p) {
    document.getElementById('p-id').value = p.id;
    document.getElementById('p-name').value = p.name;
    document.getElementById('p-category').value = p.category;
    document.getElementById('p-price').value = p.price;
    document.getElementById('p-image').value = p.image;
    document.getElementById('p-desc').value = p.description || '';
    
    document.getElementById('modal-title').innerText = 'Edit Database Product';
    document.getElementById('modal').style.display = 'flex';
}

// Save actions
window.executeSave = async function() {
    const id = document.getElementById('p-id').value;
    const isEdit = !!id;
    const url = isEdit ? `/api/admin/products/${id}` : '/api/admin/products';
    const method = isEdit ? 'PUT' : 'POST';

    const payload = {
        name: document.getElementById('p-name').value,
        category: document.getElementById('p-category').value,
        price: parseFloat(document.getElementById('p-price').value),
        image: document.getElementById('p-image').value,
        description: document.getElementById('p-desc').value,
        rating: 5.0,
        skinType: 'all',
        ingredients: ''
    };

    try {
        const res = await fetch(url, {
            method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('lumiere_token')}`
            },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            closeSaveModal();
            closeModal();
            document.getElementById('admin-search').value = ''; // Reset search
            fetchProducts();
        } else {
            const data = await res.json();
            alert(data.error || 'Failed to save due to backend middleware rejection.');
            closeSaveModal();
        }
    } catch (error) {
        alert('API Connection Error');
        closeSaveModal();
    }
};

window.closeSaveModal = function() {
    document.getElementById('save-modal').style.display = 'none';
};

// DELETE action overlay handlers
let pendingDeleteId = null;

window.deleteProduct = function(id) {
    pendingDeleteId = id;
    document.getElementById('delete-modal').style.display = 'flex';
};

window.closeDeleteModal = function() {
    document.getElementById('delete-modal').style.display = 'none';
    pendingDeleteId = null;
};

window.executeDelete = async function() {
    if(!pendingDeleteId) return;
    
    try {
        const res = await fetch(`/api/admin/products/${pendingDeleteId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('lumiere_token')}` }
        });
        if(res.ok) {
            closeDeleteModal();
            document.getElementById('admin-search').value = '';
            fetchProducts();
        } else {
            alert('Server error executing product deletion.');
            closeDeleteModal();
        }
    } catch(e) {
        alert('API Connection Error');
        closeDeleteModal();
    }
};

