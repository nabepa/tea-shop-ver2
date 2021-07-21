import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: DataTypes.TEXT,
  },
  { timestamps: false }
);

export async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
}
