import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AVAILABLE_THERAPISTS = [
  { id: 101, name: 'Mg. Daniela Flores', specialty: 'Terapia ocupacional', rating: 4.9, experience: '6 años', avatar: 'DF', color: 'from-blue-400 to-cyan-400', email: 'daniela.flores@example.com' },
  { id: 102, name: 'Lic. Roberto Montoya', specialty: 'Fisioterapia', rating: 4.7, experience: '5 años', avatar: 'RM', color: 'from-red-400 to-pink-400', email: 'roberto.montoya@example.com' },
  { id: 103, name: 'Ps. Verónica Sánchez', specialty: 'Conducta', rating: 4.8, experience: '7 años', avatar: 'VS', color: 'from-purple-400 to-indigo-400', email: 'veronica.sanchez@example.com' },
  { id: 104, name: 'Dra. Patricia Eras', specialty: 'Educación especial', rating: 4.6, experience: '8 años', avatar: 'PE', color: 'from-green-400 to-emerald-400', email: 'patricia.eras@example.com' },
]

function TherapistCard({ therapist, onAdd }) {
  const [adding, setAdding] = useState(false)

  const handleAdd = () => {
    setAdding(true)
    setTimeout(() => setAdding(false), 800)
  }

  return (
    <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${therapist.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {therapist.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800">{therapist.name}</p>
          <p className="text-xs text-gray-500">{therapist.specialty}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-amber-400">★</span>
          <span className="text-xs text-gray-600">{therapist.rating}</span>
        </div>
        <span className="text-[10px] text-gray-400">{therapist.experience}</span>
      </div>

      <p className="text-[11px] text-gray-500 mb-3">{therapist.email}</p>

      <button
        onClick={handleAdd}
        disabled={adding}
        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
          adding
            ? 'bg-green-50 text-green-600 border border-green-100'
            : 'bg-blue-light text-blue-soft border border-blue-soft/10 hover:bg-blue-soft hover:text-white'
        }`}
      >
        {adding ? '✓ Invitación enviada' : '➕ Invitar'}
      </button>
    </div>
  )
}

export default function AdminInvitarTerapeutaPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(AVAILABLE_THERAPISTS)
  const [tab, setTab] = useState('buscar')
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  useEffect(() => {
    if (!search) {
      setFiltered(AVAILABLE_THERAPISTS)
    } else {
      setFiltered(
        AVAILABLE_THERAPISTS.filter(t =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.specialty.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
  }, [search])

  return (
    <div className={`min-h-screen bg-beige-soft pb-24 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Header */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/admin')} className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-600 hover:border-blue-soft/40 transition-all">
            ←
          </button>
          <h1 className="font-semibold text-gray-800 text-sm">Invitar Terapeuta</h1>
          <div className="w-9 h-9" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl border border-beige-mid p-1 shadow-soft">
          {[
            { id: 'buscar', label: '🔍 Buscar' },
            { id: 'invitado', label: '📬 Invitaciones' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === t.id
                  ? 'bg-gradient-to-br from-blue-soft to-blue-mid text-white shadow-soft'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════
            BUSCAR TAB
        ════════════════════════════════════════════════════════ */}
        {tab === 'buscar' && (
          <>
            {/* Search box */}
            <section className="mb-6">
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
                {['Todos', 'Psicomotricidad', 'Lenguaje', 'Ocupacional'].map(f => (
                  <button key={f} className="px-3 py-1.5 rounded-full text-xs font-semibold border border-beige-mid bg-white hover:border-blue-soft/40 hover:bg-blue-light/20 transition-all">
                    {f}
                  </button>
                ))}
              </div>
            </section>

            {/* Results */}
            <section>
              {filtered.length > 0 ? (
                <div className="grid gap-3">
                  {filtered.map(t => (
                    <TherapistCard key={t.id} therapist={t} onAdd={() => {}} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-gray-400 text-sm">No encontramos terapeutas con esos criterios</p>
                  <button onClick={() => setSearch('')} className="mt-3 text-xs text-blue-soft font-semibold hover:underline">
                    Ver todos →
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {/* ════════════════════════════════════════════════════════
            INVITACIONES TAB
        ════════════════════════════════════════════════════════ */}
        {tab === 'invitado' && (
          <>
            <section>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'Mg. Daniela Flores', date: 'Enviada hace 2 horas', status: 'pendiente', avatar: 'DF', color: 'from-blue-400 to-cyan-400' },
                  { name: 'Lic. Roberto Montoya', date: 'Enviada hace 1 día', status: 'aceptada', avatar: 'RM', color: 'from-red-400 to-pink-400' },
                ].map((inv, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4 flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${inv.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {inv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{inv.name}</p>
                      <p className="text-xs text-gray-400">{inv.date}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                      inv.status === 'aceptada'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-yellow-light text-yellow-mid'
                    }`}>
                      {inv.status === 'aceptada' ? '✓ Aceptada' : '⏳ Pendiente'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Empty state alternative */}
              <div className="text-center py-12 hidden">
                <div className="text-4xl mb-2">📬</div>
                <p className="text-gray-400 text-sm">No hay invitaciones aún</p>
              </div>
            </section>
          </>
        )}

        {/* Info card */}
        <section className="mt-8 bg-blue-light/30 rounded-2xl border border-blue-soft/20 p-4">
          <p className="text-xs font-semibold text-blue-soft mb-2">💡 Tip</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Al invitar un terapeuta, recibirá un email con instrucciones para crear su cuenta. Una vez aceptada, aparecerá automáticamente en tu equipo.
          </p>
        </section>

      </div>
    </div>
  )
}