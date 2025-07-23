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
    firstName: 'Emily',
    middleName: 'Rose',
    lastName: 'Smith',
    dateOfBirth: '1985-06-12',
    status: 'Churned',
    address: {
      street: '456 Oak Ave',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
    },
  },
  {
    id: 3,
    firstName: 'Michael',
    middleName: 'James',
    lastName: 'Johnson',
    dateOfBirth: '1978-03-23',
    status: 'Active',
    address: {
      street: '789 Pine Ln',
      city: 'Greenville',
      state: 'TX',
      zipCode: '75401',
    },
  },
  {
    id: 4,
    firstName: 'Sophia',
    middleName: 'Lynn',
    lastName: 'Brown',
    dateOfBirth: '1992-11-30',
    status: 'Inquiry',
    address: {
      street: '321 Maple Rd',
      city: 'Fairview',
      state: 'NY',
      zipCode: '10001',
    },
  },
  {
    id: 5,
    firstName: 'David',
    middleName: 'Alan',
    lastName: 'Williams',
    dateOfBirth: '1980-07-04',
    status: 'Onboarding',
    address: {
      street: '654 Cedar Blvd',
      city: 'Hawthorne',
      state: 'NV',
      zipCode: '89415',
    },
  },
  {
    id: 6,
    firstName: 'Olivia',
    middleName: 'Grace',
    lastName: 'Miller',
    dateOfBirth: '1995-05-15',
    status: 'Churned',
    address: {
      street: '987 Birch St',
      city: 'Lakeside',
      state: 'FL',
      zipCode: '32065',
    },
  },
  {
    id: 7,
    firstName: 'Daniel',
    middleName: 'Thomas',
    lastName: 'Davis',
    dateOfBirth: '1988-08-08',
    status: 'Active',
    address: {
      street: '213 Walnut Ave',
      city: 'Mountain View',
      state: 'CA',
      zipCode: '94040',
    },
  },
  {
    id: 8,
    firstName: 'Ava',
    middleName: 'Marie',
    lastName: 'Garcia',
    dateOfBirth: '2000-02-29',
    status: 'Onboarding',
    address: {
      street: '333 Aspen Ct',
      city: 'Boulder',
      state: 'CO',
      zipCode: '80301',
    },
  },
  {
    id: 9,
    firstName: 'Matthew',
    middleName: 'Lee',
    lastName: 'Martinez',
    dateOfBirth: '1975-12-17',
    status: 'Active',
    address: {
      street: '888 Elm St',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
    },
  },
  {
    id: 10,
    firstName: 'Isabella',
    middleName: 'Jane',
    lastName: 'Hernandez',
    dateOfBirth: '1998-10-05',
    status: 'Inquiry',
    address: {
      street: '444 Palm Dr',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
    },
  },
  {
    id: 11,
    firstName: 'Joseph',
    middleName: 'Alexander',
    lastName: 'Lopez',
    dateOfBirth: '1983-01-19',
    status: 'Active',
    address: {
      street: '159 Sycamore St',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
    },
  },
  {
    id: 12,
    firstName: 'Mia',
    middleName: 'Faith',
    lastName: 'Gonzalez',
    dateOfBirth: '1991-09-09',
    status: 'Churned',
    address: {
      street: '777 Redwood Blvd',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
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
