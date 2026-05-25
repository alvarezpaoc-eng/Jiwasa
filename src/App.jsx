import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LandingPage              from './pages/LandingPage'
import LoginPage                from './pages/LoginPage'
import OnboardingPage           from './pages/OnboardingPage'
import DashboardPage            from './pages/DashboardPage'
import ActividadRecomendadaPage from './pages/ActividadRecomendadaPage'
import LibraryPage              from './pages/LibraryPage'
import ActivityDetailPage       from './pages/ActivityDetailPage'
import MuroVivoPage             from './pages/MuroVivoPage'
import ReportesPage             from './pages/ReportesPage'
import EspecialistasPage        from './pages/EspecialistasPage'

// ── Terapeuta ─────────────────────────────────────────────────────────────────
import DashboardT               from './pages/DashboardT'
import EspecialistasTPage       from './pages/EspecialistasTPage'
import ReportesTPage            from './pages/ReportesTPage'
import CrearActividadT          from './pages/CrearActividadT'

// ── Admin ─────────────────────────────────────────────────────────────────────
import AdminDashboardPage       from './pages/AdminDashboardPage'

// ── Placeholder ───────────────────────────────────────────────────────────────
const Placeholder = ({ title, back = '/' }) => (
  <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
    <div className="text-5xl">🚧</div>
    <h1 className="font-display text-3xl text-gray-700">{title}</h1>
    <p className="text-gray-400 text-sm">Próximamente en construcción</p>
    <a href={back} className="mt-4 px-6 py-3 rounded-full bg-blue-soft text-white text-sm font-medium hover:bg-blue-mid transition-colors">
      ← Volver
    </a>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public ───────────────────────────────────────────── */}
        <Route path="/"      element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ── Flujo familiar ───────────────────────────────────── */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard"  element={<DashboardPage />} />

        {/* ── Actividades ─────────────────────────────────────── */}
        <Route path="/activity/1"   element={<ActividadRecomendadaPage />} />
        <Route path="/activity/:id" element={<ActivityDetailPage />} />

        {/* ── Biblioteca ───────────────────────────────────────── */}
        <Route path="/library" element={<LibraryPage />} />

        {/* ── Comunidad ────────────────────────────────────────── */}
        <Route path="/community" element={<MuroVivoPage />} />

        {/* ── Familia: chat + reportes ──────────────────────────── */}
        <Route path="/chat"    element={<EspecialistasPage />} />
        <Route path="/reports" element={<ReportesPage />} />
        <Route path="/profile" element={<Placeholder title="Perfil Familiar" back="/dashboard" />} />

        {/* ── Terapeuta: dashboard ─────────────────────────────── */}
        <Route path="/therapist" element={<DashboardT />} />

        {/* ── Terapeuta: sub-páginas ────────────────────────────── */}
        <Route path="/therapist/chat"            element={<EspecialistasTPage />} />
        <Route path="/therapist/reportes"        element={<ReportesTPage />} />
        <Route path="/therapist/crear-actividad" element={<CrearActividadT />} />

        {/* ── Admin ────────────────────────────────────────────── */}
        <Route path="/admin" element={<AdminDashboardPage />} />

        {/* ── Fallback ─────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}