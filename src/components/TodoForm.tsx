import { useState } from 'react'
import type { FormEvent } from 'react'

interface TodoFormProps {
  onAdd: (title: string) => void
  onDone?: () => void
  autoFocus?: boolean
}

export function TodoForm({ onAdd, onDone, autoFocus }: TodoFormProps) {
  const [title, setTitle] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
    onDone?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        autoFocus={autoFocus}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Yeni görev ekle..."
        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-amber-500"
      />
      <button
        type="submit"
        className="rounded-xl bg-teal-500 px-5 py-3 font-semibold text-white shadow-sm shadow-teal-500/30 transition hover:bg-teal-600 active:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!title.trim()}
      >
        Ekle
      </button>
    </form>
  )
}
