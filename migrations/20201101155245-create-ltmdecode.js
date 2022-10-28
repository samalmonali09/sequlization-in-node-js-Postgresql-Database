'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('ltm_data_decode', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      Feldname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_pos: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      end_pos: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_length: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     
      typ: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      beschreibung: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      beispiel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('ltm_data_decode')
  },
}
