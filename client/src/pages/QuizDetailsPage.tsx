import { Box, Typography, Button, Stack, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useListQuizzesQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} from '../features/quizzes/quizzes.api';
import { useState, useEffect } from 'react';

export default function QuizDetailsPage() {
  const { id } = useParams();
  const { data: quizzes = [] } = useListQuizzesQuery();
  const quiz = quizzes.find((q) => q._id === id);
  const nav = useNavigate();
  const { t } = useTranslation();

  const [updateQuiz] = useUpdateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: quiz?.title || '',
    course: quiz?.course || '',
    topic: quiz?.topic || '',
  });

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title,
        course: quiz.course,
        topic: quiz.topic,
      });
    }
  }, [quiz]);

  if (!quiz) {
    return <Typography color="error">{t('noQuizzesAvailable')}</Typography>;
  }

  const handleEditSave = async () => {
    await updateQuiz({ id: quiz._id, body: formData });
    setEditMode(false);
  };

  const handleDelete = async () => {
    await deleteQuiz(quiz._id);
    nav('/quizzes');
  };

  return (
    <Box sx={{ p: 3 }}>
      {editMode ? (
        <>
          <TextField
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Course"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={2} mt={3}>
            <Button variant="contained" color="primary" onClick={handleEditSave}>
              {t('save')}
            </Button>
            <Button variant="outlined" onClick={() => setEditMode(false)}>
              {t('cancel')}
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
          <Typography variant="body1">{quiz.course} — {quiz.topic}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('due')}: {new Date(quiz.dueDate).toLocaleDateString()}
          </Typography>
          <Stack direction="row" spacing={2} mt={3}>
            <Button variant="contained" onClick={() => nav('/quizzes')}>
              {t('goToDashboard')}
            </Button>
            <Button variant="outlined" onClick={() => setEditMode(true)}>
              {t('edit')}
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              {t('delete')}
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
}
