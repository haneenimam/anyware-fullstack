import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import './i18n/i18n';
import { LanguageProvider } from './contexts/LanguageContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider>  
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </LanguageProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
