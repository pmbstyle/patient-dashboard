export type PatientStatus = 'Inquiry' | 'Onboarding' | 'Active' | 'Churned'

export interface Patient {
  id: string | number
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  status: PatientStatus
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  createdAt?: string
}
