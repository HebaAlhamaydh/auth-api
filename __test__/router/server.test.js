'use strict';

process.env.SECRET = "TEST_SECRET";

const { sequelize } = require('../../src/models/index');
const supertest = require('supertest');
const { app } = require('../../src/server');

const mockRequest = supertest(app);

let userData = {
  testUser: { username: 'user', password: 'password' ,role:'admin'},
};
let accessToken = null;

beforeAll(async () => {
  await sequelize.sync();
});


describe('Auth Router', () => {

  it('Can create a new user', async () => {

    const response = await mockRequest.post('/signup').send(userData.testUser);
    
    expect(response.status).toBe(201);
  });

  it('Can signin with basic auth string', async () => {
    let { username, password } = userData.testUser;
    const response = await mockRequest.post('/signin')
      .auth(username, password);
    expect(response.status).toBe(200);
  });

  it('Can signin with bearer auth token', async () => {
    let { username, password } = userData.testUser;
    const response = await mockRequest.post('/signin')
      .auth(username, password);
    accessToken = response.body.token;
    const bearerResponse = await mockRequest
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(bearerResponse.status).toBe(200);
  });

  it('basic fails with known user and wrong password ', async () => {

    const response = await mockRequest.post('/signin')
      .auth('alh', 'abc')
    const { user, token } = response.body;

    expect(response.status).toBe(500);
    expect(user).not.toBeDefined();
    expect(token).not.toBeDefined();
  });

  it('basic fails with unknown user', async () => {

    const response = await mockRequest.post('/signin')
      .auth('ghg', 'hj')
    const { user, token } = response.body;

    expect(response.status).toBe(500);
    expect(user).not.toBeDefined();
    expect(token).not.toBeDefined();
  });

  it('Secret Route fails with invalid token', async () => {
    const response = await mockRequest.get('/secretstuff')
      .set('Authorization', `bearer accessgranted`);

    expect(response.status).toBe(500);
  });
});
it('Should respond with 404 status on an invalid route', async () => {
  const response = await mockRequest.get('/foo');
  expect(response.status).toBe(404);
});
it('Should respond with 404 status on an invalid method', async () => {
  const response = await mockRequest.patch('/v1/food');
  expect(response.status).toBe(404);
});
  // test if can create a food item
  it('can add a food item', async () => {
    const response = await mockRequest.post('/v1/food').send({
      name: 'abanana',
      calories: '100',
      type: 'fruit'
    });
    expect(response.status).toBe(201);
  });
 // test if can read a food item
 it('can get all food items', async () => {
  const response = await mockRequest.get('/v1/food');
  expect(response.status).toBe(200);

});
// test if can read one food item
it('can get one record', async () => {
  const response = await mockRequest.get('/v1/food/1');
  expect(response.status).toBe(200);
});

afterAll(async () => {
  await sequelize.drop();
});