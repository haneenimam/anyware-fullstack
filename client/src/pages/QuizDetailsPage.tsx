import { Box, Typography, Button, Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useListQuizzesQuery } from '../features/quizzes/quizzes.api';

export default function QuizDetailsPage() {
  const { id } = useParams();
  const { data: quizzes = [] } = useListQuizzesQuery();
  const quiz = quizzes.find((q) => q._id === id);
  const nav = useNavigate();
  const { t } = useTranslation();

  if (!quiz) {
    return <Typography color="error">{t('noQuizzesAvailable')}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
      <Typography variant="body1">{quiz.course} — {quiz.topic}</Typography>
      <Typography variant="body2" color="text.secondary">
        {t('due')}: {new Date(quiz.dueDate).toLocaleDateString()}
      </Typography>

      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="contained" onClick={() => nav('/quizzes')}>
          {t('goToDashboard')}
        </Button>
      </Stack>
    </Box>
  );
}
