import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FAMILIES = [
  {
    id: 1,
    childName: 'Nicolás',
    parentName: 'Laura Mamani',
    childAge: 6,
    avatar: 'L',
    avatarColor: 'from-blue-soft to-[#3b82c8]',
    status: 'activa',
    totalAssigned: 12,
    totalCompleted: 10,
    consistency: 82,
    weeks: [
      {
        week: 'Semana 3 – Mayo',
        date: '19–25 mayo 2025',
        assigned: 4,
        completed: 4,
        mood: { emoji: '😊', label: 'Le fue bien', value: 'bien' },
        notes: 'Nicolás participó con entusiasmo en todas las actividades. Mejoró el agarre de cuchara y dijo 2 palabras nuevas durante el momento cocina.',
        evidences: [
          { type: 'foto', label: 'Momento cocina', emoji: '🍳', color: 'bg-orange-50 border-orange-200', tag: 'Lun 19' },
          { type: 'video', label: 'Equilibrio escaleras', emoji: '🪁', color: 'bg-purple-50 border-purple-200', tag: 'Mié 21' },
          { type: 'foto', label: 'Arte sensorial', emoji: '🎨', color: 'bg-pink-50 border-pink-200', tag: 'Vie 23' },
        ],
        highlights: ['Mayor autonomía al vestirse', 'Agarre de cuchara mejoró', 'Dice 2 palabras nuevas'],
      },
      {
        week: 'Semana 2 – Mayo',
        date: '12–18 mayo 2025',
        assigned: 4,
        completed: 3,
        mood: { emoji: '😐', label: 'Tuvo dificultades', value: 'regular' },
        notes: 'La actividad de ponerse los zapatos fue difícil. Laura menciona que Nicolás estaba cansado. Las demás actividades salieron bien.',
        evidences: [
          { type: 'foto', label: 'Ponerse los zapatos', emoji: '👟', color: 'bg-yellow-50 border-yellow-200', tag: 'Mar 13' },
          { type: 'video', label: 'Juego de mesa', emoji: '🎲', color: 'bg-green-50 border-green-200', tag: 'Jue 15' },
        ],
        highlights: ['Mejor seguimiento visual', 'Mejoró agarre de objetos'],
      },
      {
        week: 'Semana 1 – Mayo',
        date: '5–11 mayo 2025',
        assigned: 4,
        completed: 3,
        mood: { emoji: '😊', label: 'Le fue bien', value: 'bien' },
        notes: 'Primer semana del mes con buena energía. Nicolás mostró interés en la actividad de música.',
        evidences: [
          { type: 'foto', label: 'Actividad de música', emoji: '🎵', color: 'bg-blue-50 border-blue-200', tag: 'Mié 7' },
        ],
        highlights: ['Alta participación familiar', 'Coordinación ojo-mano mejorada'],
      },
    ],
  },
  {
    id: 2,
    childName: 'Sofía',
    parentName: 'Marco Quispe',
    childAge: 5,
    avatar: 'M',
    avatarColor: 'from-yellow-warm to-amber-400',
    status: 'riesgo',
    totalAssigned: 8,
    totalCompleted: 2,
    consistency: 34,
    weeks: [
      {
        week: 'Semana 3 – Mayo',
        date: '19–25 mayo 2025',
        assigned: 4,
        completed: 1,
        mood: { emoji: '😔', label: 'No quiso participar', value: 'bajo' },
        notes: 'Marco reporta que Sofía rechazó la mayoría de actividades. Solo completaron el momento baño. Se recomienda llamada de apoyo esta semana.',
        evidences: [
          { type: 'foto', label: 'Momento baño', emoji: '🛁', color: 'bg-blue-50 border-blue-200', tag: 'Jue 22' },
        ],
        highlights: [],
      },
      {
        week: 'Semana 2 – Mayo',
        date: '12–18 mayo 2025',
        assigned: 4,
        completed: 1,
        mood: { emoji: '😔', label: 'No quiso participar', value: 'bajo' },
        notes: 'Baja participación esta semana también. La familia atraviesa un momento difícil. Se sugiere contacto empático.',
        evidences: [],
        highlights: [],
      },
    ],
  },
  {
    id: 3,
    childName: 'Diego',
    parentName: 'Carmen Flores',
    childAge: 7,
    avatar: 'C',
    avatarColor: 'from-green-400 to-teal-400',
    status: 'activa',
    totalAssigned: 15,
    totalCompleted: 14,
    consistency: 91,
    weeks: [
      {
        week: 'Semana 3 – Mayo',
        date: '19–25 mayo 2025',
        assigned: 5,
        completed: 5,
        mood: { emoji: '😊', label: 'Le fue bien', value: 'bien' },
        notes: 'Semana excelente. Diego completó todas las actividades con entusiasmo. Carmen envió 3 videos de evidencia.',
        evidences: [
          { type: 'video', label: 'Equilibrio con almohadas', emoji: '🛋️', color: 'bg-teal-50 border-teal-200', tag: 'Lun 19' },
          { type: 'foto', label: 'Actividad de cocina', emoji: '🍳', color: 'bg-orange-50 border-orange-200', tag: 'Mié 21' },
          { type: 'video', label: 'Arte con dedos', emoji: '🎨', color: 'bg-pink-50 border-pink-200', tag: 'Vie 23' },
        ],
        highlights: ['Alta constancia familiar', 'Buena tolerancia a cambios', 'Coordinación ojo-mano mejorada'],
      },
      {
        week: 'Semana 2 – Mayo',
        date: '12–18 mayo 2025',
        assigned: 5,
        completed: 4,
        mood: { emoji: '😐', label: 'Tuvo dificultades', value: 'regular' },
        notes: 'Una actividad no se pudo realizar por agenda familiar. El resto salió bien.',
        evidences: [
          { type: 'foto', label: 'Clasificación de ropa', emoji: '👕', color: 'bg-purple-50 border-purple-200', tag: 'Mar 13' },
          { type: 'foto', label: 'Juego de agua', emoji: '💧', color: 'bg-blue-50 border-blue-200', tag: 'Sáb 17' },
        ],
        highlights: ['Mayor autonomía al vestirse', 'Mejor seguimiento visual'],
      },
    ],
  },
  {
    id: 4,
    childName: 'Valentina',
    parentName: 'Pedro Condori',
    childAge: 4,
    avatar: 'P',
    avatarColor: 'from-purple-400 to-pink-400',
    status: 'inactiva',
    totalAssigned: 6,
    totalCompleted: 1,
    consistency: 12,
    weeks: [
      {
        week: 'Semana 3 – Mayo',
        date: '19–25 mayo 2025',
        assigned: 3,
        completed: 0,
        mood: null,
        notes: 'Sin registros esta semana. La familia no ha reportado actividad.',
        evidences: [],
        highlights: [],
      },
      {
        week: 'Semana 2 – Mayo',
        date: '12–18 mayo 2025',
        assigned: 3,
        completed: 1,
        mood: { emoji: '😔', label: 'No quiso participar', value: 'bajo' },
        notes: 'Solo se completó una actividad. Pedro reporta dificultades de tiempo.',
        evidences: [
          { type: 'foto', label: 'Actividad sensorial', emoji: '🎭', color: 'bg-yellow-50 border-yellow-200', tag: 'Mar 13' },
        ],
        highlights: [],
      },
    ],
  },
]

const STATUS_CONFIG = {
  activa:   { label: 'Activa',   bg: 'bg-green-50',  text: 'text-green-600',  dot: 'bg-green-400' },
  riesgo:   { label: 'Riesgo',   bg: 'bg-orange-50', text: 'text-orange-500', dot: 'bg-orange-400' },
  inactiva: { label: 'Inactiva', bg: 'bg-gray-100',  text: 'text-gray-500',   dot: 'bg-gray-400' },
}

const MOOD_CONFIG = {
  bien:    { emoji: '😊', label: 'Le fue bien',          bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-200' },
  regular: { emoji: '😐', label: 'Tuvo dificultades',    bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
  bajo:    { emoji: '😔', label: 'No quiso participar',  bg: 'bg-rose-50',   text: 'text-rose-500',   border: 'border-rose-200' },
}

// ─── Consistency Ring ─────────────────────────────────────────────────────────

function ConsistencyRing({ value, size = 48 }) {
  const color = value >= 70 ? '#34D399' : value >= 40 ? '#F4C542' : '#F87171'
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0ede8" strokeWidth="5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold leading-none" style={{ color }}>{value}%</span>
      </div>
    </div>
  )
}

// ─── Evidences Modal ──────────────────────────────────────────────────────────

function EvidencesModal({ week, family, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm px-4 pb-4 sm:pb-0"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-card animate-fade-up max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-beige-mid z-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${family.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                  {family.avatar}
                </div>
                <p className="text-sm font-semibold text-gray-800">{family.childName}</p>
              </div>
              <p className="text-xs text-gray-400">{week.week} · {week.date}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-beige-soft flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* Mood + Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-beige-soft rounded-2xl p-3 text-center">
              <p className="text-xl mb-1">{week.mood ? week.mood.emoji : '—'}</p>
              <p className="text-[10px] text-gray-500 leading-tight">{week.mood ? week.mood.label : 'Sin reporte'}</p>
            </div>
            <div className="bg-beige-soft rounded-2xl p-3 text-center">
              <p className="text-lg font-bold text-gray-800">{week.completed}/{week.assigned}</p>
              <p className="text-[10px] text-gray-500 leading-tight">Actividades</p>
            </div>
            <div className="bg-beige-soft rounded-2xl p-3 text-center">
              <p className="text-lg font-bold text-blue-soft">{week.evidences.length}</p>
              <p className="text-[10px] text-gray-500 leading-tight">Evidencias</p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Observación familiar
            </p>
            <div className="bg-beige-soft rounded-2xl p-4">
              <p className="text-sm text-gray-600 leading-relaxed">{week.notes}</p>
            </div>
          </div>

          {/* Evidences */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Evidencias visuales
            </p>
            {week.evidences.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {week.evidences.map((ev, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border-2 p-4 ${ev.color} cursor-pointer hover:scale-[1.02] transition-transform`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{ev.emoji}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wide ${
                        ev.type === 'video'
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-blue-light text-blue-soft'
                      }`}>
                        {ev.type === 'video' ? '▶ Video' : '📷 Foto'}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 leading-snug">{ev.label}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{ev.tag}</p>
                    {/* Simulated media placeholder */}
                    <div className="mt-3 rounded-xl bg-white/60 border border-white/80 h-14 flex items-center justify-center">
                      <span className="text-[10px] text-gray-300">
                        {ev.type === 'video' ? 'Toca para reproducir' : 'Ver imagen'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-center">
                <p className="text-2xl mb-2">📭</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  La familia no subió evidencias esta semana.
                </p>
              </div>
            )}
          </div>

          {/* Highlights */}
          {week.highlights.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Logros destacados
              </p>
              <div className="flex flex-wrap gap-2">
                {week.highlights.map((h, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-blue-light text-blue-mid text-xs font-medium">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Family Card ──────────────────────────────────────────────────────────────

function FamilyCard({ family, onViewWeek }) {
  const [expanded, setExpanded] = useState(false)
  const st = STATUS_CONFIG[family.status]
  const progressPct = Math.round((family.totalCompleted / family.totalAssigned) * 100)
  const progressColor = progressPct >= 70 ? '#34D399' : progressPct >= 40 ? '#F4C542' : '#F87171'

  return (
    <div className="bg-white rounded-3xl border border-beige-mid shadow-soft overflow-hidden">

      {/* Family Header — always visible */}
      <div
        className="p-4 cursor-pointer hover:bg-beige-soft/40 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${family.avatarColor} flex items-center justify-center text-white font-bold shadow-soft text-base`}>
              {family.avatar}
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${st.dot}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-sm font-semibold text-gray-800">{family.childName}</p>
                <p className="text-[11px] text-gray-400">{family.parentName} · {family.childAge} años</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${st.bg} ${st.text}`}>
                  {st.label}
                </span>
                <span className={`text-gray-300 transition-transform duration-300 text-sm ${expanded ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </div>
            </div>

            {/* Progress summary */}
            <div className="flex items-center gap-3">
              <ConsistencyRing value={family.consistency} size={40} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] text-gray-500">
                    {family.totalCompleted} de {family.totalAssigned} actividades
                  </p>
                  <p className="text-[10px] text-gray-300">{progressPct}%</p>
                </div>
                <div className="w-full h-1.5 bg-beige-mid rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${progressPct}%`, background: progressColor }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly history — collapsible */}
      {expanded && (
        <div className="border-t border-beige-mid">
          <div className="px-4 py-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Historial semanal
            </p>
            <div className="flex flex-col gap-2.5">
              {family.weeks.map((week, i) => {
                const weekPct = week.assigned > 0
                  ? Math.round((week.completed / week.assigned) * 100)
                  : 0
                const weekColor = weekPct >= 70 ? '#34D399' : weekPct >= 40 ? '#F4C542' : '#F87171'
                const moodConf = week.mood ? MOOD_CONFIG[week.mood.value] : null

                return (
                  <div
                    key={i}
                    className="bg-beige-soft rounded-2xl p-3.5"
                  >
                    {/* Week header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{week.week}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{week.date}</p>
                      </div>
                      {moodConf ? (
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${moodConf.bg} ${moodConf.border}`}>
                          <span className="text-sm leading-none">{moodConf.emoji}</span>
                          <p className={`text-[10px] font-semibold ${moodConf.text}`}>{moodConf.label}</p>
                        </div>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-400 text-[10px] font-medium">
                          Sin registro
                        </span>
                      )}
                    </div>

                    {/* Activity progress row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-[10px] text-gray-500">
                            {week.completed}/{week.assigned} completadas
                          </p>
                          <p className="text-[10px] font-semibold" style={{ color: weekColor }}>
                            {weekPct}%
                          </p>
                        </div>
                        <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${weekPct}%`, background: weekColor }}
                          />
                        </div>
                      </div>

                      {/* Evidence count badge */}
                      {week.evidences.length > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-blue-light border border-blue-soft/20">
                          <span className="text-xs">📎</span>
                          <p className="text-[10px] font-semibold text-blue-soft">{week.evidences.length}</p>
                        </div>
                      )}
                    </div>

                    {/* Mood summary pills — mini */}
                    {week.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {week.highlights.slice(0, 2).map((h, j) => (
                          <span key={j} className="px-2 py-1 rounded-lg bg-white text-gray-500 text-[9px] font-medium border border-beige-mid">
                            ✓ {h}
                          </span>
                        ))}
                        {week.highlights.length > 2 && (
                          <span className="px-2 py-1 rounded-lg bg-white text-gray-300 text-[9px] border border-beige-mid">
                            +{week.highlights.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Ver más button */}
                    <button
                      onClick={() => onViewWeek(week, family)}
                      className="w-full py-2 rounded-xl bg-white border border-beige-mid text-xs font-semibold text-gray-600 hover:border-blue-soft/40 hover:text-blue-soft transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Ver evidencias</span>
                      <span className="text-[10px]">→</span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReportesFamiliaresT() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [filterStatus, setFilterStatus] = useState('todas')
  const [modalData, setModalData] = useState(null) // { week, family }

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const filtered = filterStatus === 'todas'
    ? FAMILIES
    : FAMILIES.filter(f => f.status === filterStatus)

  const totalEvidences = FAMILIES.reduce(
    (acc, f) => acc + f.weeks.reduce((a, w) => a + w.evidences.length, 0), 0
  )
  const avgConsistency = Math.round(
    FAMILIES.reduce((acc, f) => acc + f.consistency, 0) / FAMILIES.length
  )

  return (
    <div className={`min-h-screen bg-beige-soft pb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

      {/* ── Top Bar ───────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('/therapist')}
            className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500 hover:border-blue-soft/40 transition-all"
          >←</button>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-gray-800 text-sm">Reportes de familias</h1>
            <p className="text-xs text-gray-400">Actividades en casa · Historial semanal</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center shadow-soft flex-shrink-0">
            <span className="text-white font-display font-bold text-xs">J</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 pt-6">

        {/* ── Stats Overview ────────────────────────────────── */}
        <section className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: 'Familias activas',
                value: FAMILIES.filter(f => f.status === 'activa').length,
                icon: '🏠',
                color: 'from-blue-soft to-blue-mid',
              },
              {
                label: 'Consistencia prom.',
                value: `${avgConsistency}%`,
                icon: '📊',
                color: 'from-green-400 to-teal-400',
              },
              {
                label: 'Evidencias totales',
                value: totalEvidences,
                icon: '📎',
                color: 'from-yellow-warm to-amber-400',
              },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-center shadow-soft`}>
                <div className="text-xl mb-1">{icon}</div>
                <p className="text-white font-bold text-xl leading-none">{value}</p>
                <p className="text-white/70 text-[10px] mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Context banner ──────────────────────────────── */}
        <div className="mb-5 px-4 py-3 rounded-2xl bg-blue-light border border-blue-soft/20 flex items-center gap-3">
          <span className="text-lg flex-shrink-0">💡</span>
          <p className="text-xs text-blue-mid leading-relaxed">
            Toca una familia para ver el historial semanal y las evidencias enviadas por los padres.
          </p>
        </div>

        {/* ── Filter ───────────────────────────────────────── */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { id: 'todas',    label: 'Todas',     count: FAMILIES.length },
            { id: 'activa',   label: 'Activas',   count: FAMILIES.filter(f => f.status === 'activa').length },
            { id: 'riesgo',   label: 'En riesgo', count: FAMILIES.filter(f => f.status === 'riesgo').length },
            { id: 'inactiva', label: 'Inactivas', count: FAMILIES.filter(f => f.status === 'inactiva').length },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                filterStatus === f.id
                  ? 'bg-blue-soft text-white shadow-soft'
                  : 'bg-white border border-beige-mid text-gray-500 hover:border-blue-soft/30'
              }`}
            >
              {f.label}
              <span className={`text-[10px] font-bold ${filterStatus === f.id ? 'text-white/80' : 'text-gray-400'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Family Cards ──────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {filtered.map((family, i) => (
            <div
              key={family.id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'forwards', opacity: 0 }}
            >
              <FamilyCard
                family={family}
                onViewWeek={(week, fam) => setModalData({ week, family: fam })}
              />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ────────────────────────────────────── */}
        <div className="mt-6 p-5 rounded-3xl bg-gradient-to-br from-blue-light to-white border border-blue-soft/20 text-center">
          <div className="text-3xl mb-2">📋</div>
          <p className="text-sm font-semibold text-gray-800 mb-1">¿Quieres crear un reporte clínico?</p>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Documenta el progreso terapéutico de cada familia.
          </p>
          <button
            onClick={() => navigate('/therapist/reportes')}
            className="px-6 py-2.5 rounded-full bg-blue-soft text-white text-xs font-semibold hover:bg-blue-mid transition-all shadow-soft"
          >
            Ir a reportes clínicos →
          </button>
        </div>

      </div>

      {/* ── Evidences Modal ──────────────────────────────────── */}
      {modalData && (
        <EvidencesModal
          week={modalData.week}
          family={modalData.family}
          onClose={() => setModalData(null)}
        />
      )}

    </div>
  )
}