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
import { Pencil, Trash2, Eye, ArrowDownWideNarrow } from 'lucide-vue-next'

defineProps<{
  patients: Patient[]
}>()
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div class="flex items-center gap-1">
              Name <ArrowDownWideNarrow class="w-4 h-4" />
            </div>
          </TableHead>
          <TableHead>Date of Birth</TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="patients.length > 0">
          <TableRow v-for="patient in patients" :key="patient.id">
            <TableCell
              class="font-medium cursor-pointer"
              @click="$emit('viewPatient', patient)"
            >
              {{ patient.firstName }} {{ patient.lastName }}
            </TableCell>
            <TableCell
              class="cursor-pointer"
              @click="$emit('viewPatient', patient)"
              >{{ patient.dateOfBirth }}</TableCell
            >
            <TableCell
              class="cursor-pointer"
              @click="$emit('viewPatient', patient)"
            >
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-2"
                  :class="{
                    'bg-blue-500': patient.status === 'Inquiry',
                    'bg-yellow-500': patient.status === 'Onboarding',
                    'bg-green-500': patient.status === 'Active',
                    'bg-red-500': patient.status === 'Churned',
                  }"
                ></div>
                {{ patient.status }}
              </div>
            </TableCell>
            <TableCell class="text-right">
              <Button
                variant="outline"
                size="icon"
                class="mr-2 cursor-pointer"
                @click="$emit('viewPatient', patient)"
              >
                <Eye class="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                class="mr-2 cursor-pointer"
                @click="$emit('editPatient', patient)"
              >
                <Pencil class="w-4 h-4" />
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
