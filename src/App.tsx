import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, HashRouter, Link } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfesionalesBeneficios from './pages/ProfesionalesBeneficios';
import ProfesionalesRegistro from './pages/ProfesionalesRegistro';
import ProfesionalesRequisitos from './pages/ProfesionalesRequisitos';
import Blog from './pages/Blog';
import PrimerosAuxilios from './pages/PrimerosAuxilios';
import Recomendaciones from './pages/Recomendaciones';
import Contacto from './pages/Contacto';
import AsistenteIA from './pages/AsistenteIA';
import ServicesPage from './pages/ServicesPage';
import Cuidadores from './pages/Cuidadores';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MyAdsPage from './pages/MyAdsPage';
import SettingsPage from './pages/SettingsPage';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';
import SignupPage from './pages/SignupPage';

// Routes configuration moved to the Routes component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/benefits" element={<ProfesionalesBeneficios />} />
      <Route path="/register" element={<ProfesionalesRegistro />} />
      <Route path="/requirements" element={<ProfesionalesRequisitos />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/aid" element={<PrimerosAuxilios />} />
      <Route path="/recommendations" element={<Recomendaciones />} />
      <Route path="/contact" element={<Contacto />} />
      <Route path="/petti-assistant" element={<AsistenteIA />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/sitters" element={<Cuidadores />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={
        <PublicOnlyRoute>
          <LoginPage />
        </PublicOnlyRoute>
      } />
      
      {/* Protected User Routes */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/my-ads" element={
        <ProtectedRoute>
          <MyAdsPage />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      
      {/* 404 Not Found */}
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-petti-blue dark:text-petti-light-blue mb-4">404</h1>
          <p className="text-xl text-petti-deep-blue dark:text-petti-base mb-6">Página no encontrada</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-petti-blue hover:bg-petti-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-petti-blue"
          >
            Volver al inicio
          </Link>
        </div>
      </div>} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-petti-base dark:bg-petti-deep-blue">
            <Header />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </AuthProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;