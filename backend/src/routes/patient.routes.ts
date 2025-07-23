import { Router } from 'express'
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from '../controllers/patient.controller'

const router = Router()

router.get('/', getAllPatients)
router.post('/', createPatient)
router.put('/:id', updatePatient)
router.delete('/:id', deletePatient)

export default router
