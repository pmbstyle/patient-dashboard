<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Patient } from '@/types'
const viewingPatient = ref<Patient | undefined>(undefined)
const isOpen = ref(false)

defineExpose({
  open: (patient?: Patient) => {
    viewingPatient.value = patient
    isOpen.value = true
  },
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="isOpen = false">
    <DialogContent class="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <h2 class="text-2xl font-bold mb-6">Patient Information</h2>
      </DialogHeader>
      <div v-if="viewingPatient" class="grid gap-6 py-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Personal Information</h3>
            <div class="grid gap-2 text-sm">
              <div>
                <span class="font-medium">Name:</span>
                {{ viewingPatient.firstName }}
                {{ viewingPatient.lastName }}
              </div>
              <div v-if="viewingPatient.middleName">
                <span class="font-medium">Middle Name:</span>
                {{ viewingPatient.middleName }}
              </div>
              <div>
                <span class="font-medium">Date of Birth:</span>
                {{ formatDate(viewingPatient.dateOfBirth) }}
              </div>
            </div>
          </div>
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Address</h3>
            <div class="grid gap-2 text-sm">
              <div>
                <span class="font-medium">Street:</span>
                {{ viewingPatient.address.street }}
              </div>
              <div>
                <span class="font-medium">City:</span>
                {{ viewingPatient.address.city }}
              </div>
              <div>
                <span class="font-medium">State:</span>
                {{ viewingPatient.address.state }}
              </div>
              <div>
                <span class="font-medium">Zip Code:</span>
                {{ viewingPatient.address.zipCode }}
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-1">
          <h3 class="text-lg font-semibold">Status</h3>
          <div class="flex items-center">
            <div
              class="w-3 h-3 rounded-full mr-2"
              :class="{
                'bg-blue-500': viewingPatient.status === 'Inquiry',
                'bg-yellow-500': viewingPatient.status === 'Onboarding',
                'bg-green-500': viewingPatient.status === 'Active',
                'bg-red-500': viewingPatient.status === 'Churned',
              }"
            ></div>
            {{ viewingPatient.status }}
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
