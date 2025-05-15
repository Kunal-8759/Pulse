// utils/taskUtils.js

export const filterTasks = (tasks, searchQuery, statusFilter) => {
  return tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || task.status === statusFilter
    return matchesSearch && matchesStatus
  })
}

export const sortTasks = (tasks, sortOption) => {
  return [...tasks].sort((a, b) => {
    switch (sortOption) {
      case "Newest First":
        return new Date(b.id) - new Date(a.id)
      case "Oldest First":
        return new Date(a.id) - new Date(b.id)
      case "Title A-Z":
        return a.title.localeCompare(b.title)
      case "Title Z-A":
        return b.title.localeCompare(a.title)
      case "Due Date (Earliest)":
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      case "Due Date (Latest)":
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(b.dueDate) - new Date(a.dueDate)
      default:
        return 0
    }
  })
}
