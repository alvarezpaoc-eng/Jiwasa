import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'motricidad_fina',  emoji: '✋', label: 'Motricidad fina',  color: 'from-blue-soft to-blue-mid' },
  { id: 'lenguaje',         emoji: '💬', label: 'Lenguaje',         color: 'from-yellow-warm to-amber-400' },
  { id: 'autonomia',        emoji: '🌟', label: 'Autonomía',        color: 'from-green-400 to-teal-400' },
  { id: 'cognicion',        emoji: '🧠', label: 'Cognición',        color: 'from-purple-400 to-pink-400' },
  { id: 'sensorial',        emoji: '🎨', label: 'Sensorial',        color: 'from-orange-400 to-amber-300' },
  { id: 'social',           emoji: '🤝', label: 'Social',           color: 'from-teal-400 to-cyan-400' },
]

const ROUTINES = [
  { id: 'cocina',        emoji: '🍳', label: 'Cocina' },
  { id: 'bano',          emoji: '🛁', label: 'Baño' },
  { id: 'juego',         emoji: '🎮', label: 'Juego' },
  { id: 'vestirse',      emoji: '👕', label: 'Vestirse' },
  { id: 'supermercado',  emoji: '🛒', label: 'Supermercado' },
  { id: 'parque',        emoji: '🌳', label: 'Parque' },
]

const DURATIONS = [
  { id: 5,  label: '5 min',  emoji: '⚡', desc: 'Actividad corta' },
  { id: 10, label: '10 min', emoji: '☁️', desc: 'Ritmo tranquilo' },
  { id: 15, label: '15 min', emoji: '🌟', desc: 'Actividad completa' },
]

const DIFFICULTIES = [
  { id: 'suave',    emoji: '🌱', label: 'Suave',    desc: 'Iniciación' },
  { id: 'medio',   emoji: '🌿', label: 'Medio',    desc: 'En desarrollo' },
  { id: 'avanzado',emoji: '🌳', label: 'Avanzado', desc: 'Consolidación' },
]

const FAMILIES = [
  { id: 0,  label: 'Todas las familias', avatar: '🏠', avatarColor: '' },
  { id: 1,  label: 'Nicolás (Mamani)',   avatar: 'N',  avatarColor: 'from-blue-soft to-[#3b82c8]' },
  { id: 2,  label: 'Sofía (Quispe)',     avatar: 'S',  avatarColor: 'from-yellow-warm to-amber-400' },
  { id: 3,  label: 'Diego (Flores)',     avatar: 'D',  avatarColor: 'from-green-400 to-teal-400' },
  { id: 4,  label: 'Valentina (Condori)',avatar: 'V',  avatarColor: 'from-purple-400 to-pink-400' },
]

const MATERIAL_SUGGESTIONS = [
  'Cucharas', 'Pelotas', 'Plastilina', 'Bloques', 'Colores',
  'Vasos', 'Ropa', 'Agua', 'Telas', 'Botones',
]

const TOTAL_STEPS = 4

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }) {
  const pct = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100)
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-blue-soft to-yellow-warm transition-all duration-500"
        style={{ width: `${pct}%` }} />
    </div>
  )
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

function Chip({ emoji, label, selected, onToggle, accentClass = '' }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 text-xs font-medium transition-all duration-200 ${
        selected
          ? `border-blue-soft bg-blue-light text-blue-mid ring-2 ring-blue-soft/20 ${accentClass}`
          : 'border-gray-100 bg-white text-gray-600 hover:border-blue-soft/30'
      }`}
    >
      {emoji && <span>{emoji}</span>}
      <span>{label}</span>
    </button>
  )
}

// ─── Video Upload Placeholder ─────────────────────────────────────────────────

function VideoUpload({ value, onChange }) {
  const [dragging, setDragging] = useState(false)

  const simulate = () => {
    onChange({ name: 'actividad_cocina_demo.mp4', size: '12.4 MB', thumb: '🍳' })
  }

  if (value) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-light border-2 border-blue-soft/30">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl flex-shrink-0">
          {value.thumb}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-blue-mid truncate">{value.name}</p>
          <p className="text-[10px] text-gray-400">{value.size}</p>
        </div>
        <button onClick={() => onChange(null)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-400 text-xs hover:text-red-400 transition-colors">✕</button>
      </div>
    )
  }

  return (
    <button
      onClick={simulate}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); simulate() }}
      className={`w-full border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
        dragging
          ? 'border-blue-soft bg-blue-light'
          : 'border-beige-mid hover:border-blue-soft/40 hover:bg-blue-light/20'
      }`}
    >
      <div className="text-3xl mb-2">🎬</div>
      <p className="text-xs font-semibold text-gray-600 mb-1">Subir video demostrativo</p>
      <p className="text-[10px] text-gray-400 leading-relaxed">
        Arrastra o toca para seleccionar<br />MP4, MOV · Máx. 50 MB
      </p>
      <div className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-soft text-white text-xs font-medium">
        <span>↑</span> Seleccionar archivo
      </div>
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const EMPTY_FORM = {
  title: '', description: '', category: null, routine: null,
  duration: null, difficulty: null, familyId: 0,
  objectives: [], materials: [], video: null,
  customMaterial: '',
}

export default function CrearActividadT() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(EMPTY_FORM)
  const [visible, setVisible] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const toggleObjective = (id) => {
    setForm(f => ({
      ...f,
      objectives: f.objectives.includes(id)
        ? f.objectives.filter(x => x !== id)
        : [...f.objectives, id],
    }))
  }

  const toggleMaterial = (m) => {
    setForm(f => ({
      ...f,
      materials: f.materials.includes(m)
        ? f.materials.filter(x => x !== m)
        : [...f.materials, m],
    }))
  }

  const addCustomMaterial = () => {
    if (!form.customMaterial.trim()) return
    toggleMaterial(form.customMaterial.trim())
    setForm(f => ({ ...f, customMaterial: '' }))
  }

  const canNext = () => {
    if (step === 1) return form.title.trim().length > 3 && form.category && form.routine
    if (step === 2) return form.duration && form.difficulty && form.objectives.length > 0
    if (step === 3) return form.materials.length > 0
    return true
  }

  const submit = () => {
    setDone(true)
    setTimeout(() => navigate('/therapist'), 2000)
  }

  const selectedCat = CATEGORIES.find(c => c.id === form.category)

  // ── Done screen ──
  if (done) {
    return (
      <div className="min-h-screen bg-beige-soft flex flex-col items-center justify-center gap-6 px-5 animate-fade-in">
        <div className="text-6xl animate-float">✨</div>
        <div className="text-center max-w-xs">
          <h2 className="font-display text-3xl text-gray-800 font-light mb-2">
            Actividad <span className="text-gradient-blue italic">creada</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            "{form.title}" fue asignada y las familias recibirán una notificación.
          </p>
        </div>
        <div className="w-12 h-1 bg-gradient-to-r from-blue-soft to-yellow-warm rounded-full" />
        <p className="text-xs text-gray-300">Volviendo al dashboard...</p>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-beige-soft pb-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Top Bar */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/therapist')}
            className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500 hover:border-blue-soft/40 transition-all"
          >←</button>

          <div className="flex-1">
            <h1 className="font-semibold text-gray-800 text-sm">Crear actividad</h1>
            <p className="text-xs text-gray-400">Paso {step} de {TOTAL_STEPS}</p>
          </div>

          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center">
            <span className="text-white font-bold text-xs">J</span>
          </div>
        </div>
        <div className="max-w-lg mx-auto mt-3">
          <ProgressBar step={step} />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 pt-7">

        {/* ── STEP 1: Info + Category ───────────────────────── */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div>
              <h2 className="font-display text-2xl text-gray-800 font-light mb-1">
                ¿Qué <span className="text-gradient-blue italic">actividad</span> diseñas?
              </h2>
              <p className="text-xs text-gray-400">Dale un nombre claro y elige la categoría.</p>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                Nombre de la actividad
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Ej: Momento Cocina, Juego de Equilibrio..."
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/40 transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
                Descripción breve
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="¿En qué consiste esta actividad?"
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/40 transition-colors resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                Área terapéutica
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(({ id, emoji, label, color }) => (
                  <button
                    key={id}
                    onClick={() => setForm(f => ({ ...f, category: id }))}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all duration-200 ${
                      form.category === id
                        ? 'border-blue-soft bg-blue-light ring-2 ring-blue-soft/20'
                        : 'border-gray-100 bg-white hover:border-blue-soft/30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-base flex-shrink-0`}>
                      {emoji}
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{label}</span>
                    {form.category === id && <span className="ml-auto text-blue-soft text-xs">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Routine */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                Rutina del hogar
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ROUTINES.map(({ id, emoji, label }) => (
                  <button
                    key={id}
                    onClick={() => setForm(f => ({ ...f, routine: id }))}
                    className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-200 ${
                      form.routine === id
                        ? 'border-yellow-warm bg-yellow-light ring-2 ring-yellow-warm/20'
                        : 'border-gray-100 bg-white hover:border-yellow-warm/30'
                    }`}
                  >
                    <span className="text-xl mb-1">{emoji}</span>
                    <span className="text-[11px] font-medium text-gray-600">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Timing + Objectives ───────────────────── */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div>
              <h2 className="font-display text-2xl text-gray-800 font-light mb-1">
                Duración <span className="text-gradient-blue italic">y objetivos</span>
              </h2>
              <p className="text-xs text-gray-400">Define cuánto tiempo y qué trabaja esta actividad.</p>
            </div>

            {/* Duration */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                Duración estimada
              </label>
              <div className="flex gap-3">
                {DURATIONS.map(({ id, label, emoji, desc }) => (
                  <button
                    key={id}
                    onClick={() => setForm(f => ({ ...f, duration: id }))}
                    className={`flex-1 flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                      form.duration === id
                        ? 'border-blue-soft bg-blue-light ring-2 ring-blue-soft/20'
                        : 'border-gray-100 bg-white hover:border-blue-soft/30'
                    }`}
                  >
                    <span className="text-2xl mb-1.5">{emoji}</span>
                    <span className="text-sm font-bold text-gray-800">{label}</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">{desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                Nivel de dificultad
              </label>
              <div className="flex gap-3">
                {DIFFICULTIES.map(({ id, emoji, label, desc }) => (
                  <button
                    key={id}
                    onClick={() => setForm(f => ({ ...f, difficulty: id }))}
                    className={`flex-1 flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                      form.difficulty === id
                        ? 'border-green-400 bg-green-50 ring-2 ring-green-400/20'
                        : 'border-gray-100 bg-white hover:border-green-400/30'
                    }`}
                  >
                    <span className="text-2xl mb-1.5">{emoji}</span>
                    <span className="text-xs font-bold text-gray-800">{label}</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">{desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Objectives */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                Objetivos terapéuticos
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'motricidad_fina', label: 'Motricidad fina', emoji: '✋' },
                  { id: 'seguir_instrucciones', label: 'Seguir instrucciones', emoji: '👂' },
                  { id: 'lenguaje_expresivo', label: 'Lenguaje expresivo', emoji: '💬' },
                  { id: 'coordinacion', label: 'Coordinación', emoji: '🎯' },
                  { id: 'autonomia', label: 'Autonomía', emoji: '🌟' },
                  { id: 'atencion', label: 'Atención', emoji: '👁️' },
                  { id: 'memoria', label: 'Memoria', emoji: '🧠' },
                  { id: 'socializacion', label: 'Socialización', emoji: '🤝' },
                ].map(({ id, label, emoji }) => (
                  <Chip key={id} emoji={emoji} label={label}
                    selected={form.objectives.includes(id)}
                    onToggle={() => toggleObjective(id)} />
                ))}
              </div>
            </div>

            {/* Assign to */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                Asignar a
              </label>
              <div className="flex flex-col gap-2">
                {FAMILIES.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setForm(d => ({ ...d, familyId: f.id }))}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all ${
                      form.familyId === f.id
                        ? 'border-blue-soft bg-blue-light ring-2 ring-blue-soft/20'
                        : 'border-gray-100 bg-white hover:border-blue-soft/30'
                    }`}
                  >
                    {f.id === 0 ? (
                      <div className="w-8 h-8 rounded-xl bg-beige-mid flex items-center justify-center text-base flex-shrink-0">{f.avatar}</div>
                    ) : (
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${f.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{f.avatar}</div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{f.label}</span>
                    {form.familyId === f.id && <span className="ml-auto text-blue-soft text-xs">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Materials + Video ──────────────────────── */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div>
              <h2 className="font-display text-2xl text-gray-800 font-light mb-1">
                Materiales <span className="text-gradient-blue italic">y video</span>
              </h2>
              <p className="text-xs text-gray-400">Solo materiales que ya tienen en casa.</p>
            </div>

            {/* Materials */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                Materiales necesarios
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {MATERIAL_SUGGESTIONS.map(m => (
                  <Chip key={m} label={m}
                    selected={form.materials.includes(m)}
                    onToggle={() => toggleMaterial(m)} />
                ))}
              </div>
              {/* Custom material */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.customMaterial}
                  onChange={e => setForm(f => ({ ...f, customMaterial: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addCustomMaterial()}
                  placeholder="Otro material..."
                  className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-gray-100 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/40 transition-colors"
                />
                <button
                  onClick={addCustomMaterial}
                  className="px-4 py-2.5 rounded-2xl bg-blue-soft text-white text-sm font-medium hover:bg-blue-mid transition-all"
                >+</button>
              </div>
            </div>

            {/* Video */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">
                Video demostrativo (opcional)
              </label>
              <VideoUpload value={form.video} onChange={v => setForm(f => ({ ...f, video: v }))} />
              <p className="text-[10px] text-gray-300 mt-2">
                El video ayuda a los padres a entender cómo hacer la actividad.
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 4: Preview ───────────────────────────────── */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div>
              <h2 className="font-display text-2xl text-gray-800 font-light mb-1">
                Vista previa <span className="text-gradient-blue italic">final</span>
              </h2>
              <p className="text-xs text-gray-400">Así verán la actividad las familias.</p>
            </div>

            {/* Preview card */}
            <div className="bg-gradient-to-br from-blue-soft via-[#3b82c8] to-blue-mid rounded-3xl p-6 relative overflow-hidden shadow-card">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-6 translate-x-6" />
              <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-yellow-warm/20 translate-y-4 -translate-x-4" />
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                    {selectedCat ? (
                      <span className="text-2xl">{CATEGORIES.find(c => c.id === form.category)?.emoji}</span>
                    ) : (
                      <span className="text-2xl">✨</span>
                    )}
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-0.5">Terapia invisible</p>
                    <h3 className="text-white font-semibold text-xl">
                      {form.title || 'Nombre de la actividad'}
                    </h3>
                    {form.description && (
                      <p className="text-white/60 text-xs mt-0.5">{form.description}</p>
                    )}
                  </div>
                </div>

                {form.objectives.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {form.objectives.slice(0, 3).map(o => (
                      <span key={o} className="px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-white text-[10px] font-medium">
                        {o.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  {form.duration && <span className="text-white/70 text-xs">⏱️ {form.duration} min</span>}
                  {form.difficulty && <span className="text-white/70 text-xs">🌱 {form.difficulty}</span>}
                  {form.video && <span className="text-white/70 text-xs">🎬 Video incluido</span>}
                </div>

                <div className="w-full py-3 rounded-2xl bg-white text-blue-mid font-semibold text-sm text-center">
                  Iniciar actividad →
                </div>
              </div>
            </div>

            {/* Summary list */}
            <div className="bg-white rounded-3xl border border-beige-mid p-5 space-y-3">
              {[
                { label: 'Área', value: selectedCat?.label || '—', emoji: selectedCat?.emoji || '📋' },
                { label: 'Rutina', value: ROUTINES.find(r => r.id === form.routine)?.label || '—', emoji: ROUTINES.find(r => r.id === form.routine)?.emoji || '🏠' },
                { label: 'Duración', value: form.duration ? `${form.duration} min` : '—', emoji: '⏱️' },
                { label: 'Dificultad', value: DIFFICULTIES.find(d => d.id === form.difficulty)?.label || '—', emoji: '🌱' },
                { label: 'Materiales', value: form.materials.length > 0 ? form.materials.slice(0, 3).join(', ') + (form.materials.length > 3 ? '…' : '') : '—', emoji: '🧺' },
                { label: 'Asignado a', value: FAMILIES.find(f => f.id === form.familyId)?.label || 'Todas', emoji: '🏠' },
              ].map(({ label, value, emoji }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-base w-6 flex-shrink-0 text-center">{emoji}</span>
                  <p className="text-xs text-gray-400 w-20 flex-shrink-0">{label}</p>
                  <p className="text-xs font-medium text-gray-700 flex-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-5 py-3.5 rounded-2xl border-2 border-gray-100 text-sm text-gray-400 font-medium hover:border-gray-200 transition-all flex-shrink-0"
            >←</button>
          )}
          {step < TOTAL_STEPS ? (
            <button
              onClick={() => canNext() && setStep(s => s + 1)}
              disabled={!canNext()}
              className="flex-1 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-blue-soft text-white hover:bg-blue-mid shadow-card hover:shadow-glow hover:-translate-y-0.5"
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={submit}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-blue-soft to-blue-mid text-white text-sm font-semibold shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
            >
              Publicar actividad ✨
            </button>
          )}
        </div>
      </div>
    </div>
  )
}