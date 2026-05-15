const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

// -------------------- MOCK DATABASE --------------------
const products = [
    { id: 1, name: 'Ela De Pure Hydrating Gel Cleanser', category: 'cleanser', price: 14.00, image: 'images/Ela De Pure Gentle Gel Wash.jpg', rating: 4.8 },
    { id: 2, name: 'Mitudo Gentle Sulfate-Free Cleanser', category: 'cleanser', price: 12.00, image: 'images/Mitudo Skin Balance Cleanser.jpg', rating: 4.7 },
    { id: 3, name: 'Anne Semonin Oligo Cleansing Gel', category: 'cleanser', price: 15.00, image: 'images/Anne Semonin Gentle Purifying Gel Cleanser.jpg', rating: 4.9 }
];

// -------------------- USERS DB --------------------
const users = [];

// -------------------- PUBLIC APIs --------------------

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

// -------------------- AUTH --------------------

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
        message: 'Login successful',
        user: { email: user.email, name: user.name },
        token: 'mock-token'
    });
});

// Signup
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    users.push({ name, email, password });

    res.json({
        message: 'Account created',
        user: { name, email }
    });
});

// -------------------- CHECKOUT --------------------
app.post('/api/checkout', (req, res) => {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    res.json({
        success: true,
        message: 'Order placed successfully',
        orderId: Math.floor(Math.random() * 100000)
    });
});

// -------------------- SUBSCRIBE --------------------
let subscribers = [];

app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    subscribers.push(email);

    res.json({ success: true, message: 'Subscribed successfully' });
});

// -------------------- ADMIN --------------------

// Admin auth middleware
function verifyAdmin(req, res, next) {
    if (req.headers.authorization === 'Bearer mock-jwt-admin-token') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
}

// Admin products
app.get('/api/admin/products', verifyAdmin, (req, res) => {
    res.json(products);
});

// Add product
app.post('/api/admin/products', verifyAdmin, (req, res) => {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    res.json(newProduct);
});

// Update product
app.put('/api/admin/products/:id', verifyAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ error: 'Not found' });

    products[index] = { ...products[index], ...req.body };

    res.json(products[index]);
});

// Delete product
app.delete('/api/admin/products/:id', verifyAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ error: 'Not found' });

    products.splice(index, 1);

    res.json({ success: true });
});

// Admin users
app.get('/api/admin/users', verifyAdmin, (req, res) => {
    res.json(users);
});

// -------------------- ADMIN PAGE --------------------
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// -------------------- 404 HANDLER (IMPORTANT) --------------------
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`\n✨ Backend server running`);
        console.log(`🌐 http://localhost:${PORT}`);
        console.log(`📦 http://localhost:${PORT}/api/products\n`);
    });
}

module.exports = app;