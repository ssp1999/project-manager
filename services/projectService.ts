import type { Project } from '~/types/project.d.ts'
import { db } from '~/firebase'
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore'

export default {
  async fetchProjects(): Promise<Project[]> {
    try {
      const projectCollection = collection(db, 'projects')
      const snapshot = await getDocs(projectCollection)
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project))
      return projects
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
  },

  async getProject(id: string): Promise<Project> {
    try {
      const projectRef = doc(db, 'projects', id)
      const projectDoc = await getDoc(projectRef)
      if (!projectDoc.exists()) {
        throw new Error('Project not found')
      }
      return { id: projectDoc.id, ...projectDoc.data() } as Project
    } catch (error) {
      console.error('Error fetching project:', error)
      throw error
    }
  },

  async createProject(newProject: Project): Promise<Project> {
    try {
      const projectCollection = collection(db, 'projects')
      const projectRef = await addDoc(projectCollection, newProject)
      const projectDoc = await getDoc(projectRef)
      return { id: projectDoc.id, ...projectDoc.data() } as Project
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  },

  async updateProject(id: string, updatedProject: Project): Promise<Project> {
    try {
      const projectRef = doc(db, 'projects', id)
      await updateDoc(projectRef, updatedProject)
      const projectDoc = await getDoc(projectRef)
      return { id: projectDoc.id, ...projectDoc.data() } as Project
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },

  async removeProject(id: string): Promise<void> {
    try {
      const projectRef = doc(db, 'projects', id)
      await deleteDoc(projectRef)
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }
}
