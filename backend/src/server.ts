import express from 'express'
import cors from 'cors'
import sequelize from './config/database'
import patientRoutes from './routes/patient.routes'
import Patient from './models/patient.model'
import { faker } from '@faker-js/faker'

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

app.use('/api/patients', patientRoutes)

const seedDatabase = async () => {
  const patientCount = await Patient.count()
  if (patientCount > 0) {
    console.log('Database already seeded.')
    return
  }

  console.log('Seeding database with 12 mock patients...')
  const patientsToCreate = []
  for (let i = 0; i < 12; i++) {
    patientsToCreate.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
      status: faker.helpers.arrayElement([
        'Inquiry',
        'Onboarding',
        'Active',
        'Churned',
      ]),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        zipCode: faker.location.zipCode(),
      },
    })
  }
  await Patient.bulkCreate(patientsToCreate)
  console.log('Database seeded successfully!')
}

const startServer = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('Database connected and synced.')
    await seedDatabase()
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

startServer()
