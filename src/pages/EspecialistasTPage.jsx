import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const THERAPIST = {
  name: 'Lic. Wara Valdivia',
  role: 'Psicomotricidad',
  avatar: 'W',
}

const FAMILIES = [
  {
    id: 1, parentName: 'Laura', childName: 'Nicolás', avatar: 'L',
    avatarColor: 'from-blue-soft to-[#3b82c8]', status: 'activa',
    unread: 2, lastMsg: '¡Logró decir una palabra nueva! 💛', lastTime: '9:05 AM',
  },
  {
    id: 2, parentName: 'Marco', childName: 'Sofía', avatar: 'M',
    avatarColor: 'from-yellow-warm to-amber-400', status: 'riesgo',
    unread: 0, lastMsg: 'No quiso hacer la actividad hoy', lastTime: 'Ayer',
  },
  {
    id: 3, parentName: 'Carmen', childName: 'Diego', avatar: 'C',
    avatarColor: 'from-green-400 to-teal-400', status: 'activa',
    unread: 1, lastMsg: '¿Está bien si usamos plastilina?', lastTime: 'Ayer',
  },
  {
    id: 4, parentName: 'Pedro', childName: 'Valentina', avatar: 'P',
    avatarColor: 'from-purple-400 to-pink-400', status: 'inactiva',
    unread: 0, lastMsg: 'Sin mensajes recientes', lastTime: 'Hace 7d',
  },
]

const MESSAGES_DB = {
  1: [
    { id: 1, from: 'therapist', type: 'text', text: 'Hola Laura 👋 Nicolás mostró gran avance en equilibrio. ¡Sigan así!', time: 'Ayer · 3:14 PM' },
    { id: 2, from: 'therapist', type: 'recommendation', emoji: '🥄', text: 'Para hoy: practicar agarre con cuchara, no más de 5 minutos.', time: 'Ayer · 3:15 PM' },
    { id: 3, from: 'parent', type: 'mood', mood: { emoji: '😊', label: 'Motivado' }, text: 'Estado de Nicolás hoy', time: 'Hoy · 8:42 AM' },
    { id: 4, from: 'parent', type: 'text', text: '¡Logró decir una palabra nueva esta mañana! Dijo "agua" solito 💛', time: 'Hoy · 9:05 AM' },
  ],
  2: [
    { id: 1, from: 'therapist', type: 'text', text: 'Hola Marco, ¿cómo estuvo Sofía esta semana?', time: 'Hace 4 días' },
    { id: 2, from: 'parent', type: 'text', text: 'No quiso hacer la actividad hoy, estuvo muy distraída', time: 'Ayer' },
  ],
  3: [
    { id: 1, from: 'therapist', type: 'text', text: 'Diego avanza muy bien en coordinación. ¡Felicitaciones!', time: 'Hace 2 días' },
    { id: 2, from: 'parent', type: 'text', text: '¿Está bien si usamos plastilina en lugar de arcilla?', time: 'Ayer' },
  ],
  4: [
    { id: 1, from: 'therapist', type: 'text', text: 'Hola Pedro, ¿todo bien con Valentina?', time: 'Hace 7 días' },
  ],
}

const QUICK_REPLIES = [
  '¡Lo están haciendo muy bien! 👍',
  'Intenten nuevamente mañana 🌱',
  'Reduzcan el tiempo a 5 minutos ⏱️',
  'Les enviaré un ejemplo pronto 📎',
  '¡Excelente avance! 🎉',
  'Entendido, ajusto la actividad ✓',
]

const STATUS_CONFIG = {
  activa:   { dot: 'bg-green-400',  label: 'Activa' },
  riesgo:   { dot: 'bg-orange-400', label: 'Riesgo' },
  inactiva: { dot: 'bg-gray-300',   label: 'Inactiva' },
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ msg }) {
  const isMine = msg.from === 'therapist'

  if (msg.type === 'mood') {
    return (
      <div className="flex justify-center my-2">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-beige-mid shadow-soft">
          <span className="text-lg">{msg.mood.emoji}</span>
          <div>
            <p className="text-[11px] font-semibold text-gray-600">{msg.text}</p>
            <p className="text-[10px] text-gray-400">{msg.mood.label} · {msg.time}</p>
          </div>
        </div>
      </div>
    )
  }

  if (msg.type === 'recommendation') {
    return (
      <div className="flex justify-start mb-3">
        <div className="max-w-[80%]">
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

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[78%] flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 shadow-soft ${
          isMine
            ? 'bg-gradient-to-br from-blue-soft to-blue-mid rounded-3xl rounded-tr-lg'
            : 'bg-white border border-beige-mid rounded-3xl rounded-tl-lg'
        }`}>
          <p className={`text-sm leading-relaxed ${isMine ? 'text-white' : 'text-gray-700'}`}>
            {msg.text}
          </p>
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isMine ? 'mr-1' : 'ml-1'}`}>
          <p className="text-[10px] text-gray-300">{msg.time}</p>
          {isMine && <span className="text-[10px] text-blue-soft">✓✓</span>}
        </div>
      </div>
    </div>
  )
}

// ─── Quick Reply Sheet ────────────────────────────────────────────────────────

function QuickReplySheet({ onSelect, onClose }) {
  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 z-20 animate-fade-in">
      <div className="mx-3 bg-white rounded-2xl border border-beige-mid shadow-card p-3">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
          Respuestas rápidas
        </p>
        <div className="flex flex-col gap-1">
          {QUICK_REPLIES.map((r, i) => (
            <button
              key={i}
              onClick={() => onSelect(r)}
              className="text-left px-3 py-2 rounded-xl text-xs text-gray-700 hover:bg-blue-light/50 hover:text-blue-soft transition-colors"
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Chat Panel ───────────────────────────────────────────────────────────────

function ChatPanel({ family, onBack }) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState(MESSAGES_DB[family.id] || [])
  const [inputText, setInputText] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const now = () => {
    const d = new Date()
    return `Hoy · ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() < 12 ? 'AM' : 'PM'}`
  }

  const send = (text) => {
    if (!text?.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), from: 'therapist', type: 'text', text: text.trim(), time: now() }])
    setInputText('')
    setShowQuickReplies(false)
    setSending(true)
    setTimeout(() => setSending(false), 800)
  }

  const sendRecommendation = () => {
    setMessages(prev => [...prev, {
      id: Date.now(), from: 'therapist', type: 'recommendation', emoji: '💡',
      text: 'Practicar la actividad por 5–7 minutos. Recuerda hacer pausas si el niño muestra señales de cansancio.',
      time: now(),
    }])
  }

  const statusConf = STATUS_CONFIG[family.status]

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="glass border-b border-white/60 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="lg:hidden w-8 h-8 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500"
        >←</button>

        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${family.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-soft`}>
          {family.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-800">{family.childName}</p>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusConf.dot}`} />
          </div>
          <p className="text-[11px] text-gray-400">{family.parentName} · {statusConf.label}</p>
        </div>

        {/* Therapist actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={sendRecommendation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-light border border-yellow-warm/30 text-xs font-semibold text-yellow-mid hover:bg-yellow-warm/20 transition-colors"
          >
            <span>💡</span>
            <span className="hidden sm:inline">Recomendación</span>
          </button>
          <button
            onClick={() => navigate('/therapist/reportes')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-light border border-blue-soft/20 text-xs font-semibold text-blue-soft hover:bg-blue-soft hover:text-white transition-all"
          >
            <span>📋</span>
            <span className="hidden sm:inline">Reporte</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-beige-soft/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-beige-mid" />
          <span className="text-[10px] text-gray-300 font-medium px-2">Esta semana</span>
          <div className="flex-1 h-px bg-beige-mid" />
        </div>

        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {sending && (
          <div className="flex justify-end mb-3">
            <div className="px-4 py-3 bg-blue-light rounded-3xl rounded-tr-lg">
              <div className="flex gap-1 items-center">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-soft/60 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative flex-shrink-0">
        {showQuickReplies && (
          <QuickReplySheet onSelect={send} onClose={() => setShowQuickReplies(false)} />
        )}
        {showQuickReplies && <div className="fixed inset-0 z-10" onClick={() => setShowQuickReplies(false)} />}

        <div className="glass border-t border-white/60 px-4 py-3 flex items-end gap-2 relative z-20">
          <button
            onClick={() => setShowQuickReplies(!showQuickReplies)}
            className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
              showQuickReplies
                ? 'bg-blue-soft border-blue-soft text-white'
                : 'bg-white border-beige-mid text-gray-400 hover:border-blue-soft/40'
            }`}
          >
            <span className="text-sm">⚡</span>
          </button>

          <div className="flex-1 flex items-end gap-2 bg-white border border-beige-mid rounded-2xl px-3 py-2 focus-within:border-blue-soft/50 focus-within:ring-2 focus-within:ring-blue-soft/10 transition-all">
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(inputText) } }}
              placeholder={`Escribe a ${family.parentName}…`}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-gray-700 placeholder-gray-300 focus:outline-none leading-relaxed max-h-20 overflow-y-auto"
              style={{ minHeight: '24px' }}
            />
          </div>

          <button
            onClick={() => send(inputText)}
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-full bg-blue-soft flex items-center justify-center text-white flex-shrink-0 hover:bg-blue-mid transition-colors shadow-soft disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="text-sm">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EspecialistasTPage() {
  const navigate = useNavigate()
  const [selectedFamily, setSelectedFamily] = useState(FAMILIES[0])
  const [visible, setVisible] = useState(false)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const totalUnread = FAMILIES.reduce((acc, f) => acc + f.unread, 0)

  return (
    <div className={`min-h-screen bg-beige-soft flex flex-col transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ height: '100dvh' }}>

      {/* Top Bar */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-3 flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button
            onClick={() => {
              if (showChat) { setShowChat(false); return }
              navigate('/therapist')
            }}
            className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500 hover:border-blue-soft/40 transition-all flex-shrink-0"
          >←</button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-gray-800 text-sm">Mis Familias</h1>
              {totalUnread > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-soft text-white text-[10px] font-semibold">
                  {totalUnread}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">{THERAPIST.name} · {THERAPIST.role}</p>
          </div>

          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-soft to-yellow-warm flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">J</span>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex-1 flex overflow-hidden max-w-5xl mx-auto w-full">

        {/* Sidebar */}
        <aside className={`
          flex-shrink-0 border-r border-beige-mid bg-white/70 backdrop-blur-sm
          w-full lg:w-80
          ${showChat ? 'hidden lg:flex' : 'flex'}
          flex-col
        `}>
          <div className="px-4 py-4 border-b border-beige-mid/60 flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Familias asignadas
            </p>
            <span className="text-[10px] text-gray-400">{FAMILIES.length} familias</span>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {FAMILIES.map(family => {
              const stConf = STATUS_CONFIG[family.status]
              const isSelected = selectedFamily.id === family.id
              return (
                <button
                  key={family.id}
                  onClick={() => { setSelectedFamily(family); setShowChat(true) }}
                  className={`w-full flex items-start gap-3 px-4 py-3.5 transition-all duration-150 ${
                    isSelected
                      ? 'bg-blue-light/60 border-r-2 border-blue-soft'
                      : 'hover:bg-beige-soft/80'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${family.avatarColor} flex items-center justify-center text-white font-bold shadow-soft`}>
                      {family.avatar}
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${stConf.dot}`} />
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800">{family.childName}</p>
                      <p className="text-[10px] text-gray-300 flex-shrink-0 ml-2">{family.lastTime}</p>
                    </div>
                    <p className="text-[11px] text-gray-400 mb-0.5">{family.parentName}</p>
                    <p className="text-[11px] text-gray-500 truncate leading-snug">{family.lastMsg}</p>
                  </div>

                  {family.unread > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-soft text-white text-[10px] font-bold flex items-center justify-center">
                      {family.unread}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Sidebar footer */}
          <div className="border-t border-beige-mid p-3">
            <button
              onClick={() => navigate('/therapist/crear-actividad')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-soft text-white text-xs font-semibold hover:bg-blue-mid transition-all"
            >
              <span>✨</span> Crear actividad
            </button>
          </div>
        </aside>

        {/* Chat main */}
        <main className={`
          flex-1 flex flex-col min-h-0
          ${showChat ? 'flex' : 'hidden lg:flex'}
        `}>
          {selectedFamily ? (
            <ChatPanel
              family={selectedFamily}
              onBack={() => setShowChat(false)}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
              <div className="text-5xl">💬</div>
              <p className="font-semibold text-gray-700">Selecciona una familia</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Elige una familia de la lista para ver el historial y enviar mensajes.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}