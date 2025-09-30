const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');

describe('Auth Routes', () => {
  beforeAll(async () => {
    const dbUri = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/test-db';
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  test('POST /api/auth/signup', async () => {
    const newUser = {
      name: 'Test User',
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/signup')
      .send(newUser)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', newUser.name);
    expect(res.body).toHaveProperty('username', newUser.username);
    expect(res.body).toHaveProperty('email', newUser.email);

    expect(res.body).not.toHaveProperty('passwordHash');
    expect(res.body).not.toHaveProperty('password');
  });
});
