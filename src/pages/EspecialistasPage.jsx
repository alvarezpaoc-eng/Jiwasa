import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const USER = {
  name: 'Laura',
  childName: 'Nicolás',
  avatar: 'L',
}

const THERAPIST = {
  name: 'Dra. Ana Torres',
  role: 'Lenguaje y Comunicación',
  avatar: 'A',
  avatarColor: 'from-blue-soft to-[#3b82c8]',
  status: 'Responde en menos de 2 horas',
  online: true,
}

const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Motivado',    key: 'motivado',   color: 'bg-green-50 border-green-200 text-green-600' },
  { emoji: '😐', label: 'Distraído',   key: 'distraido',  color: 'bg-yellow-light border-yellow-warm/40 text-yellow-mid' },
  { emoji: '😢', label: 'Frustrado',   key: 'frustrado',  color: 'bg-blue-light border-blue-soft/30 text-blue-soft' },
  { emoji: '😴', label: 'Cansado',     key: 'cansado',    color: 'bg-gray-50 border-gray-200 text-gray-500' },
  { emoji: '💥', label: 'Muy inquieto',key: 'inquieto',   color: 'bg-orange-50 border-orange-200 text-orange-500' },
]

const QUICK_REPLIES = [
  { text: 'Lo están haciendo muy bien 👍', emoji: '👍' },
  { text: 'Intenten nuevamente mañana 🌱', emoji: '🌱' },
  { text: 'Reduzcan el tiempo a 5 minutos', emoji: '⏱️' },
  { text: 'Les enviaré un ejemplo pronto', emoji: '📎' },
  { text: '¡Excelente avance! 🎉', emoji: '🎉' },
]

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 'therapist',
    type: 'text',
    text: 'Hola Laura 👋 Ya revisé el reporte de ayer. Nicolás está mostrando avances reales en seguimiento visual. ¡Siguen haciendo un trabajo increíble!',
    time: 'Ayer · 3:14 PM',
    read: true,
  },
  {
    id: 2,
    from: 'therapist',
    type: 'recommendation',
    text: 'Para hoy les recomiendo practicar el ejercicio de agarre con la cuchara durante el desayuno. No más de 5 minutos.',
    emoji: '🥄',
    time: 'Ayer · 3:15 PM',
    read: true,
  },
  {
    id: 3,
    from: 'parent',
    type: 'mood',
    mood: { emoji: '😊', label: 'Motivado' },
    text: 'Estado de Nicolás hoy',
    time: 'Hoy · 8:42 AM',
    read: true,
  },
  {
    id: 4,
    from: 'parent',
    type: 'text',
    text: '¡Logró decir una palabra nueva esta mañana! Dijo "agua" solito cuando quería beber 💛',
    time: 'Hoy · 9:05 AM',
    read: true,
  },
  {
    id: 5,
    from: 'therapist',
    type: 'quickreply',
    text: '¡Excelente avance! 🎉',
    time: 'Hoy · 10:22 AM',
    read: true,
  },
]

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

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

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ msg, showAvatar }) {
  const isParent = msg.from === 'parent'

  if (msg.type === 'mood') {
    return (
      <div className="flex justify-center my-2">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-beige-mid shadow-soft">
          <span className="text-lg">{msg.mood.emoji}</span>
          <div>
            <p className="text-[11px] font-semibold text-gray-600">Estado de {USER.childName}</p>
            <p className="text-[10px] text-gray-400">{msg.mood.label} · {msg.time}</p>
          </div>
        </div>
      </div>
    )
  }

  if (msg.type === 'recommendation') {
    return (
      <div className="flex justify-start mb-3">
        {showAvatar ? (
          <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${THERAPIST.avatarColor} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 mr-2 mt-1`}>
            {THERAPIST.avatar}
          </div>
        ) : <div className="w-7 mr-2" />}
        <div className="max-w-[78%]">
          <div className="bg-yellow-light/80 border border-yellow-warm/30 rounded-3xl rounded-tl-lg px-4 py-3 shadow-soft">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">{msg.emoji}</span>
              <p className="text-[10px] font-semibold text-yellow-mid uppercase tracking-wide">Recomendación</p>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">{msg.text}</p>
          </div>
          <p className="text-[10px] text-gray-300 mt-1 ml-1">{msg.time}</p>
        </div>
      </div>
    )
  }

  if (msg.type === 'audio') {
    return (
      <div className={`flex ${isParent ? 'justify-end' : 'justify-start'} mb-3`}>
        {!isParent && showAvatar ? (
          <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${THERAPIST.avatarColor} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 mr-2 mt-1`}>
            {THERAPIST.avatar}
          </div>
        ) : !isParent ? <div className="w-7 mr-2" /> : null}
        <div className="max-w-[72%]">
          <div className={`px-4 py-3 rounded-3xl shadow-soft flex items-center gap-3 ${
            isParent
              ? 'bg-gradient-to-br from-blue-soft to-blue-mid rounded-tr-lg'
              : 'bg-white border border-beige-mid rounded-tl-lg'
          }`}>
            <button className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
              isParent ? 'bg-white/20' : 'bg-blue-light'
            }`}>
              <span className="text-sm">▶</span>
            </button>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 22 }).map((_, i) => (
                <div key={i} className={`rounded-full ${isParent ? 'bg-white/50' : 'bg-blue-soft/40'}`}
                  style={{ width: '2px', height: `${5 + Math.sin(i * 0.9) * 4}px` }} />
              ))}
            </div>
            <span className={`text-[10px] flex-shrink-0 ${isParent ? 'text-white/70' : 'text-gray-400'}`}>
              {msg.duration}
            </span>
          </div>
          <p className={`text-[10px] text-gray-300 mt-1 ${isParent ? 'text-right mr-1' : 'ml-1'}`}>{msg.time}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isParent ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isParent && showAvatar ? (
        <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${THERAPIST.avatarColor} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 mr-2 mt-1`}>
          {THERAPIST.avatar}
        </div>
      ) : !isParent ? <div className="w-7 mr-2" /> : null}

      <div className={`max-w-[78%] ${isParent ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-4 py-3 shadow-soft ${
          isParent
            ? 'bg-gradient-to-br from-blue-soft to-blue-mid rounded-3xl rounded-tr-lg'
            : msg.type === 'quickreply'
              ? 'bg-gradient-to-br from-yellow-warm/30 to-yellow-light border border-yellow-warm/30 rounded-3xl rounded-tl-lg'
              : 'bg-white border border-beige-mid rounded-3xl rounded-tl-lg'
        }`}>
          <p className={`text-sm leading-relaxed ${isParent ? 'text-white' : 'text-gray-700'}`}>
            {msg.text}
          </p>
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isParent ? 'mr-1' : 'ml-1'}`}>
          <p className="text-[10px] text-gray-300">{msg.time}</p>
          {isParent && <span className="text-[10px] text-blue-soft">✓✓</span>}
        </div>
      </div>
    </div>
  )
}

// ─── Mood Picker Modal ────────────────────────────────────────────────────────

function MoodPickerModal({ onClose, onSend }) {
  const [selected, setSelected] = useState(null)
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl shadow-card p-6 pb-8 animate-fade-in">
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5" />
        <p className="text-sm font-semibold text-gray-800 mb-1">¿Cómo estuvo {USER.childName} hoy?</p>
        <p className="text-xs text-gray-400 mb-5">Ayuda a la terapeuta a entender mejor su día</p>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {MOOD_OPTIONS.map(m => (
            <button
              key={m.key}
              onClick={() => setSelected(m)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 ${
                selected?.key === m.key
                  ? m.color + ' scale-105 shadow-soft'
                  : 'border-beige-mid bg-beige-soft/50 hover:border-blue-soft/30'
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-[10px] font-medium text-center leading-tight text-gray-600">{m.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => selected && onSend(selected)}
          disabled={!selected}
          className="w-full py-3.5 rounded-2xl bg-blue-soft text-white text-sm font-semibold transition-all duration-200 disabled:opacity-40 hover:bg-blue-mid shadow-soft"
        >
          Enviar estado emocional
        </button>
      </div>
    </div>
  )
}

// ─── Ayuda Modal ──────────────────────────────────────────────────────────────

function AyudaModal({ onClose, onSend }) {
  const [text, setText] = useState('')
  const options = [
    { emoji: '😰', label: 'Tuvo una crisis' },
    { emoji: '🚫', label: 'No quiere participar' },
    { emoji: '😓', label: 'Estoy muy frustrada' },
    { emoji: '❓', label: 'No sé qué hacer' },
  ]
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl shadow-card p-6 pb-8 animate-fade-in">
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5" />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-xl">
            🆘
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Necesito ayuda</p>
            <p className="text-xs text-gray-400">La Dra. Torres recibirá tu mensaje de forma prioritaria</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {options.map(o => (
            <button
              key={o.label}
              onClick={() => setText(o.label)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border text-xs font-medium transition-all ${
                text === o.label
                  ? 'border-rose-300 bg-rose-50 text-rose-600'
                  : 'border-beige-mid bg-beige-soft/50 text-gray-600 hover:border-rose-200'
              }`}
            >
              <span>{o.emoji}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="O escribe lo que está pasando..."
          rows={2}
          className="w-full resize-none rounded-2xl border border-beige-mid bg-beige-soft/50 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-blue-soft/50 transition-all mb-3"
        />
        <button
          onClick={() => text.trim() && onSend(text)}
          disabled={!text.trim()}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-400 to-rose-400 text-white text-sm font-semibold disabled:opacity-40 transition-all shadow-soft"
        >
          Enviar mensaje prioritario
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EspecialistasPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState('')
  const [visible, setVisible] = useState(false)
  const [showMoodPicker, setShowMoodPicker] = useState(false)
  const [showAyuda, setShowAyuda] = useState(false)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSecs, setRecordingSecs] = useState(0)
  const [sentConfirm, setSentConfirm] = useState(null)
  const messagesEndRef = useRef(null)
  const recordingTimer = useRef(null)

  useEffect(() => {
    setTimeout(() => setVisible(true), 60)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const now = () => {
    const d = new Date()
    return `Hoy · ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() < 12 ? 'AM' : 'PM'}`
  }

  const addMessage = (msg) => {
    const newMsg = { id: Date.now(), time: now(), read: false, ...msg }
    setMessages(prev => [...prev, newMsg])
    setSentConfirm(newMsg.id)
    setTimeout(() => setSentConfirm(null), 1500)
    // Simulate therapist response after 2s for certain types
    if (msg.type === 'mood' || msg.text?.includes('crisis') || msg.type === 'audio') {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          from: 'therapist',
          type: 'text',
          text: msg.type === 'mood'
            ? `Gracias por compartir cómo está ${USER.childName} hoy. Eso me ayuda mucho a preparar las actividades 💛`
            : 'Recibí tu mensaje. Lo reviso ahora mismo y te respondo pronto 🙏',
          time: now(),
          read: true,
        }])
      }, 2000)
    }
  }

  const sendText = () => {
    if (!inputText.trim()) return
    addMessage({ from: 'parent', type: 'text', text: inputText.trim() })
    setInputText('')
  }

  const sendMood = (mood) => {
    addMessage({ from: 'parent', type: 'mood', mood, text: `Estado de ${USER.childName}` })
    setShowMoodPicker(false)
  }

  const sendAyuda = (text) => {
    addMessage({ from: 'parent', type: 'text', text: `🆘 ${text}` })
    setShowAyuda(false)
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingSecs(0)
    recordingTimer.current = setInterval(() => {
      setRecordingSecs(s => {
        if (s >= 59) { stopRecording(); return 60 }
        return s + 1
      })
    }, 1000)
  }

  const stopRecording = () => {
    clearInterval(recordingTimer.current)
    setIsRecording(false)
    addMessage({
      from: 'parent',
      type: 'audio',
      duration: `0:${String(recordingSecs || 5).padStart(2, '0')}`,
      text: '',
    })
    setRecordingSecs(0)
  }

  return (
    <div className="min-h-screen bg-beige-soft flex flex-col">

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500 hover:border-blue-soft/40 hover:text-blue-soft transition-all flex-shrink-0"
          >←</button>

          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${THERAPIST.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-soft`}>
            {THERAPIST.avatar}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-800">{THERAPIST.name}</p>
              {THERAPIST.online && (
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              )}
            </div>
            <p className="text-[11px] text-gray-400 truncate">{THERAPIST.status}</p>
          </div>

          {/* SOS button */}
          <button
            onClick={() => setShowAyuda(true)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 text-white text-[11px] font-semibold shadow-soft hover:opacity-90 transition-opacity"
          >
            <span>🆘</span>
            <span className="hidden sm:inline">Ayuda</span>
          </button>
        </div>
      </div>

      {/* ── Context Banner ─────────────────────────────────────── */}
      <div className={`max-w-lg mx-auto w-full px-5 pt-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="relative bg-gradient-to-br from-blue-soft via-[#3b82c8] to-blue-mid rounded-3xl p-5 overflow-hidden shadow-card mb-4">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-6 translate-x-6" />
          <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-yellow-warm/20 translate-y-4 -translate-x-4" />
          <div className="relative z-10 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💬</span>
            <div>
              <p className="text-white font-semibold text-sm leading-snug mb-0.5">
                Espacio de acompañamiento terapéutico
              </p>
              <p className="text-white/70 text-xs leading-relaxed">
                Comparte cómo está {USER.childName}, tus dudas o avances. Aquí no hay preguntas pequeñas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Messages Feed ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="max-w-lg mx-auto">

          {/* Date separator */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-beige-mid" />
            <span className="text-[10px] text-gray-300 font-medium px-2">Esta semana</span>
            <div className="flex-1 h-px bg-beige-mid" />
          </div>

          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`transition-all duration-500 ${
                sentConfirm === msg.id ? 'opacity-100 scale-100' : 'opacity-100'
              }`}
            >
              <MessageBubble
                msg={msg}
                showAvatar={
                  msg.from === 'therapist' &&
                  (i === 0 || messages[i - 1]?.from !== 'therapist')
                }
              />
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Quick Actions Row ──────────────────────────────────── */}
      <div className="max-w-lg mx-auto w-full px-5 py-2">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { emoji: '😊', label: 'Estado de hoy', action: () => setShowMoodPicker(true) },
            { emoji: '🍳', label: 'Hizo la actividad', action: () => { addMessage({ from: 'parent', type: 'text', text: '✅ Completó la actividad de hoy' }) } },
            { emoji: '❓', label: 'Tengo una duda', action: () => setInputText('Tengo una duda sobre ') },
            { emoji: '🎉', label: 'Logro nuevo', action: () => setInputText('¡Hoy logró ') },
          ].map(({ emoji, label, action }) => (
            <button
              key={label}
              onClick={action}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-beige-mid text-xs font-medium text-gray-600 hover:border-blue-soft/40 hover:text-blue-soft hover:bg-blue-light/30 transition-all duration-200 shadow-soft"
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Attach Menu ───────────────────────────────────────── */}
      {showAttachMenu && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setShowAttachMenu(false)} />
          <div className="max-w-lg mx-auto w-full px-5 relative z-40">
            <div className="bg-white rounded-2xl border border-beige-mid shadow-card p-3 mb-2 grid grid-cols-4 gap-2 animate-fade-in">
              {[
                { emoji: '📷', label: 'Foto', action: () => { addMessage({ from: 'parent', type: 'text', text: '📷 [Foto adjunta de Nicolás realizando la actividad]' }); setShowAttachMenu(false) } },
                { emoji: '🎥', label: 'Video', action: () => { addMessage({ from: 'parent', type: 'text', text: '🎥 [Video de 20s – Nicolás con la cuchara]' }); setShowAttachMenu(false) } },
                { emoji: '😊', label: 'Estado', action: () => { setShowAttachMenu(false); setShowMoodPicker(true) } },
                { emoji: '🆘', label: 'Ayuda', action: () => { setShowAttachMenu(false); setShowAyuda(true) } },
              ].map(({ emoji, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-beige-soft hover:bg-blue-light/50 transition-colors"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-[10px] text-gray-500 font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Input Bar ─────────────────────────────────────────── */}
      <div className="glass border-t border-white/60 px-4 py-3 pb-20">
        <div className="max-w-lg mx-auto flex items-end gap-2">

          {/* Attach */}
          <button
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              showAttachMenu
                ? 'bg-blue-soft border-blue-soft text-white'
                : 'bg-white border-beige-mid text-gray-400 hover:border-blue-soft/40'
            }`}
          >
            <span className="text-lg leading-none">＋</span>
          </button>

          {/* Text input OR recording */}
          {isRecording ? (
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-rose-50 border border-rose-200 rounded-2xl">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse flex-shrink-0" />
              <p className="text-xs text-rose-500 font-medium flex-1">
                Grabando… 0:{String(recordingSecs).padStart(2, '0')} / 1:00
              </p>
              <button onClick={stopRecording} className="text-[11px] font-semibold text-rose-500 hover:text-rose-700">
                Detener
              </button>
            </div>
          ) : (
            <div className="flex-1 flex items-end gap-2 bg-white border border-beige-mid rounded-2xl px-3 py-2 focus-within:border-blue-soft/50 focus-within:ring-2 focus-within:ring-blue-soft/10 transition-all">
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText() } }}
                placeholder="Escribe un mensaje…"
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-gray-700 placeholder-gray-300 focus:outline-none leading-relaxed max-h-24 overflow-y-auto"
                style={{ minHeight: '24px' }}
              />
            </div>
          )}

          {/* Audio / Send */}
          {inputText.trim() ? (
            <button
              onClick={sendText}
              className="w-10 h-10 rounded-full bg-blue-soft flex items-center justify-center text-white flex-shrink-0 hover:bg-blue-mid transition-colors shadow-soft"
            >
              <span className="text-sm">→</span>
            </button>
          ) : (
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                isRecording
                  ? 'bg-rose-400 scale-110 shadow-lg'
                  : 'bg-white border border-beige-mid text-gray-400 hover:border-blue-soft/40 hover:text-blue-soft'
              }`}
            >
              <span className="text-base">🎙</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────────── */}
      {showMoodPicker && (
        <MoodPickerModal onClose={() => setShowMoodPicker(false)} onSend={sendMood} />
      )}
      {showAyuda && (
        <AyudaModal onClose={() => setShowAyuda(false)} onSend={sendAyuda} />
      )}

      <BottomNav active="/chat" />
    </div>
  )
}