import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import Sidebar from './components/Layout/Sidebar';
import Topbar from './components/Layout/Topbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AnnouncementsPage from './pages/AnnouncementsPage';
import requireAuth from './hoc/requireAuth';
import QuizzesPage from './pages/QuizzesPage';
import CreateQuizPage from './pages/CreateQuizPage';
import QuizDetailsPage from './pages/QuizDetailsPage';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { useLanguage } from './contexts/LanguageContext';
import { theme as baseTheme } from './styles/theme'; 

const DashboardOnly = requireAuth(Dashboard);
const AnnouncementsOnly = requireAuth(AnnouncementsPage);
const QuizzesOnly = requireAuth(QuizzesPage);
const CreateQuizOnly = requireAuth(CreateQuizPage);
const QuizDetailsOnly = requireAuth(QuizDetailsPage);

export default function App() {
  const { isRTL } = useLanguage();

  const cacheRtl = createCache({
    key: isRTL ? 'mui-rtl' : 'mui',
    stylisPlugins: isRTL ? [prefixer, rtlPlugin] : []
  });

  const mergedTheme = createTheme({
    ...baseTheme,
    direction: isRTL ? 'rtl' : 'ltr',
    typography: {
      ...baseTheme.typography,
      fontFamily: isRTL ? 'Tajawal, Roboto, sans-serif' : baseTheme.typography.fontFamily
    }
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={mergedTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Topbar />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardOnly />} />
              <Route path="/announcements" element={<AnnouncementsOnly />} />
              <Route path="/quizzes" element={<QuizzesOnly />} />
              <Route path="/create-quiz" element={<CreateQuizOnly />} />
              <Route path="/quiz/:id" element={<QuizDetailsOnly />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
