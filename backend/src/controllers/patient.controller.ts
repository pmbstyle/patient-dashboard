import { Request, Response } from 'express'
import Patient from '../models/patient.model'

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.findAll({
      order: [
        ['lastName', 'ASC'],
        ['firstName', 'ASC'],
      ],
    })
    res.status(200).json(patients)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error })
  }
}

export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.create(req.body)
    res.status(201).json(patient)
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error })
  }
}

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const [updated] = await Patient.update(req.body, { where: { id } })
    if (updated) {
      const updatedPatient = await Patient.findByPk(id)
      res.status(200).json(updatedPatient)
    } else {
      res.status(404).json({ message: 'Patient not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error })
  }
}

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleted = await Patient.destroy({
      where: { id: id },
    })

    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ message: 'Patient not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error })
  }
}
