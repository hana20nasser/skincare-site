const request = require('supertest');
const app = require('../server');

describe('Skincare Website API Tests', () => {

    // Test 1: Verify that the homepage route loads successfully
    test('GET / should return homepage', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    // Test 2: Verify that the products API endpoint returns data successfully
    test('GET /api/products should return products list', async () => {
        const response = await request(app).get('/api/products');
        expect(response.statusCode).toBe(200);
    });

    // Test 3: Verify that the products API response format is JSON
    test('Products response should be JSON', async () => {
        const response = await request(app).get('/api/products');
        expect(response.headers['content-type'])
            .toMatch(/json/);
    });

    // Test 4: Verify that the products array is not empty
    test('Products array should not be empty', async () => {
        const response = await request(app).get('/api/products');
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test 5: Verify that the admin dashboard page loads successfully
    test('Admin page should load successfully', async () => {
        const response = await request(app).get('/admin');
        expect(response.statusCode).toBe(200);
    });

    // Test 6: Verify that invalid routes return a 404 error
    test('404 page should return error for invalid route', async () => {
        const response = await request(app).get('/invalid-route');
        expect(response.statusCode).toBe(404);
    });

    // Test 7: Verify that every product contains a name property
    test('Each product should contain a name', async () => {
        const response = await request(app).get('/api/products');

        response.body.forEach(product => {
            expect(product).toHaveProperty('name');
        });
    });

    // Test 8: Verify that every product contains a price property
    test('Each product should contain a price', async () => {
        const response = await request(app).get('/api/products');

        response.body.forEach(product => {
            expect(product).toHaveProperty('price');
        });
    });

    // Test 9: Verify that the server response time is under 1 second
    test('Server response time should be acceptable', async () => {
        const start = Date.now();

        await request(app).get('/api/products');

        const duration = Date.now() - start;

        expect(duration).toBeLessThan(1000);
    });

    // Test 10: Verify that the admin route returns an HTML page
    test('Admin route should return HTML', async () => {
        const response = await request(app).get('/admin');

        expect(response.headers['content-type'])
            .toMatch(/html/);
    });

});



    // Test 11: Ensure each product has a rating value
    test('Each product should have a rating', async () => {
        const res = await request(app).get('/api/products');

        res.body.forEach(product => {
            expect(product).toHaveProperty('rating');
        });
    });

    // Test 12: Rating should be a number
    test('Product rating should be a number', async () => {
        const res = await request(app).get('/api/products');

        res.body.forEach(product => {
            expect(typeof product.rating).toBe('number');
        });
    });

    // Test 13: Products response should be an array
    test('Products response should be an array', async () => {
        const res = await request(app).get('/api/products');

        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test 14: Ensure products list is not empty
    test('Products list should not be empty', async () => {
        const res = await request(app).get('/api/products');

        expect(res.body.length).toBeGreaterThan(0);
    });

    // Test 15: Fetch product by valid ID
    test('Should return product by valid ID', async () => {
        const res = await request(app).get('/api/products/1');

        expect(res.statusCode).toBe(200);
    });

    // Test 16: Invalid product ID should return 404
    test('Invalid product ID should return 404', async () => {
        const res = await request(app).get('/api/products/99999');

        expect(res.statusCode).toBe(404);
    });

    // Test 17: Login without data should fail
    test('Login should fail without credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({});

        expect(res.statusCode).toBe(400);
    });

    // Test 18: Successful signup
    test('User signup should succeed with valid data', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Test123'
            });

        expect(res.statusCode).toBe(200);
    });

    // Test 19: Duplicate email signup should fail
    test('Signup with existing email should fail', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'User1',
                email: 'dup@example.com',
                password: 'Test123'
            });

        const res = await request(app)
            .post('/api/signup')
            .send({
                name: 'User2',
                email: 'dup@example.com',
                password: 'Test123'
            });

        expect(res.statusCode).toBe(400);
    });

    // Test 20: Successful checkout
    test('Checkout should succeed with valid cart', async () => {
        const res = await request(app)
            .post('/api/checkout')
            .send({
                cartItems: [{ id: 1, qty: 2 }],
                totalAmount: 20
            });

        expect(res.statusCode).toBe(200);
    });

    // Test 21: Subscribe with valid email
    test('Subscription should succeed', async () => {
        const res = await request(app)
            .post('/api/subscribe')
            .send({ email: 'user@mail.com' });

        expect(res.statusCode).toBe(200);
    });


    // Test 22: Invalid email subscription should fail
    test('Subscription should fail with invalid email', async () => {
        const res = await request(app)
            .post('/api/subscribe')
            .send({ email: 'invalid' });

        expect(res.statusCode).toBe(400);
    });

    // Test 23: Admin access without token should fail
    test('Admin access should be forbidden without token', async () => {
        const res = await request(app).get('/api/admin/products');

        expect(res.statusCode).toBe(403);
    });

    // Test 24: Admin users endpoint without auth should fail
    test('Admin users should be protected', async () => {
        const res = await request(app).get('/api/admin/users');

        expect(res.statusCode).toBe(403);
    });

    // Test 25: API response time should be fast
    test('API response time should be under limit', async () => {
        const start = Date.now();

        await request(app).get('/api/products');

        const duration = Date.now() - start;

        expect(duration).toBeLessThan(1000);
    });

    // Test 26: API should return JSON format
    test('API should return JSON format', async () => {
        const res = await request(app).get('/api/products');

        expect(res.headers['content-type']).toMatch(/json/);
    });

    // Test 27: Admin page should return HTML
    test('Admin page should return HTML', async () => {
        const res = await request(app).get('/admin');

        expect(res.headers['content-type']).toMatch(/html/);
    });

    // Test 28: Invalid route should return JSON error
    test('Invalid route should return error JSON', async () => {
        const res = await request(app).get('/wrong-route');

        expect(res.body).toHaveProperty('error');
    });

    // Test 29: Each product should have category
    test('Each product should have category', async () => {
        const res = await request(app).get('/api/products');

        res.body.forEach(p => {
            expect(p).toHaveProperty('category');
        });
    });

    // Test 30: Checkout should fail without cart
    test('Checkout should fail without cartItems', async () => {
        const res = await request(app)
            .post('/api/checkout')
            .send({});

        expect(res.statusCode).toBe(400);
    });