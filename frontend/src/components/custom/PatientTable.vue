<script setup lang="ts">
import type { Patient } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-vue-next'

defineProps<{
  patients: Patient[]
}>()
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date of Birth</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="patients.length > 0">
          <TableRow v-for="patient in patients" :key="patient.id">
            <TableCell class="font-medium"
              >{{ patient.firstName }} {{ patient.lastName }}</TableCell
            >
            <TableCell>{{ patient.dateOfBirth }}</TableCell>
            <TableCell>{{ patient.status }}</TableCell>
            <TableCell class="text-right">
              <Button variant="outline" size="icon" class="mr-2 cursor-pointer" @click="$emit('editPatient', patient)">
                <Pencil
                  class="w-4 h-4"
                  
                />
              </Button>
              <Button variant="destructive" size="icon" class="cursor-pointer">
                <Trash2 class="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell colspan="4" class="h-24 text-center">
              No patients found.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
