import type { OrderBy, Project } from "~/types/project"
import projectService from '~/services/projectService'

interface State {
  projects: Project[]
  filters: {
    favorites_only: boolean,
    order_by: OrderBy,
    search_query: string
  },
}

export const useProjectsStore = defineStore('projectsStore', {
  state: (): State => ({
    projects: [],
    filters: {
      favorites_only: false,
      order_by: 'alphabetical',
      search_query: ''
    }
  }),
  getters: {
    filteredProjects: (state): Project[] => {
      let filteredProjects = state.projects
      if (state.filters.favorites_only) {
        filteredProjects = filteredProjects.filter((project) => project.favorite)
      }

      if (state.filters.search_query) {
        const query = state.filters.search_query.toLowerCase()
        filteredProjects = filteredProjects.filter((project) =>
          project.name.toLowerCase().includes(query)
        )
      }

      switch (state.filters.order_by) {
        case 'alphabetical':
          filteredProjects.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          break
        case 'start_date':
          filteredProjects.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
          break
        case 'end_date':
          filteredProjects.sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime())
          break
      }

      return filteredProjects
    }
  },
  actions: {
    setFilters<K extends keyof State['filters']>(key: K, value: State['filters'][K]): void {
      this.filters[key] = value
    },
    async fetchProjects(): Promise<void> {
      const projects = await projectService.fetchProjects()

      this.projects = projects
    },
    async getProject(projectId: string): Promise<Project> {
      return await projectService.getProject(projectId)
    },
    async createProject(newProject: Project): Promise<Project> {
      return await projectService.createProject(newProject)
    },
    async updateProject(projectId: string, updatedProject: Project): Promise<Project> {
      return await projectService.updateProject(projectId, updatedProject)
    },
    async removeProject(projectId: string): Promise<void> {
      return await projectService.removeProject(projectId)
    }
  }
})