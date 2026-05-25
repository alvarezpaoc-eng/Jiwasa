import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// ─── Step data ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7

const routines = [
  { id: 'cocina',       emoji: '🍳', label: 'Cocina' },
  { id: 'juego',        emoji: '🎮', label: 'Juego' },
  { id: 'bano',         emoji: '🛁', label: 'Baño' },
  { id: 'parque',       emoji: '🌳', label: 'Parque' },
  { id: 'supermercado', emoji: '🛒', label: 'Supermercado' },
  { id: 'vestirse',     emoji: '👕', label: 'Vestirse' },
]

const areas = [
  { id: 'lenguaje',    emoji: '💬', label: 'Lenguaje' },
  { id: 'motricidad',  emoji: '✋', label: 'Motricidad' },
  { id: 'autonomia',   emoji: '🌟', label: 'Autonomía' },
  { id: 'cognicion',   emoji: '🧠', label: 'Cognición' },
  { id: 'social',      emoji: '🤝', label: 'Social' },
  { id: 'sensorial',   emoji: '🎨', label: 'Sensorial' },
]

const materials = [
  { id: 'cucharas',   emoji: '🥄', label: 'Cucharas' },
  { id: 'pelotas',    emoji: '⚽', label: 'Pelotas' },
  { id: 'plastilina', emoji: '🟡', label: 'Plastilina' },
  { id: 'bloques',    emoji: '🧱', label: 'Bloques' },
  { id: 'colores',    emoji: '🖍️', label: 'Colores' },
  { id: 'telas',      emoji: '🧺', label: 'Telas/Ropa' },
]

const moods = [
  { id: 'bien',     emoji: '😊', label: 'Bien', desc: 'Tengo energía y ganas', color: 'border-green-200 bg-green-50', ring: 'ring-green-400', dot: 'bg-green-400' },
  { id: 'cansado',  emoji: '😐', label: 'Cansado', desc: 'Puedo, pero con calma', color: 'border-yellow-200 bg-yellow-50', ring: 'ring-yellow-400', dot: 'bg-yellow-warm' },
  { id: 'saturado', emoji: '😞', label: 'Saturado', desc: 'Necesito algo suave hoy', color: 'border-blue-100 bg-blue-light', ring: 'ring-blue-soft', dot: 'bg-blue-soft' },
]

// ─── Reusable toggle chip ─────────────────────────────────────────────────────
function Chip({ emoji, label, selected, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-2xl border-2 text-sm font-medium transition-all duration-200
        ${selected
          ? 'border-blue-soft bg-blue-light text-blue-mid ring-2 ring-blue-soft/30 ring-offset-1'
          : 'border-gray-100 bg-white text-gray-600 hover:border-blue-soft/30'
        }
      `}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }) {
  const pct = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100)
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-soft to-yellow-warm transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ─── Step wrapper with transition ─────────────────────────────────────────────
function StepWrap({ children }) {
  return (
    <div className="animate-fade-up w-full max-w-md mx-auto" style={{ animationFillMode: 'forwards' }}>
      {children}
    </div>
  )
}

// ─── Nav buttons ─────────────────────────────────────────────────────────────
function NavButtons({ onBack, onNext, nextLabel = 'Continuar', nextDisabled = false, step }) {
  return (
    <div className="flex gap-3 mt-8">
      {step > 1 && (
        <button
          onClick={onBack}
          className="px-5 py-3.5 rounded-2xl border-2 border-gray-100 text-sm text-gray-400 font-medium hover:border-gray-200 hover:text-gray-600 transition-all duration-200 flex-shrink-0"
        >
          ←
        </button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`
          flex-1 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200
          ${nextDisabled
            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
            : 'bg-blue-soft text-white hover:bg-blue-mid shadow-card hover:shadow-glow hover:-translate-y-0.5'
          }
        `}
      >
        {nextLabel}
      </button>
    </div>
  )
}

// ─── STEPS ────────────────────────────────────────────────────────────────────

function Step1({ onNext }) {
  return (
    <StepWrap>
      <div className="text-center mb-10">
        <div className="text-6xl mb-6 animate-float inline-block">🌱</div>
        <h1 className="font-display text-3xl sm:text-4xl text-gray-800 font-light leading-tight mb-4">
          Construyamos juntos
          <span className="block text-gradient-blue italic">tu experiencia.</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
          Solo tomaremos unos minutos para entender las necesidades de tu familia. Sin tecnicismos. Sin prisa.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { emoji: '⏱️', label: '3 min' },
          { emoji: '💛', label: 'Sin estrés' },
          { emoji: '🔒', label: 'Privado' },
        ].map(({ emoji, label }) => (
          <div key={label} className="bg-white rounded-2xl border border-beige-mid p-3 text-center">
            <div className="text-xl mb-1">{emoji}</div>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-2xl bg-blue-soft text-white font-semibold text-base shadow-card hover:bg-blue-mid hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5"
      >
        Comenzar 🌟
      </button>
    </StepWrap>
  )
}

function Step2({ data, setData, onNext, onBack, step }) {
  const ages = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const autonomy = [
    { id: 'alto', label: 'Alta', desc: 'Hace muchas cosas solo', emoji: '⭐⭐⭐' },
    { id: 'medio', label: 'Media', desc: 'Necesita algo de ayuda', emoji: '⭐⭐' },
    { id: 'bajo', label: 'Emergente', desc: 'Aprendiendo todavía', emoji: '⭐' },
  ]

  const toggleArea = (id) => {
    setData(d => ({
      ...d,
      areas: d.areas.includes(id) ? d.areas.filter(a => a !== id) : [...d.areas, id]
    }))
  }

  return (
    <StepWrap>
      <h2 className="font-display text-2xl sm:text-3xl text-gray-800 font-light mb-1">
        Cuéntanos sobre
        <span className="text-gradient-blue"> tu hijo.</span>
      </h2>
      <p className="text-gray-400 text-xs mb-7">Así personalizamos cada actividad.</p>

      {/* Name */}
      <div className="mb-5">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 block">Nombre del niño</label>
        <input
          type="text"
          placeholder="Ej: Nicolás"
          value={data.childName}
          onChange={e => setData(d => ({ ...d, childName: e.target.value }))}
          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/40 transition-colors"
        />
      </div>

      {/* Age */}
      <div className="mb-5">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 block">Edad</label>
        <div className="flex flex-wrap gap-2">
          {ages.map(a => (
            <button
              key={a}
              onClick={() => setData(d => ({ ...d, age: a }))}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-150 ${
                data.age === a
                  ? 'bg-blue-soft text-white shadow-card'
                  : 'bg-white border-2 border-gray-100 text-gray-500 hover:border-blue-soft/30'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Autonomy */}
      <div className="mb-5">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 block">Nivel de autonomía</label>
        <div className="grid grid-cols-3 gap-2">
          {autonomy.map(({ id, label, desc, emoji }) => (
            <button
              key={id}
              onClick={() => setData(d => ({ ...d, autonomy: id }))}
              className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-150 ${
                data.autonomy === id
                  ? 'border-blue-soft bg-blue-light ring-2 ring-blue-soft/30'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <span className="text-base mb-1">{emoji}</span>
              <span className="text-xs font-semibold text-gray-700">{label}</span>
              <span className="text-[10px] text-gray-400 text-center mt-0.5 leading-tight">{desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Therapy areas */}
      <div className="mb-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 block">Áreas a trabajar</label>
        <div className="flex flex-wrap gap-2">
          {areas.map(({ id, emoji, label }) => (
            <Chip key={id} emoji={emoji} label={label} selected={data.areas.includes(id)} onToggle={() => toggleArea(id)} />
          ))}
        </div>
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        step={step}
        nextDisabled={!data.childName || !data.age || !data.autonomy || data.areas.length === 0}
      />
    </StepWrap>
  )
}

function Step3({ data, setData, onNext, onBack, step }) {
  const toggle = (id) => {
    setData(d => ({
      ...d,
      routines: d.routines.includes(id) ? d.routines.filter(r => r !== id) : [...d.routines, id]
    }))
  }

  return (
    <StepWrap>
      <h2 className="font-display text-2xl sm:text-3xl text-gray-800 font-light mb-1">
        ¿Qué rutinas
        <span className="text-gradient-blue"> tienes en casa?</span>
      </h2>
      <p className="text-gray-400 text-xs mb-7">Selecciona todas las que quieras. Las convertiremos en terapia.</p>

      <div className="grid grid-cols-2 gap-3 mb-2">
        {routines.map(({ id, emoji, label }) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
              data.routines.includes(id)
                ? 'border-blue-soft bg-blue-light text-blue-mid ring-2 ring-blue-soft/20'
                : 'border-gray-100 bg-white text-gray-600 hover:border-blue-soft/30'
            }`}
          >
            <span className="text-xl">{emoji}</span>
            <span>{label}</span>
            {data.routines.includes(id) && <span className="ml-auto text-blue-soft">✓</span>}
          </button>
        ))}
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        step={step}
        nextDisabled={data.routines.length === 0}
      />
    </StepWrap>
  )
}

function Step4({ data, setData, onNext, onBack, step }) {
  const times = [
    { id: 5,  label: '5 min',  desc: 'Un momento corto', emoji: '⚡' },
    { id: 10, label: '10 min', desc: 'Ritmo tranquilo',   emoji: '☁️' },
    { id: 15, label: '15 min', desc: 'Dedicación plena',  emoji: '🌟' },
  ]

  return (
    <StepWrap>
      <h2 className="font-display text-2xl sm:text-3xl text-gray-800 font-light mb-1">
        ¿Cuánto tiempo
        <span className="text-gradient-blue"> tienes al día?</span>
      </h2>
      <p className="text-gray-400 text-xs mb-8">No hay respuesta incorrecta. Cualquier momento cuenta.</p>

      <div className="flex flex-col gap-3">
        {times.map(({ id, label, desc, emoji }) => (
          <button
            key={id}
            onClick={() => setData(d => ({ ...d, time: id }))}
            className={`flex items-center gap-4 px-5 py-5 rounded-2xl border-2 transition-all duration-200 ${
              data.time === id
                ? 'border-blue-soft bg-blue-light ring-2 ring-blue-soft/30'
                : 'border-gray-100 bg-white hover:border-blue-soft/30'
            }`}
          >
            <span className="text-3xl">{emoji}</span>
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-base">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            {data.time === id && (
              <div className="ml-auto w-6 h-6 rounded-full bg-blue-soft flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        step={step}
        nextDisabled={!data.time}
      />
    </StepWrap>
  )
}

function Step5({ data, setData, onNext, onBack, step }) {
  return (
    <StepWrap>
      <h2 className="font-display text-2xl sm:text-3xl text-gray-800 font-light mb-1">
        ¿Cómo te sientes
        <span className="text-gradient-blue"> hoy?</span>
      </h2>
      <p className="text-gray-400 text-xs mb-8">
        Esto es importante para nosotros. Adaptaremos la intensidad de las actividades.
      </p>

      <div className="flex flex-col gap-4">
        {moods.map(({ id, emoji, label, desc, color, ring, dot }) => (
          <button
            key={id}
            onClick={() => setData(d => ({ ...d, mood: id }))}
            className={`relative flex items-center gap-5 px-5 py-5 rounded-2xl border-2 transition-all duration-200 ${
              data.mood === id
                ? `${color} ring-2 ${ring} ring-offset-2`
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            <span className="text-4xl">{emoji}</span>
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-base">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
            {data.mood === id && (
              <span className={`absolute top-3 right-4 w-2.5 h-2.5 rounded-full ${dot}`} />
            )}
          </button>
        ))}
      </div>

      {data.mood === 'saturado' && (
        <div className="mt-4 px-4 py-3 rounded-2xl bg-blue-light border border-blue-soft/20 animate-fade-in">
          <p className="text-xs text-blue-mid leading-relaxed">
            💛 Está bien. Hoy te sugeriremos actividades de solo 5 minutos, muy simples y con mucho amor.
          </p>
        </div>
      )}

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        step={step}
        nextDisabled={!data.mood}
      />
    </StepWrap>
  )
}

function Step6({ data, setData, onNext, onBack, step }) {
  const toggle = (id) => {
    setData(d => ({
      ...d,
      materials: d.materials.includes(id) ? d.materials.filter(m => m !== id) : [...d.materials, id]
    }))
  }

  return (
    <StepWrap>
      <h2 className="font-display text-2xl sm:text-3xl text-gray-800 font-light mb-1">
        ¿Qué tienes
        <span className="text-gradient-blue"> en casa?</span>
      </h2>
      <p className="text-gray-400 text-xs mb-7">
        Solo usaremos lo que ya tienes. Nada que comprar.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {materials.map(({ id, emoji, label }) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
              data.materials.includes(id)
                ? 'border-yellow-warm bg-yellow-light text-yellow-mid ring-2 ring-yellow-warm/30'
                : 'border-gray-100 bg-white text-gray-600 hover:border-yellow-warm/30'
            }`}
          >
            <span className="text-xl">{emoji}</span>
            <span>{label}</span>
            {data.materials.includes(id) && <span className="ml-auto text-yellow-mid">✓</span>}
          </button>
        ))}
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        step={step}
        nextLabel="¡Casi listo!"
        nextDisabled={data.materials.length === 0}
      />
    </StepWrap>
  )
}

function Step7({ data, onFinish }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const moodMap = { bien: '😊', cansado: '😐', saturado: '😞' }

  const handleFinish = () => {
    setLoading(true)
    setTimeout(() => navigate('/dashboard'), 1800)
  }

  return (
    <StepWrap>
      {!loading ? (
        <>
          {/* Celebration */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-float inline-block">🎉</div>
            <h2 className="font-display text-3xl sm:text-4xl text-gray-800 font-light leading-tight mb-3">
              Tu experiencia
              <span className="block text-gradient-blue italic">está lista.</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
              Hemos preparado actividades personalizadas para {data.childName || 'tu hijo'} basándonos en todo lo que nos contaste.
            </p>
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-3xl border border-beige-mid shadow-card p-5 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Perfil creado</span>
              <span className="text-xs font-semibold text-green-500">✓ Listo</span>
            </div>

            <div className="h-px bg-gray-50" />

            <div className="flex flex-wrap gap-2">
              {data.childName && (
                <span className="px-3 py-1.5 rounded-xl bg-blue-light text-blue-mid text-xs font-medium">
                  👶 {data.childName}, {data.age} años
                </span>
              )}
              {data.time && (
                <span className="px-3 py-1.5 rounded-xl bg-yellow-light text-yellow-mid text-xs font-medium">
                  ⏱️ {data.time} min/día
                </span>
              )}
              {data.mood && (
                <span className="px-3 py-1.5 rounded-xl bg-beige-mid text-gray-600 text-xs font-medium">
                  {moodMap[data.mood]} {data.mood}
                </span>
              )}
              {data.routines.slice(0, 2).map(r => {
                const found = routines.find(x => x.id === r)
                return found ? (
                  <span key={r} className="px-3 py-1.5 rounded-xl bg-green-50 text-green-600 text-xs font-medium">
                    {found.emoji} {found.label}
                  </span>
                ) : null
              })}
              {data.routines.length > 2 && (
                <span className="px-3 py-1.5 rounded-xl bg-gray-50 text-gray-400 text-xs font-medium">
                  +{data.routines.length - 2} más
                </span>
              )}
            </div>

            <div className="h-px bg-gray-50" />

            <p className="text-xs text-gray-400 leading-relaxed">
              Tu terapeuta recibirá este perfil y ajustará las actividades semanalmente.
            </p>
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-soft to-blue-mid text-white font-semibold text-base shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            Ir a mi dashboard 🚀
          </button>

          <p className="text-center text-xs text-gray-300 mt-3">
            Podrás editar tu perfil en cualquier momento
          </p>
        </>
      ) : (
        /* Loading */
        <div className="flex flex-col items-center justify-center py-16 gap-6 animate-fade-in">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-light" />
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-soft animate-spin" />
            <div className="absolute inset-2 rounded-full bg-yellow-light flex items-center justify-center text-xl">
              🌱
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-700 font-medium mb-1">Personalizando tu experiencia...</p>
            <p className="text-gray-400 text-xs">Preparando actividades para {data.childName || 'tu hijo'}</p>
          </div>
        </div>
      )}
    </StepWrap>
  )
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────

const initialData = {
  childName: '',
  age: null,
  autonomy: null,
  areas: [],
  routines: [],
  time: null,
  mood: null,
  materials: [],
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(initialData)
  const navigate = useNavigate()

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS))
  const back = () => setStep(s => Math.max(s - 1, 1))

  const stepLabels = ['Inicio', 'Tu hijo', 'Rutinas', 'Tiempo', 'Cómo estás', 'Materiales', 'Listo']

  return (
    <div className="min-h-screen bg-mesh flex flex-col">
      {/* Header */}
      <div className="px-5 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center shadow-soft">
            <span className="text-white font-display font-bold text-xs">J</span>
          </div>
          <span className="font-display text-lg text-gray-800">Jiwasa</span>
        </Link>

        {step > 1 && step < TOTAL_STEPS && (
          <span className="text-xs text-gray-400">
            {stepLabels[step - 1]}
          </span>
        )}
      </div>

      {/* Progress */}
      {step > 1 && step < TOTAL_STEPS && (
        <div className="px-5 mb-2">
          <ProgressBar step={step} />
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-gray-300">Paso {step - 1} de {TOTAL_STEPS - 2}</span>
            <span className="text-[10px] text-gray-300">{Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100)}%</span>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="flex-1 flex flex-col justify-center px-5 py-6">
        {step === 1 && <Step1 onNext={next} />}
        {step === 2 && <Step2 data={data} setData={setData} onNext={next} onBack={back} step={step} />}
        {step === 3 && <Step3 data={data} setData={setData} onNext={next} onBack={back} step={step} />}
        {step === 4 && <Step4 data={data} setData={setData} onNext={next} onBack={back} step={step} />}
        {step === 5 && <Step5 data={data} setData={setData} onNext={next} onBack={back} step={step} />}
        {step === 6 && <Step6 data={data} setData={setData} onNext={next} onBack={back} step={step} />}
        {step === 7 && <Step7 data={data} onFinish={() => navigate('/dashboard')} />}
      </div>
    </div>
  )
}