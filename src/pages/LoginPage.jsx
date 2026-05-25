import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const roles = [
  {
    id: 'familia',
    emoji: '🏠',
    label: 'Familia',
    desc: 'Quiero actividades para mi hijo',
    color: 'border-blue-soft bg-blue-light',
    activeRing: 'ring-2 ring-blue-soft ring-offset-2',
    dot: 'bg-blue-soft',
    route: '/onboarding',
  },
  {
    id: 'terapeuta',
    emoji: '🧑‍⚕️',
    label: 'Terapeuta',
    desc: 'Gestiono familias y actividades',
    color: 'border-yellow-warm/40 bg-yellow-light',
    activeRing: 'ring-2 ring-yellow-warm ring-offset-2',
    dot: 'bg-yellow-warm',
    route: '/therapist',
  },
  {
    id: 'admin',
    emoji: '🏫',
    label: 'Institución',
    desc: 'Administro el sistema',
    color: 'border-purple-200 bg-purple-50',
    activeRing: 'ring-2 ring-purple-400 ring-offset-2',
    dot: 'bg-purple-400',
    route: '/admin',
  },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('familia')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)

  const selectedRole = roles.find(r => r.id === selected)

  const handleContinue = (method) => {
    setLoading(true)
    setTimeout(() => {
      navigate(selectedRole.route)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-mesh flex flex-col">
      {/* Header */}
      <div className="px-5 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center shadow-soft">
            <span className="text-white font-display font-bold text-sm">J</span>
          </div>
          <span className="font-display text-xl text-gray-800">Jiwasa</span>
        </Link>
        <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          ← Volver
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
        <div
          className="w-full max-w-md animate-fade-up"
          style={{ animationFillMode: 'forwards' }}
        >
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl sm:text-4xl text-gray-800 font-light leading-tight mb-2">
              Bienvenido de vuelta.
            </h1>
            <p className="text-gray-400 text-sm">¿Cómo entras hoy?</p>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3 text-center">
              Soy...
            </p>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelected(role.id)
                    setShowEmailForm(false)
                  }}
                  className={`
                    relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200
                    ${selected === role.id
                      ? `${role.color} ${role.activeRing}`
                      : 'border-gray-100 bg-white hover:border-gray-200'
                    }
                  `}
                >
                  <div className="text-2xl">{role.emoji}</div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-700">{role.label}</p>
                  </div>
                  {selected === role.id && (
                    <span className={`absolute top-2 right-2 w-2 h-2 rounded-full ${role.dot}`} />
                  )}
                </button>
              ))}
            </div>
            {/* Role description */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-400 transition-all duration-200">
                {selectedRole.desc}
              </p>
            </div>
          </div>

          {/* Login card */}
          <div className="bg-white rounded-3xl shadow-card border border-beige-mid p-6">

            {/* Google button */}
            {!loading && (
              <>
                <button
                  onClick={() => handleContinue('google')}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 group"
                >
                  {/* Google icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Continuar con Google
                  </span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-300">o</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Email toggle */}
                {!showEmailForm ? (
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="w-full py-3.5 rounded-2xl border-2 border-gray-100 text-sm font-medium text-gray-600 hover:border-blue-soft/30 hover:text-blue-soft transition-all duration-200"
                  >
                    Continuar con email
                  </button>
                ) : (
                  <div className="space-y-3 animate-fade-in">
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/40 transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-soft/40 transition-colors"
                    />
                    <button
                      onClick={() => handleContinue('email')}
                      className="w-full py-3.5 rounded-2xl bg-blue-soft text-white text-sm font-medium hover:bg-blue-mid transition-all duration-200"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-8 gap-4 animate-fade-in">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-light" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-blue-soft animate-spin" />
                </div>
                <p className="text-sm text-gray-400">Entrando a tu espacio...</p>
              </div>
            )}
          </div>

          {/* Register link */}
          {!loading && (
            <p className="text-center text-xs text-gray-400 mt-5">
              ¿Primera vez?{' '}
              <button
                onClick={() => navigate('/onboarding')}
                className="text-blue-soft font-medium hover:underline"
              >
                Crear cuenta gratis
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 text-center">
        <p className="text-[10px] text-gray-300">
          Jiwasa · Tus datos son seguros y privados
        </p>
      </div>
    </div>
  )
}