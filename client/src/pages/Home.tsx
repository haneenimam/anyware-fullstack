import { Box, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/login`, { method: 'POST' });
    const { token } = await res.json();
    dispatch(loggedIn(token));
    nav('/dashboard');
  };

  return (
    <Container sx={{ mt: 18, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>{t('home.title')}</Typography>
      <Typography color="text.secondary" gutterBottom>{t('home.subtitle')}</Typography>
      <Box mt={4}>
        <Button variant="contained" size="large" onClick={handleLogin}>
          {t('home.loginButton')}
        </Button>
      </Box>
    </Container>
  );
}
