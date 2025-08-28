import { Box, Button, Card, CardContent, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import { useListAnnouncementsQuery } from '../features/announcements/announcements.api';
import { useListQuizzesQuery } from '../features/quizzes/quizzes.api';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Dashboard() {
  const { data: announcements = [] } = useListAnnouncementsQuery();
  const { data: quizzes = [] } = useListQuizzesQuery();
  const { t } = useTranslation();

  const [openTips, setOpenTips] = useState(false);

  const tips = [
    t('tips.manageTime'),
    t('tips.reviewNotes'),
    t('tips.takeBreaks'),
    t('tips.practiceQuestions'),
    t('tips.stayPositive')
  ];

  const upcoming = quizzes.slice(0, 2);

  return (
    <Box sx={{ p: 3 }}>
      {/* Exams Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" color="primary.main" fontWeight={700}>
            {t('examsTime')}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 600 }}>
            {t('examIntro')}
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => setOpenTips(true)}>
            {t('viewTips')}
          </Button>
        </CardContent>
      </Card>

      {/* Tips Dialog */}
      <Dialog open={openTips} onClose={() => setOpenTips(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('studyTips')}</DialogTitle>
        <DialogContent>
          <List>
            {tips.map((tip, index) => (
              <ListItem key={index}>
                <ListItemText primary={`✅ ${tip}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTips(false)}>{t('close')}</Button>
        </DialogActions>
      </Dialog>

      {/* Dashboard Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>{t('announcements')}</Typography>
              {announcements.map(a => (
                <Box key={a._id} sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                  <Typography fontWeight={600}>
                    {a.title} — <Typography component="span" color="text.secondary">{a.author}</Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">{a.body}</Typography>
                </Box>
              ))}
              {!announcements.length && (
                <Typography color="text.secondary">{t('dashboardSection.noAnnouncements')}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>{t('whatsDue')}</Typography>
              {upcoming.map(q => (
                <Box key={q._id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                  <Typography fontWeight={600}>{q.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{q.course} — {q.topic}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('due')}: {new Date(q.dueDate).toLocaleString()}
                  </Typography><br/>
                  <Button variant="outlined" size="small" sx={{ mt: 1 }}>{t('startQuiz')}</Button>
                </Box>
              ))}
              {!upcoming.length && (
                <Typography color="text.secondary">{t('dashboardSection.noQuizzes')}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
