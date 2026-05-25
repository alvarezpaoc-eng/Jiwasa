import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const THERAPISTS_FULL = [
  {
    id: 1,
    name: 'Dra. Ana Torres',
    specialty: 'Psicomotricidad',
    status: 'activa',
    avatar: 'AT',
    color: 'from-blue-soft to-[#3b82c8]',
    families: 12,
    activities: 58,
    reportsThisMonth: 15,
    avgRating: 4.8,
    joinDate: '2024-01-15',
    email: 'ana.torres@jiwasa.io',
  },
  {
    id: 2,
    name: 'Lic. Carlos Vega',
    specialty: 'Lenguaje',
    status: 'activa',
    avatar: 'CV',
    color: 'from-yellow-warm to-amber-400',
    families: 9,
    activities: 43,
    reportsThisMonth: 12,
    avgRating: 4.6,
    joinDate: '2024-02-20',
    email: 'carlos.vega@jiwasa.io',
  },
  {
    id: 3,
    name: 'Ps. Lucía Mamani',
    specialty: 'Cognitiva',
    status: 'activa',
    avatar: 'LM',
    color: 'from-green-400 to-teal-400',
    families: 11,
    activities: 61,
    reportsThisMonth: 18,
    avgRating: 4.9,
    joinDate: '2024-03-10',
    email: 'lucia.mamani@jiwasa.io',
  },
  {
    id: 4,
    name: 'Lic. Rogelio Quispe',
    specialty: 'Social',
    status: 'pausa',
    avatar: 'RQ',
    color: 'from-purple-400 to-pink-400',
    families: 8,
    activities: 29,
    reportsThisMonth: 5,
    avgRating: 4.7,
    joinDate: '2023-11-05',
    email: 'rogelio.quispe@jiwasa.io',
  },
]

const SPECIALTY_COLORS = {
  'Psicomotricidad': 'bg-blue-light text-blue-soft',
  'Lenguaje': 'bg-yellow-light text-yellow-mid',
  'Cognitiva': 'bg-green-50 text-green-600',
  'Social': 'bg-purple-50 text-purple-500',
  'Ocupacional': 'bg-pink-50 text-pink-500',
}

function TherapistCard({ therapist, onView, onChat }) {
  const statusColor = therapist.status === 'activa'
    ? 'bg-green-50 text-green-600'
    : 'bg-gray-100 text-gray-400'

  return (
    <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${therapist.color} flex items-center justify-center text-white font-bold text-base shadow-soft flex-shrink-0`}>
          {therapist.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-gray-800">{therapist.name}</h3>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor}`}>
              {therapist.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">{therapist.specialty}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{therapist.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4 pb-4 border-b border-beige-mid">
        <div className="text-center">
          <p className="text-lg font-bold text-blue-soft">{therapist.families}</p>
          <p className="text-[10px] text-gray-400">Familias</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-yellow-mid">{therapist.activities}</p>
          <p className="text-[10px] text-gray-400">Actividades</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-purple-500">{therapist.reportsThisMonth}</p>
          <p className="text-[10px] text-gray-400">Reportes</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-amber-400">⭐{therapist.avgRating}</p>
          <p className="text-[10px] text-gray-400">Rating</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onView}
          className="flex-1 py-2 rounded-xl bg-blue-light text-blue-soft text-xs font-semibold hover:bg-blue-soft hover:text-white transition-all"
        >
          👁️ Ver perfil
        </button>
        <button
          onClick={onChat}
          className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-700 text-xs font-semibold border border-beige-mid hover:bg-blue-light hover:text-blue-soft transition-all"
        >
          💬 Contactar
        </button>
      </div>
    </div>
  )
}

function StatsOverview() {
  return (
    <div className="bg-gradient-to-br from-blue-soft to-blue-mid rounded-3xl p-5 text-white mb-6">
      <p className="text-white/70 text-xs font-medium mb-3">Equipo General</p>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', value: '8' },
          { label: 'Activos', value: '7' },
          { label: 'En pausa', value: '1' },
          { label: 'Promedio rating', value: '4.8' },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-white/60 text-[10px] mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminTerapeutasListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todos')
  const [filtered, setFiltered] = useState(THERAPISTS_FULL)
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  useEffect(() => {
    let result = THERAPISTS_FULL

    if (search) {
      result = result.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.specialty.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filter !== 'todos') {
      result = result.filter(t => t.status === filter)
    }

    setFiltered(result)
  }, [search, filter])

  return (
    <div className={`min-h-screen bg-beige-soft pb-24 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Header */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/admin')}
            className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-600 hover:border-blue-soft/40 transition-all"
          >
            ←
          </button>
          <h1 className="font-semibold text-gray-800 text-sm">Equipo de Terapeutas</h1>
          <span className="text-xs font-semibold text-gray-400">{filtered.length}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Overview */}
        <StatsOverview />

        {/* Search */}
        <section className="mb-5">
          <input
            type="text"
            placeholder="Busca por nombre o especialidad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-beige-mid text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/50 bg-white transition-colors"
          />
        </section>

        {/* Filters */}
        <section className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'todos', label: '👥 Todos' },
              { id: 'activa', label: '✅ Activos' },
              { id: 'pausa', label: '⏸️ En pausa' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === f.id
                    ? 'bg-blue-soft text-white shadow-soft'
                    : 'border border-beige-mid bg-white hover:border-blue-soft/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Therapists Grid */}
        <section className="mb-6">
          {filtered.length > 0 ? (
            <div className="grid gap-4">
              {filtered.map(therapist => (
                <TherapistCard
                  key={therapist.id}
                  therapist={therapist}
                  onView={() => navigate(`/admin/terapeuta/${therapist.id}`)}
                  onChat={() => navigate(`/admin/chat?terapeuta=${therapist.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-400 text-sm">No encontramos terapeutas con esos criterios</p>
              <button
                onClick={() => { setSearch(''); setFilter('todos') }}
                className="mt-3 text-xs text-blue-soft font-semibold hover:underline"
              >
                Ver todos →
              </button>
            </div>
          )}
        </section>

        {/* Info Card */}
        <section>
          <div className="bg-blue-light/30 border border-blue-soft/20 rounded-2xl p-4">
            <p className="text-xs font-semibold text-blue-soft mb-2">💡 Información</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              El equipo cuenta con {THERAPISTS_FULL.length} terapeutas especializados en diferentes áreas. Haz click en "Ver perfil" para ver estadísticas detalladas y acciones específicas.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}