<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { usePatientStore } from '@/stores/patient.store'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import PatientTable from '@/components/custom/PatientTable.vue'
import PatientFormDialog from '@/components/custom/PatientFormDialog.vue'
import PatientViewDialog from '@/components/custom/PatientViewDialog.vue'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'vue-sonner'
import type { Patient } from '@/types'

const patientStore = usePatientStore()

const dialog = ref<InstanceType<typeof PatientFormDialog> | null>(null)
const dialogView = ref<InstanceType<typeof PatientViewDialog> | null>(null)
const isDeleteDialogOpen = ref(false)
const patientToDeleteId = ref<number | string | null>(null)
const itemsPerPage = 10
const currentPage = ref(1)

const openCreateDialog = () => {
  dialog.value?.open()
}

const openEditDialog = (patient: Patient) => {
  dialog.value?.open(patient)
}

const openViewDialog = (patient: Patient) => {
  dialogView.value?.open(patient)
}

const paginatedPatients = computed(() => {
  const sortedPatients = patientStore.patientsSortedByName
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return sortedPatients.slice(startIndex, endIndex)
})

const openDeleteDialog = (patientId: number | string) => {
  patientToDeleteId.value = patientId
  isDeleteDialogOpen.value = true
}

const confirmDelete = async () => {
  if (!patientToDeleteId.value) return
  try {
    await patientStore.deletePatient(patientToDeleteId.value)
    toast({ title: 'Success', description: 'Patient deleted successfully.' })
  } catch (error) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Failed to delete patient.',
    })
  } finally {
    isDeleteDialogOpen.value = false
    patientToDeleteId.value = null
  }
}

onMounted(() => {
  patientStore.fetchPatients()
})
</script>

<template>
  <div class="p-4 sm:p-6 md:p-8">
    <header class="flex items-center justify-between mb-6">
      <Button @click="openCreateDialog" class="cursor-pointer text-white">
        <Plus class="w-4 h-4 mr-2" /> New Patient
      </Button>
    </header>
    <main>
      <PatientTable
        :patients="paginatedPatients"
        @edit-patient="openEditDialog"
        @view-patient="openViewDialog"
        @delete-patient="openDeleteDialog"
      />
      <div class="flex justify-center mt-6">
        <Pagination
          v-if="patientStore.totalPatients > itemsPerPage"
          v-model:page="currentPage"
          :total="patientStore.totalPatients"
          :sibling-count="1"
          show-edges
          :items-per-page="itemsPerPage"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious />

            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === currentPage"
              >
                {{ item.value }}
              </PaginationItem>
            </template>

            <PaginationEllipsis :index="4" />

            <PaginationNext />
          </PaginationContent>
        </Pagination>
      </div>
    </main>
    <PatientFormDialog ref="dialog" />
    <PatientViewDialog ref="dialogView" />
    <AlertDialog
      :open="isDeleteDialogOpen"
      @update:open="isDeleteDialogOpen = $event"
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            patient record from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
