'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('masterdataltm', {
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
      lt_nr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ben: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      t_gew: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bem: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     
      abrech_klasse: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      klasse: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rfid_kz: {
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
    await queryInterface.dropTable('masterdataltm')
  },
}
