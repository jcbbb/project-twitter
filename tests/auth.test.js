const request = require('supertest');
const User = require('../models/User');
const app = require('../server');
const db = require('../db');

describe('Auth endpoints', () => {
    beforeAll(async () => {
        await User.deleteMany({});
    });

    const mockUser = { name: 'Jimmy', email: 'jimmy@gmail.com', password: '2157132aA*' };

    it('should create a new user', async () => {
        const res = await request(app).post('/api/auth/signup').send(mockUser);
        expect(res.statusCode).toBe(201);
    });

    it('should not create a new user if email already exists', async () => {
        const res = await request(app).post('/api/auth/signup').send(mockUser);
        expect(res.statusCode).toBe(400);
    });

    it('should check bad user input on signup', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({ name: 'Jimmy', email: '121asdsa<>aa', password: '124' });
        expect(res.statusCode).toBe(400);
    });

    it('should check bad user input on login', async () => {
        const res = await request(app).post('/api/auth/login').send({ email: 'asms00l.com', password: '17865' });
        expect(res.statusCode).toBe(400);
    });

    it('should checking if duplicate email exists', async () => {
        const res = await request(app).post('/api/auth/email/check').send(mockUser);
        expect(res.statusCode).toBe(400);
    });

    it('should login the user with correct credentials', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: mockUser.email,
            password: mockUser.password,
        });
        expect(res.statusCode).toBe(200);
    });

    it('should not find non-existing user on login', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'sadsa@gmail.com', password: '2157132asdsa' });
        expect(res.statusCode).toBe(400);
    });

    afterAll((done) => {
        db.disconnect();
        app.close(done);
    });
});

