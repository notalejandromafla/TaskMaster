'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { AuthGuard } from '@/components/auth-guard'
import TaskList from '@/components/task-list'
import TaskInput from '@/components/task-input'
import TaskSearch from '@/components/task-search'
import TaskFilters, { FilterType } from '@/components/task-filters'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

export default function Home() {
  return (
    <AuthGuard>
      <HomeContent />
    </AuthGuard>
  )
}

function HomeContent() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [tasks, setTasks] = useState<{ id: string; title: string; completed: boolean }[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const addTask = (title: string) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
    }
    setTasks([newTask, ...tasks])
  }

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id: string, newTitle: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    )
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Filtrar y buscar tareas
  const filteredTasks = useMemo(() => {
    let result = tasks

    // Aplicar filtro
    if (filter === 'active') {
      result = result.filter(task => !task.completed)
    } else if (filter === 'completed') {
      result = result.filter(task => task.completed)
    }

    // Aplicar búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(task =>
        task.title.toLowerCase().includes(query)
      )
    }

    return result
  }, [tasks, filter, searchQuery])

  const completedCount = tasks.filter(task => task.completed).length
  const totalCount = tasks.length

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-2xl px-6 py-8 sm:px-8 sm:py-12 lg:py-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-foreground sm:text-4xl lg:text-5xl">
                Mis Tareas
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {totalCount === 0 ? 'Sin tareas' : `${completedCount} de ${totalCount} completadas`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-8 sm:px-8 sm:py-12">
        <TaskInput onAdd={addTask} />
        
        {tasks.length > 0 && (
          <>
            <TaskSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
          </>
        )}

        {tasks.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">Comienza agregando una tarea nueva</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        )}
      </div>
    </main>
  )
}
