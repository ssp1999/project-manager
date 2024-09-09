import type { Project } from "~/types/project"

interface State {
  showModal: boolean,
  modalData: {
    project: Project | {}
  }
}

export const useModalProjectRemove = defineStore('modalProjectRemoveStore', {
  state: (): State => ({
    showModal: false,
    modalData: { 
      project: {}
    }
  }),
  actions: {
    setShowModal(showModal: State['showModal']): void {
      this.showModal = showModal
    },
    setModalData(modalData: State['modalData']): void {
      this.modalData = modalData
    }
  }
})