import { useMemo, useState } from 'react'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { useTodos } from '../hooks/useTodos'

type Filter = 'all' | 'active' | 'completed'

export function HomePage() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [todos, filter])

  const remaining = todos.filter((todo) => !todo.completed).length

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:py-16">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            Todo App
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            React + TypeScript + Tailwind CSS · LocalStorage
          </p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <TodoForm onAdd={addTodo} />

          <div className="mt-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>{remaining} görev bekliyor</span>
            <div className="flex gap-1">
              {(['all', 'active', 'completed'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  className={`rounded-md px-3 py-1 font-medium transition ${
                    filter === option
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  {option === 'all' ? 'Tümü' : option === 'active' ? 'Aktif' : 'Tamamlanan'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          </div>
        </section>

        <p className="text-center text-xs text-slate-400 dark:text-slate-600">
          Çift tıklayarak veya "Düzenle" ile görevi güncelleyebilirsiniz.
        </p>
      </div>
    </main>
  )
}
