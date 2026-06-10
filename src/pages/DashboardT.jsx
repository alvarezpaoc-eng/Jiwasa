import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const THERAPIST = {
  name: 'Lic. Wara Valdivia',
  role: 'Psicomotricidad',
  avatar: 'W',
  institution: 'Instituto Jiwasa',
}

const FAMILIES = [
  {
    id: 1, parentName: 'Laura Mamani', childName: 'Nicolás', childAge: 6,
    avatar: 'L', avatarColor: 'from-blue-soft to-[#3b82c8]', status: 'activa',
    lastActive: 'Hace 2 horas', streak: 4, consistency: 82,
    lastMood: { emoji: '😊', label: 'Motivado' }, unread: 2,
    activities: { total: 12, completed: 10 }, alert: null,
  },
  {
    id: 2, parentName: 'Marco Quispe', childName: 'Sofía', childAge: 5,
    avatar: 'M', avatarColor: 'from-yellow-warm to-amber-400', status: 'riesgo',
    lastActive: 'Hace 3 días', streak: 0, consistency: 34,
    lastMood: { emoji: '😢', label: 'Frustrado' }, unread: 0,
    activities: { total: 8, completed: 2 },
    alert: 'Baja actividad en casa – 3 días sin registros',
  },
  {
    id: 3, parentName: 'Carmen Flores', childName: 'Diego', childAge: 7,
    avatar: 'C', avatarColor: 'from-green-400 to-teal-400', status: 'activa',
    lastActive: 'Ayer', streak: 7, consistency: 91,
    lastMood: { emoji: '🎯', label: 'Concentrado' }, unread: 1,
    activities: { total: 15, completed: 14 }, alert: null,
  },
  {
    id: 4, parentName: 'Pedro Condori', childName: 'Valentina', childAge: 4,
    avatar: 'P', avatarColor: 'from-purple-400 to-pink-400', status: 'inactiva',
    lastActive: 'Hace 7 días', streak: 0, consistency: 12,
    lastMood: { emoji: '😴', label: 'Cansado' }, unread: 0,
    activities: { total: 6, completed: 1 },
    alert: 'Riesgo de desconexión – sin actividad esta semana',
  },
]

const ALERTS = [
  { id: 1, type: 'riesgo', icon: '⚠️', family: 'Familia Quispe', child: 'Sofía',
    text: 'Baja actividad en casa por 3 días consecutivos', time: 'Hace 1 hora',
    color: 'bg-orange-50 border-orange-200', badge: 'text-orange-500 bg-orange-100' },
  { id: 2, type: 'critico', icon: '🔴', family: 'Familia Condori', child: 'Valentina',
    text: 'Riesgo alto de abandono – sin registro esta semana', time: 'Hace 3 horas',
    color: 'bg-rose-50 border-rose-200', badge: 'text-rose-500 bg-rose-100' },
  { id: 3, type: 'info', icon: '💬', family: 'Familia Mamani', child: 'Nicolás',
    text: 'Laura envió 2 mensajes nuevos para revisión', time: 'Hace 30 min',
    color: 'bg-blue-light border-blue-soft/20', badge: 'text-blue-soft bg-blue-light' },
]

const PENDING_ACTIVITIES = [
  { id: 1, emoji: '🍳', title: 'Momento Cocina', family: 'Familia Mamani', child: 'Nicolás',
    status: 'completado', assignedDate: 'Ayer', avatarColor: 'from-blue-soft to-[#3b82c8]', avatarLetter: 'L' },
  { id: 2, emoji: '🪁', title: 'Juego de Equilibrio', family: 'Familia Flores', child: 'Diego',
    status: 'visto', assignedDate: 'Hoy', avatarColor: 'from-green-400 to-teal-400', avatarLetter: 'C' },
  { id: 3, emoji: '👟', title: 'Ponerse los Zapatos', family: 'Familia Quispe', child: 'Sofía',
    status: 'enviado', assignedDate: 'Hoy', avatarColor: 'from-yellow-warm to-amber-400', avatarLetter: 'M' },
  { id: 4, emoji: '🎨', title: 'Arte Sensorial', family: 'Familia Condori', child: 'Valentina',
    status: 'enviado', assignedDate: 'Hace 2 días', avatarColor: 'from-purple-400 to-pink-400', avatarLetter: 'P' },
]

const STATUS_CONFIG = {
  activa:   { label: 'Activa',   bg: 'bg-green-50',  text: 'text-green-600',  dot: 'bg-green-400' },
  riesgo:   { label: 'Riesgo',   bg: 'bg-orange-50', text: 'text-orange-500', dot: 'bg-orange-400' },
  inactiva: { label: 'Inactiva', bg: 'bg-gray-100',  text: 'text-gray-500',   dot: 'bg-gray-400' },
}

const ACTIVITY_STATUS = {
  completado: { label: 'Completado', bg: 'bg-green-50',     text: 'text-green-600' },
  visto:      { label: 'Visto',      bg: 'bg-blue-light',   text: 'text-blue-soft' },
  enviado:    { label: 'Enviado',    bg: 'bg-yellow-light', text: 'text-yellow-mid' },
}

// ─── Consistency Ring ─────────────────────────────────────────────────────────

function ConsistencyRing({ value, color = '#4A90E2', size = 40 }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0ede8" strokeWidth="4" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[9px] font-bold" style={{ color }}>{value}%</span>
      </div>
    </div>
  )
}

// ─── Quick Action Card ─────────────────────────────────────────────────────────

function QuickActionCard({ emoji, label, desc, color, accentText, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${color} rounded-2xl p-4 text-left card-hover border border-white/60 transition-all duration-200 w-full`}
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <p className={`text-sm font-semibold ${accentText}`}>{label}</p>
      <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{desc}</p>
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardT() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('familias')
  const [visible, setVisible] = useState(false)
  const [filterStatus, setFilterStatus] = useState('todas')

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const filteredFamilies = filterStatus === 'todas'
    ? FAMILIES
    : FAMILIES.filter(f => f.status === filterStatus)

  const totalAlerts  = ALERTS.length
  const activeCount  = FAMILIES.filter(f => f.status === 'activa').length
  const riskCount    = FAMILIES.filter(f => f.status === 'riesgo' || f.status === 'inactiva').length

  return (
    <div className="min-h-screen bg-beige-soft pb-10">

      {/* ── Top Header ───────────────────────────────────────── */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center shadow-soft">
              <span className="text-white font-display font-bold text-sm">J</span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Portal Terapeuta</p>
              <p className="font-semibold text-gray-800 text-sm">{THERAPIST.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {totalAlerts > 0 && (
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
                <span className="text-sm">⚠️</span>
                <span className="text-xs font-semibold text-rose-500">{totalAlerts}</span>
              </div>
            )}
            <button
              onClick={() => navigate('/login')}
              className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500 hover:border-blue-soft/40 transition-all"
            >
              <span className="text-base">👤</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`max-w-2xl mx-auto px-5 pt-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* ── Stats ───────────────────────────────────────────── */}
        <section className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Familias activas', value: activeCount,  icon: '🏠', color: 'from-blue-soft to-blue-mid' },
              { label: 'En seguimiento',   value: riskCount,    icon: '⚠️', color: 'from-orange-400 to-amber-400' },
              { label: 'Alertas hoy',      value: totalAlerts,  icon: '🔔', color: 'from-rose-400 to-pink-400' },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-center shadow-soft`}>
                <div className="text-2xl mb-1">{icon}</div>
                <p className="text-white font-bold text-xl leading-none">{value}</p>
                <p className="text-white/70 text-[10px] mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick Actions ─────────────────────────────────── */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Acciones rápidas
          </p>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionCard
              emoji="✨"
              label="Crear actividad"
              desc="Nueva terapia invisible"
              color="bg-blue-light"
              accentText="text-blue-soft"
              onClick={() => navigate('/therapist/crear-actividad')}
            />
            <QuickActionCard
              emoji="📋"
              label="Subir reporte"
              desc="Registrar progreso familiar"
              color="bg-yellow-light"
              accentText="text-yellow-mid"
              onClick={() => navigate('/therapist/reportes')}
            />
            <QuickActionCard
              emoji="💬"
              label="Mis familias"
              desc="Chat y seguimiento"
              color="bg-green-50"
              accentText="text-green-600"
              onClick={() => navigate('/therapist/chat')}
            />
            {/* ── BOTÓN ACTUALIZADO → nueva página de reportes familiares ── */}
            <QuickActionCard
              emoji="📈"
              label="Ver reportes"
              desc="Actividades en casa"
              color="bg-purple-50"
              accentText="text-purple-500"
              onClick={() => navigate('/therapist/reportes-familias')}
            />
          </div>
        </section>

        {/* ── Tab Navigation ───────────────────────────────── */}
        <div className="flex gap-1 bg-white rounded-2xl border border-beige-mid p-1 mb-6 shadow-soft">
          {[
            { id: 'familias',    label: 'Familias',    icon: '🏠' },
            { id: 'alertas',     label: 'Alertas',     icon: '⚠️', badge: totalAlerts },
            { id: 'actividades', label: 'Actividades', icon: '✨' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-soft text-white shadow-soft'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge > 0 && activeTab !== tab.id && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-400 text-white text-[9px] flex items-center justify-center font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── FAMILIAS TAB ─────────────────────────────────── */}
        {activeTab === 'familias' && (
          <section>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { id: 'todas',    label: 'Todas',    count: FAMILIES.length },
                { id: 'activa',   label: 'Activas',  count: activeCount },
                { id: 'riesgo',   label: 'Riesgo',   count: FAMILIES.filter(f => f.status === 'riesgo').length },
                { id: 'inactiva', label: 'Inactivas',count: FAMILIES.filter(f => f.status === 'inactiva').length },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    filterStatus === f.id
                      ? 'bg-blue-soft text-white'
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

            <div className="flex flex-col gap-3">
              {filteredFamilies.map((family, i) => {
                const st = STATUS_CONFIG[family.status]
                const consistencyColor = family.consistency >= 70 ? '#34D399'
                  : family.consistency >= 40 ? '#F4C542' : '#F87171'
                return (
                  <div
                    key={family.id}
                    className="bg-white rounded-3xl border border-beige-mid shadow-soft p-4 card-hover cursor-pointer"
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={() => navigate('/therapist/chat')}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${family.avatarColor} flex items-center justify-center text-white font-bold shadow-soft`}>
                          {family.avatar}
                        </div>
                        {family.status === 'activa' && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{family.childName}</p>
                            <p className="text-[11px] text-gray-400">{family.parentName} · {family.childAge} años</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {family.unread > 0 && (
                              <span className="w-5 h-5 rounded-full bg-blue-soft text-white text-[10px] font-bold flex items-center justify-center">
                                {family.unread}
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${st.bg} ${st.text}`}>
                              {st.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-2.5">
                          <ConsistencyRing value={family.consistency} color={consistencyColor} size={36} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">{family.lastMood.emoji}</span>
                              <p className="text-[11px] text-gray-500">{family.lastMood.label}</p>
                              <span className="ml-auto text-[10px] text-gray-300">{family.lastActive}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-beige-mid rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-1000"
                                  style={{ width: `${(family.activities.completed / family.activities.total) * 100}%`, background: consistencyColor }}
                                />
                              </div>
                              <p className="text-[10px] text-gray-400 flex-shrink-0">
                                {family.activities.completed}/{family.activities.total}
                              </p>
                            </div>
                          </div>
                        </div>

                        {family.alert && (
                          <div className="mt-2.5 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200">
                            <span className="text-sm flex-shrink-0">⚠️</span>
                            <p className="text-[11px] text-orange-600 leading-snug">{family.alert}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── ALERTAS TAB ──────────────────────────────────── */}
        {activeTab === 'alertas' && (
          <section>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Familias que necesitan atención prioritaria hoy.
            </p>
            <div className="flex flex-col gap-3">
              {ALERTS.map((alert, i) => (
                <div
                  key={alert.id}
                  className={`rounded-3xl border p-4 shadow-soft ${alert.color}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0 mt-0.5">{alert.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-semibold text-gray-800">{alert.family}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${alert.badge}`}>
                          {alert.child}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-snug mb-2">{alert.text}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-gray-400">{alert.time}</p>
                        <button
                          onClick={() => navigate('/therapist/chat')}
                          className="px-3 py-1.5 rounded-xl bg-white border border-beige-mid text-xs font-semibold text-gray-600 hover:border-blue-soft/40 hover:text-blue-soft transition-all"
                        >
                          Contactar →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-2xl bg-white border border-beige-mid text-center">
              <p className="text-xs text-gray-400 leading-relaxed">
                💛 Estás al día con todas las alertas. ¡Buen trabajo!
              </p>
            </div>
          </section>
        )}

        {/* ── ACTIVIDADES TAB ───────────────────────────────── */}
        {activeTab === 'actividades' && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-400">Actividades asignadas esta semana</p>
              <button
                onClick={() => navigate('/therapist/crear-actividad')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-soft text-white text-xs font-semibold hover:bg-blue-mid transition-all shadow-soft"
              >
                <span>+</span> Crear nueva
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {PENDING_ACTIVITIES.map((act, i) => {
                const st = ACTIVITY_STATUS[act.status]
                return (
                  <div
                    key={act.id}
                    className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4 flex items-center gap-3"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-beige-soft flex items-center justify-center text-xl flex-shrink-0">
                      {act.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{act.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${act.avatarColor} flex items-center justify-center text-white text-[9px] font-bold`}>
                          {act.avatarLetter}
                        </div>
                        <p className="text-[11px] text-gray-400">{act.child} · {act.assignedDate}</p>
                      </div>
                    </div>
                    <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold ${st.bg} ${st.text}`}>
                      {st.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* CTA inferior */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-blue-light to-white border border-blue-soft/20 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">¿Nueva terapia invisible?</p>
                <p className="text-xs text-gray-400 mt-0.5">Diseña una actividad personalizada</p>
              </div>
              <button
                onClick={() => navigate('/therapist/crear-actividad')}
                className="flex-shrink-0 px-4 py-2 rounded-xl bg-blue-soft text-white text-xs font-semibold hover:bg-blue-mid transition-all shadow-soft"
              >
                Crear →
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}