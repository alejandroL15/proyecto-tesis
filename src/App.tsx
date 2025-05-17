import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThesisProvider } from './context/ThesisContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SessionDetail from './pages/SessionDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <ThesisProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="session/:id" element={<SessionDetail />} />
            <Route 
              path="admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </ThesisProvider>
    </AuthProvider>
  );
}

export default App;