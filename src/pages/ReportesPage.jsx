import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const USER = {
  name: 'Laura',
  childName: 'Nicolás',
}

const AREA_COLORS = {
  Lenguaje:    { bg: 'bg-blue-light',   text: 'text-blue-soft',   dot: '#4A90E2' },
  Motricidad:  { bg: 'bg-yellow-light', text: 'text-yellow-mid',  dot: '#F4C542' },
  Conducta:    { bg: 'bg-purple-50',    text: 'text-purple-500',  dot: '#A78BFA' },
  Sensorial:   { bg: 'bg-green-50',     text: 'text-green-500',   dot: '#34D399' },
  Autonomía:   { bg: 'bg-pink-50',      text: 'text-pink-400',    dot: '#F472B6' },
}

const MOOD_PILLS = {
  '😊 Participativo': 'bg-green-50 text-green-600',
  '🎯 Concentrado':   'bg-blue-light text-blue-soft',
  '💛 Motivado':      'bg-yellow-light text-yellow-mid',
  '😴 Cansado':       'bg-gray-100 text-gray-500',
  '⚡ Muy activo':    'bg-orange-50 text-orange-400',
}

const REPORTS = [
  {
    id: 1,
    specialist: {
      name: 'Lic. Wara Valdivia',
      role: 'Psicomotricidad',
      avatar: 'W',
      avatarColor: 'from-blue-soft to-[#3b82c8]',
    },
    area: 'Motricidad',
    date: 'Hoy · 10:30 AM',
    isNew: true,
    text: 'Trabajamos equilibrio y coordinación usando pelotas sensoriales. Se observó mayor estabilidad en posición bípeda y mejor respuesta a instrucciones verbales simples.',
    moods: ['😊 Participativo', '🎯 Concentrado'],
    media: {
      type: 'image',
      thumb: null, // null = placeholder
      caption: 'Sesión de coordinación sensorial',
    },
    recommendations: [
      { emoji: '⚽', text: 'Rodar pelotas en el suelo por 5 minutos' },
      { emoji: '🚶', text: 'Caminar descalzo sobre diferentes texturas' },
    ],
    reactions: { gracias: 2, entendido: 0, dudas: 0 },
  },
  {
    id: 2,
    specialist: {
      name: 'Lic. Ana Torres',
      role: 'Lenguaje y Comunicación',
      avatar: 'A',
      avatarColor: 'from-yellow-warm to-amber-400',
    },
    area: 'Lenguaje',
    date: 'Ayer · 2:15 PM',
    isNew: true,
    text: 'Nicolás mostró avances en la articulación de palabras bisílabas. Respondió al 70% de las instrucciones verbales. Su tiempo de atención aumentó a 8 minutos continuos.',
    moods: ['💛 Motivado', '😊 Participativo'],
    media: {
      type: 'audio',
      caption: 'Audio de la sesión – 3 min',
    },
    recommendations: [
      { emoji: '📖', text: 'Leer en voz alta juntos antes de dormir' },
      { emoji: '🗣️', text: 'Nombrar objetos del hogar durante el desayuno' },
    ],
    reactions: { gracias: 1, entendido: 1, dudas: 0 },
  },
  {
    id: 3,
    specialist: {
      name: 'Lic. Carlos Mamani',
      role: 'Conducta y Autonomía',
      avatar: 'C',
      avatarColor: 'from-green-400 to-teal-400',
    },
    area: 'Autonomía',
    date: 'Hace 3 días',
    isNew: false,
    text: 'Se trabajó la secuencia de vestirse con apoyo visual. Nicolás logró colocarse los zapatos con mínima asistencia. Se observa mayor tolerancia a la frustración.',
    moods: ['⚡ Muy activo', '💛 Motivado'],
    media: null,
    recommendations: [
      { emoji: '👟', text: 'Practicar ponerse los zapatos cada mañana' },
      { emoji: '🕐', text: 'Darle tiempo extra sin intervenir de inmediato' },
    ],
    reactions: { gracias: 3, entendido: 2, dudas: 1 },
  },
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

// ─── Area Badge ───────────────────────────────────────────────────────────────

function AreaBadge({ area }) {
  const style = AREA_COLORS[area] || { bg: 'bg-gray-100', text: 'text-gray-500' }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${style.bg} ${style.text}`}>
      {area}
    </span>
  )
}

// ─── Media Block ──────────────────────────────────────────────────────────────

function MediaBlock({ media }) {
  const [playing, setPlaying] = useState(false)

  if (!media) return null

  if (media.type === 'image') {
    return (
      <div className="mt-4 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-light to-beige-soft border border-beige-mid">
        {/* Placeholder image with play overlay */}
        <div className="relative h-36 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-light/80 via-white/20 to-yellow-light/60" />
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-1">📸</div>
            <p className="text-xs text-gray-500 font-medium">{media.caption}</p>
          </div>
        </div>
      </div>
    )
  }

  if (media.type === 'audio') {
    return (
      <div className="mt-4 flex items-center gap-3 p-3 rounded-2xl bg-blue-light/50 border border-blue-soft/20">
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-blue-soft flex items-center justify-center text-white flex-shrink-0 hover:bg-blue-mid transition-colors shadow-soft"
        >
          <span className="text-sm">{playing ? '⏸' : '▶'}</span>
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-blue-mid">{media.caption}</p>
          {/* Waveform placeholder */}
          <div className="flex items-center gap-0.5 mt-1.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="bg-blue-soft/40 rounded-full"
                style={{
                  width: '2px',
                  height: `${6 + Math.sin(i * 0.8) * 4 + Math.random() * 4}px`,
                  opacity: playing && i < 12 ? 1 : 0.4,
                  transition: 'opacity 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

// ─── Reaction Buttons ─────────────────────────────────────────────────────────

function ReactionButtons({ reportId, initial }) {
  const [reactions, setReactions] = useState(initial)
  const [pressed, setPressed] = useState({})

  const react = (key) => {
    if (pressed[key]) return
    setReactions(r => ({ ...r, [key]: r[key] + 1 }))
    setPressed(p => ({ ...p, [key]: true }))
  }

  const buttons = [
    { key: 'gracias',   emoji: '❤️', label: 'Gracias' },
    { key: 'entendido', emoji: '👍', label: 'Entendido' },
    { key: 'dudas',     emoji: '❓', label: 'Tengo dudas' },
  ]

  return (
    <div className="flex gap-2 mt-4 pt-4 border-t border-beige-mid/60">
      {buttons.map(({ key, emoji, label }) => (
        <button
          key={key}
          onClick={() => react(key)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            pressed[key]
              ? 'bg-blue-light text-blue-soft scale-95'
              : 'bg-beige-soft hover:bg-blue-light/60 text-gray-500 hover:text-blue-soft'
          }`}
        >
          <span>{emoji}</span>
          <span>{label}</span>
          {reactions[key] > 0 && (
            <span className={`ml-0.5 text-[10px] ${pressed[key] ? 'text-blue-soft' : 'text-gray-400'}`}>
              {reactions[key]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ─── Consulta Modal ───────────────────────────────────────────────────────────

function ConsultaModal({ specialist, onClose }) {
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)

  const send = () => {
    if (!text.trim()) return
    setSent(true)
    setTimeout(onClose, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6">
      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-card p-6 animate-fade-in">
        {sent ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">✅</div>
            <p className="font-semibold text-gray-800">Consulta enviada</p>
            <p className="text-xs text-gray-400 mt-1">{specialist.name} la recibirá pronto</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${specialist.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}>
                {specialist.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{specialist.name}</p>
                <p className="text-[11px] text-gray-400">{specialist.role}</p>
              </div>
              <button onClick={onClose} className="ml-auto text-gray-300 hover:text-gray-500 text-lg">✕</button>
            </div>

            <p className="text-xs text-gray-500 mb-3">¿Tienes alguna duda sobre el reporte?</p>

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Escribe tu consulta aquí..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-beige-mid bg-beige-soft/50 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-blue-soft/50 focus:ring-2 focus:ring-blue-soft/10 transition-all"
            />

            <button
              onClick={send}
              disabled={!text.trim()}
              className="mt-3 w-full py-3 rounded-2xl bg-blue-soft text-white text-sm font-semibold hover:bg-blue-mid transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Enviar consulta
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Report Card ──────────────────────────────────────────────────────────────

function ReportCard({ report, index }) {
  const [visible, setVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120 + index * 120)
    return () => clearTimeout(t)
  }, [index])

  return (
    <>
      <article
        className={`bg-white rounded-3xl border border-beige-mid shadow-soft overflow-hidden transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* New badge ribbon */}
        {report.isNew && (
          <div className="bg-gradient-to-r from-blue-soft to-blue-mid px-5 py-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white text-[11px] font-semibold tracking-wide">Nuevo reporte</span>
          </div>
        )}

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${report.specialist.avatarColor} flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-soft`}>
              {report.specialist.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-gray-800">{report.specialist.name}</p>
                <AreaBadge area={report.area} />
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">{report.specialist.role}</p>
              <p className="text-[10px] text-gray-300 mt-0.5">{report.date}</p>
            </div>
          </div>

          {/* Report text */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {report.text}
          </p>

          {/* Mood pills */}
          <div className="flex flex-wrap gap-2 mb-1">
            {report.moods.map(mood => (
              <span
                key={mood}
                className={`px-3 py-1 rounded-full text-[11px] font-medium ${MOOD_PILLS[mood] || 'bg-gray-100 text-gray-500'}`}
              >
                {mood}
              </span>
            ))}
          </div>

          {/* Media */}
          <MediaBlock media={report.media} />

          {/* Recommendations */}
          {report.recommendations?.length > 0 && (
            <div className="mt-4 p-4 rounded-2xl bg-yellow-light/50 border border-yellow-warm/20">
              <p className="text-[10px] font-semibold text-yellow-mid uppercase tracking-widest mb-2.5">
                💡 Recomendación para hoy
              </p>
              <div className="flex flex-col gap-2">
                {report.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="text-base flex-shrink-0">{rec.emoji}</span>
                    <p className="text-xs text-gray-700 leading-snug">{rec.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reactions */}
          <ReactionButtons reportId={report.id} initial={report.reactions} />

          {/* Consulta link */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-3 w-full py-2.5 rounded-xl border border-beige-mid text-xs font-medium text-gray-500 hover:border-blue-soft/40 hover:text-blue-soft hover:bg-blue-light/30 transition-all duration-200"
          >
            Hacer una consulta →
          </button>
        </div>
      </article>

      {modalOpen && (
        <ConsultaModal specialist={report.specialist} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReportesPage() {
  const navigate = useNavigate()
  const [headerVisible, setHeaderVisible] = useState(false)
  const newCount = REPORTS.filter(r => r.isNew).length

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 60)
  }, [])

  return (
    <div className="min-h-screen bg-beige-soft pb-28">

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">

          {/* Back */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500 hover:border-blue-soft/40 hover:text-blue-soft transition-all flex-shrink-0"
          >
            ←
          </button>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-gray-800 text-base">Especialistas</h1>
              {newCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-soft text-white text-[10px] font-semibold">
                  {newCount} nuevos
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 truncate">
              Seguimiento terapéutico y avances de {USER.childName}
            </p>
          </div>

          {/* Logo */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center flex-shrink-0">
            <span className="text-white font-display font-bold text-xs">J</span>
          </div>
        </div>
      </div>

      {/* ── Page Content ──────────────────────────────────────── */}
      <div className={`max-w-lg mx-auto px-5 pt-6 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* ── 1. Emotional Welcome Card ──────────────────────── */}
        <section className="mb-6">
          <div className="relative bg-gradient-to-br from-blue-soft via-[#3b82c8] to-blue-mid rounded-3xl p-6 overflow-hidden shadow-card">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-yellow-warm/20 translate-y-5 -translate-x-5" />

            <div className="relative z-10">
              <p className="text-2xl mb-3">💛</p>
              <h2 className="text-white font-semibold text-lg leading-snug mb-2">
                Cada pequeño avance también es un gran logro
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Aquí podrás ver los reportes y recomendaciones que los especialistas comparten sobre las terapias de {USER.childName}.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. Specialists chips ───────────────────────────── */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Tu equipo terapéutico</p>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {REPORTS.map(r => (
              <div
                key={r.id}
                className="flex-shrink-0 flex flex-col items-center gap-2 p-3 w-24 bg-white rounded-2xl border border-beige-mid shadow-soft hover:border-blue-soft/30 transition-all cursor-pointer card-hover"
              >
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${r.specialist.avatarColor} flex items-center justify-center text-white font-bold text-base shadow-soft`}>
                  {r.specialist.avatar}
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-gray-700 leading-tight">
                    {r.specialist.name.split(' ').slice(-1)[0]}
                  </p>
                  <p className="text-[9px] text-gray-400 leading-tight mt-0.5">{r.area}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Reports Feed ────────────────────────────────── */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Reportes recientes
            </p>
            <span className="text-[10px] text-gray-300">{REPORTS.length} reportes</span>
          </div>

          {/* Timeline line */}
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-soft/30 via-yellow-warm/20 to-transparent" />

            <div className="flex flex-col gap-5">
              {REPORTS.map((report, i) => (
                <div key={report.id} className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 flex flex-col items-center pt-5">
                    <div
                      className="w-[10px] h-[10px] rounded-full border-2 border-white shadow-soft flex-shrink-0 z-10"
                      style={{ background: AREA_COLORS[report.area]?.dot || '#4A90E2' }}
                    />
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0">
                    <ReportCard report={report} index={i} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Emotional footer ────────────────────────────── */}
        <section className="mb-6">
          <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-5 text-center">
            <p className="text-2xl mb-2">🌱</p>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              No estás solo en este proceso
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tu equipo terapéutico acompaña cada paso de {USER.childName} y está aquí para guiarte.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-4 px-6 py-2.5 rounded-xl bg-blue-light text-blue-soft text-xs font-semibold hover:bg-blue-soft hover:text-white transition-all duration-200"
            >
              Volver al inicio
            </button>
          </div>
        </section>

      </div>

      <BottomNav active="/chat" />
    </div>
  )
}