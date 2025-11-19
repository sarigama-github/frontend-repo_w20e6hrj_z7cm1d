import React from 'react'

function GlassCard({ title, description, children, className = '' }) {
  return (
    <div className={`rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-xl shadow-rose-200/30 p-5 ${className}`}>
      {(title || description) && (
        <div className="mb-3">
          {title && <h3 className="text-rose-900 font-semibold text-lg">{title}</h3>}
          {description && <p className="text-rose-700/80 text-sm mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export default GlassCard
