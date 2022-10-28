'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ltmdata extends Model {
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
  Ltmdata.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      Feldname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a Feldname' },
          notEmpty: { msg: 'Feldname must not be empty' },
        },
      },
      start_pos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a start_pos' },
          notEmpty: { msg: 'start_pos must not be empty' },
        },
      },

      end_pos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a end_pos' },
          notEmpty: { msg: 'end_pos must not be empty' },
        },
      },
      total_length: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a total_length' },
          notEmpty: { msg: 'total_length must not be empty' },
        },
      },
    
      typ: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a typ' },
          notEmpty: { msg: 'typ must not be empty' },
        },
      },

      beschreibung: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a beschreibung' },
          notEmpty: { msg: 'beschreibung  empty' },
        },
      },

      beispiel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a beispiel' },
          notEmpty: { msg: 'beschreibung  empty' },
        },
      },
      

    },
    {
      sequelize,
      tableName: 'ltm_data_decode',
      modelName: 'Ltmdata',
    }
  )
  return Ltmdata
}