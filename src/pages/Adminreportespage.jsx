import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MONTHLY_REPORTS = [
  {
    id: 1,
    month: 'Mayo 2024',
    date: '2024-05-30',
    type: 'terapeuta',
    author: 'Dra. Ana Torres',
    title: 'Reporte de Progreso - Familias Asignadas',
    families: 12,
    activities: 58,
    completionRate: 94,
    keyPoints: [
      'Avance significativo en motricidad fina',
      'Mejora en comunicación verbal',
      'Participación constante de las familias',
    ],
    status: 'enviado',
    avatar: 'AT',
    color: 'from-blue-soft to-[#3b82c8]',
  },
  {
    id: 2,
    month: 'Mayo 2024',
    date: '2024-05-28',
    type: 'familia',
    author: 'Laura García',
    title: 'Reporte de Actividades - Nicolás',
    families: 1,
    activities: 12,
    completionRate: 98,
    keyPoints: [
      'Nicolás logró decir primera palabra completa',
      'Mejoría en coordinación motora',
      'Ambiente familiar muy motivador',
    ],
    status: 'enviado',
    avatar: 'L',
    color: 'from-blue-soft to-[#3b82c8]',
  },
  {
    id: 3,
    month: 'Mayo 2024',
    date: '2024-05-25',
    type: 'terapeuta',
    author: 'Lic. Carlos Vega',
    title: 'Evaluación Mensual - Lenguaje',
    families: 9,
    activities: 43,
    completionRate: 82,
    keyPoints: [
      'Progreso en pronunciación',
      'Necesita reforzar vocabulario',
      'Interacción social mejorada',
    ],
    status: 'pendiente',
    avatar: 'CV',
    color: 'from-yellow-warm to-amber-400',
  },
  {
    id: 4,
    month: 'Abril 2024',
    date: '2024-04-30',
    type: 'terapeuta',
    author: 'Ps. Lucía Mamani',
    title: 'Informe de Cognición',
    families: 11,
    activities: 61,
    completionRate: 91,
    keyPoints: [
      'Estimulación cognitiva exitosa',
      'Mejora en resolución de problemas',
      'Aumento en tiempo de concentración',
    ],
    status: 'enviado',
    avatar: 'LM',
    color: 'from-green-400 to-teal-400',
  },
  {
    id: 5,
    month: 'Abril 2024',
    date: '2024-04-25',
    type: 'familia',
    author: 'Carmen Quispe',
    title: 'Seguimiento - Diego',
    families: 1,
    activities: 8,
    completionRate: 87,
    keyPoints: [
      'Diego muestra entusiasmo en actividades',
      'Familia comprometida con el proceso',
      'Rutinas establecidas correctamente',
    ],
    status: 'enviado',
    avatar: 'C',
    color: 'from-green-400 to-teal-400',
  },
]

const STATS_SUMMARY = {
  totalReports: 5,
  terapeutaReports: 3,
  familiaReports: 2,
  avgCompletion: 90.4,
  pendingReports: 1,
}

function ReportCard({ report, onView }) {
  const typeLabel = report.type === 'terapeuta' ? 'Terapeuta' : 'Familia'
  const typeColor = report.type === 'terapeuta'
    ? 'bg-purple-50 text-purple-600'
    : 'bg-green-50 text-green-600'
  const statusColor = report.status === 'enviado'
    ? 'bg-green-50 text-green-600'
    : 'bg-yellow-50 text-yellow-600'

  return (
    <button
      onClick={onView}
      className="w-full bg-white rounded-2xl border border-beige-mid shadow-soft p-5 hover:-translate-y-0.5 hover:shadow-md transition-all text-left"
    >
      <div className="flex items-start gap-4 mb-3">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${report.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {report.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 leading-snug">{report.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{report.author}</p>
            </div>
            <span className="text-lg flex-shrink-0">→</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColor}`}>
          {typeLabel}
        </span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor}`}>
          {report.status === 'enviado' ? '✓ Enviado' : '⏳ Pendiente'}
        </span>
        <span className="text-[10px] text-gray-400">{report.month}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-3 pb-3 border-b border-beige-mid">
        <div className="text-center">
          <p className="text-base font-bold text-blue-soft">{report.activities}</p>
          <p className="text-[10px] text-gray-400">Actividades</p>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-purple-500">{report.families}</p>
          <p className="text-[10px] text-gray-400">Familia(s)</p>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-green-600">{report.completionRate}%</p>
          <p className="text-[10px] text-gray-400">Cumplimiento</p>
        </div>
      </div>

      {/* Key Points Preview */}
      <div className="space-y-1">
        {report.keyPoints.slice(0, 2).map((point, i) => (
          <p key={i} className="text-[11px] text-gray-600 leading-snug">
            ✓ {point}
          </p>
        ))}
        {report.keyPoints.length > 2 && (
          <p className="text-[10px] text-gray-400">+ {report.keyPoints.length - 2} punto(s) más</p>
        )}
      </div>
    </button>
  )
}

function ReportDetailModal({ report, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center animate-fade-in">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-card">
        {/* Header */}
        <div className="sticky top-0 glass border-b border-white/60 px-5 py-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 text-sm">Detalles del Reporte</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-beige-soft flex items-center justify-center text-gray-600 hover:bg-beige-mid transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start gap-4 mb-5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${report.color} flex items-center justify-center text-white font-bold text-base shadow-soft`}>
              {report.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
              <p className="text-sm text-gray-500">{report.author}</p>
              <p className="text-xs text-gray-400 mt-1">{report.month} · {new Date(report.date).toLocaleDateString('es-ES')}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex gap-2 mb-5">
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
              report.type === 'terapeuta'
                ? 'bg-purple-50 text-purple-600'
                : 'bg-green-50 text-green-600'
            }`}>
              {report.type === 'terapeuta' ? 'Reporte de Terapeuta' : 'Reporte de Familia'}
            </span>
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
              report.status === 'enviado'
                ? 'bg-green-50 text-green-600'
                : 'bg-yellow-50 text-yellow-600'
            }`}>
              {report.status === 'enviado' ? '✓ Enviado' : '⏳ Pendiente de envío'}
            </span>
          </div>

          {/* Stats */}
          <div className="bg-beige-soft rounded-2xl p-4 mb-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">Métricas</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-soft">{report.activities}</p>
                <p className="text-[10px] text-gray-500 mt-1">Actividades</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">{report.families}</p>
                <p className="text-[10px] text-gray-500 mt-1">Familia(s)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{report.completionRate}%</p>
                <p className="text-[10px] text-gray-500 mt-1">Cumplimiento</p>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">Puntos Principales</p>
            <div className="space-y-2">
              {report.keyPoints.map((point, i) => (
                <div key={i} className="bg-blue-light/20 border border-blue-soft/20 rounded-2xl p-3">
                  <p className="text-sm text-gray-700">✓ {point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Full Content */}
          <div className="bg-white rounded-2xl border border-beige-mid p-4 mb-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">Contenido Completo</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Este reporte detalla el progreso de las familias asignadas durante el mes de {report.month.split(' ')[0]}. 
              Se han completado {report.activities} actividades con una tasa de cumplimiento del {report.completionRate}%, 
              indicando un alto nivel de compromiso y participación en el programa terapéutico.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl bg-blue-soft text-white text-sm font-semibold hover:bg-blue-mid transition-all">
              📥 Descargar PDF
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-beige-mid text-gray-700 text-sm font-semibold hover:bg-beige-soft transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminReportesPage() {
  const navigate = useNavigate()
  const [selectedMonth, setSelectedMonth] = useState('todos')
  const [selectedType, setSelectedType] = useState('todos')
  const [filtered, setFiltered] = useState(MONTHLY_REPORTS)
  const [selectedReport, setSelectedReport] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  useEffect(() => {
    let result = MONTHLY_REPORTS

    if (selectedMonth !== 'todos') {
      result = result.filter(r => r.month === selectedMonth)
    }

    if (selectedType !== 'todos') {
      result = result.filter(r => r.type === selectedType)
    }

    setFiltered(result)
  }, [selectedMonth, selectedType])

  const months = [...new Set(MONTHLY_REPORTS.map(r => r.month))]

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
          <h1 className="font-semibold text-gray-800 text-sm">Reportes Mensuales</h1>
          <span className="text-xs font-semibold text-gray-400">{filtered.length}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Summary Stats */}
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4 text-center">
              <p className="text-2xl font-bold text-blue-soft">{STATS_SUMMARY.totalReports}</p>
              <p className="text-[10px] text-gray-500 mt-1">Total de reportes</p>
            </div>
            <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4 text-center">
              <p className="text-2xl font-bold text-purple-500">{STATS_SUMMARY.pendingReports}</p>
              <p className="text-[10px] text-gray-500 mt-1">Pendientes</p>
            </div>
            <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{STATS_SUMMARY.terapeutaReports}</p>
              <p className="text-[10px] text-gray-500 mt-1">Terapeutas</p>
            </div>
            <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4 text-center">
              <p className="text-2xl font-bold text-amber-400">{STATS_SUMMARY.avgCompletion}%</p>
              <p className="text-[10px] text-gray-500 mt-1">Cumplimiento</p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-6">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Por mes</p>
              <div className="flex gap-2 flex-wrap">
                {['todos', ...months].map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedMonth === m
                        ? 'bg-blue-soft text-white shadow-soft'
                        : 'border border-beige-mid bg-white hover:border-blue-soft/40'
                    }`}
                  >
                    {m === 'todos' ? 'Todos' : m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Por tipo</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'terapeuta', label: '🧑‍⚕️ Terapeutas' },
                  { id: 'familia', label: '🏠 Familias' },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedType === t.id
                        ? 'bg-blue-soft text-white shadow-soft'
                        : 'border border-beige-mid bg-white hover:border-blue-soft/40'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reports List */}
        <section>
          {filtered.length > 0 ? (
            <div className="grid gap-4">
              {filtered.map(report => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onView={() => setSelectedReport(report)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-gray-400 text-sm">No hay reportes con esos criterios</p>
            </div>
          )}
        </section>

        {/* Info Card */}
        <section className="mt-8">
          <div className="bg-blue-light/30 border border-blue-soft/20 rounded-2xl p-4">
            <p className="text-xs font-semibold text-blue-soft mb-2">💡 Información</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Los reportes mensuales contienen información detallada sobre el progreso de las familias y terapeutas. 
              Haz click en cualquier reporte para ver los detalles completos y descargar en PDF.
            </p>
          </div>
        </section>

      </div>

      {/* Modal */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  )
}