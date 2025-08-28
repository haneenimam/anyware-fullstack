import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useDispatch, useSelector } from 'react-redux';
import { loggedOut } from '../../features/auth/authSlice';
import type { RootState } from '../../app/store';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Topbar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage(); 
  const isAuthed = useSelector((s: RootState) => s.auth.isAuthenticated);

  return (
    <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e6e6e6' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Coligo</Typography>
        <Box>
          <IconButton
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} 
            aria-label="switch language"
          >
            <LanguageIcon />
          </IconButton>
          {isAuthed && (
            <Button variant="contained" onClick={() => dispatch(loggedOut())}>
              {t('logout')}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
