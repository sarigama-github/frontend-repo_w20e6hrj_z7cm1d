import React, { useState } from 'react'
import GlassCard from './GlassCard'

function Tag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-xs mr-2 mb-2">
      {label}
      {onRemove && (
        <button type="button" onClick={onRemove} className="hover:text-rose-900">×</button>
      )}
    </span>
  )
}

function CommissionForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [client, setClient] = useState('')
  const [price, setPrice] = useState('')
  const [due, setDue] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [brief, setBrief] = useState('')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const addTag = () => {
    const t = tagInput.trim()
    if (!t) return
    setTags([...tags, t])
    setTagInput('')
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let clientId = null
      if (client) {
        const resClient = await fetch(`${baseUrl}/api/clients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_name: client })
        })
        const dataClient = await resClient.json()
        clientId = dataClient.id
      }

      const payload = {
        title,
        client_id: clientId,
        status: 'New',
        price: price ? parseFloat(price) : null,
        currency: 'EUR',
        tags,
        brief,
        due_date: due ? new Date(due).toISOString() : null
      }

      const res = await fetch(`${baseUrl}/api/commissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Échec de la création')
      setTitle(''); setClient(''); setPrice(''); setDue(''); setTags([]); setBrief('')
      onCreated && onCreated()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard title="Nouvelle commission" description="Ajoute une nouvelle carte au board.">
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-rose-700/80">Titre</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full mt-1 rounded-xl border border-rose-200 bg-white/70 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300" placeholder="Ex: Portrait pastel" required />
        </div>
        <div>
          <label className="text-sm text-rose-700/80">Client</label>
          <input value={client} onChange={(e)=>setClient(e.target.value)} className="w-full mt-1 rounded-xl border border-rose-200 bg-white/70 px-3 py-2" placeholder="Nom ou @handle" />
        </div>
        <div>
          <label className="text-sm text-rose-700/80">Prix (€)</label>
          <input type="number" step="0.01" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full mt-1 rounded-xl border border-rose-200 bg-white/70 px-3 py-2" placeholder="Ex: 120" />
        </div>
        <div>
          <label className="text-sm text-rose-700/80">Échéance</label>
          <input type="date" value={due} onChange={(e)=>setDue(e.target.value)} className="w-full mt-1 rounded-xl border border-rose-200 bg-white/70 px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-rose-700/80">Tags</label>
          <div className="flex gap-2 mt-1">
            <input value={tagInput} onChange={(e)=>setTagInput(e.target.value)} className="flex-1 rounded-xl border border-rose-200 bg-white/70 px-3 py-2" placeholder="ajoute un tag et tape Entrée" onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); addTag(); }}} />
            <button type="button" onClick={addTag} className="rounded-xl bg-rose-500 text-white px-4 py-2 shadow active:translate-y-[1px]">Ajouter</button>
          </div>
          <div className="mt-2">
            {tags.map((t, i)=> (
              <Tag key={i} label={t} onRemove={()=> setTags(tags.filter((x,idx)=> idx!==i))} />
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-rose-700/80">Brief</label>
          <textarea value={brief} onChange={(e)=>setBrief(e.target.value)} rows={3} className="w-full mt-1 rounded-xl border border-rose-200 bg-white/70 px-3 py-2" placeholder="détails, refs, dimensions…" />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button disabled={loading} className="rounded-xl bg-rose-600 text-white px-5 py-2 shadow-lg shadow-rose-300/50 hover:translate-y-[-1px] active:translate-y-[1px] transition-all">
            {loading ? 'Envoi…' : 'Créer la carte'}
          </button>
        </div>
      </form>
    </GlassCard>
  )
}

export default CommissionForm
