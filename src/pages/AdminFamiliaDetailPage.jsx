import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FAMILIES_DB = {
  1: {
    id: 1,
    parentName: 'Laura García',
    childName: 'Nicolás',
    age: 5,
    therapist: 'Dra. Ana Torres',
    status: 'activa',
    joinDate: '2024-01-10',
    avatar: 'L',
    color: 'from-blue-soft to-[#3b82c8]',
    childDiagnosis: 'Síndrome de Down - Trisomía 21',
    activitiesThisWeek: 12,
    activitiesThisMonth: 45,
    completionRate: 92,
    notes: 'Nicolás muestra buen progreso en motricidad fina. Los padres son muy participativos y cumplen con las actividades.',
  },
  2: {
    id: 2,
    parentName: 'Marco López',
    childName: 'Sofía',
    age: 4,
    therapist: 'Lic. Carlos Vega',
    status: 'riesgo',
    joinDate: '2024-02-05',
    avatar: 'M',
    color: 'from-yellow-warm to-amber-400',
    childDiagnosis: 'Síndrome de Down - Trisomía 21',
    activitiesThisWeek: 2,
    activitiesThisMonth: 18,
    completionRate: 42,
    notes: 'Requiere seguimiento. La familia ha reportado dificultades en mantener la rutina.',
  },
  3: {
    id: 3,
    parentName: 'Carmen Quispe',
    childName: 'Diego',
    age: 7,
    therapist: 'Ps. Lucía Mamani',
    status: 'activa',
    joinDate: '2023-12-20',
    avatar: 'C',
    color: 'from-green-400 to-teal-400',
    childDiagnosis: 'Síndrome de Down - Trisomía 21',
    activitiesThisWeek: 8,
    activitiesThisMonth: 42,
    completionRate: 87,
    notes: 'Diego es muy participativo. Ha mostrado avances significativos en lenguaje.',
  },
}

const ACTIVITY_LOG = {
  1: [
    { date: 'Hoy', activity: 'Juego de motricidad fina', duration: '15 min', status: 'completada', therapistNote: 'Excelente desempeño' },
    { date: 'Ayer', activity: 'Ejercicio de equilibrio', duration: '10 min', status: 'completada', therapistNote: 'Mejoría visible' },
    { date: 'Hace 2 días', activity: 'Práctica de agarre', duration: '12 min', status: 'completada', therapistNote: 'Dentro de expectativas' },
    { date: 'Hace 3 días', activity: 'Estimulación sensorial', duration: '20 min', status: 'completada', therapistNote: 'Muy motivado' },
  ],
  2: [
    { date: 'Hace 4 días', activity: 'Actividad propuesta', duration: 'No completada', status: 'incompleta', therapistNote: 'Familia reportó distracción' },
    { date: 'Hace 7 días', activity: 'Ejercicio de lenguaje', duration: '8 min', status: 'completada', therapistNote: 'Participación baja' },
  ],
  3: [
    { date: 'Hoy', activity: 'Juego de coordinación', duration: '18 min', status: 'completada', therapistNote: 'Muy entusiasmado' },
    { date: 'Ayer', activity: 'Práctica de vocabulario', duration: '15 min', status: 'completada', therapistNote: 'Excelente progreso' },
  ],
}

function ProgressRing({ value, color }) {
  const r = 30
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <svg width="80" height="80" className="-rotate-90">
      <circle cx="40" cy="40" r={r} fill="none" stroke="#f0ede8" strokeWidth="4" />
      <circle
        cx="40" cy="40" r={r}
        fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  )
}

function ActivityItem({ activity }) {
  const statusStyles = {
    completada: 'bg-green-50 text-green-600 border-green-100',
    incompleta: 'bg-orange-50 text-orange-500 border-orange-100',
  }
  return (
    <div className="bg-white rounded-2xl border border-beige-mid p-3 hover:border-blue-soft/30 transition-colors">
      <div className="flex items-start gap-3">
        <div className="text-xl flex-shrink-0">🎯</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <p className="text-sm font-semibold text-gray-800">{activity.activity}</p>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${statusStyles[activity.status]}`}>
              {activity.status === 'completada' ? '✓' : '○'} {activity.duration}
            </span>
          </div>
          <p className="text-xs text-gray-500">{activity.date}</p>
          <p className="text-[11px] text-gray-400 mt-1 italic">Nota: {activity.therapistNote}</p>
        </div>
      </div>
    </div>
  )
}

export default function AdminFamiliaDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [familia, setFamilia] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setFamilia(FAMILIES_DB[parseInt(id)] || FAMILIES_DB[1])
    setTimeout(() => setVisible(true), 80)
  }, [id])

  if (!familia) return <div className="min-h-screen bg-beige-soft flex items-center justify-center">Cargando...</div>

  const activities = ACTIVITY_LOG[familia.id] || []

  return (
    <div className={`min-h-screen bg-beige-soft pb-24 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Header */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/admin/familias')} className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-600 hover:border-blue-soft/40 transition-all">
            ←
          </button>
          <h1 className="font-semibold text-gray-800 text-sm">Historial Familiar</h1>
          <div className="w-9 h-9" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-beige-mid shadow-card p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${familia.color} flex items-center justify-center text-white font-bold text-xl shadow-soft`}>
              {familia.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl text-gray-800 font-light">{familia.childName}</h1>
              <p className="text-sm text-gray-500">{familia.age} años · {familia.childDiagnosis}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-600">
                  Activa
                </span>
                <span className="text-[10px] text-gray-400">Desde {new Date(familia.joinDate).toLocaleDateString('es-ES')}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-beige-mid pt-4 text-sm text-gray-600 leading-relaxed mb-4">
            <p><strong>Padre/Madre:</strong> {familia.parentName}</p>
            <p className="mt-2"><strong>Terapeuta asignado:</strong> {familia.therapist}</p>
          </div>

          <div className="bg-blue-light/20 border border-blue-soft/20 rounded-2xl p-3 text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold text-blue-soft mb-1">Notas:</p>
            {familia.notes}
          </div>
        </div>

        {/* Stats Grid */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Estadísticas</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Esta semana', value: familia.activitiesThisWeek },
              { label: 'Este mes', value: familia.activitiesThisMonth },
              { label: 'Completadas', value: `${familia.completionRate}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white rounded-2xl border border-beige-mid p-3 text-center">
                <p className="text-2xl font-display font-light text-gray-800 mb-1">{value}</p>
                <p className="text-[10px] text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Progress Ring */}
        <section className="mb-6">
          <div className="bg-white rounded-3xl border border-beige-mid shadow-card p-6 flex flex-col items-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Tasa de cumplimiento</p>
            <div className="relative flex items-center justify-center mb-4">
              <ProgressRing value={familia.completionRate} color="#4A90E2" />
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-soft">{familia.completionRate}%</span>
                <span className="text-[10px] text-gray-400">del mes</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center">
              {familia.completionRate > 80
                ? '¡Excelente participación! La familia está muy comprometida.'
                : familia.completionRate > 50
                  ? 'Participación moderada. Considera seguimiento.'
                  : 'Baja participación. Requiere atención inmediata.'}
            </p>
          </div>
        </section>

        {/* Actions */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Acciones</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '💬', label: 'Contactar', action: () => navigate(`/admin/chat?familia=${familia.id}`) },
              { emoji: '📋', label: 'Ver reportes', action: () => {} },
              { emoji: '🧑‍⚕️', label: 'Terapeuta', action: () => navigate(`/admin/terapeuta/1`) },
              { emoji: '⚙️', label: 'Editar', action: () => {} },
            ].map(({ emoji, label, action }) => (
              <button key={label} onClick={action} className="bg-white rounded-2xl p-3 text-center border border-beige-mid hover:border-blue-soft/40 hover:-translate-y-0.5 hover:shadow-md transition-all">
                <div className="text-2xl mb-1">{emoji}</div>
                <p className="text-xs font-semibold text-gray-700">{label}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Activity Log */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Historial de actividades</p>
          <div className="flex flex-col gap-3">
            {activities.length > 0 ? (
              activities.map((act, i) => (
                <ActivityItem key={i} activity={act} />
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">📭</div>
                <p className="text-gray-400 text-sm">Sin actividades aún</p>
              </div>
            )}
          </div>
        </section>

        {/* Risk Assessment */}
        {familia.status === 'riesgo' && (
          <section className="mb-6">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-orange-700 mb-2">⚠️ Estado de riesgo</p>
              <p className="text-xs text-orange-600 leading-relaxed mb-3">
                Esta familia ha mostrado baja participación recientemente. Se recomienda contacto directo.
              </p>
              <button onClick={() => navigate(`/admin/chat?familia=${familia.id}`)} className="w-full py-2 rounded-xl bg-orange-100 text-orange-600 text-xs font-semibold hover:bg-orange-200 transition-all">
                → Contactar ahora
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}