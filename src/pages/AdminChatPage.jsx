import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FAMILIES_CHAT = [
  { id: 1, name: 'Laura García (Nicolás)', avatar: 'L', color: 'from-blue-soft to-[#3b82c8]', unread: 2, lastMsg: '¡Logró decir una palabra! 💛', lastTime: '9:05 AM' },
  { id: 2, name: 'Marco López (Sofía)', avatar: 'M', color: 'from-yellow-warm to-amber-400', unread: 0, lastMsg: 'No quiso hacer la actividad', lastTime: 'Ayer' },
  { id: 3, name: 'Carmen Quispe (Diego)', avatar: 'C', color: 'from-green-400 to-teal-400', unread: 1, lastMsg: '¿Podemos usar plastilina?', lastTime: 'Ayer' },
]

const MESSAGES_DB = {
  1: [
    { id: 1, from: 'familia', text: 'Hola, ¿cómo estuvo Nicolás esta semana?', time: 'Ayer · 2:14 PM' },
    { id: 2, from: 'admin', text: 'Hola Laura, ha mostrado excelente progreso en motricidad fina. ¡Felicitaciones! 🎉', time: 'Ayer · 2:15 PM' },
    { id: 3, from: 'familia', text: '¡Excelente! Estamos muy contentos', time: 'Ayer · 2:20 PM' },
    { id: 4, from: 'admin', text: 'Para hoy: practicar agarre con cuchara, no más de 5 minutos.', time: 'Hoy · 8:30 AM' },
    { id: 5, from: 'familia', text: '¡Logró decir una palabra nueva esta mañana! Dijo "agua" solito 💛', time: 'Hoy · 9:05 AM' },
  ],
  2: [
    { id: 1, from: 'admin', text: 'Hola Marco, ¿cómo estuvo Sofía esta semana?', time: 'Hace 4 días' },
    { id: 2, from: 'familia', text: 'No quiso hacer la actividad hoy, estuvo muy distraída', time: 'Ayer' },
  ],
  3: [
    { id: 1, from: 'admin', text: 'Diego avanza muy bien en coordinación. ¡Felicitaciones!', time: 'Hace 2 días' },
    { id: 2, from: 'familia', text: '¿Está bien si usamos plastilina en lugar de arcilla?', time: 'Ayer' },
  ],
}

const QUICK_REPLIES = [
  '¡Lo están haciendo muy bien! 👍',
  'Intenten nuevamente mañana 🌱',
  'Reduzcan el tiempo a 5 minutos ⏱️',
  'Les enviaré un ejemplo pronto 📎',
  '¡Excelente avance! 🎉',
  'Ajustemos la actividad ✓',
]

function MessageBubble({ msg }) {
  const isMine = msg.from === 'admin'
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[78%] flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 shadow-soft ${isMine ? 'bg-gradient-to-br from-blue-soft to-blue-mid rounded-3xl rounded-tr-lg' : 'bg-white border border-beige-mid rounded-3xl rounded-tl-lg'}`}>
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

function QuickReplySheet({ onSelect, onClose }) {
  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 z-20 animate-fade-in">
      <div className="mx-3 bg-white rounded-2xl border border-beige-mid shadow-card p-3">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Respuestas rápidas</p>
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

function ChatPanel({ family, onBack }) {
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
    setMessages(prev => [...prev, { id: Date.now(), from: 'admin', text: text.trim(), time: now() }])
    setInputText('')
    setShowQuickReplies(false)
    setSending(true)
    setTimeout(() => setSending(false), 800)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="glass border-b border-white/60 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="lg:hidden w-8 h-8 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500">←</button>
        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${family.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-soft`}>
          {family.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800">{family.name}</p>
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
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-soft/60 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
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
              placeholder="Escribe un mensaje..."
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

export default function AdminChatPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedFamily, setSelectedFamily] = useState(null)
  const [visible, setVisible] = useState(false)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const familiaId = parseInt(searchParams.get('familia')) || 1
    setSelectedFamily(FAMILIES_CHAT.find(f => f.id === familiaId) || FAMILIES_CHAT[0])
    setShowChat(true)
    setTimeout(() => setVisible(true), 80)
  }, [searchParams])

  const totalUnread = FAMILIES_CHAT.reduce((acc, f) => acc + f.unread, 0)

  return (
    <div className={`min-h-screen bg-beige-soft flex flex-col transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ height: '100dvh' }}>

      {/* Top Bar */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-3 flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button onClick={() => { if (showChat) { setShowChat(false); return }; navigate('/admin') }} className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-500 hover:border-blue-soft/40 transition-all flex-shrink-0">
            ←
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-gray-800 text-sm">Mensajes</h1>
            {totalUnread > 0 && <span className="px-2 py-0.5 rounded-full bg-blue-soft text-white text-[10px] font-semibold">{totalUnread}</span>}
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex-1 flex overflow-hidden max-w-5xl mx-auto w-full">

        {/* Sidebar */}
        <aside className={`flex-shrink-0 border-r border-beige-mid bg-white/70 backdrop-blur-sm w-full lg:w-80 ${showChat ? 'hidden lg:flex' : 'flex'} flex-col`}>
          <div className="px-4 py-4 border-b border-beige-mid/60">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Familias ({FAMILIES_CHAT.length})
            </p>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {FAMILIES_CHAT.map(family => {
              const isSelected = selectedFamily?.id === family.id
              return (
                <button
                  key={family.id}
                  onClick={() => { setSelectedFamily(family); setShowChat(true) }}
                  className={`w-full flex items-start gap-3 px-4 py-3.5 transition-all ${isSelected ? 'bg-blue-light/60 border-r-2 border-blue-soft' : 'hover:bg-beige-soft/80'}`}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${family.color} flex items-center justify-center text-white font-bold shadow-soft`}>
                      {family.avatar}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800">{family.name}</p>
                      <p className="text-[10px] text-gray-300 flex-shrink-0 ml-2">{family.lastTime}</p>
                    </div>
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
        </aside>

        {/* Chat main */}
        <main className={`flex-1 flex flex-col min-h-0 ${showChat ? 'flex' : 'hidden lg:flex'}`}>
          {selectedFamily ? (
            <ChatPanel family={selectedFamily} onBack={() => setShowChat(false)} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
              <div className="text-5xl">💬</div>
              <p className="font-semibold text-gray-700">Selecciona una familia</p>
              <p className="text-sm text-gray-400">Elige una familia para ver el chat.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}