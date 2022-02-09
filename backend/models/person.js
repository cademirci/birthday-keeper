const { DataTypes } = require('sequelize')
const database = require('../database')

const Person = database.define('person',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      allowNull: false
    },
    name: DataTypes.STRING,
    birthdate: {
      type: DataTypes.DATE
    }
  }
)

module.exports = Person