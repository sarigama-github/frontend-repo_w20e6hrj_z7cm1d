import React from 'react'
import CozyGrid from './components/CozyGrid'
import Hero from './components/Hero'
import GlassCard from './components/GlassCard'
import CommissionForm from './components/CommissionForm'
import Kanban from './components/Kanban'

function App() {
  return (
    <CozyGrid>
      <Hero />
      <main className="relative z-10 max-w-6xl mx-auto px-6 -mt-10 md:-mt-16 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="new">
          <div className="md:col-span-2">
            <CommissionForm onCreated={null} />
          </div>
          <GlassCard title="Astuces cozy" description="Quelques idées pour t'organiser en douceur.">
            <ul className="list-disc list-inside text-rose-800/80 text-sm space-y-2">
              <li>Crée des tags pour retrouver tes styles ou clients favoris.</li>
              <li>Découpe en étapes: croquis → couleur → rendu final.</li>
              <li>Ajoute des notes à chaque commission pour garder la vibe.</li>
            </ul>
          </GlassCard>
        </div>
        <Kanban />
        <footer className="text-center py-8 text-rose-700/70">
          Fait avec amour • Cozy Desk
        </footer>
      </main>
    </CozyGrid>
  )
}

export default App
