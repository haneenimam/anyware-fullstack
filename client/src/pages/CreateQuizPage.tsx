import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { useState } from 'react';
import { useCreateQuizMutation } from '../features/quizzes/quizzes.api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CreateQuizPage() {
  const [quiz, setQuiz] = useState({ title: '', course: '', topic: '', dueDate: '' });
  const [createQuiz] = useCreateQuizMutation();
  const nav = useNavigate();
  const { t } = useTranslation();

  const handleCreate = async () => {
    await createQuiz(quiz).unwrap();
    nav('/quizzes');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>{t('createQuiz')}</Typography>
      <Stack spacing={2}>
        <TextField label={t('announcementsSection.title')} value={quiz.title} onChange={e => setQuiz({ ...quiz, title: e.target.value })} />
        <TextField label={t('announcementsSection.course')} value={quiz.course} onChange={e => setQuiz({ ...quiz, course: e.target.value })} />
        <TextField label={t('announcementsSection.topic')} value={quiz.topic} onChange={e => setQuiz({ ...quiz, topic: e.target.value })} />
        <TextField type="date" value={quiz.dueDate} onChange={e => setQuiz({ ...quiz, dueDate: e.target.value })} />
        <Button variant="contained" onClick={handleCreate}>{t('createQuiz')}</Button>
      </Stack>
    </Box>
  );
}
