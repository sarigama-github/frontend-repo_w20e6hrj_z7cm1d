import React, { useEffect, useState } from 'react'
import GlassCard from './GlassCard'

const columns = [
  { key: 'New', title: 'Nouveau' },
  { key: 'Sketch', title: 'Croquis' },
  { key: 'In Progress', title: 'En cours' },
  { key: 'Review', title: 'Revue' },
  { key: 'Delivered', title: 'Livré' },
]

function CommissionCard({ c }) {
  return (
    <div className="rounded-2xl bg-white/80 border border-white/60 p-3 shadow-sm hover:shadow-rose-200/60 transition-all">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-rose-900 truncate">{c.title}</h4>
        {c.price != null && <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">{c.price}€</span>}
      </div>
      {c.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {c.tags.map((t, i)=> (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">{t}</span>
          ))}
        </div>
      )}
      {c.due_date && (
        <p className="mt-2 text-xs text-rose-700/70">Échéance: {new Date(c.due_date).toLocaleDateString()}</p>
      )}
    </div>
  )}

function Kanban() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchAll = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/commissions`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ fetchAll() },[])

  return (
    <div id="board">
      <GlassCard title="Board" description="Ton pipeline visuel — tout doux, tout pastel." className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {columns.map(col => (
            <div key={col.key} className="rounded-2xl bg-rose-50/60 border border-rose-100 p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-rose-700 font-semibold">{col.title}</h3>
                <div className="text-xs text-rose-500/80">
                  {items.filter(i => i.status === col.key).length}
                </div>
              </div>
              <div className="space-y-2 min-h-[80px]">
                {loading ? (
                  <div className="h-10 rounded-xl bg-white/60 animate-pulse" />
                ) : (
                  items.filter(i => i.status === col.key).map(c => (
                    <CommissionCard key={c.id} c={c} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <button onClick={fetchAll} className="inline-flex items-center rounded-xl bg-white text-rose-700 px-4 py-2 shadow hover:translate-y-[-1px] active:translate-y-[1px] transition-all">Rafraîchir</button>
        </div>
      </GlassCard>
    </div>
  )
}

export default Kanban
