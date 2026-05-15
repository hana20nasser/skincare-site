const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const cors    = require('cors');
const path    = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'lumiere_secret_key_2024';

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve all static files (HTML, CSS, JS, images) from this folder
app.use(express.static(path.join(__dirname)));

// ─── In-Memory Database (no external DB needed) ───────────────────────────────
// Format: { email: { name, email, hashedPassword } }
const users = {};

// ─── Helper ───────────────────────────────────────────────────────────────────
function generateToken(user) {
    return jwt.sign(
        { email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
}

// ─── Auth Middleware ──────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        req.user = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// ─── API Routes ───────────────────────────────────────────────────────────────

// GET /api/products — returns all products from products.js as JSON
// We read the products array by simply requiring the file.
// products.js uses `const products = [...]` without module.exports,
// so we extract it with a small eval wrapper.
const products = require('./products');

console.log(`✅ Loaded ${products.length} products`);

app.get('/api/products', (req, res) => {
    res.json(products);
});

// POST /api/signup
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (users[email]) {
        return res.status(409).json({ error: 'An account with this email already exists' });
    }

    // Validate password: min 6 chars, at least 1 uppercase, at least 1 number
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({
            error: 'Password must be at least 6 characters and contain one uppercase letter and one number'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[email] = { name, email, hashedPassword };

    const user   = { name, email };
    const token  = generateToken(user);

    console.log(`✅ New user registered: ${email}`);
    res.status(201).json({ token, user, message: `Welcome to Lumière, ${name}!` });
});

// POST /api/login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const account = users[email];
    if (!account) {
        return res.status(401).json({ error: 'No account found with this email' });
    }

    const valid = await bcrypt.compare(password, account.hashedPassword);
    if (!valid) {
        return res.status(401).json({ error: 'Incorrect password' });
    }

    const user  = { name: account.name, email: account.email };
    const token = generateToken(user);

    console.log(`✅ User logged in: ${email}`);
    res.json({ token, user, message: `Welcome back, ${account.name}!` });
});

// POST /api/checkout  (requires login)
app.post('/api/checkout', requireAuth, (req, res) => {
    const { cartItems, totalAmount } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    // In a real app you would: validate stock, charge payment, save order to DB.
    // Here we just confirm the order and log it.
    const orderSummary = cartItems.map(item =>
        `  - ${item.name} x${item.quantity}  ($${(item.price * item.quantity).toFixed(2)})`
    ).join('\n');

    console.log(`\n🛍️  New order from ${req.user.name} (${req.user.email})`);
    console.log(orderSummary);
    console.log(`  Total: $${Number(totalAmount).toFixed(2)}\n`);

    res.json({
        success: true,
        message: `Order confirmed! Thank you, ${req.user.name}. Your Lumière products are on their way 💫`
    });
});

// ─── SPA Catch-All (must be LAST) ─────────────────────────────────────────────
// Any path that isn't an API route or a static file returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n✨ Lumière server running at http://localhost:${PORT}`);
    console.log(`   Press Ctrl+C to stop\n`);
});
