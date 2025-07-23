import { defineStore } from 'pinia'
import type { Patient } from '@/types'

const mockPatients: Patient[] = [
  {
    id: 1,
    firstName: 'John',
    middleName: 'Jacob',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    status: 'Active',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
    },
  },
  {
    id: 2,
    firstName: 'Jane',
    middleName: 'Marie',
    lastName: 'Doe',
    dateOfBirth: '1992-02-02',
    status: 'Onboarding',
    address: {
      street: '456 Elm St',
      city: 'Othertown',
      state: 'NY',
      zipCode: '67890',
    },
  },
]

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [] as Patient[],
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    patientsSortedByName: state =>
      [...state.patients].sort((a, b) => a.lastName.localeCompare(b.lastName)),
  },
  actions: {
    async fetchPatients() {
      this.isLoading = true
      this.error = null
      try {
        await new Promise(res => setTimeout(res, 1000))
        this.patients = mockPatients
      } catch (e) {
        this.error = 'Failed to fetch patients.'
      } finally {
        this.isLoading = false
      }
    },
  },
})
