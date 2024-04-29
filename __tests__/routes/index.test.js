const request = require('supertest');
const app = require('../app'); // Path to your main application file

describe('Main Route Access', () => {
    test('TC14: Main Route Accessible', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('TC15: Undefined Routes', async () => {
        const response = await request(app).get('/undefinedRoute');
        expect(response.statusCode).toBe(404);
    });

    test('TC16: Redirects', async () => {
        const response = await request(app).get('/old-route');
        expect(response.statusCode).toBe(301); // Assuming 301 Moved Permanently
    });
});
