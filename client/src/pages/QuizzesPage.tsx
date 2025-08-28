import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useListQuizzesQuery } from '../features/quizzes/quizzes.api';
import { useTranslation } from 'react-i18next';

export default function QuizzesPage() {
  const { data: quizzes = [], isLoading } = useListQuizzesQuery();
  const { t } = useTranslation();

  if (isLoading) {
    return <Typography>{t('loading')}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('quizzes')}</Typography>
        <Button variant="contained" component={Link} to="/create-quiz">
          {t('createQuiz')}
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} md={6} lg={4} key={quiz._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{quiz.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {quiz.course} — {quiz.topic}
                </Typography>
                                 <Typography variant="body2" color="text.secondary" gutterBottom>
                   {t('due')}: {new Date(quiz.dueDate).toLocaleDateString()}
                 </Typography>
                 <Button 
                   variant="outlined" 
                   component={Link} 
                   to={`/quiz/${quiz._id}`}
                   sx={{ mt: 1 }}
                 >
                   {t('viewDetails')}
                 </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {!quizzes.length && (
        <Typography color="text.secondary" textAlign="center">
          {t('noQuizzesAvailable')}
        </Typography>
      )}
    </Box>
  );
}
