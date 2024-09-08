interface Project {
  id?: number
  name: string
  client: string
  start_date: string
  end_date: string
  image?: string
  favorite?: boolean
}

interface ProjectFilters {
  favorite?: boolean
}

type SortOrder = 'alphabetical' | 'start_date' | 'end_date'

export default {
  async getProjects(filters?: ProjectFilters, sortOrder: SortOrder = 'alphabetical'): Promise<Project[]> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase

      const queryParams = new URLSearchParams(filters as any).toString()
      let url = `${apiBase}/projects${queryParams ? `?${queryParams}` : ''}`

      switch (sortOrder) {
        case 'start_date':
          url += `${queryParams ? '&' : '?'}sort=start_date`
          break
        case 'end_date':
          url += `${queryParams ? '&' : '?'}sort=end_date`
          break
        case 'alphabetical':
        default:
          url += `${queryParams ? '&' : '?'}sort=name`
          break
      }

      const response = await fetch(url)
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

  async searchProjects(query: string, filters?: ProjectFilters, sortOrder: SortOrder = 'alphabetical'): Promise<Project[]> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase

      const extendedFilters = {
        ...filters,
        name: query
      }

      console.log('Filters being sent:', extendedFilters)

      const projects = await this.getProjects(extendedFilters, sortOrder)

      return projects
    } catch (error) {
      console.error('Error searching projects:', error)
      throw error
    }
  },

  async toggleFavorite(id: number, favorite: boolean): Promise<Project> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase

      const response = await fetch(`${apiBase}/projects/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ favorite: favorite }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update favorite status')
      }

      const data = await response.json()
      return data as Project
    } catch (error) {
      console.error('Error updating favorite status:', error)
      throw error
    }
  },

  async getProject(id: number): Promise<Project> {
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

  async updateProject(id: number, updatedProject: Project): Promise<Project> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase

      const response = await fetch(`${apiBase}/projects/${id}`, {
        method: 'PUT',
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

  async deleteProject(id: number): Promise<void> {
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
