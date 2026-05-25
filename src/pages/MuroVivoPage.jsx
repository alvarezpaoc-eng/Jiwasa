import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── DATOS MOCK ───────────────────────────────────────────────────────────────

const FRASES_ROTATIVAS = [
  'Los procesos no son lineales. 🌊',
  'Un mal día no borra todo el avance. 💛',
  'Pedir ayuda también es amor. 🤍',
  'Los pequeños pasos también cuentan. 🌱',
  'Hoy hiciste lo que pudiste. Eso es suficiente. ✨',
  'La constancia es más poderosa que la perfección. 🏡',
]

const PLACEHOLDERS_PUBLICAR = [
  '¿Cómo estuvo hoy tu pequeño?',
  '¿Qué pequeño logro quieres recordar hoy?',
  '¿Cómo te sentiste hoy como mamá o papá?',
  '¿Qué momento de hoy quieres guardar?',
]

const CATEGORIAS_POST = [
  { id: 'avance',     emoji: '✨', label: 'Celebrar avance',      color: 'bg-yellow-light border-yellow-warm/40 text-yellow-mid' },
  { id: 'dificultad', emoji: '🌧',  label: 'Compartir dificultad', color: 'bg-blue-50 border-blue-200 text-blue-400' },
  { id: 'apoyo',      emoji: '💛', label: 'Necesito apoyo',        color: 'bg-pink-50 border-pink-200 text-pink-400' },
  { id: 'momento',    emoji: '📸', label: 'Compartir momento',     color: 'bg-green-50 border-green-200 text-green-500' },
  { id: 'consejo',    emoji: '🧠', label: 'Consejo útil',          color: 'bg-purple-50 border-purple-200 text-purple-500' },
]

const FILTROS = [
  { id: 'all',        emoji: '🌸', label: 'Todo' },
  { id: 'avance',     emoji: '✨', label: 'Avances' },
  { id: 'apoyo',      emoji: '💛', label: 'Apoyo' },
  { id: 'dificultad', emoji: '🌧',  label: 'Días difíciles' },
  { id: 'consejo',    emoji: '🧠', label: 'Consejos' },
  { id: 'momento',    emoji: '📸', label: 'Momentos' },
]

const PROMPTS_GUIADOS = [
  { texto: '¿Cuál fue un pequeño avance esta semana?',   categoria: 'avance' },
  { texto: '¿Qué actividad funcionó mejor hoy?',          categoria: 'consejo' },
  { texto: '¿Qué te hubiera gustado escuchar hoy?',       categoria: 'apoyo' },
  { texto: '¿Qué momento cotidiano quieres recordar?',    categoria: 'momento' },
  { texto: '¿Qué fue lo más difícil de esta semana?',     categoria: 'dificultad' },
]

const REACCIONES = [
  { emoji: '💛', label: 'Te abrazo' },
  { emoji: '🌱', label: 'Qué lindo' },
  { emoji: '✨', label: 'Sigue así' },
  { emoji: '🤍', label: 'Te entiendo' },
]

// Publicaciones mock iniciales
const POSTS_INICIALES = [
  {
    id: 1,
    alias: 'Mamá de Sofía',
    avatarEmoji: '🌻',
    avatarColor: 'from-yellow-300 to-amber-300',
    tiempo: 'Hace 12 minutos',
    categoria: 'avance',
    texto: 'Hoy Sofía se puso los zapatos sola por primera vez. Tardó 8 minutos pero lo hizo. Lloré de alegría. 💛',
    reacciones: { '💛': 14, '🌱': 9, '✨': 7, '🤍': 3 },
    comentarios: [
      { alias: 'Papá de Mateo', texto: '¡Qué hermoso momento! Los 8 minutos no importan, lo que importa es que lo logró. 🌱', avatarEmoji: '🌿' },
      { alias: 'Mamá de Andrés', texto: 'Eso merece celebración enorme. Cada paso es un mundo. 💛', avatarEmoji: '🌸' },
    ],
    showComments: false,
    anonimo: false,
  },
  {
    id: 2,
    alias: 'Una mamá del grupo',
    avatarEmoji: '🌙',
    avatarColor: 'from-blue-300 to-indigo-300',
    tiempo: 'Hace 1 hora',
    categoria: 'dificultad',
    texto: 'Hoy fue un día muy difícil. No quisimos hacer ninguna actividad. Solo abrazamos mucho. ¿A alguien más le pasan días así?',
    reacciones: { '💛': 31, '🌱': 4, '✨': 2, '🤍': 22 },
    comentarios: [
      { alias: 'Mamá de Tomás', texto: 'Todos los días. Y abrazar también es terapia. De verdad. 🤍', avatarEmoji: '🦋' },
    ],
    showComments: false,
    anonimo: true,
  },
  {
    id: 3,
    alias: 'Papá de Lucas',
    avatarEmoji: '🌊',
    avatarColor: 'from-teal-300 to-cyan-300',
    tiempo: 'Hace 3 horas',
    categoria: 'consejo',
    texto: 'Descubrimos que Lucas aprende mejor cuando lo hacemos cantando. Inventamos una canción para lavarse los dientes y ahora pide hacerlo solo. No lo hubiera creído si no lo veo. 🎵',
    reacciones: { '💛': 8, '🌱': 19, '✨': 24, '🤍': 6 },
    comentarios: [
      { alias: 'Mamá de Camila', texto: 'Lo voy a probar con Camila esta noche. Gracias por compartirlo ✨', avatarEmoji: '🌺' },
      { alias: 'Lic. Carlos Méndez', texto: 'Esto es exactamente lo que llamamos "aprendizaje multimodal". ¡Excelente instinto! 🧠', avatarEmoji: '🧑‍⚕️' },
    ],
    showComments: false,
    anonimo: false,
  },
  {
    id: 4,
    alias: 'Mamá de Valentina',
    avatarEmoji: '🌸',
    avatarColor: 'from-pink-300 to-rose-300',
    tiempo: 'Ayer',
    categoria: 'momento',
    texto: 'Hicimos juntas la ensalada del almuerzo. Tardamos el doble y quedó un poco rara pero estuvo deliciosa. Eso fue todo. 🥗',
    reacciones: { '💛': 18, '🌱': 12, '✨': 15, '🤍': 5 },
    comentarios: [],
    showComments: false,
    anonimo: false,
  },
  {
    id: 5,
    alias: 'Alguien del grupo',
    avatarEmoji: '🕊️',
    avatarColor: 'from-gray-200 to-slate-200',
    tiempo: 'Ayer',
    categoria: 'apoyo',
    texto: 'Me siento muy sola en esto. Mi familia no entiende el proceso. ¿Cómo lo manejan ustedes?',
    reacciones: { '💛': 47, '🌱': 3, '✨': 2, '🤍': 38 },
    comentarios: [
      { alias: 'Mamá de Sofía', texto: 'Aquí estamos. No estás sola. De verdad. 💛', avatarEmoji: '🌻' },
      { alias: 'Papá de Lucas', texto: 'A nosotros nos pasó igual al principio. Con tiempo, algunos entienden. Y los que no entienden... aprendemos a no necesitar esa validación. 🤍', avatarEmoji: '🌊' },
    ],
    showComments: false,
    anonimo: true,
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getCategoryStyle(id) {
  return CATEGORIAS_POST.find(c => c.id === id) ?? CATEGORIAS_POST[0]
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

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
                isActive ? 'bg-pink-50' : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className={`text-[10px] font-medium ${isActive ? 'text-pink-400' : 'text-gray-400'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ─── PostCard ─────────────────────────────────────────────────────────────────

function PostCard({ post, onReact, onToggleComments, onAddComment, delay = 0 }) {
  const [commentText, setCommentText] = useState('')
  const cat = getCategoryStyle(post.categoria)

  const handleSendComment = () => {
    if (!commentText.trim()) return
    onAddComment(post.id, commentText.trim())
    setCommentText('')
  }

  return (
    <div
      className="bg-white rounded-3xl border border-beige-mid shadow-soft overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Accent strip */}
      <div className={`h-1 w-full bg-gradient-to-r ${
        post.categoria === 'avance'     ? 'from-yellow-300 to-amber-300' :
        post.categoria === 'dificultad' ? 'from-blue-300 to-cyan-300' :
        post.categoria === 'apoyo'      ? 'from-pink-300 to-rose-300' :
        post.categoria === 'momento'    ? 'from-green-300 to-teal-300' :
                                          'from-purple-300 to-indigo-300'
      }`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${post.avatarColor} flex items-center justify-center text-xl flex-shrink-0`}>
            {post.avatarEmoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-gray-800 leading-snug">{post.alias}</p>
              {post.anonimo && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 font-medium">
                  🔒 anónimo
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${cat.color}`}>
                {cat.emoji} {cat.label}
              </span>
              <span className="text-[10px] text-gray-300">{post.tiempo}</span>
            </div>
          </div>
        </div>

        {/* Texto */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.texto}</p>

        {/* Reacciones */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {REACCIONES.map(({ emoji, label }) => {
            const count = post.reacciones[emoji] ?? 0
            return (
              <button
                key={emoji}
                onClick={() => onReact(post.id, emoji)}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-beige-soft border border-beige-mid hover:border-pink-200 hover:bg-pink-50 transition-all duration-200"
                title={label}
              >
                <span className="text-base group-hover:scale-110 transition-transform duration-150">{emoji}</span>
                {count > 0 && (
                  <span className="text-[11px] font-semibold text-gray-400 group-hover:text-pink-400 transition-colors">
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Comentarios toggle */}
        <button
          onClick={() => onToggleComments(post.id)}
          className="text-[11px] text-gray-400 hover:text-blue-soft transition-colors font-medium"
        >
          {post.showComments
            ? 'Cerrar comentarios'
            : `${post.comentarios.length > 0 ? `${post.comentarios.length} respuesta${post.comentarios.length !== 1 ? 's' : ''} · ` : ''}Responder`}
        </button>

        {/* Comentarios expandidos */}
        {post.showComments && (
          <div className="mt-3 pt-3 border-t border-beige-mid space-y-3 animate-fade-in">
            {post.comentarios.map((c, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-beige-soft border border-beige-mid flex items-center justify-center text-sm flex-shrink-0">
                  {c.avatarEmoji}
                </div>
                <div className="flex-1 bg-beige-soft rounded-2xl rounded-tl-sm px-3 py-2">
                  <p className="text-[11px] font-semibold text-gray-600 mb-0.5">{c.alias}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.texto}</p>
                </div>
              </div>
            ))}

            {/* Input nuevo comentario */}
            <div className="flex gap-2.5 mt-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                L
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendComment()}
                  placeholder="Escribe algo bonito…"
                  className="flex-1 text-xs px-3 py-2 rounded-xl bg-beige-soft border border-beige-mid focus:outline-none focus:border-blue-soft/40 placeholder-gray-300 text-gray-600 transition-colors"
                />
                <button
                  onClick={handleSendComment}
                  disabled={!commentText.trim()}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    commentText.trim()
                      ? 'bg-blue-light text-blue-soft hover:bg-blue-soft hover:text-white'
                      : 'bg-beige-soft text-gray-300 cursor-not-allowed'
                  }`}
                >
                  💛
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── MuroVivoPage ─────────────────────────────────────────────────────────────

export default function MuroVivoPage() {
  const navigate = useNavigate()

  const [visible,        setVisible]        = useState(false)
  const [posts,          setPosts]           = useState(POSTS_INICIALES)
  const [filtro,         setFiltro]          = useState('all')
  const [fraseIdx,       setFraseIdx]        = useState(0)
  const [showComposer,   setShowComposer]    = useState(false)
  const [postText,       setPostText]        = useState('')
  const [postCategoria,  setPostCategoria]   = useState('avance')
  const [postAnonimo,    setPostAnonimo]     = useState(false)
  const [postPublished,  setPostPublished]   = useState(false)
  const [placeholderIdx] = useState(Math.floor(Math.random() * PLACEHOLDERS_PUBLICAR.length))
  const composerRef = useRef(null)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  // Rotar frases cada 4s
  useEffect(() => {
    const t = setInterval(() => {
      setFraseIdx(i => (i + 1) % FRASES_ROTATIVAS.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  // Scroll al composer cuando se abre
  useEffect(() => {
    if (showComposer) {
      setTimeout(() => composerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [showComposer])

  const postsFiltrados = filtro === 'all'
    ? posts
    : posts.filter(p => p.categoria === filtro)

  const handleReact = (postId, emoji) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, reacciones: { ...p.reacciones, [emoji]: (p.reacciones[emoji] ?? 0) + 1 } }
        : p
    ))
  }

  const handleToggleComments = (postId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, showComments: !p.showComments } : p
    ))
  }

  const handleAddComment = (postId, texto) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, comentarios: [...p.comentarios, { alias: 'Laura', texto, avatarEmoji: '🌻' }] }
        : p
    ))
  }

  const handlePublish = () => {
    if (!postText.trim()) return
    const cat = getCategoryStyle(postCategoria)
    const nuevo = {
      id: Date.now(),
      alias: postAnonimo ? 'Alguien del grupo' : 'Laura',
      avatarEmoji: postAnonimo ? '🕊️' : '🌻',
      avatarColor: postAnonimo ? 'from-gray-200 to-slate-200' : 'from-yellow-300 to-amber-300',
      tiempo: 'Ahora mismo',
      categoria: postCategoria,
      texto: postText.trim(),
      reacciones: { '💛': 0, '🌱': 0, '✨': 0, '🤍': 0 },
      comentarios: [],
      showComments: false,
      anonimo: postAnonimo,
    }
    setPosts(prev => [nuevo, ...prev])
    setPostText('')
    setPostCategoria('avance')
    setPostAnonimo(false)
    setShowComposer(false)
    setPostPublished(true)
    setTimeout(() => setPostPublished(false), 3500)
  }

  const handlePrompt = (prompt) => {
    setPostText(prompt.texto + ' ')
    setPostCategoria(prompt.categoria)
    setShowComposer(true)
  }

  return (
    <div className="min-h-screen bg-beige-soft pb-28">

      {/* ── Header ───────────────────────────────────────────────── */}
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
            <span className="text-sm font-semibold text-gray-700">Muro Vivo</span>
          </div>

          {/* Escudo de privacidad */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-green-50 border border-green-200">
            <span className="text-xs">🔒</span>
            <span className="text-[10px] font-semibold text-green-600">Seguro</span>
          </div>
        </div>
      </div>

      <div
        className={`max-w-lg mx-auto px-5 pt-6 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >

        {/* ── 1. Hero emocional ──────────────────────────────────── */}
        <section className="mb-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 shadow-card p-6">
            {/* Blobs decorativos */}
            <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/10 -translate-y-6 translate-x-6" />
            <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-yellow-warm/20 translate-y-4 -translate-x-4" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">❤️</span>
                <span className="text-white/70 text-xs font-medium">
                  {posts.length} familias compartiendo hoy
                </span>
              </div>
              <h1 className="text-white font-semibold text-2xl leading-tight mb-1">
                Aquí nadie<br />está solo.
              </h1>
              <p className="text-white/70 text-xs mb-5 leading-relaxed">
                Cada pequeño avance merece ser celebrado.<br />
                Este es un espacio seguro y respetuoso.
              </p>
              <button
                onClick={() => setShowComposer(true)}
                className="w-full py-3.5 rounded-2xl bg-white text-pink-500 font-semibold text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
              >
                Compartir mi día ✨
              </button>
            </div>
          </div>
        </section>

        {/* ── 2. Composer ────────────────────────────────────────── */}
        {showComposer && (
          <section ref={composerRef} className="mb-6 animate-fade-in">
            <div className="bg-white rounded-3xl border border-pink-100 shadow-soft overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-pink-300 to-rose-300" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-700">Compartir con el grupo</p>
                  <button
                    onClick={() => setShowComposer(false)}
                    className="text-gray-300 hover:text-gray-500 text-lg leading-none transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Categorías */}
                <p className="text-[11px] text-gray-400 mb-2 font-medium">¿Qué quieres compartir?</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {CATEGORIAS_POST.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setPostCategoria(cat.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-all duration-200 ${
                        postCategoria === cat.id
                          ? cat.color + ' scale-105'
                          : 'bg-beige-soft border-transparent text-gray-400 hover:border-beige-mid'
                      }`}
                    >
                      {cat.emoji} {cat.label}
                    </button>
                  ))}
                </div>

                {/* Textarea */}
                <textarea
                  value={postText}
                  onChange={e => setPostText(e.target.value)}
                  placeholder={PLACEHOLDERS_PUBLICAR[placeholderIdx]}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-beige-soft border border-beige-mid text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-200 focus:ring-2 focus:ring-pink-50 transition-all duration-200 resize-none leading-relaxed"
                />

                {/* Opciones */}
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => setPostAnonimo(!postAnonimo)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
                      postAnonimo
                        ? 'bg-gray-100 border-gray-200 text-gray-600'
                        : 'bg-beige-soft border-transparent text-gray-400 hover:border-beige-mid'
                    }`}
                  >
                    <span>🔒</span>
                    <span>{postAnonimo ? 'Anónimo activado' : 'Publicar anónimo'}</span>
                  </button>

                  <button
                    onClick={handlePublish}
                    disabled={!postText.trim()}
                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      postText.trim()
                        ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-soft hover:-translate-y-0.5'
                        : 'bg-beige-mid text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Compartir 💛
                  </button>
                </div>

                {/* Nota de privacidad */}
                <p className="text-[10px] text-gray-300 text-center mt-3 leading-relaxed">
                  🔒 Solo familias verificadas en Jiwasa pueden leer esto.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── 3. Frase rotativa ─────────────────────────────────── */}
        <section className="mb-5">
          <div className="px-4 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-light to-pink-50 border border-yellow-warm/20 text-center min-h-[3rem] flex items-center justify-center">
            <p
              key={fraseIdx}
              className="text-sm font-medium text-gray-600 leading-relaxed transition-opacity duration-500"
            >
              {FRASES_ROTATIVAS[fraseIdx]}
            </p>
          </div>
        </section>

        {/* ── 4. Prompts guiados ─────────────────────────────────── */}
        <section className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            ¿No sabes qué compartir?
          </p>
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {PROMPTS_GUIADOS.map((p, i) => (
              <button
                key={i}
                onClick={() => handlePrompt(p)}
                className="flex-shrink-0 max-w-[180px] bg-white rounded-2xl border border-beige-mid shadow-soft p-3 text-left hover:border-pink-200 hover:shadow-md transition-all duration-200 card-hover"
              >
                <span className="text-lg block mb-1.5">
                  {getCategoryStyle(p.categoria).emoji}
                </span>
                <p className="text-[11px] text-gray-500 leading-snug">{p.texto}</p>
              </button>
            ))}
          </div>
        </section>

        {/* ── 5. Filtros emocionales ─────────────────────────────── */}
        <section className="mb-5">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {FILTROS.map(({ id, emoji, label }) => (
              <button
                key={id}
                onClick={() => setFiltro(id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium transition-all duration-200 ${
                  filtro === id
                    ? 'bg-pink-50 border-pink-200 text-pink-400 scale-105 shadow-soft'
                    : 'bg-white border-beige-mid text-gray-400 hover:border-gray-300'
                }`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </section>

        {/* ── 6. Posts ───────────────────────────────────────────── */}
        <section className="flex flex-col gap-4 mb-6">
          {postsFiltrados.length > 0
            ? postsFiltrados.map((post, i) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onReact={handleReact}
                  onToggleComments={handleToggleComments}
                  onAddComment={handleAddComment}
                  delay={i * 60}
                />
              ))
            : (
              <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-8 text-center">
                <div className="text-4xl mb-3">🌱</div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Todavía no hay publicaciones aquí
                </p>
                <p className="text-xs text-gray-400">Sé la primera familia en compartir algo 💛</p>
                <button
                  onClick={() => { setFiltro('all'); setShowComposer(true) }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-pink-50 text-pink-400 text-xs font-semibold hover:bg-pink-400 hover:text-white transition-all duration-200"
                >
                  Compartir algo
                </button>
              </div>
            )
          }
        </section>

        {/* ── 7. Bloque "No estás solo" ──────────────────────────── */}
        <section className="mb-6">
          <div className="bg-white rounded-3xl border border-beige-mid shadow-soft p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🤍</span>
              <p className="text-sm font-semibold text-gray-700">Recuerda siempre</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { emoji: '🌱', text: 'Los avances no son lineales. Eso está bien.' },
                { emoji: '💛', text: 'Tu esfuerzo diario tiene un valor enorme.' },
                { emoji: '🤍', text: 'Pedir ayuda también es fortaleza.' },
                { emoji: '✨', text: 'Los pequeños pasos también son progreso.' },
              ].map(({ emoji, text }, i) => (
                <div key={i} className="bg-beige-soft rounded-2xl p-3">
                  <span className="text-base block mb-1">{emoji}</span>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ── Toast de publicación exitosa ───────────────────────── */}
      {postPublished && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-card border border-green-100 px-5 py-3 flex items-center gap-3 max-w-xs">
            <span className="text-xl">💛</span>
            <div>
              <p className="text-sm font-semibold text-gray-700">Gracias por compartir</p>
              <p className="text-[11px] text-gray-400">Tu momento ya está en el muro</p>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="/community" />
    </div>
  )
}