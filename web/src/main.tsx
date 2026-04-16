import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './app/App';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Survey from './pages/Survey';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>,
);
