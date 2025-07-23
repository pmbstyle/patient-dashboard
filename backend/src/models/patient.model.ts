import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class Patient extends Model {}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    middleName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
    status: {
      type: DataTypes.ENUM('Inquiry', 'Onboarding', 'Active', 'Churned'),
      allowNull: false,
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Patient',
    timestamps: true,
  }
)

export default Patient
