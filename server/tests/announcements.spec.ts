import { beforeAll, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import '../src/db';
import Announcement from '../src/models/Announcement';

beforeAll(async () => { await Announcement.deleteMany({}); });

test('create & list announcements', async () => {
  const created = await request(app).post('/api/announcements').send({
    title: 'Hello',
    body: 'World',
    author: 'Teacher',
    course: 'Math 101'
  }).expect(201);
  expect(created.body.title).toBe('Hello');

  const res = await request(app).get('/api/announcements').expect(200);
  expect(res.body.length).toBe(1);
});
