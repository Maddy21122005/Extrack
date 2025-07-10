import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TransactionPage from './pages/TransactionPage';
import DebtManagerPage from './pages/DebtManagerPage';
import ProtectedRoute from './utils/ProtectedRoutes';
import ContactPage from './pages/ContactPage';
import PageTransition from './components/PageTransition';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Navbar />
        <PageTransition>
          <Dashboard />
        </PageTransition>
      </ProtectedRoute>
    )
  },
  {
    path: '/transactions',
    element: (
      <ProtectedRoute>
        <Navbar />
        <PageTransition>
          <TransactionPage />
        </PageTransition>
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: (
      <PageTransition>
        <LoginPage />
      </PageTransition>
    )
  },
  {
    path: '/signup',
    element: (
      <PageTransition>
        <SignupPage />
      </PageTransition>
    )
  },
  {
    path: '/debtmanager',
    element: (
      <ProtectedRoute>
        <Navbar />
        <PageTransition>
          <DebtManagerPage />
        </PageTransition>
      </ProtectedRoute>
    )
  },
  {
    path: '/contact',
    element: (
      <ProtectedRoute>
        <Navbar />
        <PageTransition>
          <ContactPage />
        </PageTransition>
      </ProtectedRoute>
    )
  }
]);

const App = () => {
  return (
    <div className='app-root'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App