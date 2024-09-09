import type { Project } from '~/types/project.d.ts'

interface ProjectFilters {
  favorite?: boolean
}

export default {
  async fetchProjects(): Promise<Project[]> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase

      const response = await fetch(`${apiBase}/projects`)
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }

      const data = await response.json()
      return data as Project[]
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
  },

  async getProject(id: string): Promise<Project> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase

      const response = await fetch(`${apiBase}/projects/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch project')
      }

      const data = await response.json()
      return data as Project
    } catch (error) {
      console.error('Error fetching project:', error)
      throw error
    }
  },

  async createProject(newProject: Project): Promise<Project> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase

      const response = await fetch(`${apiBase}/projects`, {
        method: 'POST',
        body: JSON.stringify(newProject),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      const data = await response.json()
      return data as Project
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  },

  async updateProject(id: string, updatedProject: Project): Promise<Project> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase

      const response = await fetch(`${apiBase}/projects/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedProject),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      const data = await response.json()
      return data as Project
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },

  async removeProject(id: string): Promise<void> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase

      const response = await fetch(`${apiBase}/projects/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }
}
