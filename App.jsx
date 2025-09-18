import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ForumPage from '@/pages/ForumPage';
import AnnouncementsPage from '@/pages/AnnouncementsPage';
// MembershipPage is removed
import MemberAreaPage from '@/pages/MemberAreaPage';
import EventsPage from '@/pages/EventsPage';
import BlogPage from '@/pages/BlogPage';
import AdminPage from '@/pages/AdminPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ProfilePage from '@/pages/ProfilePage'; 
import UpdatePasswordPage from '@/pages/UpdatePasswordPage';
import AdminAccessPage from '@/pages/AdminAccessPage'; // New Admin Access Page
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminContentPage from '@/pages/admin/AdminContentPage';
import AdminPaymentsPage from '@/pages/admin/AdminPaymentsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AdminStatsPage from '@/pages/admin/AdminStatsPage';
import RealizedActivitiesPage from '@/pages/RealizedActivitiesPage'; 

import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const AppContent = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
          <Route path="/a-propos" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
          <Route path="/forum" element={<AnimatedPage><ProtectedRoute requiredRole="member"><ForumPage /></ProtectedRoute></AnimatedPage>} />
          <Route path="/annonces" element={<AnimatedPage><AnnouncementsPage /></AnimatedPage>} />
          {/* Route /adhesion is removed */}
          <Route path="/activites-realisees" element={<AnimatedPage><RealizedActivitiesPage /></AnimatedPage>} />
          
          <Route path="/connexion" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
          <Route path="/inscription" element={<AnimatedPage><RegisterPage /></AnimatedPage>} />
          <Route path="/mot-de-passe-oublie" element={<AnimatedPage><ForgotPasswordPage /></AnimatedPage>} />
          <Route path="/mise-a-jour-mot-de-passe" element={<AnimatedPage><UpdatePasswordPage /></AnimatedPage>} />
          <Route path="/acces-admin" element={<AnimatedPage><AdminAccessPage /></AnimatedPage>} /> {/* New Route for Admin Access */}

          <Route path="/espace-membre" element={<AnimatedPage><ProtectedRoute requiredRole="member"><MemberAreaPage /></ProtectedRoute></AnimatedPage>} />
          <Route path="/espace-membre/profil" element={<AnimatedPage><ProtectedRoute requiredRole="member"><ProfilePage /></ProtectedRoute></AnimatedPage>} />
          
          <Route path="/evenements" element={<AnimatedPage><EventsPage /></AnimatedPage>} />
          <Route path="/blog" element={<AnimatedPage><BlogPage /></AnimatedPage>} />
          
          <Route path="/admin" element={<AnimatedPage><ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute></AnimatedPage>} />
          <Route path="/admin/membres" element={<AnimatedPage><ProtectedRoute requiredRole="admin"><AdminUsersPage /></ProtectedRoute></AnimatedPage>} />
          <Route path="/admin/contenu" element={<AnimatedPage><ProtectedRoute requiredRole="admin"><AdminContentPage /></ProtectedRoute></AnimatedPage>} />
          <Route path="/admin/paiements" element={<AnimatedPage><ProtectedRoute requiredRole="admin"><AdminPaymentsPage /></ProtectedRoute></AnimatedPage>} />
          <Route path="/admin/statistiques" element={<AnimatedPage><ProtectedRoute requiredRole="admin"><AdminStatsPage /></ProtectedRoute></AnimatedPage>} />
          <Route path="/admin/parametres" element={<AnimatedPage><ProtectedRoute requiredRole="admin"><AdminSettingsPage /></ProtectedRoute></AnimatedPage>} />

          <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AnimatedPage = ({ children }) => {
  const pageVariants = {
    initial: { opacity: 0, x: 0 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 0 },
  };
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3,
  };
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default App;