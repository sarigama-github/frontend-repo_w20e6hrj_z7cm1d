import React from 'react'
import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/fA4LwfT7IUUelEGO/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-full px-4 py-1 shadow-sm text-rose-500 font-medium mb-4">
          ✨ Cozy Desk for Artists
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-rose-900 drop-shadow-sm">
          Organise tes commissions avec douceur
        </h1>
        <p className="mt-4 text-rose-700/80 text-lg md:text-xl">
          Un espace pastel, tout arrondi, comme un journal numérique. Garde le suivi, les étapes et les clients — sans stress.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="#new" className="inline-flex items-center justify-center rounded-xl bg-rose-500 text-white px-5 py-3 shadow-lg shadow-rose-300/50 hover:translate-y-[-1px] active:translate-y-[1px] transition-all">
            + Nouvelle commission
          </a>
          <a href="#board" className="inline-flex items-center justify-center rounded-xl bg-white text-rose-700 px-5 py-3 shadow hover:translate-y-[-1px] active:translate-y-[1px] transition-all">
            Voir le board
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-50 via-rose-50/40 to-transparent" />
    </section>
  )
}

export default Hero
