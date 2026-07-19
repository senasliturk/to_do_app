import { useState } from 'react'
import type { FormEvent } from 'react'

interface TodoFormProps {
  onAdd: (title: string) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Yeni görev ekle..."
        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-violet-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-violet-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-violet-700 active:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!title.trim()}
      >
        Ekle
      </button>
    </form>
  )
}
