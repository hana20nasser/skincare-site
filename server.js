const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve the static frontend files
app.use(express.static(path.join(__dirname, '/')));

// Simulated Database (Mock Data)

const products = [
    { id: 1, name: 'Ela De Pure Hydrating Gel Cleanser', category: 'cleanser', price: 14.00, image: 'images/Ela De Pure Gentle Gel Wash.jpg', rating: 4.8, description: 'Hydrating gel cleanser', ingredients: '', skinType: 'all' },
    { id: 2, name: 'Mitudo Gentle Sulfate-Free Cleanser', category: 'cleanser', price: 12.00, image: 'images/Mitudo Skin Balance Cleanser.jpg', rating: 4.7, description: 'Sulfate-free cleanser', ingredients: '', skinType: 'all' },
    { id: 3, name: 'Anne Semonin Oligo Cleansing Gel', category: 'cleanser', price: 15.00, image: 'images/Anne Semonin Gentle Purifying Gel Cleanser.jpg', rating: 4.9, description: 'Purifying gel', ingredients: '', skinType: 'all' },
    { id: 4, name: 'Dr.Ceuracle Kombucha Balance Gel Cream', category: 'moisturizer', price: 14.00, image: 'images/Dr.Ceuracle Skin Barrier Gel Cream.jpg', rating: 4.6, description: 'Barrier gel cream', ingredients: '', skinType: 'all' },
    { id: 6, name: 'Emporio Armani Sensual Body Wash', category: 'body', price: 9.00, image: 'images/Emporio Armani Sensual Body Wash.jpg', rating: 4.5, description: 'Body wash', ingredients: '', skinType: 'all' },

    { id: 8, name: 'Mixsoon Ginseng Renewal Essence', category: 'serum', price: 28.00, image: 'images/Mixsoon Ginseng Renewal Essence.jpg', rating: 4.9, description: 'Essence', ingredients: '', skinType: 'all' },
    { id: 9, name: 'Mizon Peptide Elasticity Ampoule', category: 'serum', price: 20.00, image: 'images/Mizon Peptide 500 Ampoule.jpg', rating: 4.8, description: 'Ampoule', ingredients: '', skinType: 'all' },
    { id: 10, name: 'IPrime C-Prime Brightening Serum', category: 'serum', price: 25.00, image: 'images/IPrime C-Prime Brightening Serum.jpg', rating: 4.7, description: 'Serum', ingredients: '', skinType: 'all' },
    { id: 11, name: 'Precision Beauty Niacinamide Serum', category: 'serum', price: 18.00, image: 'images/Niacinamide Skin Refining Serum.jpg', rating: 4.9, description: 'Serum', ingredients: '', skinType: 'all' },
    { id: 12, name: 'Ela De Pure Retinol+ Serum', category: 'serum', price: 24.00, image: 'images/Ela De Pure Retinol Repair Serum.jpg', rating: 4.8, description: 'Serum', ingredients: '', skinType: 'all' },
    { id: 13, name: 'Beauty Pie Amazing Sleep Oil', category: 'serum', price: 22.00, image: 'images/Beauty Pie Skin Recovery Night Oil.jpg', rating: 4.6, description: 'Night Oil', ingredients: '', skinType: 'all' },
    { id: 14, name: 'The Ordinary Argireline Solution 10%', category: 'serum', price: 12.00, image: 'images/The Ordinary Dynamic Expression Lines Serum.jpg', rating: 4.7, description: 'Lines Serum', ingredients: '', skinType: 'all' },
    { id: 15, name: 'The Ordinary Glycolic Acid 7% Toning Solution', category: 'toner', price: 14.00, image: 'images/The Ordinary Exfoliating Glycolic Toner 7%.jpg', rating: 4.8, description: 'Glycolic Toner', ingredients: '', skinType: 'all' },
    { id: 17, name: 'SKIN1004 Madagascar Centella Toner', category: 'toner', price: 18.00, image: 'images/SKIN1004 Centella Soothing Toner.jpg', rating: 4.8, description: 'Soothing Toner', ingredients: '', skinType: 'all' },

    { id: 19, name: 'SKIN1004 Centella Soothing Cream', category: 'moisturizer', price: 18.00, image: 'images/SKIN1004 Centella Calming Cream.jpg', rating: 4.9, description: 'Calming Cream', ingredients: '', skinType: 'all' },
    { id: 20, name: 'Nuance Anti-Aging Day Cream', category: 'moisturizer', price: 20.00, image: 'images/Nuance Firming Day Cream.jpg', rating: 4.8, description: 'Firming Day Cream', ingredients: '', skinType: 'all' },
    { id: 21, name: 'Farm Stay V8 Hyaluronic Cream', category: 'moisturizer', price: 16.00, image: 'images/Farm Stay V8 Hyaluronic Acid Cream.jpg', rating: 4.7, description: 'Acid Cream', ingredients: '', skinType: 'all' },
    { id: 22, name: 'Cosmetology Lady Radiance Cream', category: 'moisturizer', price: 18.00, image: 'images/Lady Hydrating Glow Cream.jpg', rating: 4.6, description: 'Glow Cream', ingredients: '', skinType: 'all' },
    { id: 23, name: 'Plantadea Face & Body Oil', category: 'body', price: 14.00, image: 'images/Plantadea Sensitive Skin Repair Oil.jpg', rating: 4.8, description: 'Repair Oil', ingredients: '', skinType: 'all' },
    { id: 24, name: 'Nécessaire Body Lotion', category: 'body', price: 15.00, image: 'images/Nécessaire Hydrating Body Lotion.jpg', rating: 4.9, description: 'Body Lotion', ingredients: '', skinType: 'all' },
    { id: 25, name: 'Lernberger Stafsing Hand Lotion', category: 'hand', price: 12.00, image: 'images/Lernberger Stafsing Silky Hand Lotion.jpg', rating: 4.8, description: 'Silky Hand Lotion', ingredients: '', skinType: 'all' },
    { id: 26, name: 'Faberlic Sculpting Cream', category: 'body', price: 17.00, image: 'images/Faberlic Ideal Body Sculpt Cream.jpg', rating: 4.7, description: 'Ideal Body Cream', ingredients: '', skinType: 'all' },
    { id: 27, name: 'Laneige Lip Sleeping Mask', category: 'mask', price: 20.00, image: 'images/Laneige Berry Lip Sleeping Mask.jpg', rating: 4.9, description: 'Lip Mask', ingredients: '', skinType: 'all' },

    { id: 33, name: 'S One Tone-Up Sun Cream SPF50', category: 'sunscreen', price: 16.00, image: 'images/S One Daily UV Sun Cream SPF50.jpg', rating: 4.8, description: 'Sun Cream', ingredients: '', skinType: 'all' },
    { id: 34, name: 'EOBICÔ Aqua Shining Sunblock SPF50', category: 'sunscreen', price: 18.00, image: 'images/EOBICÔ Hydrating Sun Block SPF50.jpg', rating: 4.9, description: 'Sun Block', ingredients: '', skinType: 'all' },
    { id: 35, name: 'Paradox SPF50 Tinted Sunscreen', category: 'sunscreen', price: 17.00, image: 'images/Paradox Oil-Control Tinted Sunscreen.jpg', rating: 4.7, description: 'Tinted Sunscreen', ingredients: '', skinType: 'all' },
    { id: 36, name: 'Missha Sun Essence SPF45', category: 'sunscreen', price: 15.00, image: 'images/Missha Aqua Sun Essence SPF45.jpg', rating: 4.8, description: 'Aqua Sun Essence', ingredients: '', skinType: 'all' },

    { id: 37, name: 'Ela De Pure Snail Renewal Mask', category: 'mask', price: 22.00, image: 'images/Ela De Pure Snail Renewal Mask.jpg', rating: 4.9, description: 'Renewal Mask', ingredients: '', skinType: 'all' },
    { id: 38, name: 'Besoma EGF Glow Mask', category: 'mask', price: 24.00, image: 'images/Besoma EGF Glow Brightening Mask.jpg', rating: 4.8, description: 'Glow Mask', ingredients: '', skinType: 'all' },

    { id: 41, name: 'Innisfree Soft Blur Powder', category: 'moisturizer', price: 15.00, image: 'images/Innisfree Soft Blur Powder.jpg', rating: 4.7, description: 'Blur Powder', ingredients: '', skinType: 'all' },

    { id: 42, name: 'Ela De Pure Deep Clean Shampoo', category: 'hair', price: 18.00, image: 'images/Ela De Pure Deep Clean Shampoo.jpg', rating: 4.9, description: 'Shampoo', ingredients: '', skinType: 'all' },

    { id: 43, name: 'Antibacterial Hand Cleansing Gel', category: 'hand', price: 8.00, image: 'images/Hydrating Antibacterial Hand Gel.jpg', rating: 4.8, description: 'Hydrating Hand Gel', ingredients: '', skinType: 'all' },

    { id: 45, name: "I'm From Rice Toner", category: 'toner', price: 18.00, image: "images/I'm From Rice Toner.jpg", rating: 4.8, description: 'Rice Toner', ingredients: '', skinType: 'all' }
];


// --- API ENDPOINTS --- //

// Mock Users Database
const users = [];

// 1. Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 2. Get single product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// --- USER AUTHENTICATION --- //

// 3. User Login (Strict Validation)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one number, and be at least 6 characters long' });
    }

    // Isolated Mock Admin hook solely to bootstrap the token logic perfectly
    if (email === 'admin@lumiere.com' && password === 'Admin123') {
        return res.json({
            message: 'Administrative authentication completed globally.',
            user: { email, name: 'Secure Administrator' },
            token: 'mock-jwt-admin-token'
        });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ error: 'Invalid email' });
    }

    if (user.password === password) {
        res.json({
            message: 'Login successful',
            user: { email: user.email, name: user.name },
            token: 'mock-jwt-token-12345'
        });
    } else {
        res.status(401).json({ error: 'Incorrect password' });
    }
});

// 3.5 User Signup
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Valid name, email, and password required' });
    }
    
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one number, and be at least 6 characters long' });
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    users.push({ name, email, password });
    
    res.json({
        message: 'Account created successfully',
        user: { email, name },
        token: 'mock-jwt-token-54321'
    });
});

// 4. Checkout / Place Order (Mock)
app.post('/api/checkout', (req, res) => {
    const { cartItems, totalAmount } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    // Here you would normally save to the MongoDB database and process payment
    res.json({
        success: true,
        message: 'Order placed successfully! Thank you for shopping with Lumière.',
        orderId: Math.floor(Math.random() * 1000000)
    });
});

// 5. Store Newsletter API
let subscribers = [];
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: "Invalid Email" });
    }

    // Save to our array mock DB
    subscribers.push(email);
    res.json({ success: true, message: "Thank you for subscribing!" });
});

// --- ADMIN ENDPOINTS (CRUD) --- //
// Securely Isolated from Public Frontend APIs

// Security Middleware checks strict token 
function verifyAdmin(req, res, next) {
    if (req.headers.authorization === 'Bearer mock-jwt-admin-token') {
        next();
    } else {
        res.status(403).json({ error: 'System Forbidden: Admin access strictly required' });
    }
}

// Serve all database items strictly mapped for the admin dashboard format
app.get('/api/admin/products', verifyAdmin, (req, res) => {
    res.json(products);
});

// Mutates CONST through array operations (.push)
app.post('/api/admin/products', verifyAdmin, (req, res) => {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    res.json({ message: 'Product committed to memory', product: newProduct });
});

// Mutates CONST through specific index property reassignment
app.put('/api/admin/products/:id', verifyAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'DB Product index not found' });
    
    products[index] = { ...products[index], ...req.body, id };
    res.json({ message: 'Product updated effectively', product: products[index] });
});

// Mutates CONST perfectly via splice without logic-breaking reassignment
app.delete('/api/admin/products/:id', verifyAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ success: true, message: 'Deleted' });
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

// Admin User Management Endpoints
app.get('/api/admin/users', verifyAdmin, (req, res) => {
    // Map normal users into a safe display subset
    const displayUsers = users.map(u => ({ email: u.email, name: u.name, role: 'Customer' }));
    // Append the hidden superadmin visibly for the UI mapping
    displayUsers.unshift({ email: 'admin@lumiere.com', name: 'Secure Administrator', role: 'Admin' });
    res.json(displayUsers);
});

app.delete('/api/admin/users/:email', verifyAdmin, (req, res) => {
    const emailToDrop = req.params.email;
    if (emailToDrop === 'admin@lumiere.com') return res.status(403).json({ error: 'Prohibited' });
    
    const idx = users.findIndex(u => u.email === emailToDrop);
    if (idx !== -1) {
        users.splice(idx, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'User not found in memory' });
    }
});

// Serve Isolated HTML UI (Decoupled from index.html SPA)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Fallback for Single Page Application routing (Must be below /admin specifier)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n✨ Backend server is running!`);
    console.log(`🌐 Application URL: http://localhost:${PORT}`);
    console.log(`📦 API Endpoint: http://localhost:${PORT}/api/products\n`);
});
