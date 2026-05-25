import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const INSTITUTION_CONFIG = {
  name: 'Instituto Esperanza',
  email: 'info@institutoeesperanza.edu.bo',
  phone: '+591 7123456789',
  location: 'La Paz, Bolivia',
  foundedYear: 2018,
  director: 'María Rodríguez García',
  website: 'www.institutoeesperanza.edu.bo',
}

const CONFIG_SECTIONS = [
  { id: 'basico', emoji: '🏢', label: 'Información básica', icon: '>' },
  { id: 'terapeutas', emoji: '🧑‍⚕️', label: 'Gestión de terapeutas', icon: '>' },
  { id: 'plan', emoji: '📋', label: 'Plan y facturación', icon: '>' },
  { id: 'notificaciones', emoji: '🔔', label: 'Notificaciones', icon: '>' },
  { id: 'privacidad', emoji: '🔒', label: 'Privacidad y datos', icon: '>' },
  { id: 'cuenta', emoji: '👤', label: 'Cuenta del administrador', icon: '>' },
]

function SettingItem({ label, value, editable = false, onEdit = () => {} }) {
  const [editing, setEditing] = useState(false)
  const [newValue, setNewValue] = useState(value)

  const handleSave = () => {
    setEditing(false)
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-beige-mid last:border-b-0">
      <div>
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</p>
        {!editing ? (
          <p className="text-sm text-gray-800 mt-1">{value}</p>
        ) : (
          <input
            type="text"
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
            className="mt-1 w-full px-2 py-1 rounded text-sm border border-beige-mid focus:outline-none focus:border-blue-soft"
          />
        )}
      </div>
      {editable && (
        <button
          onClick={() => {
            if (editing) handleSave()
            setEditing(!editing)
          }}
          className="text-xs font-semibold text-blue-soft hover:underline flex-shrink-0"
        >
          {editing ? '✓ Guardar' : '✏️ Editar'}
        </button>
      )}
    </div>
  )
}

function SectionCard({ section, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl border border-beige-mid shadow-soft p-4 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all text-left"
    >
      <div className="text-2xl flex-shrink-0">{section.emoji}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{section.label}</p>
      </div>
      <span className="text-gray-400 flex-shrink-0">{section.icon}</span>
    </button>
  )
}

export default function AdminConfigPage() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('general')
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  return (
    <div className={`min-h-screen bg-beige-soft pb-24 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Header */}
      <div className="sticky top-0 z-30 glass border-b border-white/60 px-5 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/admin')} className="w-9 h-9 rounded-full bg-white border border-beige-mid flex items-center justify-center text-gray-600 hover:border-blue-soft/40 transition-all">
            ←
          </button>
          <h1 className="font-semibold text-gray-800 text-sm">Configuración</h1>
          <div className="w-9 h-9" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* ════════════════════════════════════════════════════════
            GENERAL SETTINGS
        ════════════════════════════════════════════════════════ */}
        {activeSection === 'general' && (
          <>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Configuración General</p>
            <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-5 mb-6">
              <SettingItem label="Nombre de institución" value={INSTITUTION_CONFIG.name} editable />
              <SettingItem label="Email" value={INSTITUTION_CONFIG.email} editable />
              <SettingItem label="Teléfono" value={INSTITUTION_CONFIG.phone} editable />
              <SettingItem label="Ubicación" value={INSTITUTION_CONFIG.location} editable />
              <SettingItem label="Sitio web" value={INSTITUTION_CONFIG.website} editable />
              <SettingItem label="Año de fundación" value={INSTITUTION_CONFIG.foundedYear} editable={false} />
              <SettingItem label="Director" value={INSTITUTION_CONFIG.director} editable={false} />
            </div>

            <div className="bg-blue-light/30 border border-blue-soft/20 rounded-2xl p-4 mb-6">
              <p className="text-xs font-semibold text-blue-soft mb-2">💾 Guardar cambios</p>
              <button className="w-full py-2.5 rounded-xl bg-blue-soft text-white text-xs font-semibold hover:bg-blue-mid transition-all">
                Guardar configuración
              </button>
            </div>

            {/* Navigation to other sections */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Más opciones</p>
            <div className="grid gap-3">
              {CONFIG_SECTIONS.map(section => (
                <SectionCard key={section.id} section={section} onClick={() => setActiveSection(section.id)} />
              ))}
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════
            THERAPIST MANAGEMENT
        ════════════════════════════════════════════════════════ */}
        {activeSection === 'terapeutas' && (
          <>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Gestión de Terapeutas</p>

            <div className="grid gap-3 mb-6">
              {[
                { emoji: '👥', title: 'Ver equipo completo', desc: 'Gestiona todos los terapeutas' },
                { emoji: '➕', title: 'Agregar nuevo', desc: 'Invita terapeutas' },
                { emoji: '⏳', title: 'Invitaciones pendientes', desc: 'Revisa solicitudes' },
                { emoji: '🚫', title: 'Remover terapeuta', desc: 'Gestiona permisos' },
              ].map((item, i) => (
                <button key={i} className="bg-white rounded-2xl border border-beige-mid shadow-soft p-4 flex items-center gap-4 hover:border-blue-soft/40 hover:-translate-y-0.5 hover:shadow-md transition-all text-left">
                  <div className="text-2xl flex-shrink-0">{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-gray-400 flex-shrink-0">→</span>
                </button>
              ))}
            </div>

            <button onClick={() => setActiveSection('general')} className="w-full py-2.5 rounded-xl border border-beige-mid text-gray-700 text-xs font-semibold hover:bg-beige-soft transition-all">
              ← Atrás
            </button>
          </>
        )}

        {/* ════════════════════════════════════════════════════════
            PLAN & BILLING
        ════════════════════════════════════════════════════════ */}
        {activeSection === 'plan' && (
          <>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Plan y Facturación</p>

            <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-800">Institucional Pro</p>
                  <p className="text-xs text-gray-400">Plan actual</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-semibold">Activo</span>
              </div>

              <div className="border-t border-beige-mid pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">Familias</p>
                  <p className="text-sm font-semibold text-gray-800">52/100</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">Terapeutas</p>
                  <p className="text-sm font-semibold text-gray-800">8/15</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">Próximo pago</p>
                  <p className="text-sm font-semibold text-gray-800">15 de junio</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-5 mb-6">
              <p className="text-sm font-semibold text-gray-800 mb-3">Opciones de plan</p>
              {[
                { name: 'Institucional Pro', price: '$299/mes', features: ['Hasta 100 familias', '15 terapeutas', 'Reportes avanzados'] },
                { name: 'Institucional Premium', price: '$599/mes', features: ['Familias ilimitadas', '30 terapeutas', 'Análisis predictivo'] },
              ].map((plan, i) => (
                <button key={i} className="w-full text-left border border-beige-mid rounded-2xl p-3 mb-2 hover:border-blue-soft/40 hover:bg-blue-light/20 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">{plan.name}</p>
                    <p className="text-blue-soft font-semibold">{plan.price}</p>
                  </div>
                  <ul className="text-[10px] text-gray-500 space-y-1">
                    {plan.features.map((f, j) => <li key={j}>✓ {f}</li>)}
                  </ul>
                </button>
              ))}
            </div>

            <button onClick={() => setActiveSection('general')} className="w-full py-2.5 rounded-xl border border-beige-mid text-gray-700 text-xs font-semibold hover:bg-beige-soft transition-all">
              ← Atrás
            </button>
          </>
        )}

        {/* ════════════════════════════════════════════════════════
            NOTIFICATIONS
        ════════════════════════════════════════════════════════ */}
        {activeSection === 'notificaciones' && (
          <>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Preferencias de Notificación</p>

            <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-5 space-y-4 mb-6">
              {[
                { label: 'Nuevas familias', desc: 'Cuando se una una familia nueva', enabled: true },
                { label: 'Solicitudes de terapeutas', desc: 'Cuando un terapeuta solicite acceso', enabled: true },
                { label: 'Familias en riesgo', desc: 'Cuando hay inactividad prolongada', enabled: true },
                { label: 'Reportes completados', desc: 'Cuando un terapeuta envíe reportes', enabled: false },
                { label: 'Alertas de seguridad', desc: 'Intentos de acceso no autorizados', enabled: true },
              ].map((notif, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-beige-mid last:border-b-0">
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{notif.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{notif.desc}</p>
                  </div>
                  <label className="flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" defaultChecked={notif.enabled} className="w-4 h-4" />
                  </label>
                </div>
              ))}
            </div>

            <button onClick={() => setActiveSection('general')} className="w-full py-2.5 rounded-xl border border-beige-mid text-gray-700 text-xs font-semibold hover:bg-beige-soft transition-all">
              ← Atrás
            </button>
          </>
        )}

        {/* ════════════════════════════════════════════════════════
            PRIVACY & DATA
        ════════════════════════════════════════════════════════ */}
        {activeSection === 'privacidad' && (
          <>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Privacidad y Datos</p>

            <div className="space-y-4">
              {[
                { emoji: '📊', title: 'Exportar datos', desc: 'Descarga información de tu institución', color: 'bg-blue-light' },
                { emoji: '🗑️', title: 'Eliminar datos', desc: 'Solicita eliminación de registros', color: 'bg-orange-50' },
                { emoji: '🔐', title: 'Política de privacidad', desc: 'Lee nuestras políticas', color: 'bg-purple-50' },
              ].map((item, i) => (
                <button key={i} className={`w-full ${item.color} rounded-2xl p-4 flex items-center gap-4 hover:-translate-y-0.5 transition-all text-left border border-beige-mid`}>
                  <div className="text-2xl flex-shrink-0">{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-gray-400 flex-shrink-0">→</span>
                </button>
              ))}
            </div>

            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-orange-700 mb-3">⚠️ Zona de peligro</p>
              <button className="w-full py-2.5 rounded-xl border border-orange-300 text-orange-600 text-xs font-semibold hover:bg-orange-100 transition-all">
                Cerrar institución
              </button>
            </div>

            <button onClick={() => setActiveSection('general')} className="w-full py-2.5 rounded-xl border border-beige-mid text-gray-700 text-xs font-semibold hover:bg-beige-soft transition-all mt-4">
              ← Atrás
            </button>
          </>
        )}

        {/* ════════════════════════════════════════════════════════
            ACCOUNT
        ════════════════════════════════════════════════════════ */}
        {activeSection === 'cuenta' && (
          <>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Tu Cuenta</p>

            <div className="bg-white rounded-2xl border border-beige-mid shadow-soft p-5 mb-6">
              <SettingItem label="Nombre completo" value="María Rodríguez García" editable />
              <SettingItem label="Email" value="maria.rodriguez@jiwasa.io" editable={false} />
              <SettingItem label="Rol" value="Administradora de institución" editable={false} />
              <SettingItem label="Último acceso" value="Hace 2 minutos" editable={false} />
            </div>

            <button className="w-full py-2.5 rounded-xl bg-blue-light text-blue-soft text-xs font-semibold hover:bg-blue-soft hover:text-white transition-all mb-3">
              Cambiar contraseña
            </button>

            <button className="w-full py-2.5 rounded-xl border border-beige-mid text-gray-700 text-xs font-semibold hover:bg-beige-soft transition-all mb-6">
              Cerrar sesión
            </button>

            <button onClick={() => setActiveSection('general')} className="w-full py-2.5 rounded-xl border border-beige-mid text-gray-700 text-xs font-semibold hover:bg-beige-soft transition-all">
              ← Atrás
            </button>
          </>
        )}

      </div>
    </div>
  )
}