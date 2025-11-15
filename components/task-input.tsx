'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface TaskInputProps {
  onAdd: (title: string) => void
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input.trim())
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Agregar una nueva tarea..."
          className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Agregar</span>
        </button>
      </div>
    </form>
  )
}
