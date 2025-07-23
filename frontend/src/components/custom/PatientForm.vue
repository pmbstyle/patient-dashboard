<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { watch, computed, ref } from 'vue'
import type { Patient, PatientStatus } from '@/types'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CalendarIcon } from 'lucide-vue-next'
import { format } from 'date-fns'

import {
  type DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'

const props = defineProps<{
  initialData?: Patient
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', values: Omit<Patient, 'id' | 'createdAt'>): void
  (e: 'cancel'): void
}>()

const patientStatus: PatientStatus[] = [
  'Inquiry',
  'Onboarding',
  'Active',
  'Churned',
]
const formSchema = toTypedSchema(
  yup.object({
    firstName: yup.string().required().label('First Name'),
    middleName: yup.string().nullable().transform((value) => (value === '' || value === null ? undefined : value)),
    lastName: yup.string().required().label('Last Name'),
    dateOfBirth: yup.date().required().label('Date of Birth'),
    status: yup.string().oneOf(patientStatus).required().label('Status'),

    address: yup.object({
      street: yup.string().required().label('Street Address'),
      city: yup.string().required().label('City'),
      state: yup.string().required().label('State / Province'),
      zipCode: yup.string().required().label('Zip Code'),
    }),
  })
)

const { handleSubmit, setValues, defineField, values } = useForm({
  validationSchema: formSchema,
})

const [dateOfBirth, dateOfBirthAttrs] = defineField('dateOfBirth')
const calendarValue = ref<DateValue | undefined>()

watch(
  () => props.initialData,
  newData => {
    if (newData) {
      setValues({
        ...newData,
        dateOfBirth: new Date(newData.dateOfBirth),
      })
    }
  },
  { immediate: true }
)

watch(
  () => values.dateOfBirth,
  newVal => {
    if (newVal) {
      const dateStr = format(newVal, 'yyyy-MM-dd')
      calendarValue.value = parseDate(dateStr)
    } else {
      calendarValue.value = undefined
    }
  },
  { immediate: true }
)

watch(calendarValue, newVal => {
  if (newVal) {
    dateOfBirth.value = newVal.toDate(getLocalTimeZone())
  }
})

const onSubmit = handleSubmit(values => {
  const payload = {
    ...values,
    dateOfBirth: format(values.dateOfBirth, 'yyyy-MM-dd'),
  }
  emit('submit', payload)
})

const formTitle = computed(() =>
  props.initialData ? 'Edit Patient' : 'Add New Patient'
)
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">{{ formTitle }}</h2>
    <form class="space-y-6" @submit="onSubmit">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem v-auto-animate>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="John" v-bind="componentField" />
            </FormControl>
            <div class="h-5">
              <FormMessage />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="middleName">
          <FormItem v-auto-animate>
            <FormLabel>Middle Name (optional)</FormLabel>
            <FormControl>
              <Input type="text" placeholder="" v-bind="componentField" />
            </FormControl>
            <div class="h-5">
              <FormMessage />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem v-auto-animate>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Doe" v-bind="componentField" />
            </FormControl>
            <div class="h-5">
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField name="dateOfBirth">
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    :class="
                      cn(
                        'w-full justify-start text-left font-normal',
                        !dateOfBirth && 'text-muted-foreground'
                      )
                    "
                  >
                    <CalendarIcon class="w-4 h-4 mr-2" />
                    <span>{{
                      dateOfBirth ? format(dateOfBirth, 'PPP') : 'Pick a date'
                    }}</span>
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
                <Select
                  :model-value="calendarValue?.year.toString()"
                  @update:model-value="
                    v => {
                      const year = Number(v)
                      calendarValue = today(getLocalTimeZone()).set({
                        year,
                        month: 1,
                        day: 1,
                      })
                    }
                  "
                >
                  <SelectTrigger class="mx-auto w-full">
                    <SelectValue placeholder="Select a year..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="y in Array.from(
                        { length: 105 },
                        (_, i) => new Date().getFullYear() - i
                      )"
                      :key="y"
                      :value="y.toString()"
                    >
                      {{ y }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Calendar v-model="calendarValue" />
              </PopoverContent>
            </Popover>
            <div class="h-5">
              <FormMessage />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="status">
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="s in patientStatus" :key="s" :value="s">
                    {{ s }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div class="h-5">
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-2">Address</h3>
        <div class="space-y-4">
          <FormField v-slot="{ componentField }" name="address.street">
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="123 Main St"
                  v-bind="componentField"
                />
              </FormControl>
              <div class="h-5">
                <FormMessage />
              </div>
            </FormItem>
          </FormField>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField v-slot="{ componentField }" name="address.city">
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Anytown"
                    v-bind="componentField"
                  />
                </FormControl>
                <div class="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="address.state">
              <FormItem>
                <FormLabel>State / Province</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="CA" v-bind="componentField" />
                </FormControl>
                <div class="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="address.zipCode">
              <FormItem>
                <FormLabel>Zip / Postal Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="90210"
                    v-bind="componentField"
                  />
                </FormControl>
                <div class="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          @click="$emit('cancel')"
          class="cursor-pointer"
        >
          Cancel
        </Button>
        <Button type="submit" :disabled="isSubmitting" class="cursor-pointer text-white">
          <span v-if="isSubmitting">Saving...</span>
          <span v-else>Save Changes</span>
        </Button>
      </div>
    </form>
  </div>
</template>
