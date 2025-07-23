import { defineStore } from 'pinia'
import type { Patient } from '@/types'
import apiClient from '@/services/api'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [] as Patient[],
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    patientsSortedByName(state) {
      return [...state.patients].sort((a, b) => {
        const lastNameComparison = a.lastName.localeCompare(b.lastName)
        if (lastNameComparison !== 0) {
          return lastNameComparison
        }
        return a.firstName.localeCompare(b.firstName)
      })
    },
    totalPatients(): number {
      return this.patients.length
    },
  },
  actions: {
    async fetchPatients() {
      this.isLoading = true
      this.error = null
      try {
        const response = await apiClient.get('/patients')
        this.patients = response.data
      } catch (e) {
        this.error = 'Failed to fetch patients.'
        throw e
      } finally {
        this.isLoading = false
      }
    },

    async createPatient(newPatientData: Omit<Patient, 'id' | 'createdAt'>) {
      this.isLoading = true
      try {
        const response = await apiClient.post('/patients', newPatientData)
        this.patients.unshift(response.data)
      } catch (e) {
        this.error = 'Failed to create patient.'
        throw e
      } finally {
        this.isLoading = false
      }
    },

    async updatePatient(
      patientId: number | string,
      updatedData: Partial<Omit<Patient, 'id' | 'createdAt'>>
    ) {
      this.isLoading = true
      try {
        const response = await apiClient.put(
          `/patients/${patientId}`,
          updatedData
        )
        const index = this.patients.findIndex(p => p.id === patientId)
        if (index !== -1) {
          this.patients[index] = response.data
        }
      } catch (e) {
        this.error = 'Failed to update patient.'
        throw e
      } finally {
        this.isLoading = false
      }
    },

    async deletePatient(patientId: number | string) {
      this.isLoading = true
      try {
        await apiClient.delete(`/patients/${patientId}`)
        this.patients = this.patients.filter(p => p.id !== patientId)
      } catch (e) {
        this.error = 'Failed to delete patient.'
        throw e
      } finally {
        this.isLoading = false
      }
    },
  },
})
