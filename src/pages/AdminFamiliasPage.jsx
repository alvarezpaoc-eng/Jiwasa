import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ALL_FAMILIES = [
  { id: 1, parentName: 'Laura García', childName: 'Nicolás', age: 5, therapist: 'Dra. Torres', status: 'activa', lastActivity: 'Hoy', avatar: 'L', color: 'from-blue-soft to-[#3b82c8]' },
  { id: 2, parentName: 'Marco López', childName: 'Sofía', age: 4, therapist: 'Lic. Vega', status: 'riesgo', lastActivity: 'Hace 9 días', avatar: 'M', color: 'from-yellow-warm to-amber-400' },
  { id: 3, parentName: 'Carmen Quispe', childName: 'Diego', age: 7, therapist: 'Ps. Mamani', status: 'activa', lastActivity: 'Ayer', avatar: 'C', color: 'from-green-400 to-teal-400' },
  { id: 4, parentName: 'Pedro Morales', childName: 'Valentina', age: 6, therapist: 'Lic. Vega', status: 'inactiva', lastActivity: 'Hace 14 días', avatar: 'P', color: 'from-purple-400 to-pink-400' },
  { id: 5, parentName: 'Rosa Herrera', childName: 'Mateo', age: 5, therapist: 'Dra. Torres', status: 'riesgo', lastActivity: 'Hace 12 días', avatar: 'R', color: 'from-orange-400 to-red-400' },
  { id: 6, parentName: 'Juan Condori', childName: 'Emma', age: 3, therapist: 'Ps. Mamani', status: 'activa', lastActivity: 'Hoy', avatar: 'J', color: 'from-indigo-400 to-blue-400' },
]

const STATUS_CONFIG = {
  activa: { dot: 'bg-green-400', label: 'Activa', bg: 'bg-green-50' },
  riesgo: { dot: 'bg-orange-400', label: 'Riesgo', bg: 'bg-orange-50' },
  inactiva: { dot: 'bg-gray-300', label: 'Inactiva', bg: 'bg-gray-50' },
}

function FamiliaCard({ family, onView }) {
  return (
    <button onClick={onView} className="w-full bg-white rounded-2xl border border-beige-mid shadow-soft p-4 hover:-translate-y-0.5 hover:shadow-md transition-all text-left">
      <div className="flex items-start gap-3 mb-2">
        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${family.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {family.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-semibold text-gray-800">{family.childName}</p>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_CONFIG[family.status].dot}`} />
          </div>
          <p className="text-xs text-gray-500">{family.parentName}</p>
        </div>
        <span className="text-lg flex-shrink-0">→</span>
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <span>👨‍👧 {family.age} años</span>
          <span>🧑‍⚕️ {family.therapist}</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-beige-mid flex items-center justify-between">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_CONFIG[family.status].bg} text-gray-600`}>
          {STATUS_CONFIG[family.status].label}
        </span>
        <span className="text-[10px] text-gray-400">Última: {family.lastActivity}</span>
      </div>
    </button>
  )
}

export default function AdminFamiliasPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todas')
  const [filtered, setFiltered] = useState(ALL_FAMILIES)
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  useEffect(() => {
    let result = ALL_FAMILIES

    if (search) {
      result = result.filter(f =>
        f.parentName.toLowerCase().includes(search.toLowerCase()) ||
        f.childName.toLowerCase().includes(search.toLowerCase()) ||
        f.therapist.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filter !== 'todas') {
      result = result.filter(f => f.status === filter)
    }

    setFiltered(result)
  }, [search, filter])

  return (
    <div className={`min-h-screen bg-beige-soft pb-24 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Header */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/admin')} className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-600 hover:border-blue-soft/40 transition-all">
            ←
          </button>
          <h1 className="font-semibold text-gray-800 text-sm">Familias</h1>
          <span className="text-xs font-semibold text-gray-400">{filtered.length}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Search */}
        <section className="mb-5">
          <input
            type="text"
            placeholder="Busca familia, niño o terapeuta..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-beige-mid text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/50 bg-white transition-colors"
          />
        </section>

        {/* Filters */}
        <section className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'todas', label: '📊 Todas' },
              { id: 'activa', label: '✅ Activas' },
              { id: 'riesgo', label: '⚠️ Riesgo' },
              { id: 'inactiva', label: '❌ Inactivas' },
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

        {/* Results */}
        <section>
          {filtered.length > 0 ? (
            <div className="grid gap-3">
              {filtered.map(f => (
                <FamiliaCard
                  key={f.id}
                  family={f}
                  onView={() => navigate(`/admin/familia/${f.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-400 text-sm">No encontramos familias con esos criterios</p>
              <button onClick={() => { setSearch(''); setFilter('todas') }} className="mt-3 text-xs text-blue-soft font-semibold hover:underline">
                Ver todas →
              </button>
            </div>
          )}
        </section>

        {/* Stats card */}
        <section className="mt-8">
          <div className="bg-gradient-to-br from-blue-soft to-blue-mid rounded-2xl p-4 text-white">
            <p className="text-white/70 text-xs font-medium mb-2">Resumen</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total', value: ALL_FAMILIES.length },
                { label: 'Activas', value: ALL_FAMILIES.filter(f => f.status === 'activa').length },
                { label: 'En riesgo', value: ALL_FAMILIES.filter(f => f.status === 'riesgo').length },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}