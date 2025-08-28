import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import requireAuth from '../hoc/requireAuth';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const Dummy = () => <div>Secret</div>;
const Guarded = requireAuth(Dummy);

const renderWithStore = (isAuthed: boolean) => {
  const store = configureStore({ reducer: { auth: () => ({ isAuthenticated: isAuthed }) } as any });
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/secret']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/secret" element={<Guarded />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('requireAuth', () => {
  it('redirects when not authed', () => {
    renderWithStore(false);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
  it('renders child when authed', () => {
    renderWithStore(true);
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });
});
