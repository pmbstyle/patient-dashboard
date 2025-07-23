<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePatientStore } from '@/stores/patient.store'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import PatientTable from '@/components/custom/PatientTable.vue'
import PatientDialog from '@/components/custom/PatientDialog.vue'
import type { Patient } from '@/types'

const patientStore = usePatientStore()

const dialog = ref<InstanceType<typeof PatientDialog> | null>(null)

const openCreateDialog = () => {
  dialog.value?.open()
}

const openEditDialog = (patient: Patient) => {
  dialog.value?.open(patient)
}

onMounted(() => {
  patientStore.fetchPatients()
})
</script>

<template>
  <div class="p-4 sm:p-6 md:p-8">
    <header class="flex items-center justify-between mb-6">
      <Button @click="openCreateDialog" class="cursor-pointer">
        <Plus class="w-4 h-4 mr-2" /> New Patient
      </Button>
    </header>
    <main>
      <PatientTable
        :patients="patientStore.patientsSortedByName"
        @edit-patient="openEditDialog"
      />
    </main>
    <PatientDialog ref="dialog" />
  </div>
</template>
