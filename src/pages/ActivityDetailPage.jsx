import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ACTIVITIES_DB } from './LibraryPage'

// ─── Datos estáticos compartidos ─────────────────────────────────────────────

const EMOTIONAL_MESSAGES = [
  '¡Hoy compartir juntos ya es un avance! 💛',
  'No tiene que salir perfecto 🌱',
  'Pequeños momentos también ayudan ✨',
  'Tu energía de hoy es suficiente 🏡',
  'Estás haciendo más de lo que crees 💙',
]

const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Le fue bien',         value: 'good',    color: 'bg-green-50 border-green-200 text-green-700' },
  { emoji: '😐', label: 'Tuvo dificultades',    value: 'neutral', color: 'bg-yellow-light border-yellow-warm/40 text-yellow-mid' },
  { emoji: '😞', label: 'No quiso participar',  value: 'hard',    color: 'bg-red-50 border-red-200 text-red-400' },
]

// ─── BottomNav ────────────────────────────────────────────────────────────────

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

// ─── NotFound ─────────────────────────────────────────────────────────────────

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-beige-soft flex flex-col items-center justify-center gap-4 px-6">
      <div className="text-5xl">🌱</div>
      <h1 className="text-xl font-semibold text-gray-700 text-center">Actividad no encontrada</h1>
      <p className="text-sm text-gray-400 text-center">Esta actividad no existe todavía, ¡pero pronto estará aquí!</p>
      <button
        onClick={() => navigate('/library')}
        className="mt-2 px-6 py-3 rounded-2xl bg-blue-light text-blue-soft text-sm font-semibold hover:bg-blue-soft hover:text-white transition-all duration-200"
      >
        ← Ver biblioteca
      </button>
    </div>
  )
}

// ─── ActivityDetailPage ───────────────────────────────────────────────────────

export default function ActivityDetailPage() {
  const navigate   = useNavigate()
  const { id }     = useParams()

  // Busca la actividad en la DB; si no existe, null
  const activity = ACTIVITIES_DB.find(a => a.id === Number(id)) ?? null

  const [visible,             setVisible]             = useState(false)
  const [activeStep,          setActiveStep]           = useState(0)
  const [selectedMood,        setSelectedMood]         = useState(null)
  const [completed,           setCompleted]            = useState(false)
  const [showCompletionBanner,setShowCompletionBanner] = useState(false)
  const [uploadHint,          setUploadHint]           = useState(null)

  const [emotionalMsg] = useState(
    EMOTIONAL_MESSAGES[Math.floor(Math.random() * EMOTIONAL_MESSAGES.length)]
  )

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  if (!activity) return <NotFound />

  const { emoji, title, subtitle, therapist, duration, age, difficulty, energy,
          goals, gradient, steps, why, quickVariant, tips, adaptations, materials } = activity

  // Related activities (same category, excluding current)
  const related = ACTIVITIES_DB.filter(a => a.category === activity.category && a.id !== activity.id).slice(0, 3)

  const handleComplete = () => {
    if (!selectedMood) return
    setCompleted(true)
    setShowCompletionBanner(true)
    setTimeout(() => navigate('/dashboard'), 2800)
  }

  const handleUpload = (type) => {
    setUploadHint(type)
    setTimeout(() => setUploadHint(null), 2000)
  }

  return (
    <div className="min-h-screen bg-beige-soft pb-28">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <span className="text-lg">←</span>
            <span className="text-sm font-medium">Volver</span>
          </button>

          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">J</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">Jiwasa</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-yellow-light border border-yellow-warm/30">
            <span className="text-sm">⏱️</span>
            <span className="text-xs font-semibold text-yellow-mid">{duration} min</span>
          </div>
        </div>
      </div>

      <div
        className={`max-w-lg mx-auto px-5 pt-6 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >

        {/* ── 1. Banner emocional ──────────────────────────────────── */}
        <div className="mb-6 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-light to-blue-light border border-yellow-warm/20 text-center">
          <p className="text-sm font-medium text-gray-700 leading-relaxed">{emotionalMsg}</p>
        </div>

        {/* ── 2. Hero card ─────────────────────────────────────────── */}
        <section className="mb-6">
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} shadow-card p-5`}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-6 -translate-x-6" />

            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-4xl flex-shrink-0">
                  {emoji}
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-0.5">Preparada por {therapist}</p>
                  <h1 className="text-white font-semibold text-xl leading-tight">{title}</h1>
                  <p className="text-white/60 text-xs mt-0.5">{subtitle}</p>
                </div>
              </div>

              {/* Goals */}
              <div className="flex flex-wrap gap-2 mb-4">
                {goals.map(({ icon, label }) => (
                  <span key={label} className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-[11px] font-medium">
                    {icon} {label}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center flex-wrap gap-4 text-white/70 text-xs">
                <span>⏱️ {duration} min</span>
                {age && <span>🎂 {age}</span>}
                <span>🌊 {difficulty}</span>
                <span>⚡ Energía {energy}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Materiales ────────────────────────────────────────── */}
        <section className="mb-6">
          <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧺</span>
              <p className="text-sm font-semibold text-gray-700">Lo que necesitas</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {materials.map(m => (
                <span key={m} className="px-3 py-1.5 rounded-full bg-beige-soft border border-beige-mid text-xs text-gray-600 font-medium">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Video placeholder ─────────────────────────────────── */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Video guía</p>
          <div className="bg-white rounded-3xl border border-beige-mid shadow-soft overflow-hidden">
            <div
              className="w-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-beige-soft to-blue-light"
              style={{ height: '170px' }}
            >
              <div className="w-14 h-14 rounded-full bg-white/70 flex items-center justify-center shadow-soft">
                <span className="text-2xl ml-1">▶️</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Video: {title}</p>
            </div>
            <div className="px-4 py-3 border-t border-beige-mid">
              <p className="text-[11px] text-gray-400 text-center">
                🎥 Una guía breve para ver cómo hacerlo, sin presión
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. Pasos ─────────────────────────────────────────────── */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Cómo hacerlo</p>
          <div className="flex flex-col gap-3">
            {steps.map(({ n, icon, title: stepTitle, text }, i) => {
              const isActive = activeStep === i
              return (
                <button
                  key={n}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 shadow-soft ${
                    isActive
                      ? 'bg-blue-light border-blue-soft/30 shadow-md'
                      : 'bg-white border-beige-mid hover:border-blue-soft/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                      isActive ? 'bg-blue-soft text-white' : 'bg-beige-soft text-gray-400'
                    }`}>
                      {n}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{icon}</span>
                        <p className={`text-sm font-semibold ${isActive ? 'text-blue-mid' : 'text-gray-700'}`}>
                          {stepTitle}
                        </p>
                      </div>
                      <p className={`text-xs leading-relaxed transition-all duration-200 ${
                        isActive
                          ? 'text-gray-600 max-h-20 opacity-100'
                          : 'text-gray-400 max-h-0 opacity-0 overflow-hidden'
                      }`}>
                        {text}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* ── 6. ¿Por qué ayuda? ───────────────────────────────────── */}
        <section className="mb-6">
          <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌱</span>
              <p className="text-sm font-semibold text-gray-700">¿Por qué ayuda esta actividad?</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {why}
            </p>
          </div>
        </section>

        {/* ── 7. Variante rápida ───────────────────────────────────── */}
        <section className="mb-6">
          <div className="rounded-3xl border border-yellow-warm/40 bg-gradient-to-br from-yellow-light to-white shadow-soft p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⚡</span>
              <p className="text-sm font-semibold text-yellow-mid">Hoy con menos energía</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {quickVariant} <span className="font-medium text-gray-600">La constancia, no la perfección.</span>
            </p>
          </div>
        </section>

        {/* ── 8. Adaptaciones ──────────────────────────────────────── */}
        {adaptations && adaptations.length > 0 && (
          <section className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Si las cosas no salen como esperas
            </p>
            <div className="flex flex-col gap-3">
              {adaptations.map(({ icon, title: aTitle, text }, i) => (
                <div key={i} className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4 flex gap-3">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-0.5">{aTitle}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 9. Tips emocionales ──────────────────────────────────── */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Recuerda mientras lo haces
          </p>
          <div className="grid grid-cols-2 gap-3">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white rounded-2xl border border-beige-mid shadow-soft p-3.5">
                <p className="text-xs text-gray-500 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. Mini progreso ────────────────────────────────────── */}
        {completed && (
          <section className="mb-6">
            <div className="rounded-3xl bg-gradient-to-br from-blue-soft to-blue-mid p-5 text-center shadow-card">
              <div className="text-4xl mb-2">✨</div>
              <p className="text-white font-semibold text-lg">Actividad completada</p>
              <p className="text-white/70 text-sm mt-1">Hoy acompañaron juntos 🌱</p>
              <p className="text-white/50 text-xs mt-1">Un pequeño momento también suma 💛</p>
            </div>
          </section>
        )}

        {/* ── 11. Reporte rápido ───────────────────────────────────── */}
        {!completed && (
          <section className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              ¿Cómo le fue hoy?
            </p>
            <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-4">
              <p className="text-sm text-gray-600 text-center mb-4">
                Cuéntanos brevemente cómo fue la experiencia
              </p>
              <div className="flex gap-3">
                {MOOD_OPTIONS.map(({ emoji: mEmoji, label, value, color }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedMood(value)}
                    className={`flex-1 flex flex-col items-center gap-2 py-3.5 rounded-2xl border-2 transition-all duration-200 ${
                      selectedMood === value
                        ? color + ' scale-105 shadow-md'
                        : 'bg-beige-soft border-transparent hover:border-beige-mid'
                    }`}
                  >
                    <span className="text-2xl">{mEmoji}</span>
                    <span className={`text-[10px] font-medium text-center leading-snug ${selectedMood === value ? '' : 'text-gray-400'}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 12. Evidencia opcional ───────────────────────────────── */}
        {!completed && (
          <section className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Evidencia (opcional)
            </p>
            <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-4">
              <p className="text-xs text-gray-400 text-center mb-4 leading-relaxed">
                Si quieres, comparte un recuerdo del momento 📸
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '📸', label: 'Foto',  type: 'foto'  },
                  { icon: '🎵', label: 'Audio', type: 'audio' },
                  { icon: '🎬', label: 'Video', type: 'video' },
                ].map(({ icon, label, type }) => (
                  <button
                    key={type}
                    onClick={() => handleUpload(type)}
                    className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all duration-200 ${
                      uploadHint === type
                        ? 'bg-blue-light border-blue-soft/40 scale-95'
                        : 'bg-beige-soft border-transparent hover:border-beige-mid hover:bg-white'
                    }`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-[11px] font-medium text-gray-500">{label}</span>
                    {uploadHint === type && <span className="text-[10px] text-blue-soft">Agregado ✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 13. Botón completar ──────────────────────────────────── */}
        {!completed && (
          <section className="mb-6">
            <button
              onClick={handleComplete}
              disabled={!selectedMood}
              className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                selectedMood
                  ? 'bg-gradient-to-r from-blue-soft to-blue-mid text-white shadow-card hover:-translate-y-0.5 hover:shadow-lg'
                  : 'bg-beige-mid text-gray-300 cursor-not-allowed'
              }`}
            >
              {selectedMood ? 'Completar actividad ✨' : 'Selecciona cómo le fue para continuar'}
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full mt-3 py-3 rounded-2xl text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
            >
              Volver al dashboard
            </button>
          </section>
        )}

        {/* ── 14. También podría ayudarte ──────────────────────────── */}
        {related.length > 0 && (
          <section className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              También podría ayudarte
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {related.map(rel => (
                <button
                  key={rel.id}
                  onClick={() => { navigate(`/activity/${rel.id}`); window.scrollTo(0,0) }}
                  className={`flex-shrink-0 w-36 ${rel.cardBg} rounded-2xl border border-white/80 shadow-soft p-3 text-left card-hover`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${rel.gradient} flex items-center justify-center text-xl mb-2`}>
                    {rel.emoji}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 leading-snug">{rel.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{rel.duration} min</p>
                </button>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── Completion overlay ────────────────────────────────────── */}
      {showCompletionBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-in">
          <div className="mx-6 bg-white rounded-3xl shadow-card p-8 text-center max-w-xs w-full">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="font-semibold text-gray-800 text-xl mb-1">¡Lo lograron juntos!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Este pequeño momento ya está sumando al desarrollo de tu hijo 💛
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-blue-soft animate-pulse" />
              Volviendo al dashboard...
            </div>
          </div>
        </div>
      )}

      <BottomNav active="/library" />
    </div>
  )
}