import { beforeAll, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import '../src/db';
import Quiz from '../src/models/Quiz';

beforeAll(async () => { await Quiz.deleteMany({}); });

test('create & list quizzes', async () => {
  const created = await request(app).post('/api/quizzes').send({
    title: 'Math Quiz',
    description: 'Basic math operations',
    course: 'Mathematics 101',
    topic: 'Algebra',
    dueDate: new Date().toISOString(),
    duration: 60
  }).expect(201);
  expect(created.body.title).toBe('Math Quiz');

  const res = await request(app).get('/api/quizzes').expect(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].title).toBe('Math Quiz');
});

test('update quiz', async () => {
  const quiz = await request(app).post('/api/quizzes').send({
    title: 'Science Quiz',
    description: 'Basic science questions',
    course: 'Science 101',
    topic: 'Physics',
    dueDate: new Date().toISOString(),
    duration: 45
  }).expect(201);

  const updated = await request(app).put(`/api/quizzes/${quiz.body._id}`).send({
    title: 'Updated Science Quiz',
    description: 'Updated description'
  }).expect(200);
  expect(updated.body.title).toBe('Updated Science Quiz');
});

test('delete quiz', async () => {
  const quiz = await request(app).post('/api/quizzes').send({
    title: 'History Quiz',
    description: 'World history questions',
    course: 'History 101',
    topic: 'Ancient Civilizations',
    dueDate: new Date().toISOString(),
    duration: 30
  }).expect(201);

  await request(app).delete(`/api/quizzes/${quiz.body._id}`).expect(200);
  
  const res = await request(app).get('/api/quizzes').expect(200);
  const deletedQuiz = res.body.find((q: any) => q._id === quiz.body._id);
  expect(deletedQuiz).toBeUndefined();
});
