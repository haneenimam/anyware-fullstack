# Testing Guide - Anyware Student Portal

This guide covers how to test the full project including frontend, backend, and integration tests.

## Prerequisites

1. **Start MongoDB**: Make sure MongoDB is running
   ```bash
   docker-compose up -d
   ```

2. **Install Dependencies**: Install dependencies for both client and server
   ```bash
   # Client dependencies
   cd client && npm install
   
   # Server dependencies  
   cd ../server && npm install
   ```

## Testing Commands

### Frontend Tests (Client)

```bash
cd client
npm test
```

**What's tested:**
- ✅ HOC (requireAuth) component
- ✅ Authentication flow
- ✅ Component rendering
- ✅ Redux state management

### Backend Tests (Server)

```bash
cd server
npm test
```

**What's tested:**
- ✅ Announcements CRUD operations
- ✅ Quizzes CRUD operations  
- ✅ API endpoints
- ✅ Database operations

### Manual Testing

#### 1. Start the Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server will start on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Client will start on: `http://localhost:5173`

#### 2. Test Authentication Flow

1. **Open Browser**: Navigate to `http://localhost:5173`
2. **Home Page**: Should show login button
3. **Login**: Click "Log in" button (no credentials needed)
4. **Redirect**: Should redirect to dashboard
5. **Protected Routes**: Try accessing `/dashboard` directly - should work when logged in
6. **Logout**: Click logout button in top bar
7. **Redirect**: Should redirect back to home page

#### 3. Test Dashboard Features

1. **Dashboard**: Should display announcements and quizzes
2. **Sidebar Navigation**: Test all navigation links
3. **Responsive Design**: Test on different screen sizes
4. **Language Toggle**: Test English/Arabic switching

#### 4. Test API Endpoints

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Authentication:**
```bash
curl -X POST http://localhost:5000/api/auth/login
```

**Announcements:**
```bash
# Get all announcements
curl http://localhost:5000/api/announcements

# Create announcement
curl -X POST http://localhost:5000/api/announcements \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","body":"Test body","author":"Teacher","course":"Math"}'
```

**Quizzes:**
```bash
# Get all quizzes
curl http://localhost:5000/api/quizzes

# Create quiz
curl -X POST http://localhost:5000/api/quizzes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Quiz","description":"Test","course":"Math","topic":"Algebra","dueDate":"2024-01-01","duration":60}'
```

## Test Coverage Areas

### Frontend Testing
- [x] Authentication HOC
- [x] Component rendering
- [x] Redux state management
- [x] Routing
- [ ] Form validation
- [ ] Error handling
- [ ] Loading states

### Backend Testing
- [x] CRUD operations for announcements
- [x] CRUD operations for quizzes
- [x] Authentication endpoints
- [x] Database operations

## Running Full Test Suite

### Automated Testing
```bash
# Run all frontend tests
cd client && npm test

# Run all backend tests  
cd ../server && npm test

# Run tests in watch mode (frontend)
cd ../client && npm test -- --watch

# Run tests with coverage (frontend)
cd ../client && npm test -- --coverage
```

### Manual Testing Checklist

#### Authentication
- [ ] Login without credentials works
- [ ] Logout clears session
- [ ] Protected routes redirect when not authenticated
- [ ] Protected routes work when authenticated

#### Navigation
- [ ] Sidebar links work correctly
- [ ] Hover effects on sidebar work
- [ ] Responsive design on mobile/tablet
- [ ] Language switching works

#### Data Display
- [ ] Announcements load and display correctly
- [ ] Quizzes load and display correctly
- [ ] Loading states show appropriately
- [ ] Empty states display correctly

#### API Integration
- [ ] All API endpoints respond correctly
- [ ] Error handling works for failed requests
- [ ] Data persistence works correctly

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Make sure MongoDB is running
   docker-compose up -d
   ```

2. **Port Already in Use**
   ```bash
   # Kill processes on ports
   npx kill-port 4000 5173
   ```

3. **Test Failures**
   ```bash
   # Clear test cache
   npm test -- --clearCache
   ```

4. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## Test Results

After running tests, you should see:

**Frontend Tests:**
- ✅ requireAuth HOC tests pass
- ✅ Component rendering tests pass
- ✅ Redux integration tests pass

**Backend Tests:**
- ✅ Announcements CRUD tests pass
- ✅ Quizzes CRUD tests pass
- ✅ API endpoint tests pass

## Adding New Tests

### Frontend Test Example
```typescript
// client/src/tests/ComponentName.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ComponentName from '../ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Backend Test Example
```typescript
// server/tests/endpoint.spec.ts
import { test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app.js';

test('endpoint works', async () => {
  const response = await request(app).get('/api/endpoint').expect(200);
  expect(response.body).toEqual(expectedData);
});
```

This testing guide ensures comprehensive coverage of all project functionality!
