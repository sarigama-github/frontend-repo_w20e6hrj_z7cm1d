import React from 'react'

function CozyGrid({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      {children}
    </div>
  )
}

export default CozyGrid
