import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const INSTITUTION = {
  name: 'Instituto Esperanza',
  admin: 'María Rodríguez',
  avatar: 'MR',
  plan: 'Institucional Pro',
}

const KPI_CARDS = [
  { id: 'families', emoji: '🏠', label: 'Familias activas', value: 48, total: 52, trend: '+3 este mes', trendUp: true, color: 'bg-blue-light border-blue-soft/20', accent: 'text-blue-soft', ring: '#4A90E2', progress: 92 },
  { id: 'therapists', emoji: '🧑‍⚕️', label: 'Terapeutas activos', value: 7, total: 8, trend: '1 en pausa', trendUp: false, color: 'bg-yellow-light border-yellow-warm/20', accent: 'text-yellow-mid', ring: '#F4C542', progress: 87 },
  { id: 'participation', emoji: '✨', label: 'Participación semanal', value: 73, suffix: '%', trend: '+8% vs semana anterior', trendUp: true, color: 'bg-green-50 border-green-200', accent: 'text-green-600', ring: '#7BC8A4', progress: 73 },
  { id: 'risk', emoji: '⚠️', label: 'Riesgo de abandono', value: 5, suffix: ' familias', trend: 'Requieren atención', trendUp: false, color: 'bg-orange-50 border-orange-200', accent: 'text-orange-500', ring: '#F4A261', progress: 10, alert: true },
  { id: 'activities', emoji: '🎯', label: 'Actividades completadas', value: 312, trend: 'Esta semana', trendUp: true, color: 'bg-purple-50 border-purple-200', accent: 'text-purple-500', ring: '#9C88C4', progress: 80 },
]

const WEEKLY_DATA = [
  { day: 'L', value: 68 }, { day: 'M', value: 74 }, { day: 'M', value: 61 },
  { day: 'J', value: 82 }, { day: 'V', value: 78 }, { day: 'S', value: 45 }, { day: 'D', value: 38 },
]

const THERAPISTS = [
  { id: 1, name: 'Dra. Ana Torres', specialty: 'Psicomotricidad', families: 12, activities: 58, status: 'activa', avatar: 'AT', color: 'bg-blue-light text-blue-soft' },
  { id: 2, name: 'Lic. Carlos Vega', specialty: 'Lenguaje', families: 9, activities: 43, status: 'activa', avatar: 'CV', color: 'bg-yellow-light text-yellow-mid' },
  { id: 3, name: 'Ps. Lucía Mamani', specialty: 'Cognitiva', families: 11, activities: 61, status: 'activa', avatar: 'LM', color: 'bg-green-50 text-green-600' },
  { id: 4, name: 'Lic. Rogelio Quispe', specialty: 'Social', families: 8, activities: 29, status: 'pausa', avatar: 'RQ', color: 'bg-gray-100 text-gray-400' },
]

const RECENT_ALERTS = [
  { icon: '⚠️', text: 'Familia Herrera sin actividad por 12 días', time: 'Hace 1h', type: 'risk' },
  { icon: '✅', text: 'Dra. Torres completó 5 reportes esta semana', time: 'Hace 3h', type: 'ok' },
  { icon: '📋', text: 'Nuevo terapeuta solicita incorporación', time: 'Hace 5h', type: 'info' },
  { icon: '🎯', text: 'Semana de mayor participación del mes', time: 'Ayer', type: 'ok' },
]

function MiniRing({ value, color, size = 48 }) {
  const r = (size / 2) - 5
  const circ = 2 * Math.PI * r
  const offset = circ - (Math.min(value, 100) / 100) * circ
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0ede8" strokeWidth="4" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
    </svg>
  )
}

function WeeklyBar({ data }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div className="flex items-end justify-between gap-1.5 h-28 pt-2">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
          <div className="w-full rounded-xl transition-all duration-700" style={{ height: `${(d.value / max) * 80}px`, background: d.value === max ? 'linear-gradient(180deg, #4A90E2, #7BB3EE)' : d.value > 60 ? 'linear-gradient(180deg, #B5D4F4, #D4E8FB)' : '#f0ede8', minHeight: '8px' }} />
          <span className="text-[10px] text-gray-400 font-medium">{d.day}</span>
        </div>
      ))}
    </div>
  )
}

function AdminTopBar({ showNotif, setShowNotif }) {
  const navigate = useNavigate()
  return (
    <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center shadow-soft">
              <span className="text-white font-display font-bold text-xs">J</span>
            </div>
            <span className="font-display text-base text-gray-800">Jiwasa</span>
          </Link>
          <span className="hidden sm:block text-gray-200">|</span>
          <span className="hidden sm:block text-xs text-gray-400 font-medium">Panel Institucional</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-500 text-[10px] font-semibold">{INSTITUTION.plan}</span>
          <div className="relative">
            <button onClick={() => setShowNotif(!showNotif)} className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center hover:border-blue-soft/30 transition-colors relative">
              <span className="text-base">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-400 border-2 border-white" />
            </button>
            {showNotif && (
              <div className="absolute right-0 top-11 w-72 bg-white rounded-2xl shadow-card border border-beige-mid p-3 z-50 animate-fade-in">
                <p className="text-xs font-semibold text-gray-700 mb-2 px-1">Alertas</p>
                {RECENT_ALERTS.slice(0, 3).map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 px-1 py-2 rounded-xl hover:bg-beige-soft transition-colors">
                    <span className="text-base flex-shrink-0 mt-0.5">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 leading-snug">{a.text}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-100 to-blue-light border border-white shadow-soft flex items-center justify-center">
            <span className="text-xs font-semibold text-purple-500">{INSTITUTION.avatar}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminBottomNav({ active = 'inicio' }) {
  const navigate = useNavigate()
  const items = [
    { id: 'inicio',      emoji: '📊', label: 'Inicio',      route: '/admin' },
    { id: 'terapeutas',  emoji: '🧑‍⚕️', label: 'Terapeutas', route: '/admin/terapeutas' },
    { id: 'familias',    emoji: '🏠', label: 'Familias',    route: '/admin/familias' },
    { id: 'reportes',    emoji: '📈', label: 'Reportes',    route: '/admin/reportes' },
    { id: 'config',      emoji: '⚙️', label: 'Config',      route: '/admin/configuracion' },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/60">
      <div className="max-w-2xl mx-auto px-2 py-2 flex items-center justify-around">
        {items.map(({ id, emoji, label, route }) => (
          <button key={id} onClick={() => navigate(route)} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all ${active === id ? 'bg-blue-light/60' : 'hover:bg-gray-50'}`}>
            <span className="text-xl">{emoji}</span>
            <span className={`text-[10px] font-medium ${active === id ? 'text-blue-soft' : 'text-gray-400'}`}>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [showNotif, setShowNotif] = useState(false)
  const [activeTab, setActiveTab] = useState('resumen')
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  return (
    <div className="min-h-screen bg-beige-soft pb-28">
      <AdminTopBar showNotif={showNotif} setShowNotif={setShowNotif} />

      <div className={`max-w-2xl mx-auto px-4 py-5 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-light border border-white shadow-soft flex items-center justify-center">
              <span className="text-sm font-bold text-purple-500">{INSTITUTION.avatar}</span>
            </div>
            <div>
              <h1 className="font-display text-lg text-gray-800 font-light">
                {INSTITUTION.name}
              </h1>
              <p className="text-xs text-gray-400">Hola, {INSTITUTION.admin}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 bg-white rounded-2xl border border-beige-mid p-1 shadow-soft">
          {[
            { id: 'resumen', label: '📊 Resumen' },
            { id: 'terapeutas', label: '🧑‍⚕️ Equipo' },
            { id: 'riesgo', label: '⚠️ Riesgo' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === tab.id ? 'bg-gradient-to-br from-blue-soft to-blue-mid text-white shadow-soft' : 'text-gray-400 hover:text-gray-600'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════
            RESUMEN TAB
        ════════════════════════════════════════════════════════ */}
        {activeTab === 'resumen' && (
          <>
            <section className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Métricas</p>
              <div className="grid grid-cols-2 gap-3">
                {KPI_CARDS.map((kpi, i) => (
                  <div key={kpi.id} className={`bg-white rounded-2xl border ${kpi.color} p-4 shadow-soft hover:-translate-y-0.5 hover:shadow-md transition-all`}>
                    {kpi.alert && <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative flex-shrink-0">
                        <MiniRing value={kpi.progress} color={kpi.ring} size={44} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-bold" style={{ color: kpi.ring }}>{kpi.progress}%</span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className={`text-2xl font-display font-light ${kpi.accent}`}>{kpi.value}{kpi.suffix || ''}</p>
                        {kpi.total && <p className="text-[10px] text-gray-400">de {kpi.total}</p>}
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">{kpi.label}</p>
                    <p className={`text-[10px] font-medium ${kpi.trendUp ? 'text-green-500' : 'text-orange-400'}`}>
                      {kpi.trendUp ? '↑' : '↓'} {kpi.trend}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Participación</p>
                <span className="text-[10px] text-gray-400">Esta semana</span>
              </div>
              <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-2xl font-display font-light text-gray-800">73%</p>
                    <p className="text-xs text-gray-400">Promedio</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-100">
                    <span className="text-green-500 text-[10px] font-semibold">↑ +8%</span>
                  </div>
                </div>
                <WeeklyBar data={WEEKLY_DATA} />
              </div>
            </section>

            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Reportes recientes</p>
                <button onClick={() => navigate('/admin/reportes')} className="text-xs font-semibold text-blue-soft hover:underline">
                  Ver todos →
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { avatar: 'AT', name: 'Dra. Ana Torres', title: 'Reporte de Progreso - Mayo', rate: '94%', color: 'from-blue-soft to-[#3b82c8]', status: 'enviado' },
                  { avatar: 'CV', name: 'Lic. Carlos Vega', title: 'Evaluación Mensual - Lenguaje', rate: '82%', color: 'from-yellow-warm to-amber-400', status: 'pendiente' },
                  { avatar: 'LM', name: 'Ps. Lucía Mamani', title: 'Informe de Cognición - Abril', rate: '91%', color: 'from-green-400 to-teal-400', status: 'enviado' },
                ].map((r, i) => (
                  <button key={i} onClick={() => navigate('/admin/reportes')} className="w-full bg-white rounded-2xl border border-beige-mid shadow-soft p-3.5 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all text-left">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                      {r.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{r.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{r.name}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs font-bold text-green-600">{r.rate}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${r.status === 'enviado' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                        {r.status === 'enviado' ? '✓' : '⏳'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Acciones</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '📥', label: 'Exportar', desc: 'PDF', action: () => navigate('/admin/exportar') },
                  { emoji: '📈', label: 'Reportes', desc: 'Familiares', action: () => navigate('/admin/invitar-terapeuta') },
                  { emoji: '📬', label: 'Mensajes', desc: 'Chat', action: () => navigate('/admin/chat') },
                  { emoji: '⚙️', label: 'Config', desc: 'Ajustes', action: () => navigate('/admin/configuracion') },
                ].map(({ emoji, label, desc, action }) => (
                  <button key={label} onClick={action} className="bg-white rounded-2xl p-4 text-left border border-beige-mid hover:-translate-y-0.5 hover:shadow-md transition-all">
                    <div className="text-xl mb-2">{emoji}</div>
                    <p className="text-xs font-semibold text-gray-700">{label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ════════════════════════════════════════════════════════
            EQUIPO TAB
        ════════════════════════════════════════════════════════ */}
        {activeTab === 'terapeutas' && (
          <>
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Equipo</p>
                <button onClick={() => navigate('/admin/terapeutas')} className="text-xs font-semibold text-blue-soft hover:underline">
                  Ver todos →
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {THERAPISTS.map((t) => (
                  <button key={t.id} onClick={() => navigate(`/admin/terapeuta/${t.id}`)} className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all text-left">
                    <div className={`w-11 h-11 rounded-2xl ${t.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${t.status === 'activa' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {t.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mb-1">{t.specialty}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-gray-400">🏠 {t.families}</span>
                        <span className="text-[11px] text-gray-400">🎯 {t.activities}</span>
                      </div>
                    </div>
                    <span className="text-blue-soft text-lg flex-shrink-0">→</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <div className="bg-gradient-to-br from-blue-soft to-blue-mid rounded-3xl p-5 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
                <p className="text-white/70 text-xs font-medium mb-1">Rendimiento</p>
                <p className="text-2xl font-display font-light mb-3">Esta semana</p>
                <div className="grid grid-cols-3 gap-3 relative z-10">
                  {[
                    { label: 'Actividades', value: '191' },
                    { label: 'Reportes', value: '34' },
                    { label: 'Familias', value: '40' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/15 border border-white/20 rounded-2xl p-3 text-center">
                      <p className="text-lg font-bold">{value}</p>
                      <p className="text-white/60 text-[10px] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ════════════════════════════════════════════════════════
            RIESGO TAB
        ════════════════════════════════════════════════════════ */}
        {activeTab === 'riesgo' && (
          <>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-orange-700">5 familias en riesgo</p>
                <p className="text-xs text-orange-500 mt-0.5 leading-snug">Sin actividad por más de 7 días.</p>
              </div>
            </div>

            <section className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Familias</p>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'Familia López', days: 9, therapist: 'Dra. Torres', child: 'Mateo, 5 años', id: 1 },
                  { name: 'Familia Condori', days: 7, therapist: 'Lic. Vega', child: 'Sofía, 4 años', id: 2 },
                  { name: 'Familia Herrera', days: 12, therapist: 'Ps. Mamani', child: 'Diego, 7 años', id: 3 },
                ].map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl border border-orange-100 shadow-soft p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl flex-shrink-0">🏠</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-sm font-semibold text-gray-800">{f.name}</p>
                          <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                            {f.days}d
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500">{f.child}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{f.therapist}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/admin/chat?familia=${f.id}`)} className="flex-1 py-2 rounded-xl bg-blue-light text-blue-soft text-[11px] font-semibold hover:bg-blue-soft hover:text-white transition-all">
                        📬 Contactar
                      </button>
                      <button onClick={() => navigate(`/admin/familia/${f.id}`)} className="flex-1 py-2 rounded-xl bg-orange-50 text-orange-500 text-[11px] font-semibold border border-orange-100 hover:bg-orange-100 transition-all">
                        📋 Historial
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="text-center pb-4">
          <button onClick={() => navigate('/login')} className="text-xs text-gray-300 hover:text-gray-500">
            ← Cambiar cuenta
          </button>
        </div>

      </div>

      {showNotif && <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />}

      <AdminBottomNav active="inicio" />
    </div>
  )
}
