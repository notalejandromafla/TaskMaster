'use client'

import { useState } from 'react'
import { Trash2, Check, Edit2, X, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Task {
  id: string
  title: string
  completed: boolean
}

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newTitle: string) => void
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)

  const handleEdit = () => {
    setIsEditing(true)
    setEditValue(task.title)
  }

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(task.id, editValue.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditValue(task.title)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm">
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          task.completed
            ? 'bg-primary border-primary'
            : 'border-border hover:border-primary'
        }`}
      >
        {task.completed && <Check className="h-4 w-4 text-primary-foreground" />}
      </button>

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            autoFocus
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            className="h-8 w-8 p-0"
            aria-label="Guardar"
          >
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="h-8 w-8 p-0"
            aria-label="Cancelar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 transition-all ${
              task.completed
                ? 'line-through text-muted-foreground'
                : 'text-foreground'
            }`}
          >
            {task.title}
          </span>

          <div className="flex items-center gap-1 opacity-0 transition-all group-hover:opacity-100">
            <button
              onClick={handleEdit}
              className="flex-shrink-0 text-muted-foreground transition-all hover:text-primary"
              aria-label="Editar tarea"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="flex-shrink-0 text-muted-foreground transition-all hover:text-destructive"
              aria-label="Eliminar tarea"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
