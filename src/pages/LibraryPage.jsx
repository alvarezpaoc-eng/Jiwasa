import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── DATOS MAESTROS DE ACTIVIDADES ──────────────────────────────────────────

export const ACTIVITIES_DB = [
  {
    id: 1,
    emoji: '🍳',
    title: 'Momento Cocina',
    subtitle: 'Preparamos juntos la merienda',
    description: 'Mezclar, verter y tocar ingredientes fortalece la coordinación y la confianza de forma natural.',
    duration: 7,
    age: '4–7 años',
    difficulty: 'Suave',
    energy: 'Baja',
    therapist: 'Dra. Ana Torres',
    category: 'cocina',
    moment: ['mañana', 'tarde'],
    place: 'Cocina',
    materials: ['Cuchara', 'Bol', 'Ingredientes simples'],
    goals: [
      { icon: '🤲', label: 'Motricidad fina' },
      { icon: '👂', label: 'Seguir instrucciones' },
      { icon: '🌟', label: 'Autonomía' },
    ],
    tags: ['motricidad', 'cocina', 'autonomía'],
    recommended: true,
    gradient: 'from-orange-400 to-amber-500',
    cardBg: 'bg-orange-50',
    accentColor: 'text-orange-500',
    accentBg: 'bg-orange-50 border-orange-200',
    steps: [
      { n: 1, icon: '🥄', title: 'Presenta la cuchara', text: 'Muéstrale la cuchara y dale tiempo para observarla sin prisa.' },
      { n: 2, icon: '✋', title: 'Invítalo a agarrarla', text: 'Anímalo a tomarla por sí solo, aunque tarde un momento.' },
      { n: 3, icon: '🌀', title: 'Mezclen juntos', text: 'Permite que mezcle lentamente. No corrijas cada movimiento.' },
      { n: 4, icon: '💛', title: 'Celebra el momento', text: 'Felicita su esfuerzo con una sonrisa, sin importar el resultado.' },
    ],
    why: 'Manipular objetos cotidianos fortalece la coordinación, la atención y la confianza de tu hijo de forma completamente natural.',
    quickVariant: 'Solo deja que agarre la cuchara y revuelva unos segundos. Con eso ya es suficiente.',
    tips: [
      'Si se distrae, está bien. Redirige con calma.',
      'No importa si hace un poco de desorden.',
      'Tu presencia ya es lo más importante.',
      'Cada intento cuenta, aunque sea breve.',
    ],
    adaptations: [
      { icon: '😴', title: 'Si está cansado…', text: 'Reduce a solo un paso. Que sostenga el bol y ya.' },
      { icon: '😤', title: 'Si se frustra…', text: 'Pausa, abraza y luego intentan juntos una vez más.' },
      { icon: '🙅', title: 'Si no quiere…', text: 'No fuerces. Inténtalo mañana con otro alimento que le guste.' },
    ],
  },
  {
    id: 2,
    emoji: '🍌',
    title: 'Pelando Bananas',
    subtitle: 'Motricidad fina con frutas',
    description: 'Pelar, cortar y servir fruta desarrolla autonomía y control motor de manera deliciosa.',
    duration: 5,
    age: '3–6 años',
    difficulty: 'Muy suave',
    energy: 'Baja',
    therapist: 'Dra. Ana Torres',
    category: 'cocina',
    moment: ['mañana', 'tarde'],
    place: 'Cocina',
    materials: ['Banana', 'Plato'],
    goals: [
      { icon: '🤲', label: 'Motricidad fina' },
      { icon: '🌟', label: 'Autonomía' },
    ],
    tags: ['motricidad', 'cocina', 'frutas'],
    recommended: false,
    gradient: 'from-yellow-400 to-amber-400',
    cardBg: 'bg-yellow-50',
    accentColor: 'text-yellow-600',
    accentBg: 'bg-yellow-light border-yellow-warm/40',
    steps: [
      { n: 1, icon: '🍌', title: 'Muestra la banana', text: 'Enséñale cómo agarrarla con ambas manos.' },
      { n: 2, icon: '👇', title: 'Primer jale', text: 'Guía suavemente su dedo hacia el extremo para iniciar el pelado.' },
      { n: 3, icon: '🎉', title: 'Que termine solo', text: 'Deja que complete el resto sin ayuda, aunque tarde.' },
      { n: 4, icon: '🍽️', title: 'Servir juntos', text: 'Que ponga la fruta en el plato por sí mismo. Celebra mucho.' },
    ],
    why: 'El gesto de pelar requiere coordinación bimanual y fuerza controlada. Es una de las mejores actividades de motricidad fina cotidiana.',
    quickVariant: 'Solo pide que sostenga la banana con ambas manos. Eso ya activa la coordinación.',
    tips: [
      'Si la piel se rompe entera, ¡genial! Eso también vale.',
      'No importa si la banana queda un poco aplastada.',
      'Hazlo tú primero lentamente para que observe.',
      'Celebra mucho al final, aunque haya necesitado ayuda.',
    ],
    adaptations: [
      { icon: '😴', title: 'Si está cansado…', text: 'Solo que sostenga la banana pelada y la ponga en el plato.' },
      { icon: '😤', title: 'Si se frustra…', text: 'Inicia tú el pelado y pide que él termine la última parte.' },
      { icon: '🙅', title: 'Si no quiere…', text: 'Prueba con otra fruta que le guste más, como mandarina.' },
    ],
  },
  {
    id: 3,
    emoji: '🛁',
    title: 'Hora del Baño',
    subtitle: 'Autonomía en el aseo diario',
    description: 'La rutina del baño es perfecta para trabajar secuencias, autonomía y lenguaje de forma natural.',
    duration: 10,
    age: '4–8 años',
    difficulty: 'Suave',
    energy: 'Media',
    therapist: 'Lic. Carlos Méndez',
    category: 'baño',
    moment: ['noche'],
    place: 'Baño',
    materials: ['Jabón', 'Toalla', 'Esponja'],
    goals: [
      { icon: '🌟', label: 'Autonomía' },
      { icon: '🔢', label: 'Secuencias' },
      { icon: '💬', label: 'Lenguaje' },
    ],
    tags: ['autonomía', 'vestirse', 'rutina'],
    recommended: false,
    gradient: 'from-blue-400 to-cyan-400',
    cardBg: 'bg-blue-50',
    accentColor: 'text-blue-500',
    accentBg: 'bg-blue-light border-blue-soft/30',
    steps: [
      { n: 1, icon: '💧', title: 'Nombre cada paso', text: 'Di en voz alta lo que van a hacer: "Ahora lavamos las manos."' },
      { n: 2, icon: '🧼', title: 'Que tome el jabón', text: 'Deja que agarre el jabón solo y lo frote en sus manos.' },
      { n: 3, icon: '🚿', title: 'Enjuagar juntos', text: 'Cuenten hasta 5 mientras el agua cae sobre sus manos.' },
      { n: 4, icon: '🧻', title: 'Secarse solo', text: 'Pon la toalla al alcance y espera que se seque por sí mismo.' },
    ],
    why: 'Repetir secuencias cotidianas fortalece la memoria procedimental, el lenguaje y la autonomía de forma gradual y sin presión.',
    quickVariant: 'Solo que tome la toalla y se seque las manos. Un paso simple ya activa todo el circuito.',
    tips: [
      'Usa el mismo orden siempre para que lo anticipe.',
      'Si olvida un paso, sugiere sin hacerlo por él.',
      'Las canciones cortas ayudan a recordar la secuencia.',
      'La repetición diaria es la mejor terapia.',
    ],
    adaptations: [
      { icon: '😴', title: 'Si está cansado…', text: 'Solo el paso de secarse. Es breve y lo puede hacer solo.' },
      { icon: '😤', title: 'Si se frustra…', text: 'Ofrece elegir: "¿Te secas tú o lo hacemos juntos?"' },
      { icon: '🙅', title: 'Si no quiere…', text: 'Convierte el jabón en un juego de burbujas para motivarlo.' },
    ],
  },
  {
    id: 4,
    emoji: '🧸',
    title: 'Guardar Juguetes',
    subtitle: 'Orden con propósito terapéutico',
    description: 'Guardar juguetes en su lugar desarrolla categorización, atención y sentido de responsabilidad.',
    duration: 5,
    age: '3–7 años',
    difficulty: 'Muy suave',
    energy: 'Baja',
    therapist: 'Dra. Ana Torres',
    category: 'hogar',
    moment: ['tarde', 'noche'],
    place: 'Sala',
    materials: ['Canasta o caja', 'Juguetes'],
    goals: [
      { icon: '🧠', label: 'Atención' },
      { icon: '📋', label: 'Categorización' },
      { icon: '🌟', label: 'Autonomía' },
    ],
    tags: ['atención', 'autonomía', 'concentración'],
    recommended: false,
    gradient: 'from-purple-400 to-pink-400',
    cardBg: 'bg-purple-50',
    accentColor: 'text-purple-500',
    accentBg: 'bg-purple-50 border-purple-200',
    steps: [
      { n: 1, icon: '👀', title: 'Observar juntos', text: 'Señala los juguetes y di: "¿Dónde van estas cositas?"' },
      { n: 2, icon: '🙌', title: 'Primero uno', text: 'Pide que lleve un solo juguete a su lugar antes de continuar.' },
      { n: 3, icon: '🔄', title: 'Repetir con calma', text: 'Continúen uno a uno. Sin prisa. Sin presión.' },
      { n: 4, icon: '🎊', title: 'Celebrar el orden', text: '"¡Lo logramos juntos!" Que vea el resultado con orgullo.' },
    ],
    why: 'Guardar objetos en categorías activa funciones ejecutivas clave como la planificación, la atención sostenida y la memoria visual.',
    quickVariant: 'Solo pide que guarde un juguete. Un solo objeto ya activa la misma área del cerebro.',
    tips: [
      'Usa cajas de colores para categorías distintas.',
      'No pidas que lo haga rápido. La velocidad no importa.',
      'Participa tú también para que no se sienta solo.',
      'Si pone algo en el lugar equivocado, no corrijas aún.',
    ],
    adaptations: [
      { icon: '😴', title: 'Si está cansado…', text: 'Un juguete. Solo uno. Y ya terminaron.' },
      { icon: '😤', title: 'Si se frustra…', text: 'Hagan una "carrera" amistosa: tú guardas uno, él guarda uno.' },
      { icon: '🙅', title: 'Si no quiere…', text: 'Convierte el juguete favorito en el "guardián" de la caja.' },
    ],
  },
  {
    id: 5,
    emoji: '👕',
    title: 'Yo Me Visto',
    subtitle: 'Independencia paso a paso',
    description: 'Aprender a vestirse fortalece la planificación, la motricidad y la autoestima de manera poderosa.',
    duration: 10,
    age: '4–8 años',
    difficulty: 'Media',
    energy: 'Media',
    therapist: 'Lic. Carlos Méndez',
    category: 'autonomia',
    moment: ['mañana'],
    place: 'Dormitorio',
    materials: ['Ropa cómoda', 'Silla baja'],
    goals: [
      { icon: '🌟', label: 'Autonomía' },
      { icon: '🤲', label: 'Motricidad fina' },
      { icon: '🧠', label: 'Planificación' },
    ],
    tags: ['vestirse', 'autonomía', 'motricidad'],
    recommended: false,
    gradient: 'from-teal-400 to-green-400',
    cardBg: 'bg-teal-50',
    accentColor: 'text-teal-600',
    accentBg: 'bg-teal-50 border-teal-200',
    steps: [
      { n: 1, icon: '👀', title: 'Mostrar la ropa', text: 'Pon la ropa sobre la cama y nombra cada prenda juntos.' },
      { n: 2, icon: '👖', title: 'Empezar por abajo', text: 'Empieza con el pantalón. Siéntalo y que meta las piernas.' },
      { n: 3, icon: '👕', title: 'La camiseta', text: 'Enseña a meter la cabeza primero, luego los brazos.' },
      { n: 4, icon: '🎉', title: '¡Ya estás listo!', text: 'Celébralo frente al espejo. Que se vea y se sienta orgulloso.' },
    ],
    why: 'El proceso de vestirse activa múltiples áreas: planificación, memoria de secuencia, lateralidad y control motor fino, todo en un solo momento cotidiano.',
    quickVariant: 'Solo que se ponga los zapatos o los calcetines. Un paso ya vale como toda la actividad.',
    tips: [
      'La ropa con elástico es más fácil para empezar.',
      'Dale tiempo extra por las mañanas para que no haya prisa.',
      'El espejo ayuda mucho a que se autorregule.',
      'No ayudes hasta que lo pida. La espera es parte del aprendizaje.',
    ],
    adaptations: [
      { icon: '😴', title: 'Si está cansado…', text: 'Solo los calcetines. Es un logro igual de válido.' },
      { icon: '😤', title: 'Si se frustra…', text: 'Toma un descanso de 2 minutos y vuelvan con calma.' },
      { icon: '🙅', title: 'Si no quiere…', text: 'Deja que elija qué ropa ponerse. La autonomía empieza por la elección.' },
    ],
  },
  {
    id: 6,
    emoji: '🌳',
    title: 'Exploradores del Parque',
    subtitle: 'Movimiento y socialización',
    description: 'El parque es un laboratorio natural de desarrollo sensorial, social y motor para tu hijo.',
    duration: 15,
    age: '3–8 años',
    difficulty: 'Suave',
    energy: 'Alta',
    therapist: 'Dra. Ana Torres',
    category: 'parque',
    moment: ['tarde'],
    place: 'Parque',
    materials: ['Ropa cómoda', 'Agua'],
    goals: [
      { icon: '🏃', label: 'Movimiento' },
      { icon: '👥', label: 'Socialización' },
      { icon: '🌿', label: 'Sensorial' },
    ],
    tags: ['sensorial', 'movimiento', 'social'],
    recommended: false,
    gradient: 'from-green-400 to-emerald-500',
    cardBg: 'bg-green-50',
    accentColor: 'text-green-600',
    accentBg: 'bg-green-50 border-green-200',
    steps: [
      { n: 1, icon: '🌿', title: 'Explorar texturas', text: 'Toca hojas, tierra, troncos juntos. Nombra lo que sienten.' },
      { n: 2, icon: '🏃', title: 'Correr sin meta', text: 'Corre con él sin ninguna dirección. Solo sentir el movimiento.' },
      { n: 3, icon: '👋', title: 'Saludar a alguien', text: 'Anímalo a saludar a otro niño o al señor del banco.' },
      { n: 4, icon: '🌅', title: 'Momento de calma', text: 'Siéntense juntos y observen el cielo durante 1 minuto.' },
    ],
    why: 'El contacto con la naturaleza y el movimiento libre regulan el sistema nervioso, reducen la ansiedad y activan la integración sensorial de forma profunda.',
    quickVariant: 'Solo caminar 5 minutos y tocar 3 texturas distintas. Eso ya es suficiente para activar el sistema sensorial.',
    tips: [
      'No hay que ir lejos. La plaza más cercana funciona igual.',
      'Deja que él elija el camino cuando sea posible.',
      'Nombra todo lo que ven. El lenguaje se desarrolla al hablar.',
      'Desconéctate del teléfono aunque sea 10 minutos.',
    ],
    adaptations: [
      { icon: '😴', title: 'Si está cansado…', text: 'Solo sentarse en el pasto y sentir la textura. Es poderoso igual.' },
      { icon: '😤', title: 'Si se frustra…', text: 'Busca un espacio tranquilo y lejos del ruido para regularse.' },
      { icon: '🙅', title: 'Si no quiere salir…', text: 'Lleva sus juguetes afuera. Jugar en el patio también vale.' },
    ],
  },
]

// ─── CATEGORÍAS ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',      emoji: '✨', label: 'Todas',           color: 'bg-blue-light border-blue-soft/30 text-blue-soft' },
  { id: 'cocina',   emoji: '🍳', label: 'Cocina',          color: 'bg-orange-50 border-orange-200 text-orange-500' },
  { id: 'baño',     emoji: '🛁', label: 'Baño',            color: 'bg-blue-50 border-blue-200 text-blue-500' },
  { id: 'hogar',    emoji: '🧸', label: 'Hogar',           color: 'bg-purple-50 border-purple-200 text-purple-500' },
  { id: 'autonomia',emoji: '👕', label: 'Independencia',   color: 'bg-teal-50 border-teal-200 text-teal-600' },
  { id: 'parque',   emoji: '🌳', label: 'Al aire libre',   color: 'bg-green-50 border-green-200 text-green-600' },
]

const TIME_FILTERS  = ['5 min', '10 min', '15+ min']
const ENERGY_FILTERS = ['Baja', 'Media', 'Alta']
const MOMENT_FILTERS = ['mañana', 'tarde', 'noche']

const SEARCH_SUGGESTIONS = ['habla', 'motricidad', 'vestirse', 'calmarse', 'concentración']

const EMPTY_MESSAGES = [
  '¡Pronto habrá más actividades aquí! 🌱',
  'Prueba con otro filtro o busca algo diferente 💛',
  'No encontramos nada, pero estamos creciendo 🚀',
]

// ─── BottomNav ───────────────────────────────────────────────────────────────

function BottomNav({ active }) {
  const navigate = useNavigate()
  const items = [
    { icon: '🏠', label: 'Inicio',      route: '/dashboard' },
    { icon: '✨', label: 'Actividades', route: '/library' },
    { icon: '📚', label: 'Biblioteca',  route: '/library' },
    { icon: '❤️', label: 'Comunidad',  route: '/community' },
    { icon: '👤', label: 'Perfil',      route: '/profile' },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/60">
      <div className="max-w-lg mx-auto px-2 py-2 flex items-center justify-around">
        {items.map(({ icon, label, route }) => {
          const isActive = active === route
          return (
            <button
              key={label}
              onClick={() => navigate(route)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 ${
                isActive ? 'bg-blue-light' : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className={`text-[10px] font-medium ${isActive ? 'text-blue-soft' : 'text-gray-400'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ─── ActivityCard ────────────────────────────────────────────────────────────

function ActivityCard({ activity, onOpen, onSave, saved, delay = 0 }) {
  const { emoji, title, subtitle, description, duration, difficulty, energy, goals, gradient, cardBg, accentColor, materials, recommended } = activity
  return (
    <div
      className={`${cardBg} rounded-3xl border border-white/80 shadow-soft overflow-hidden card-hover`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top gradient strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-soft`}>
              {emoji}
            </div>
            <div className="flex-1 min-w-0">
              {recommended && (
                <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-light text-yellow-mid text-[9px] font-semibold uppercase tracking-wide mb-1">
                  ⭐ Recomendada hoy
                </span>
              )}
              <h3 className="text-sm font-semibold text-gray-800 leading-snug">{title}</h3>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onSave(activity.id) }}
            className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
              saved ? 'bg-yellow-light text-yellow-mid' : 'bg-white/60 text-gray-300 hover:text-yellow-mid'
            }`}
          >
            {saved ? '⭐' : '☆'}
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{description}</p>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 border border-white text-[10px] text-gray-500 font-medium">
            ⏱️ {duration} min
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 border border-white text-[10px] text-gray-500 font-medium">
            🌊 {difficulty}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 border border-white text-[10px] text-gray-500 font-medium">
            ⚡ {energy}
          </span>
        </div>

        {/* Goals */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {goals.map(({ icon, label }) => (
            <span key={label} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/60 text-[10px] text-gray-600 font-medium">
              {icon} {label}
            </span>
          ))}
        </div>

        {/* Materials */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-xs text-gray-400">🧺</span>
          <p className="text-[11px] text-gray-400">{materials.join(' · ')}</p>
        </div>

        {/* CTA */}
        <button
          onClick={() => onOpen(activity.id)}
          className={`w-full py-3 rounded-2xl text-sm font-semibold bg-gradient-to-r ${gradient} text-white shadow-soft hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
        >
          Ver actividad →
        </button>
      </div>
    </div>
  )
}

// ─── LibraryPage ─────────────────────────────────────────────────────────────

export default function LibraryPage() {
  const navigate = useNavigate()

  const [visible, setVisible]         = useState(false)
  const [search, setSearch]           = useState('')
  const [activeCategory, setCategory] = useState('all')
  const [activeTime, setTime]         = useState(null)
  const [activeEnergy, setEnergy]     = useState(null)
  const [activeMoment, setMoment]     = useState(null)
  const [savedIds, setSavedIds]       = useState([1])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const filtered = useMemo(() => {
    return ACTIVITIES_DB.filter(a => {
      // search
      if (search) {
        const q = search.toLowerCase()
        const hit =
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.tags.some(t => t.includes(q)) ||
          a.goals.some(g => g.label.toLowerCase().includes(q))
        if (!hit) return false
      }
      // category
      if (activeCategory !== 'all' && a.category !== activeCategory) return false
      // time
      if (activeTime) {
        if (activeTime === '5 min'  && a.duration > 5)  return false
        if (activeTime === '10 min' && (a.duration < 6 || a.duration > 10)) return false
        if (activeTime === '15+ min' && a.duration < 11) return false
      }
      // energy
      if (activeEnergy && a.energy !== activeEnergy) return false
      // moment
      if (activeMoment && !a.moment.includes(activeMoment)) return false
      return true
    })
  }, [search, activeCategory, activeTime, activeEnergy, activeMoment])

  const toggleSave = (id) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const activeFilterCount = [activeTime, activeEnergy, activeMoment].filter(Boolean).length

  const [emptyMsg] = useState(EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)])

  return (
    <div className="min-h-screen bg-beige-soft pb-28">

      {/* ── Sticky Header ──────────────────────────────────────── */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <span className="text-lg">←</span>
            <span className="text-sm font-medium">Inicio</span>
          </button>

          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">J</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">Biblioteca</span>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
              activeFilterCount > 0
                ? 'bg-blue-light border-blue-soft/30 text-blue-soft'
                : 'bg-white border-beige-mid text-gray-500 hover:border-blue-soft/20'
            }`}
          >
            <span>🔧</span>
            <span>Filtros</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-soft text-white text-[9px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div
        className={`max-w-lg mx-auto px-5 pt-6 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >

        {/* ── 1. Hero emocional ──────────────────────────────────── */}
        <section className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 leading-tight mb-1">
            Biblioteca Terapéutica
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Pequeñas actividades para acompañar el desarrollo de tu hijo en casa.
          </p>
          {/* Indicadores */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: '⏱️', text: '5 a 15 minutos' },
              { icon: '📋', text: 'Paso a paso' },
              { icon: '🏡', text: 'En tu rutina diaria' },
            ].map(({ icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-beige-mid text-[11px] text-gray-500 font-medium shadow-soft">
                {icon} {text}
              </span>
            ))}
          </div>
        </section>

        {/* ── 2. Buscador ────────────────────────────────────────── */}
        <section className="mb-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar actividad…"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-beige-mid shadow-soft text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-blue-soft/40 focus:ring-2 focus:ring-blue-soft/10 transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 text-lg"
              >
                ×
              </button>
            )}
          </div>

          {/* Sugerencias */}
          {!search && (
            <div className="flex gap-2 mt-2.5 overflow-x-auto pb-0.5 scrollbar-hide">
              {SEARCH_SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setSearch(s)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-beige-mid text-[11px] text-gray-400 hover:border-blue-soft/30 hover:text-blue-soft transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ── 3. Panel de filtros (colapsable) ───────────────────── */}
        {showFilters && (
          <section className="mb-4 bg-white rounded-3xl border border-beige-mid shadow-soft p-4 animate-fade-in">
            {/* Tiempo */}
            <div className="mb-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                ⏱️ Tiempo disponible
              </p>
              <div className="flex gap-2">
                {TIME_FILTERS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTime(activeTime === t ? null : t)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
                      activeTime === t
                        ? 'bg-blue-light border-blue-soft/30 text-blue-soft'
                        : 'bg-beige-soft border-transparent text-gray-400 hover:border-beige-mid'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Energía */}
            <div className="mb-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                ⚡ Energía del niño
              </p>
              <div className="flex gap-2">
                {ENERGY_FILTERS.map(e => (
                  <button
                    key={e}
                    onClick={() => setEnergy(activeEnergy === e ? null : e)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
                      activeEnergy === e
                        ? 'bg-yellow-light border-yellow-warm/40 text-yellow-mid'
                        : 'bg-beige-soft border-transparent text-gray-400 hover:border-beige-mid'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Momento */}
            <div className="mb-3">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                🌅 Momento del día
              </p>
              <div className="flex gap-2">
                {MOMENT_FILTERS.map(m => (
                  <button
                    key={m}
                    onClick={() => setMoment(activeMoment === m ? null : m)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-medium capitalize transition-all duration-200 ${
                      activeMoment === m
                        ? 'bg-green-50 border-green-200 text-green-600'
                        : 'bg-beige-soft border-transparent text-gray-400 hover:border-beige-mid'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Limpiar */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setTime(null); setEnergy(null); setMoment(null) }}
                className="w-full py-2 rounded-xl text-xs text-gray-400 hover:text-blue-soft transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </section>
        )}

        {/* ── 4. Categorías ──────────────────────────────────────── */}
        <section className="mb-5">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {CATEGORIES.map(({ id, emoji, label, color }) => (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium transition-all duration-200 ${
                  activeCategory === id
                    ? color + ' shadow-soft scale-105'
                    : 'bg-white border-beige-mid text-gray-400 hover:border-gray-300'
                }`}
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── 5. Contador de resultados ──────────────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-400">
            {filtered.length === 0
              ? 'Sin resultados'
              : `${filtered.length} actividad${filtered.length !== 1 ? 'es' : ''}`}
          </p>
          {(search || activeCategory !== 'all' || activeFilterCount > 0) && (
            <button
              onClick={() => { setSearch(''); setCategory('all'); setTime(null); setEnergy(null); setMoment(null) }}
              className="text-xs text-blue-soft hover:underline"
            >
              Ver todas
            </button>
          )}
        </div>

        {/* ── 6. Grid de actividades ─────────────────────────────── */}
        {filtered.length > 0 ? (
          <section className="flex flex-col gap-4 mb-6">
            {filtered.map((activity, i) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onOpen={(id) => navigate(`/activity/${id}`)}
                onSave={toggleSave}
                saved={savedIds.includes(activity.id)}
                delay={i * 60}
              />
            ))}
          </section>
        ) : (
          <section className="mb-6">
            <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-8 text-center">
              <div className="text-4xl mb-3">🌱</div>
              <p className="text-sm font-medium text-gray-600 mb-1">{emptyMsg}</p>
              <p className="text-xs text-gray-400">Intenta con otro término o categoría</p>
              <button
                onClick={() => { setSearch(''); setCategory('all'); setTime(null); setEnergy(null); setMoment(null) }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-blue-light text-blue-soft text-xs font-semibold hover:bg-blue-soft hover:text-white transition-all duration-200"
              >
                Ver todas las actividades
              </button>
            </div>
          </section>
        )}

        {/* ── 7. Guardadas ───────────────────────────────────────── */}
        {savedIds.length > 0 && !search && activeCategory === 'all' && !activeFilterCount && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                ⭐ Guardadas
              </p>
              <span className="text-[11px] text-gray-400">{savedIds.length} actividad{savedIds.length !== 1 ? 'es' : ''}</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {ACTIVITIES_DB.filter(a => savedIds.includes(a.id)).map(a => (
                <button
                  key={a.id}
                  onClick={() => navigate(`/activity/${a.id}`)}
                  className={`flex-shrink-0 w-32 ${a.cardBg} rounded-2xl border border-white/80 shadow-soft p-3 text-left card-hover`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center text-xl mb-2`}>
                    {a.emoji}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 leading-snug">{a.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{a.duration} min</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ── 8. Mensaje de cierre emocional ─────────────────────── */}
        <section className="mb-6">
          <div className="px-4 py-4 rounded-2xl bg-gradient-to-r from-yellow-light to-blue-light border border-yellow-warm/20 text-center">
            <p className="text-sm font-medium text-gray-700 leading-relaxed">
              💛 No necesitas hacerlo perfecto. Solo acompañar ya es suficiente.
            </p>
          </div>
        </section>

      </div>

      <BottomNav active="/library" />
    </div>
  )
}