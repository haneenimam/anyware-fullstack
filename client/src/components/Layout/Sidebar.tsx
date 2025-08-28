import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const links = [
    { to: '/dashboard', label: t('dashboard'), icon: <DashboardIcon /> },
    { to: '/announcements', label: t('announcements'), icon: <CampaignIcon /> },
    { to: '/quizzes', label: t('quizzes'), icon: <QuizIcon /> }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        [`& .MuiDrawer-paper`]: { width: 220, bgcolor: 'primary.main', color: 'white' }
      }}
    >
      <Box sx={{ mt: 8 }}>
        <List>
          {links.map((l) => (
            <ListItemButton
              key={l.to}
              component={Link}
              to={l.to}
              selected={pathname === l.to}
              sx={{
                mx: 1,
                borderRadius: 2,
                color: 'white',
                '&:hover': {
                  bgcolor: '#fff',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' }
                },
                '&.Mui-selected': {
                  bgcolor: '#fff',
                  color: 'primary.main',
                  pointerEvents: 'none', 
                  '& .MuiListItemIcon-root': { color: 'primary.main' }
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{l.icon}</ListItemIcon>
              <ListItemText primary={l.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
