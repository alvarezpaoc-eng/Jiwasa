import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-soft py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center shadow-soft">
            <span className="text-white font-display font-bold text-sm">J</span>
          </div>
          <span className="font-display text-xl font-medium text-gray-800 group-hover:text-blue-soft transition-colors">
            Jiwasa
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('como-funciona')} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Cómo funciona
          </button>
          <button onClick={() => scrollTo('beneficios')} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Beneficios
          </button>
          <button onClick={() => scrollTo('testimonios')} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Familias
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-blue-soft font-medium hover:text-blue-mid transition-colors"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate('/onboarding')}
            className="px-5 py-2.5 rounded-full bg-blue-soft text-white text-sm font-medium hover:bg-blue-mid transition-all duration-200 shadow-card hover:shadow-glow"
          >
            Comenzar gratis
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass mx-4 my-2 rounded-2xl p-5 flex flex-col gap-4">
          <button onClick={() => scrollTo('como-funciona')} className="text-left text-sm text-gray-600 py-1">Cómo funciona</button>
          <button onClick={() => scrollTo('beneficios')} className="text-left text-sm text-gray-600 py-1">Beneficios</button>
          <button onClick={() => scrollTo('testimonios')} className="text-left text-sm text-gray-600 py-1">Familias</button>
          <div className="h-px bg-gray-100" />
          <button onClick={() => navigate('/login')} className="text-left text-sm text-blue-soft font-medium py-1">Iniciar sesión</button>
          <button
            onClick={() => navigate('/onboarding')}
            className="w-full py-3 rounded-full bg-blue-soft text-white text-sm font-medium text-center"
          >
            Comenzar gratis
          </button>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen bg-mesh flex flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-blue-light opacity-60 blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 -right-16 w-56 h-56 rounded-full bg-yellow-light opacity-70 blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-light opacity-20 blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="animate-fade-in mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-soft/20 shadow-soft text-xs text-blue-soft font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-warm animate-pulse-slow" />
        Para familias que merecen apoyo real
      </div>

      {/* Main heading */}
      <h1 className="animate-fade-up animate-delay-100 max-w-3xl text-center font-display text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-gray-800 mb-6">
        Cada rutina
        <span className="italic text-gradient-blue"> esconde </span>
        una terapia
        <span className="block text-gradient-warm italic mt-1">invisible.</span>
      </h1>

      {/* Subtitle */}
      <p className="animate-fade-up animate-delay-200 max-w-xl text-center text-gray-500 text-base sm:text-lg leading-relaxed mb-10">
        Jiwasa convierte el desayuno, el baño y el juego en
        oportunidades terapéuticas reales para tu hijo.
        Sin estrés. Sin culpa. Solo momentos que suman.
      </p>

      {/* CTA buttons */}
      <div className="animate-fade-up animate-delay-300 flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-none sm:w-auto">
        <button
          onClick={() => navigate('/onboarding')}
          className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-soft text-white text-base font-medium hover:bg-blue-mid transition-all duration-300 shadow-card hover:shadow-glow"
        >
          Probar plataforma
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-600 text-base font-medium hover:border-blue-soft hover:text-blue-soft transition-all duration-200 shadow-soft"
        >
          Ver cómo funciona
        </button>
      </div>

      {/* Social proof strip */}
      <div className="animate-fade-up animate-delay-400 mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center">
        <div className="flex -space-x-2">
          {['E', 'A', 'M', 'L', 'C'].map((l, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-sm"
              style={{ background: ['#4A90E2','#F4C542','#7BC8A4','#F49067','#9B8DD4'][i] }}>
              {l}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400">
          <strong className="text-gray-600">+240 familias</strong> ya transformaron sus rutinas
        </p>
      </div>

      {/* Hero floating cards */}
      <div className="animate-fade-up animate-delay-500 mt-14 w-full max-w-2xl grid grid-cols-3 gap-3">
        {[
          { emoji: '🍳', label: 'Cocina', desc: 'Motricidad fina' },
          { emoji: '🛁', label: 'Baño', desc: 'Rutina & autonomía' },
          { emoji: '🎨', label: 'Juego', desc: 'Cognición & lenguaje' },
        ].map(({ emoji, label, desc }, i) => (
          <div key={i} className="glass rounded-2xl p-3 sm:p-4 text-center card-hover cursor-default">
            <div className="text-2xl sm:text-3xl mb-1.5">{emoji}</div>
            <p className="text-xs sm:text-sm font-medium text-gray-700">{label}</p>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{desc}</p>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-float opacity-50">
        <div className="w-5 h-8 rounded-full border border-gray-300 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-gray-400" />
        </div>
        <p className="text-[10px] text-gray-400 tracking-widest uppercase">scroll</p>
      </div>
    </section>
  )
}

// ─── Problem section ──────────────────────────────────────────────────────────
function ProblemSection() {
  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="reveal text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-yellow-light text-yellow-mid text-xs font-medium mb-4">
            Lo que viven las familias
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-800 font-light leading-snug">
            Sabemos lo que sientes.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '😮‍💨',
              title: 'Agotamiento constante',
              text: 'Coordinar terapias, citas y rutinas es un trabajo a tiempo completo. Y aún así sientes que no es suficiente.',
              delay: 'reveal-delay-1',
            },
            {
              icon: '💸',
              title: 'Terapias inaccesibles',
              text: 'Las sesiones son caras, escasas y a veces muy lejanas. El progreso no puede esperar cada dos semanas.',
              delay: 'reveal-delay-2',
            },
            {
              icon: '🤔',
              title: 'No saber cómo ayudar',
              text: 'Quieres hacer más en casa, pero nadie te enseñó cómo. Y la culpa pesa más que el cansancio.',
              delay: 'reveal-delay-3',
            },
          ].map(({ icon, title, text, delay }, i) => (
            <div key={i} className={`reveal ${delay} rounded-3xl bg-beige-soft border border-beige-mid p-7 card-hover`}>
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Bridge quote */}
        <div className="reveal mt-14 text-center max-w-2xl mx-auto">
          <p className="font-display text-2xl sm:text-3xl text-gray-700 font-light italic leading-relaxed">
            "¿Y si el momento del baño ya{' '}
            <span className="text-gradient-blue not-italic font-normal">fuera terapia</span>?"
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Terapias Invisibles ──────────────────────────────────────────────────────
function TherapySection() {
  const navigate = useNavigate()

  const activities = [
    {
      emoji: '🍳',
      routine: 'Preparar el desayuno',
      therapy: 'Motricidad fina + lenguaje',
      color: 'from-orange-50 to-yellow-50',
      accent: 'bg-yellow-warm',
    },
    {
      emoji: '🧦',
      routine: 'Ponerse los calcetines',
      therapy: 'Autonomía + secuencias',
      color: 'from-blue-50 to-sky-50',
      accent: 'bg-blue-soft',
    },
    {
      emoji: '🛒',
      routine: 'Ir al supermercado',
      therapy: 'Cognición + socialización',
      color: 'from-green-50 to-teal-50',
      accent: 'bg-teal-400',
    },
    {
      emoji: '🎨',
      routine: 'Jugar con plastilina',
      therapy: 'Coordinación + creatividad',
      color: 'from-purple-50 to-pink-50',
      accent: 'bg-purple-400',
    },
    {
      emoji: '🚿',
      routine: 'La rutina del baño',
      therapy: 'Sensorial + memoria',
      color: 'from-sky-50 to-blue-50',
      accent: 'bg-sky-400',
    },
    {
      emoji: '📚',
      routine: 'Hora del cuento',
      therapy: 'Lenguaje + comprensión',
      color: 'from-amber-50 to-orange-50',
      accent: 'bg-amber-400',
    },
  ]

  return (
    <section id="como-funciona" className="bg-beige-soft py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="reveal text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-light text-blue-soft text-xs font-medium mb-4">
            Terapias Invisibles
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-800 font-light mb-4">
            Tu hogar ya es un espacio terapéutico.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Jiwasa toma cada momento de tu día y lo convierte en
            una actividad guiada, sencilla y pensada por terapeutas reales.
          </p>
        </div>

        {/* Activity cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {activities.map(({ emoji, routine, therapy, color, accent }, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} group bg-gradient-to-br ${color} rounded-3xl p-5 border border-white card-hover cursor-pointer`}
              onClick={() => navigate('/library')}
            >
              <div className="text-3xl mb-3">{emoji}</div>
              <p className="text-sm font-semibold text-gray-700 mb-1 leading-snug">{routine}</p>
              <div className="flex items-center gap-1.5 mt-3">
                <div className={`w-2 h-2 rounded-full ${accent}`} />
                <p className="text-[11px] text-gray-500">{therapy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center mt-10">
          <button
            onClick={() => navigate('/library')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-soft/30 text-blue-soft text-sm font-medium hover:bg-blue-soft hover:text-white transition-all duration-200"
          >
            Ver toda la biblioteca de actividades
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const navigate = useNavigate()

  const steps = [
    {
      num: '01',
      title: 'Cuéntanos sobre tu hijo',
      desc: 'Completas un perfil breve. Edad, fortalezas, áreas a trabajar. Solo toma 3 minutos.',
      icon: '👶',
    },
    {
      num: '02',
      title: 'Recibe actividades del día',
      desc: 'Cada mañana ves 3 actividades adaptadas. Simples, claras, con videos cortos de guía.',
      icon: '☀️',
    },
    {
      num: '03',
      title: 'Las haces en casa',
      desc: 'Sin materiales especiales. Todo lo que necesitas ya está en tu hogar.',
      icon: '🏠',
    },
    {
      num: '04',
      title: 'Registras con un tap',
      desc: 'Al finalizar, marcas cómo fue. Tu terapeuta recibe el reporte en tiempo real.',
      icon: '✅',
    },
  ]

  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="reveal text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-gray-800 font-light">
            Simple como debe ser.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-12 right-12 h-px bg-gradient-to-r from-blue-light via-yellow-warm/40 to-blue-light" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map(({ num, title, desc, icon }, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} flex flex-col items-center md:items-start text-center md:text-left`}>
                <div className="relative mb-5 w-16 h-16 rounded-2xl bg-white border-2 border-blue-light shadow-card flex items-center justify-center text-2xl z-10">
                  {icon}
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-soft text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal text-center mt-14">
          <button
            onClick={() => navigate('/onboarding')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-soft to-blue-mid text-white font-medium shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            Empezar en 3 minutos
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function Benefits() {
  const items = [
    {
      icon: '🧠',
      title: 'Diseñado por terapeutas',
      desc: 'Cada actividad fue creada y validada por especialistas en síndrome de Down.',
    },
    {
      icon: '📱',
      title: 'Siempre en tu bolsillo',
      desc: 'Accede desde cualquier dispositivo. Sin descargas. Sin complicaciones.',
    },
    {
      icon: '📊',
      title: 'Progreso visible',
      desc: 'Ve el avance de tu hijo semana a semana con reportes claros y emocionales.',
    },
    {
      icon: '🤝',
      title: 'Conectado con tu terapeuta',
      desc: 'Tu especialista recibe reportes y ajusta las actividades en tiempo real.',
    },
    {
      icon: '💛',
      title: 'Sin culpa, con calma',
      desc: 'Cada pequeño paso cuenta. Jiwasa celebra el proceso, no solo los resultados.',
    },
    {
      icon: '🔒',
      title: 'Privacidad total',
      desc: 'Los datos de tu familia son tuyos. Nunca los compartimos con terceros.',
    },
  ]

  return (
    <section id="beneficios" className="bg-beige-soft py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="reveal text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-yellow-light text-yellow-mid text-xs font-medium mb-4">
            Por qué Jiwasa
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-800 font-light">
            Todo pensado para vosotros.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} bg-white rounded-3xl p-6 border border-beige-mid shadow-soft card-hover`}
            >
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      quote: 'Jamás pensé que preparar la merienda juntos iba a ser terapia. Ahora es nuestro momento favorito del día.',
      name: 'Elena M.',
      role: 'Mamá de Nicolás, 6 años',
      avatar: 'E',
      color: '#4A90E2',
    },
    {
      quote: 'El terapeuta recibe todo. Yo solo hago las actividades y me doy cuenta que mi hijo mejora. Sin más estrés.',
      name: 'Andrés R.',
      role: 'Papá de Sofía, 4 años',
      avatar: 'A',
      color: '#F4C542',
    },
    {
      quote: 'Llevaba meses sintiéndome culpable por no poder hacer más. Jiwasa me devolvió la esperanza.',
      name: 'Carmen V.',
      role: 'Mamá de Lucas, 8 años',
      avatar: 'C',
      color: '#7BC8A4',
    },
  ]

  return (
    <section id="testimonios" className="bg-white py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="reveal text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-gray-800 font-light">
            Familias que ya lo viven.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, avatar, color }, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} bg-beige-soft rounded-3xl p-7 border border-beige-mid card-hover relative`}
            >
              {/* Quote mark */}
              <div className="absolute top-5 right-6 font-display text-5xl text-gray-100 leading-none">"</div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6 relative z-10">
                {quote}
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                  style={{ background: color }}
                >
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{name}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="reveal mt-14 grid grid-cols-3 gap-4">
          {[
            { num: '94%', label: 'de padres reportan menos estrés' },
            { num: '3×', label: 'más constancia que la terapia tradicional' },
            { num: '240+', label: 'familias en Bolivia' },
          ].map(({ num, label }, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-light text-gradient-blue">{num}</p>
              <p className="text-xs text-gray-500 mt-1 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const navigate = useNavigate()

  return (
    <section className="relative py-24 px-5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-soft via-blue-mid to-[#1a4a8a]" />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-yellow-warm/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="reveal">
          <p className="text-yellow-warm text-sm font-medium mb-4 tracking-wide">
            Sin tarjeta de crédito · Sin compromisos
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-light leading-tight mb-6">
            Empieza hoy.
            <span className="block italic opacity-80 mt-1">Tu hijo ya está listo.</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto">
            Miles de minutos de terapia esperan dentro de
            tu cocina, tu baño y tu sala de estar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/onboarding')}
              className="px-8 py-4 rounded-full bg-yellow-warm text-gray-900 font-semibold text-base hover:bg-yellow-mid transition-all duration-200 shadow-lg hover:-translate-y-0.5"
            >
              Comenzar gratis ahora
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-full border border-white/30 text-white text-base font-medium hover:bg-white/10 transition-all duration-200"
            >
              Ya tengo cuenta
            </button>
          </div>

          <p className="mt-8 text-white/40 text-xs">
            Disponible en Bolivia · Desarrollado con terapeutas certificados
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-white border-t border-beige-mid px-5 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">J</span>
              </div>
              <span className="font-display text-xl text-gray-800">Jiwasa</span>
            </div>
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
              Convirtiendo rutinas cotidianas en oportunidades terapéuticas para familias de niños con síndrome de Down.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3 text-sm text-gray-500">
            <button onClick={() => navigate('/library')} className="text-left hover:text-gray-800 transition-colors">Biblioteca</button>
            <button onClick={() => navigate('/community')} className="text-left hover:text-gray-800 transition-colors">Comunidad</button>
            <button onClick={() => navigate('/chat')} className="text-left hover:text-gray-800 transition-colors">Chat</button>
            <button onClick={() => navigate('/therapist')} className="text-left hover:text-gray-800 transition-colors">Terapeutas</button>
            <button onClick={() => navigate('/login')} className="text-left hover:text-gray-800 transition-colors">Iniciar sesión</button>
            <button onClick={() => navigate('/onboarding')} className="text-left hover:text-gray-800 transition-colors">Registrarse</button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-beige-mid flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© 2025 Jiwasa. Hecho con 💛 para familias bolivianas.</p>
          <p>PMV universitario · Versión 1.0</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  useReveal()

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSection />
      <TherapySection />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  )
}