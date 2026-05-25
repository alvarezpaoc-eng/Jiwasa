import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FAMILIES = [
  { id: 1, childName: 'Nicolás', parentName: 'Laura Mamani', avatar: 'L', avatarColor: 'from-blue-soft to-[#3b82c8]' },
  { id: 2, childName: 'Sofía',   parentName: 'Marco Quispe',  avatar: 'M', avatarColor: 'from-yellow-warm to-amber-400' },
  { id: 3, childName: 'Diego',   parentName: 'Carmen Flores', avatar: 'C', avatarColor: 'from-green-400 to-teal-400' },
  { id: 4, childName: 'Valentina', parentName: 'Pedro Condori', avatar: 'P', avatarColor: 'from-purple-400 to-pink-400' },
]

const REPORTS = [
  {
    id: 1, familyId: 1, childName: 'Nicolás', parentName: 'Laura Mamani',
    avatarColor: 'from-blue-soft to-[#3b82c8]', avatarLetter: 'L',
    date: '22 mayo 2025', period: 'Semana 3 – Mayo',
    activities: 10, mood: { emoji: '😊', label: 'Motivado' },
    consistency: 82, notes: 'Nicolás muestra avances notables en motricidad fina. Completó 10 de 12 actividades asignadas.',
    evidences: 3, highlights: ['Mayor autonomía al vestirse', 'Agarre de cuchara mejoró', 'Dice 2 palabras nuevas'],
    status: 'enviado',
  },
  {
    id: 2, familyId: 3, childName: 'Diego', parentName: 'Carmen Flores',
    avatarColor: 'from-green-400 to-teal-400', avatarLetter: 'C',
    date: '20 mayo 2025', period: 'Semana 3 – Mayo',
    activities: 14, mood: { emoji: '🎯', label: 'Concentrado' },
    consistency: 91, notes: 'Diego demuestra excelente constancia. La familia sigue el plan con mucha dedicación.',
    evidences: 5, highlights: ['Equilibrio mejorado', 'Coordinación ojo-mano', 'Alta participación familiar'],
    status: 'enviado',
  },
  {
    id: 3, familyId: 2, childName: 'Sofía', parentName: 'Marco Quispe',
    avatarColor: 'from-yellow-warm to-amber-400', avatarLetter: 'M',
    date: '18 mayo 2025', period: 'Semana 2 – Mayo',
    activities: 2, mood: { emoji: '😢', label: 'Frustrado' },
    consistency: 34, notes: 'La familia presenta dificultades para mantener la rutina. Se sugiere contacto de apoyo.',
    evidences: 1, highlights: ['Baja constancia semanal'],
    status: 'borrador',
  },
]

const MOOD_OPTIONS = [
  { id: 'muy_bien', emoji: '🌟', label: 'Muy bien' },
  { id: 'bien',     emoji: '😊', label: 'Bien' },
  { id: 'regular',  emoji: '😐', label: 'Regular' },
  { id: 'bajo',     emoji: '😢', label: 'Necesita apoyo' },
]

const HIGHLIGHT_OPTIONS = [
  'Mayor autonomía al vestirse',
  'Mejor seguimiento visual',
  'Nuevas palabras adquiridas',
  'Mejoró agarre de objetos',
  'Más participación en actividades',
  'Coordinación ojo-mano mejorada',
  'Alta constancia familiar',
  'Buena tolerancia a cambios',
]

// ─── Consistency Ring ─────────────────────────────────────────────────────────

function SmallRing({ value }) {
  const color = value >= 70 ? '#34D399' : value >= 40 ? '#F4C542' : '#F87171'
  const r = 17, circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <svg width="40" height="40" className="-rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#f0ede8" strokeWidth="4" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[9px] font-bold" style={{ color }}>{value}%</span>
      </div>
    </div>
  )
}

// ─── Report Card ──────────────────────────────────────────────────────────────

function ReportCard({ report, onExpand }) {
  const statusConf = {
    enviado:  { label: 'Enviado',  bg: 'bg-green-50',     text: 'text-green-600' },
    borrador: { label: 'Borrador', bg: 'bg-yellow-light', text: 'text-yellow-mid' },
  }[report.status]

  return (
    <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-5 card-hover">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${report.avatarColor} flex items-center justify-center text-white font-bold shadow-soft flex-shrink-0`}>
          {report.avatarLetter}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-gray-800">{report.childName}</p>
              <p className="text-[11px] text-gray-400">{report.parentName} · {report.period}</p>
            </div>
            <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold ${statusConf.bg} ${statusConf.text}`}>
              {statusConf.label}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-4 mb-4 p-3 rounded-2xl bg-beige-soft">
        <SmallRing value={report.consistency} />
        <div className="flex-1 grid grid-cols-2 gap-2">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800">{report.activities}</p>
            <p className="text-[10px] text-gray-400">actividades</p>
          </div>
          <div className="text-center">
            <p className="text-lg">{report.mood.emoji}</p>
            <p className="text-[10px] text-gray-400">{report.mood.label}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-blue-soft">{report.evidences}</p>
          <p className="text-[10px] text-gray-400">evidencias</p>
        </div>
      </div>

      {/* Notes preview */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">{report.notes}</p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {report.highlights.slice(0, 2).map((h, i) => (
          <span key={i} className="px-2.5 py-1 rounded-full bg-blue-light text-blue-mid text-[10px] font-medium">
            ✓ {h}
          </span>
        ))}
        {report.highlights.length > 2 && (
          <span className="px-2.5 py-1 rounded-full bg-gray-50 text-gray-400 text-[10px] font-medium">
            +{report.highlights.length - 2} más
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-gray-300">{report.date}</p>
        <button
          onClick={() => onExpand(report)}
          className="px-4 py-1.5 rounded-xl bg-beige-soft border border-beige-mid text-xs font-semibold text-gray-600 hover:border-blue-soft/40 hover:text-blue-soft transition-all"
        >
          Ver completo
        </button>
      </div>
    </div>
  )
}

// ─── Create Report Modal ──────────────────────────────────────────────────────

function CreateReportModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    familyId: null, activities: '', mood: '', notes: '',
    highlights: [], evidenceLabel: '',
  })
  const [done, setDone] = useState(false)

  const selectedFamily = FAMILIES.find(f => f.id === form.familyId)

  const toggleHighlight = (h) => {
    setForm(f => ({
      ...f,
      highlights: f.highlights.includes(h)
        ? f.highlights.filter(x => x !== h)
        : [...f.highlights, h],
    }))
  }

  const submit = () => {
    setDone(true)
    setTimeout(onClose, 1800)
  }

  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-5">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-card animate-fade-up">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="font-display text-2xl text-gray-800 font-light mb-2">Reporte guardado</h3>
        <p className="text-sm text-gray-400">La familia recibirá una notificación.</p>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm px-4 pb-4 sm:pb-0">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-card animate-fade-up max-h-[90vh] flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-beige-mid flex-shrink-0">
          <div>
            <h3 className="font-semibold text-gray-800">Nuevo reporte</h3>
            <p className="text-xs text-gray-400 mt-0.5">Paso {step} de 3</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-beige-soft flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">✕</button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-3 flex-shrink-0">
          <div className="w-full h-1 bg-beige-mid rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-soft to-yellow-warm transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* Step 1 – Family + basic */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                  ¿Para qué familia?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {FAMILIES.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setForm(d => ({ ...d, familyId: f.id }))}
                      className={`flex items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                        form.familyId === f.id
                          ? 'border-blue-soft bg-blue-light ring-2 ring-blue-soft/20'
                          : 'border-gray-100 bg-white hover:border-blue-soft/30'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${f.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {f.avatar}
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-xs font-semibold text-gray-700 truncate">{f.childName}</p>
                        <p className="text-[10px] text-gray-400 truncate">{f.parentName.split(' ')[0]}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                  Actividades completadas
                </label>
                <input
                  type="number" min="0" max="30"
                  value={form.activities}
                  onChange={e => setForm(d => ({ ...d, activities: e.target.value }))}
                  placeholder="Ej: 8"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/40 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                  Estado emocional observado
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MOOD_OPTIONS.map(({ id, emoji, label }) => (
                    <button
                      key={id}
                      onClick={() => setForm(d => ({ ...d, mood: id }))}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-medium transition-all ${
                        form.mood === id
                          ? 'border-blue-soft bg-blue-light text-blue-mid'
                          : 'border-gray-100 bg-white text-gray-600 hover:border-blue-soft/30'
                      }`}
                    >
                      <span className="text-base">{emoji}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 – Notes + highlights */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                  Notas clínicas
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(d => ({ ...d, notes: e.target.value }))}
                  placeholder="Describe el progreso observado esta semana..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/40 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                  Logros destacados
                </label>
                <div className="flex flex-wrap gap-2">
                  {HIGHLIGHT_OPTIONS.map(h => (
                    <button
                      key={h}
                      onClick={() => toggleHighlight(h)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border-2 transition-all ${
                        form.highlights.includes(h)
                          ? 'border-yellow-warm bg-yellow-light text-yellow-mid'
                          : 'border-gray-100 bg-white text-gray-500 hover:border-yellow-warm/40'
                      }`}
                    >
                      {form.highlights.includes(h) ? '✓ ' : ''}{h}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 – Evidences + confirm */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              {/* Evidence upload (simulated) */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                  Evidencias (fotos / videos)
                </label>
                <div className="border-2 border-dashed border-beige-mid rounded-2xl p-6 text-center hover:border-blue-soft/30 transition-colors cursor-pointer"
                  onClick={() => setForm(d => ({ ...d, evidenceLabel: 'evidencia_semana3.mp4' }))}>
                  {form.evidenceLabel ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">📎</span>
                      <p className="text-xs font-medium text-green-600">{form.evidenceLabel}</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl mb-2">📁</div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Toca para adjuntar evidencias
                      </p>
                      <p className="text-[10px] text-gray-300 mt-1">Video, foto o audio</p>
                    </>
                  )}
                </div>
              </div>

              {/* Summary */}
              {selectedFamily && (
                <div className="bg-beige-soft rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-600 mb-3">Resumen del reporte</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${selectedFamily.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                      {selectedFamily.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{selectedFamily.childName}</p>
                      <p className="text-[10px] text-gray-400">{selectedFamily.parentName}</p>
                    </div>
                  </div>
                  {form.activities && (
                    <p className="text-xs text-gray-500">✓ {form.activities} actividades completadas</p>
                  )}
                  {form.highlights.length > 0 && (
                    <p className="text-xs text-gray-500">✓ {form.highlights.length} logros registrados</p>
                  )}
                  {form.evidenceLabel && (
                    <p className="text-xs text-green-600">✓ Evidencia adjuntada</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="px-6 pb-6 pt-3 flex gap-3 flex-shrink-0 border-t border-beige-mid">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-5 py-3 rounded-2xl border-2 border-gray-100 text-sm text-gray-400 font-medium hover:border-gray-200 transition-all"
            >←</button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={step === 1 && (!form.familyId || !form.activities || !form.mood)}
              className="flex-1 py-3 rounded-2xl bg-blue-soft text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-mid transition-all shadow-soft"
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={submit}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-soft to-blue-mid text-white text-sm font-semibold hover:shadow-glow transition-all shadow-soft"
            >
              Guardar y enviar reporte
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReportesTPage() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [expandedReport, setExpandedReport] = useState(null)
  const [activeFilter, setActiveFilter] = useState('todos')

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const filtered = activeFilter === 'todos' ? REPORTS
    : REPORTS.filter(r => r.status === activeFilter)

  return (
    <div className={`min-h-screen bg-beige-soft pb-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Top Bar */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('/therapist')}
            className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500 hover:border-blue-soft/40 transition-all"
          >←</button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-800 text-sm">Reportes de progreso</h1>
            <p className="text-xs text-gray-400">Historial clínico familiar</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-soft text-white text-xs font-semibold hover:bg-blue-mid transition-all shadow-soft"
          >
            <span>+</span> Nuevo
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 pt-6">

        {/* Stats */}
        <section className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Reportes este mes', value: REPORTS.length, icon: '📋', color: 'from-blue-soft to-blue-mid' },
              { label: 'Familias cubiertas', value: new Set(REPORTS.map(r => r.familyId)).size, icon: '🏠', color: 'from-green-400 to-teal-400' },
              { label: 'Pendientes', value: REPORTS.filter(r => r.status === 'borrador').length, icon: '⏳', color: 'from-yellow-warm to-amber-400' },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-center shadow-soft`}>
                <div className="text-xl mb-1">{icon}</div>
                <p className="text-white font-bold text-xl leading-none">{value}</p>
                <p className="text-white/70 text-[10px] mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Filter */}
        <div className="flex gap-2 mb-5">
          {[
            { id: 'todos',    label: 'Todos',     count: REPORTS.length },
            { id: 'enviado',  label: 'Enviados',  count: REPORTS.filter(r => r.status === 'enviado').length },
            { id: 'borrador', label: 'Borradores',count: REPORTS.filter(r => r.status === 'borrador').length },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeFilter === f.id
                  ? 'bg-blue-soft text-white'
                  : 'bg-white border border-beige-mid text-gray-500 hover:border-blue-soft/30'
              }`}
            >
              {f.label}
              <span className={`text-[10px] font-bold ${activeFilter === f.id ? 'text-white/80' : 'text-gray-400'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Reports list */}
        <div className="flex flex-col gap-4">
          {filtered.map((r, i) => (
            <div key={r.id} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards', opacity: 0 }}>
              <ReportCard report={r} onExpand={setExpandedReport} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 p-5 rounded-3xl bg-gradient-to-br from-blue-light to-white border border-blue-soft/20 text-center">
          <div className="text-3xl mb-2">📋</div>
          <p className="text-sm font-semibold text-gray-800 mb-1">¿Listo para el próximo reporte?</p>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Documenta el progreso semanal y mantén a las familias informadas.
          </p>
          <button
            onClick={() => setShowCreate(true)}
            className="px-6 py-2.5 rounded-full bg-blue-soft text-white text-xs font-semibold hover:bg-blue-mid transition-all shadow-soft"
          >
            Crear nuevo reporte
          </button>
        </div>
      </div>

      {/* Create modal */}
      {showCreate && <CreateReportModal onClose={() => setShowCreate(false)} />}

      {/* Expanded report overlay */}
      {expandedReport && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm px-4 pb-4 sm:pb-0"
          onClick={() => setExpandedReport(null)}>
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-card max-h-[85vh] overflow-y-auto animate-fade-up"
            onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-800">Reporte — {expandedReport.childName}</h3>
                <button onClick={() => setExpandedReport(null)}
                  className="w-8 h-8 rounded-full bg-beige-soft flex items-center justify-center text-gray-400">✕</button>
              </div>
              <p className="text-xs text-gray-400 mb-3">{expandedReport.period} · {expandedReport.date}</p>
              <div className="flex items-center gap-3 mb-4 p-3 rounded-2xl bg-beige-soft">
                <SmallRing value={expandedReport.consistency} />
                <div className="flex-1 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="font-bold text-gray-800">{expandedReport.activities}</p>
                    <p className="text-[10px] text-gray-400">actividades</p>
                  </div>
                  <div>
                    <p className="text-lg">{expandedReport.mood.emoji}</p>
                    <p className="text-[10px] text-gray-400">{expandedReport.mood.label}</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-soft">{expandedReport.evidences}</p>
                    <p className="text-[10px] text-gray-400">evidencias</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{expandedReport.notes}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Logros</p>
              <div className="flex flex-wrap gap-2">
                {expandedReport.highlights.map((h, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-blue-light text-blue-mid text-xs font-medium">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}