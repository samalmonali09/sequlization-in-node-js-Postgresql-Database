'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class LTMmaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  LTMmaster.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      lt_nr: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a lt_nr' },
          notEmpty: { msg: 'lt_nr must not be empty' },
        },
      },
      ben: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a ben' },
          notEmpty: { msg: 'ben must not be empty' },
        },
      },

      t_gew: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a t_gew' },
          notEmpty: { msg: 't_gew must not be empty' },
        },
      },
      bem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a bem' },
          notEmpty: { msg: 'bem must not be empty' },
        },
      },
    
      abrech_klasse: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a typ' },
          notEmpty: { msg: 'abrech_klasse must not be empty' },
        },
      },

      klasse: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a klasse' },
          notEmpty: { msg: 'klasse  empty' },
        },
      },

      rfid_kz: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a rfid_kz' },
          notEmpty: { msg: 'rfid_kz  empty' },
        },
      },
      

    },
    {
      sequelize,
      tableName: 'ltm_master_data',
      modelName: 'LTMmaster',
    }
  )
  return LTMmaster
}