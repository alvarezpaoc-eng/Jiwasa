import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const THERAPISTS_DB = {
  1: { id: 1, name: 'Dra. Ana Torres', specialty: 'Psicomotricidad', email: 'ana.torres@jiwasa.io', phone: '+591 7123456', joinDate: '2024-01-15', status: 'activa', avatar: 'AT', color: 'from-blue-soft to-[#3b82c8]', families: 12, activities: 58, reportsThisMonth: 15, avgRating: 4.8, bio: 'Especialista en desarrollo motor con 8 años de experiencia.' },
  2: { id: 2, name: 'Lic. Carlos Vega', specialty: 'Lenguaje', email: 'carlos.vega@jiwasa.io', phone: '+591 7654321', joinDate: '2024-02-20', status: 'activa', avatar: 'CV', color: 'from-yellow-warm to-amber-400', families: 9, activities: 43, reportsThisMonth: 12, avgRating: 4.6, bio: 'Fonoaudiólogo especializado en terapia del lenguaje.' },
  3: { id: 3, name: 'Ps. Lucía Mamani', specialty: 'Cognitiva', email: 'lucia.mamani@jiwasa.io', phone: '+591 7789012', joinDate: '2024-03-10', status: 'activa', avatar: 'LM', color: 'from-green-400 to-teal-400', families: 11, activities: 61, reportsThisMonth: 18, avgRating: 4.9, bio: 'Psicóloga especializada en estimulación cognitiva.' },
  4: { id: 4, name: 'Lic. Rogelio Quispe', specialty: 'Social', email: 'rogelio.quispe@jiwasa.io', phone: '+591 7345678', joinDate: '2023-11-05', status: 'pausa', avatar: 'RQ', color: 'from-purple-400 to-pink-400', families: 8, activities: 29, reportsThisMonth: 5, avgRating: 4.7, bio: 'Especialista en desarrollo social y emocional.' },
}

const STATS = [
  { label: 'Familias asignadas', value: 'value', unit: '' },
  { label: 'Actividades esta semana', value: 'activities', unit: '' },
  { label: 'Reportes este mes', value: 'reportsThisMonth', unit: '' },
  { label: 'Calificación promedio', value: 'avgRating', unit: '/5' },
]

const RECENT_ACTIVITY = [
  { time: 'Hoy · 2:30 PM', action: 'Completó reporte de Familia López', type: 'report' },
  { time: 'Ayer · 5:15 PM', action: 'Creó actividad "Juego de motricidad fina"', type: 'activity' },
  { time: 'Hace 2 días', action: 'Comunicado con Laura (madre de Nicolás)', type: 'chat' },
  { time: 'Hace 3 días', action: 'Actualización de progreso: Sofía', type: 'progress' },
]

function StatCard({ label, value, unit, color }) {
  return (
    <div className={`${color} rounded-2xl p-4 text-center`}>
      <p className="text-2xl font-display font-light text-gray-800 mb-1">{value}{unit}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

function ActivityItem({ time, action, type }) {
  const icons = { report: '📋', activity: '✨', chat: '💬', progress: '📈' }
  return (
    <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-beige-soft transition-colors">
      <span className="text-lg flex-shrink-0">{icons[type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-700">{action}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
  )
}

export default function AdminTerapistaDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [therapist, setTherapist] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTherapist(THERAPISTS_DB[parseInt(id)] || THERAPISTS_DB[1])
    setTimeout(() => setVisible(true), 80)
  }, [id])

  if (!therapist) return <div className="min-h-screen bg-beige-soft flex items-center justify-center">Cargando...</div>

  const statusColor = therapist.status === 'activa' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'

  return (
    <div className={`min-h-screen bg-beige-soft pb-24 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Header */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/admin')} className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-600 hover:border-blue-soft/40 transition-all">
            ←
          </button>
          <h1 className="font-semibold text-gray-800 text-sm">Perfil del terapeuta</h1>
          <div className="w-9 h-9" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-beige-mid shadow-card p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${therapist.color} flex items-center justify-center text-white font-bold text-xl shadow-soft`}>
              {therapist.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl text-gray-800 font-light">{therapist.name}</h1>
              <p className="text-sm text-gray-500">{therapist.specialty}</p>
              <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full mt-2 ${statusColor}`}>
                {therapist.status}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">{therapist.bio}</p>

          <div className="flex flex-col gap-2 text-xs text-gray-500 border-t border-beige-mid pt-4">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>{therapist.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📱</span>
              <span>{therapist.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>Se unió: {new Date(therapist.joinDate).toLocaleDateString('es-ES')}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Estadísticas</p>
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={therapist[stat.value] || '-'}
                unit={stat.unit}
                color={stat.label.includes('Familia') ? 'bg-blue-light' : stat.label.includes('Actividades') ? 'bg-yellow-light' : stat.label.includes('Reportes') ? 'bg-purple-50' : 'bg-green-50'}
              />
            ))}
          </div>
        </section>

        {/* Acciones */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Acciones</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '💬', label: 'Contactar', desc: 'Enviar mensaje', action: () => navigate(`/admin/chat?terapeuta=${therapist.id}`) },
              { emoji: '📋', label: 'Ver reportes', desc: 'Reportes recientes', action: () => {} },
              { emoji: '🏠', label: 'Familias', desc: `${therapist.families} familias`, action: () => {} },
              { emoji: '⚙️', label: 'Editar', desc: 'Ajustes', action: () => {} },
            ].map(({ emoji, label, desc, action }) => (
              <button key={label} onClick={action} className="bg-white rounded-2xl p-4 text-left border border-beige-mid hover:border-blue-soft/40 hover:-translate-y-0.5 hover:shadow-md transition-all">
                <div className="text-xl mb-2">{emoji}</div>
                <p className="text-xs font-semibold text-gray-700">{label}</p>
                <p className="text-[10px] text-gray-400 mt-1">{desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Actividad reciente */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Actividad reciente</p>
          <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-3 flex flex-col gap-1">
            {RECENT_ACTIVITY.map((item, i) => (
              <ActivityItem key={i} {...item} />
            ))}
          </div>
        </section>

        {/* Performance Card */}
        <section className="mb-6">
          <div className="bg-gradient-to-br from-blue-soft to-blue-mid rounded-3xl p-5 text-white">
            <p className="text-white/70 text-xs font-medium mb-2">Evaluación de desempeño</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-3xl font-bold">{therapist.avgRating}</p>
                <p className="text-white/60 text-xs">de 5 estrellas</p>
              </div>
              <div className="flex-1">
                <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${(therapist.avgRating / 5) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Más opciones</p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Pausar terapeuta', color: 'orange', action: () => {} },
              { label: 'Reasignar familias', color: 'blue', action: () => {} },
              { label: 'Ver contrato', color: 'gray', action: () => {} },
            ].map(({ label, color, action }) => {
              const colors = {
                orange: 'bg-orange-50 text-orange-500 border-orange-100 hover:bg-orange-100',
                blue: 'bg-blue-light text-blue-soft border-blue-soft/10 hover:bg-blue-soft hover:text-white',
                gray: 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100',
              }
              return (
                <button key={label} onClick={action} className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${colors[color]}`}>
                  {label}
                </button>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}