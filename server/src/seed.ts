import './db';
import Announcement from './models/Announcement';
import Quiz from './models/Quiz';

(async () => {
  await Announcement.deleteMany({});
  await Quiz.deleteMany({});
  await Announcement.insertMany([
    {
      title: 'Exam prep tips',
      body: 'Focus on units 2–4. Good luck!',
      author: 'Mrs. Salma Ahmed',
      course: 'Physics 02',
      avatarUrl: ''
    },
    {
      title: 'Field trip',
      body: 'Dream Park on Friday—bring your consent forms.',
      author: 'Events Manager',
      course: 'Events'
    }
  ]);

  const soon = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
  await Quiz.insertMany([
    { title: 'Unit 2 quiz', course: 'Physics 02', topic: 'Motion and Forces', dueDate: soon }
  ]);
  console.log('Seeded.');
  process.exit(0);
})();
