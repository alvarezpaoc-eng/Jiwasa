import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const EXPORT_TEMPLATES = [
  {
    id: 'resumen',
    emoji: '📊',
    title: 'Resumen Institucional',
    desc: 'Reporte general con métricas de toda la institución',
    color: 'bg-blue-light border-blue-soft/20',
    icon: '📋',
    includes: ['Métricas generales', 'Participación', 'Familias activas', 'Terapeutas'],
  },
  {
    id: 'terapeutas',
    emoji: '🧑‍⚕️',
    title: 'Rendimiento de Terapeutas',
    desc: 'Análisis de actividades y reportes de terapeutas',
    color: 'bg-yellow-light border-yellow-warm/20',
    icon: '📈',
    includes: ['Actividades completadas', 'Familias asignadas', 'Reportes enviados', 'Ratings'],
  },
  {
    id: 'familias',
    emoji: '🏠',
    title: 'Progreso de Familias',
    desc: 'Detalles del avance de cada familia en terapia',
    color: 'bg-green-50 border-green-200',
    icon: '👨‍👧‍👦',
    includes: ['Cumplimiento de actividades', 'Progreso por familia', 'Participación', 'Historial'],
  },
  {
    id: 'riesgo',
    emoji: '⚠️',
    title: 'Análisis de Riesgo',
    desc: 'Familias en riesgo de abandono y recomendaciones',
    color: 'bg-orange-50 border-orange-200',
    icon: '🚨',
    includes: ['Inactividad prolongada', 'Patrones de riesgo', 'Recomendaciones', 'Seguimiento'],
  },
]

const MONTHS = [
  { label: 'Mayo 2024', value: 'may2024' },
  { label: 'Abril 2024', value: 'apr2024' },
  { label: 'Marzo 2024', value: 'mar2024' },
  { label: 'Febrero 2024', value: 'feb2024' },
]

function ExportCard({ template, onSelect }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    // Simula descarga
    setTimeout(() => {
      setDownloading(false)
      // En un proyecto real, esto dispararía una descarga real
      alert(`Descargando: ${template.title}\n\nEn un proyecto real, se descargaría un PDF completo.`)
    }, 1500)
  }

  return (
    <div className={`bg-white rounded-2xl border ${template.color} shadow-soft p-5 hover:-translate-y-0.5 hover:shadow-md transition-all`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl flex-shrink-0">{template.emoji}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800">{template.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{template.desc}</p>
        </div>
      </div>

      {/* Includes */}
      <div className="mb-4 pb-4 border-b border-beige-mid">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">Incluye:</p>
        <div className="flex flex-wrap gap-1.5">
          {template.includes.map((item, i) => (
            <span key={i} className="text-[10px] bg-beige-soft text-gray-600 px-2 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Action */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
          downloading
            ? 'bg-green-50 text-green-600 border border-green-100'
            : 'bg-blue-light text-blue-soft hover:bg-blue-soft hover:text-white'
        }`}
      >
        {downloading ? '✓ Descargando...' : '📥 Descargar PDF'}
      </button>
    </div>
  )
}

export default function AdminExportarPage() {
  const navigate = useNavigate()
  const [selectedMonth, setSelectedMonth] = useState('may2024')
  const [selectedTemplates, setSelectedTemplates] = useState([])
  const [downloadingAll, setDownloadingAll] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplates(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const handleDownloadAll = () => {
    if (selectedTemplates.length === 0) {
      alert('Por favor selecciona al menos un tipo de reporte')
      return
    }

    setDownloadingAll(true)
    setTimeout(() => {
      setDownloadingAll(false)
      alert(
        `Descargando reportes de ${MONTHS.find(m => m.value === selectedMonth)?.label}:\n\n` +
        selectedTemplates.map(t => {
          const template = EXPORT_TEMPLATES.find(tpl => tpl.id === t)
          return `• ${template.title}`
        }).join('\n') +
        '\n\nEn un proyecto real, se descargaría un ZIP con los archivos.'
      )
      setSelectedTemplates([])
    }, 2000)
  }

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
          <h1 className="font-semibold text-gray-800 text-sm">Exportar Reportes</h1>
          <div className="w-9 h-9" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Month Selector */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Selecciona mes</p>
          <div className="flex gap-2 flex-wrap">
            {MONTHS.map(month => (
              <button
                key={month.value}
                onClick={() => setSelectedMonth(month.value)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedMonth === month.value
                    ? 'bg-blue-soft text-white shadow-soft'
                    : 'border border-beige-mid bg-white hover:border-blue-soft/40'
                }`}
              >
                {month.label}
              </button>
            ))}
          </div>
        </section>

        {/* Info Banner */}
        <section className="mb-6">
          <div className="bg-blue-light/20 border border-blue-soft/20 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">📅</span>
            <div>
              <p className="text-xs font-semibold text-blue-soft mb-1">Mes seleccionado</p>
              <p className="text-sm text-gray-700">
                {MONTHS.find(m => m.value === selectedMonth)?.label}
              </p>
              <p className="text-[10px] text-gray-500 mt-1">
                Todos los reportes serán del mes seleccionado
              </p>
            </div>
          </div>
        </section>

        {/* Export Templates */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Tipos de reporte</p>
          <div className="grid gap-4">
            {EXPORT_TEMPLATES.map(template => (
              <ExportCard key={template.id} template={template} onSelect={handleSelectTemplate} />
            ))}
          </div>
        </section>

        {/* Bulk Download */}
        <section className="mb-6">
          <div className="bg-gradient-to-br from-blue-soft to-blue-mid rounded-3xl p-6 text-white">
            <p className="text-sm font-semibold mb-2">📦 Descarga múltiple</p>
            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              Selecciona los tipos de reportes que deseas descargar en un único archivo comprimido.
            </p>

            {selectedTemplates.length > 0 && (
              <div className="bg-white/15 border border-white/20 rounded-2xl p-3 mb-4">
                <p className="text-xs font-semibold mb-2">Seleccionados:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplates.map(id => {
                    const template = EXPORT_TEMPLATES.find(t => t.id === id)
                    return (
                      <span key={id} className="text-xs bg-white/20 px-2.5 py-1 rounded-full">
                        {template.emoji} {template.title}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}

            <button
              onClick={handleDownloadAll}
              disabled={downloadingAll}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                downloadingAll
                  ? 'bg-white text-blue-soft'
                  : 'bg-white text-blue-soft hover:bg-blue-50'
              }`}
            >
              {downloadingAll ? '⏳ Preparando descarga...' : `📥 Descargar ${selectedTemplates.length > 0 ? selectedTemplates.length : 'reportes'}`}
            </button>
          </div>
        </section>

        {/* Advanced Options */}
        <section className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Opciones avanzadas</p>
          <div className="space-y-3">
            {[
              { emoji: '📧', title: 'Enviar por email', desc: 'Envía los reportes a los terapeutas' },
              { emoji: '☁️', title: 'Guardar en la nube', desc: 'Almacena en Google Drive o Dropbox' },
              { emoji: '📅', title: 'Programar exportación', desc: 'Exporta automáticamente cada mes' },
              { emoji: '🔐', title: 'Encriptar archivos', desc: 'Protege los reportes con contraseña' },
            ].map((option, i) => (
              <button
                key={i}
                className="w-full bg-white rounded-2xl border border-beige-mid shadow-soft p-4 flex items-center gap-4 hover:border-blue-soft/40 hover:-translate-y-0.5 hover:shadow-md transition-all text-left"
              >
                <div className="text-2xl flex-shrink-0">{option.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{option.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{option.desc}</p>
                </div>
                <span className="text-gray-400 flex-shrink-0">→</span>
              </button>
            ))}
          </div>
        </section>

        {/* History */}
        <section>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Descargas recientes</p>
          <div className="space-y-2">
            {[
              { date: 'Hace 2 horas', file: 'Resumen_Abril2024.pdf', size: '2.3 MB' },
              { date: 'Ayer', file: 'Reportes_Terapeutas_Abril2024.pdf', size: '5.1 MB' },
              { date: 'Hace 3 días', file: 'Progreso_Familias_Marzo2024.pdf', size: '3.8 MB' },
            ].map((download, i) => (
              <div key={i} className="bg-white rounded-2xl border border-beige-mid shadow-soft p-3 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg flex-shrink-0">📄</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{download.file}</p>
                    <p className="text-[10px] text-gray-400">{download.date} • {download.size}</p>
                  </div>
                </div>
                <button className="text-blue-soft text-xs font-semibold hover:underline flex-shrink-0">
                  ↓
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}