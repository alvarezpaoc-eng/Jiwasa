import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// ─── Mock data ────────────────────────────────────────────────────────────────

const USER = {
  name: 'Laura',
  childName: 'Nicolás',
  childAge: 6,
  avatar: 'L',
  streak: 4,
}

const TODAY_ACTIVITY = {
  id: 1,
  emoji: '🍳',
  title: 'Momento Cocina',
  subtitle: 'Preparamos juntos la merienda',
  goals: ['Motricidad fina', 'Seguir instrucciones', 'Lenguaje'],
  duration: 7,
  difficulty: 'Suave',
  therapist: 'Dra. Ana Torres',
}

const GREETINGS = [
  'Hoy no necesitas hacerlo perfecto.',
  'Cada pequeño momento cuenta.',
  'Estás haciendo más de lo que crees.',
  'Tu presencia ya es terapia.',
]

const PROGRESS_ITEMS = [
  { label: 'Autonomía al vestirse', emoji: '👕', delta: '+2 semanas seguidas', color: 'bg-blue-light text-blue-mid' },
  { label: 'Seguimiento visual', emoji: '👁️', delta: 'Mejorando cada día', color: 'bg-yellow-light text-yellow-mid' },
  { label: 'Participación en actividades', emoji: '🙌', delta: '3 actividades esta semana', color: 'bg-green-50 text-green-600' },
]

const ACHIEVEMENTS = [
  { icon: '🏆', label: '4 días seguidos', sub: 'Racha activa', color: 'from-yellow-warm to-amber-400' },
  { icon: '🌱', label: 'Semana de avances', sub: 'Completada', color: 'from-green-400 to-teal-400' },
  { icon: '✨', label: 'Rutina completada', sub: 'Hoy', color: 'from-blue-soft to-blue-mid' },
]

const QUICK_ACCESS = [
  { emoji: '📚', label: 'Biblioteca', desc: 'Actividades para hoy', route: '/library', color: 'bg-blue-light', accent: 'text-blue-soft' },
  { emoji: '💬', label: 'Especialistas', desc: 'Chat con Dra. Torres', route: '/chat', color: 'bg-yellow-light', accent: 'text-yellow-mid' },
  { emoji: '❤️', label: 'Muro Vivo', desc: 'Comunidad de familias', route: '/community', color: 'bg-pink-50', accent: 'text-pink-400' },
  { emoji: '📈', label: 'Reportes', desc: 'Progreso de Nicolás', route: '/reports', color: 'bg-green-50', accent: 'text-green-500' },
]

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

function BottomNav({ active }) {
  const navigate = useNavigate()
  const items = [
    { icon: '🏠', label: 'Inicio',      route: '/dashboard' },
    { icon: '✨', label: 'Actividades', route: '/library' },
    { icon: '📚', label: 'Biblioteca',  route: '/library' },
    { icon: '❤️', label: 'Comunidad',  route: '/community' },
    { icon: '👤', label: 'Perfil',      route: '/profile' },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/60">
      <div className="max-w-lg mx-auto px-2 py-2 flex items-center justify-around">
        {items.map(({ icon, label, route }) => {
          const isActive = active === route
          return (
            <button
              key={label}
              onClick={() => navigate(route)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 ${
                isActive ? 'bg-blue-light' : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className={`text-[10px] font-medium ${isActive ? 'text-blue-soft' : 'text-gray-400'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ─── Emotional state ring ─────────────────────────────────────────────────────

function EmotionalRing({ value, label, color, bg }) {
  const r = 28
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#f0ede8" strokeWidth="5" />
          <circle
            cx="32" cy="32" r={r}
            fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold" style={{ color }}>{value}%</span>
        </div>
      </div>
      <p className="text-[11px] text-gray-500 text-center leading-tight">{label}</p>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const navigate = useNavigate()
  const [greeting] = useState(GREETINGS[Math.floor(Math.random() * GREETINGS.length)])
  const [activityStarted, setActivityStarted] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 80)
  }, [])

  const handleStartActivity = () => {
    setActivityStarted(true)
    setTimeout(() => navigate('/activity/1'), 900)
  }

  return (
    <div className="min-h-screen bg-beige-soft pb-24">

      {/* ── Top Header ───────────────────────────────────────── */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Greeting */}
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Link to="/" className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center">
                  <span className="text-white font-display font-bold text-[10px]">J</span>
                </div>
              </Link>
              <h1 className="font-semibold text-gray-800 text-base">
                Hola, {USER.name} 🌱
              </h1>
            </div>
            <p className="text-xs text-gray-400">{greeting}</p>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-yellow-light border border-yellow-warm/30">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-semibold text-yellow-mid">{USER.streak}</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center hover:border-blue-soft/30 transition-colors relative"
              >
                <span className="text-base">🔔</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-soft border-2 border-white" />
              </button>

              {showNotif && (
                <div className="absolute right-0 top-11 w-64 bg-white rounded-2xl shadow-card border border-beige-mid p-3 z-50 animate-fade-in">
                  <p className="text-xs font-semibold text-gray-700 mb-2 px-1">Notificaciones</p>
                  {[
                    { icon: '💬', text: 'Dra. Torres revisó el reporte de ayer', time: 'Hace 2h' },
                    { icon: '✨', text: 'Nueva actividad disponible para Nicolás', time: 'Hace 5h' },
                  ].map(({ icon, text, time }, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-xl hover:bg-beige-soft transition-colors cursor-pointer">
                      <span className="text-base flex-shrink-0">{icon}</span>
                      <div>
                        <p className="text-xs text-gray-600 leading-snug">{text}</p>
                        <p className="text-[10px] text-gray-300 mt-0.5">{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-blue-soft flex items-center justify-center text-white text-sm font-semibold shadow-soft">
              {USER.avatar}
            </div>
          </div>
        </div>
      </div>

      {/* ── Page content ─────────────────────────────────────── */}
      <div className={`max-w-lg mx-auto px-5 pt-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* ── 1. Activity card (hero) ────────────────────────── */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Actividad de hoy</p>
            <button onClick={() => navigate('/library')} className="text-xs text-blue-soft hover:underline">Ver más →</button>
          </div>

          <div className="relative bg-gradient-to-br from-blue-soft via-[#3b82c8] to-blue-mid rounded-3xl p-6 overflow-hidden shadow-card">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-yellow-warm/20 translate-y-6 -translate-x-6" />

            <div className="relative z-10">
              {/* Emoji + title */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-3xl flex-shrink-0">
                  {TODAY_ACTIVITY.emoji}
                </div>
                <div>
                  <p className="text-white/70 text-xs font-medium mb-0.5">Preparada por {TODAY_ACTIVITY.therapist}</p>
                  <h2 className="text-white font-semibold text-xl leading-tight">{TODAY_ACTIVITY.title}</h2>
                  <p className="text-white/60 text-xs mt-0.5">{TODAY_ACTIVITY.subtitle}</p>
                </div>
              </div>

              {/* Goal pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {TODAY_ACTIVITY.goals.map(g => (
                  <span key={g} className="px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-[11px] font-medium">
                    {g}
                  </span>
                ))}
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1.5 text-white/70 text-xs">
                  <span>⏱️</span> {TODAY_ACTIVITY.duration} minutos
                </div>
                <div className="flex items-center gap-1.5 text-white/70 text-xs">
                  <span>🌊</span> {TODAY_ACTIVITY.difficulty}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleStartActivity}
                disabled={activityStarted}
                className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                  activityStarted
                    ? 'bg-white/20 text-white/50 cursor-not-allowed'
                    : 'bg-white text-blue-mid hover:bg-yellow-warm hover:text-gray-900 shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {activityStarted ? 'Abriendo actividad...' : 'Iniciar actividad →'}
              </button>
            </div>
          </div>
        </section>

        {/* ── 2. Emotional state ────────────────────────────── */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Cómo estamos esta semana</p>
          <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-5">
            <div className="flex items-center justify-around">
              <EmotionalRing value={78} label="Energía familiar" color="#4A90E2" />
              <div className="h-16 w-px bg-beige-mid" />
              <EmotionalRing value={65} label="Constancia" color="#F4C542" />
              <div className="h-16 w-px bg-beige-mid" />
              <EmotionalRing value={42} label="Estrés" color="#7BC8A4" />
            </div>

            <div className="mt-4 pt-4 border-t border-beige-mid">
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                💛 Esta semana la familia ha mantenido un ritmo constante. ¡Cada día cuenta!
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. Progress ───────────────────────────────────── */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Progreso de {USER.childName}
            </p>
            <button onClick={() => navigate('/reports')} className="text-xs text-blue-soft hover:underline">Ver reporte →</button>
          </div>

          <div className="flex flex-col gap-3">
            {PROGRESS_ITEMS.map(({ label, emoji, delta, color }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-2xl border border-beige-mid p-4 shadow-soft card-hover"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl ${color.split(' ')[0]} flex items-center justify-center text-xl flex-shrink-0`}>
                  {emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 leading-snug">{label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{delta}</p>
                </div>
                <div className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold ${color}`}>
                  ↑
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Achievements ────────────────────────────────── */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Logros familiares</p>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {ACHIEVEMENTS.map(({ icon, label, sub, color }, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-36 bg-gradient-to-br ${color} rounded-2xl p-4 text-center shadow-soft`}
              >
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-white text-xs font-semibold leading-snug">{label}</p>
                <p className="text-white/70 text-[10px] mt-1">{sub}</p>
              </div>
            ))}

            {/* Unlock next */}
            <div className="flex-shrink-0 w-36 bg-beige-mid rounded-2xl p-4 text-center border-2 border-dashed border-gray-200">
              <div className="text-3xl mb-2 opacity-30">🔒</div>
              <p className="text-gray-400 text-xs font-medium leading-snug">Próximo logro</p>
              <p className="text-gray-300 text-[10px] mt-1">¡Sigue así!</p>
            </div>
          </div>
        </section>

        {/* ── 5. Quick access ────────────────────────────────── */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Accesos rápidos</p>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACCESS.map(({ emoji, label, desc, route, color, accent }) => (
              <button
                key={label}
                onClick={() => navigate(route)}
                className={`${color} rounded-2xl p-4 text-left card-hover border border-white/60 transition-all duration-200`}
              >
                <div className="text-2xl mb-2">{emoji}</div>
                <p className={`text-sm font-semibold ${accent}`}>{label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* ── 6. Terapeuta card ──────────────────────────────── */}
        <section className="mb-6">
          <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-2xl flex-shrink-0">
              🧑‍⚕️
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">Tu terapeuta</p>
              <p className="text-sm font-semibold text-gray-800">Dra. Ana Torres</p>
              <p className="text-[11px] text-gray-400">Revisó tu reporte hace 2 horas</p>
            </div>
            <button
              onClick={() => navigate('/chat')}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-blue-light text-blue-soft text-xs font-semibold hover:bg-blue-soft hover:text-white transition-all duration-200"
            >
              Escribir
            </button>
          </div>
        </section>

      </div>{/* end content */}

      {/* Overlay when notification open */}
      {showNotif && (
        <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
      )}

      <BottomNav active="/dashboard" />
    </div>
  )
}