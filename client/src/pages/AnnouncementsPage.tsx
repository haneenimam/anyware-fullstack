import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useListAnnouncementsQuery, useCreateAnnouncementMutation, useDeleteAnnouncementMutation } from '../features/announcements/announcements.api';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AnnouncementsPage() {
  const { t } = useTranslation();
  const { data: items = [], refetch } = useListAnnouncementsQuery();
  const [createItem] = useCreateAnnouncementMutation();
  const [deleteItem] = useDeleteAnnouncementMutation();
  const [draft, setDraft] = useState({ title: '', body: '', author: '', course: '' });

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">{t('announcementsSection.newAnnouncement')}</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2}>
            <TextField
              label={t('announcementsSection.title')}
              value={draft.title}
              onChange={e => setDraft({ ...draft, title: e.target.value })}
            />
            <TextField
              label={t('announcementsSection.body')}
              value={draft.body}
              onChange={e => setDraft({ ...draft, body: e.target.value })}
            />
            <TextField
              label={t('announcementsSection.author')}
              value={draft.author}
              onChange={e => setDraft({ ...draft, author: e.target.value })}
            />
            <TextField
              label={t('announcementsSection.course')}
              value={draft.course}
              onChange={e => setDraft({ ...draft, course: e.target.value })}
            />
            <Button
              variant="contained"
              onClick={async () => {
                await createItem(draft).unwrap();
                setDraft({ title: '', body: '', author: '', course: '' });
                refetch();
              }}
            >
              {t('common.create')}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">{t('announcementsSection.allAnnouncements')}</Typography>
          {items.map(a => (
            <Stack
              key={a._id}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 1.25, borderBottom: '1px solid #eee' }}
            >
              <Box>
                <Typography fontWeight={600}>{a.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {a.author} — {a.course}
                </Typography>
              </Box>
              <Button color="error" onClick={() => deleteItem(a._id)}>
                {t('common.delete')}
              </Button>
            </Stack>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
