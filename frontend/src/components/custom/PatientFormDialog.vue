<script setup lang="ts">
import { ref } from 'vue'
import type { Patient } from '@/types'
import { usePatientStore } from '@/stores/patient.store'
import { toast } from 'vue-sonner'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import PatientForm from '@/components/custom/PatientForm.vue'

const patientStore = usePatientStore()

const isOpen = ref(false)
const isSubmitting = ref(false)
const editingPatient = ref<Patient | undefined>(undefined)

defineExpose({
  open: (patient?: Patient) => {
    editingPatient.value = patient
    isOpen.value = true
  },
})

const handleFormSubmit = async (
  formData: Omit<Patient, 'id' | 'createdAt'>
) => {
  isSubmitting.value = true
  try {
    if (editingPatient.value) {
      await patientStore.updatePatient(editingPatient.value.id, formData)
      toast('Success', {
        description: 'Patient updated successfully.',
      })
    } else {
      await patientStore.createPatient(formData)
      toast('Success', { description: 'New patient created.' })
    }
    isOpen.value = false
  } catch (error) {
    toast('Error', { description: 'An error occurred. Please try again.' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="isOpen = false">
    <DialogTitle />
    <DialogContent class="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
      <PatientForm
        :initial-data="editingPatient"
        :is-submitting="isSubmitting"
        @submit="handleFormSubmit"
        @cancel="isOpen = false"
      />
    </DialogContent>
  </Dialog>
</template>
