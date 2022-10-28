'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ltmempty extends Model {
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
  Ltmempty.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    
      AV_DISPO_BEREICH: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a AV_DISPO_BEREICH' },
          notEmpty: { msg: 'AV_DISPO_BEREICH must not be empty' },
        },
      },

      AV_JAHR : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a AV_JAHR ' },
          notEmpty: { msg: 'AV_JAHR must not be empty' },
        },
      },
      AV_ZAEHLER : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a AV_ZAEHLER ' },
          notEmpty: { msg: 'AV_ZAEHLER  must not be empty' },
        },
      },
    
      LKW_NUMMER : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a LKW_NUMMER ' },
          notEmpty: { msg: 'LKW_NUMMER  must not be empty' },
        },
      },

      BELADE_PLATZ : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a BELADE_PLATZ ' },
          notEmpty: { msg: 'BELADE_PLATZ   empty' },
        },
      },

      RF_LIEF : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a RF_LIEF ' },
          notEmpty: { msg: 'RF_LIEF  empty' },
        },
      },
      BELADE_PLATZ : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a BELADE_PLATZ ' },
          notEmpty: { msg: 'BELADE_PLATZ   empty' },
        },
      },
      RF_POS  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a RF_POS ' },
          notEmpty: { msg: 'RF_POS    empty' },
        },
      },
      RF_LT_KOMP : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a RF_LT_KOMP ' },
          notEmpty: { msg: 'RF_LT_KOMP   empty' },
        },
      },
      VKZ : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a VKZ ' },
          notEmpty: { msg: 'VKZ   empty' },
        },
      },
      SPED_NR : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a SPED_NR ' },
          notEmpty: { msg: 'SPED_NR   empty' },
        },
      },
      SPED_NRI : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a SPED_NRI ' },
          notEmpty: { msg: 'SPED_NRI   empty' },
        },
      },
      KFZ : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a KFZ ' },
          notEmpty: { msg: 'KFZ   empty' },
        },
      },
      TRANSPORT : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a TRANSPORT ' },
          notEmpty: { msg: 'TRANSPORT   empty' },
        },
      },
      GEBIET : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a GEBIET ' },
          notEmpty: { msg: 'GEBIET    empty' },
        },
      },
      DISPONENT : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a DISPONENT ' },
          notEmpty: { msg: 'DISPONENT   empty' },
        },
      },
      LM  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a LM  ' },
          notEmpty: { msg: 'LM    empty' },
        },
      },
      ABHOL_DAT : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a ABHOL_DAT ' },
          notEmpty: { msg: 'ABHOL_DAT   empty' },
        },
      },
      LKW_HOEHE : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a LKW_HOEHE ' },
          notEmpty: { msg: 'LKW_HOEHE   empty' },
        },
      },
      BORDERO_VORSATZ : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a BORDERO_VORSATZ ' },
          notEmpty: { msg: 'BORDERO_VORSATZ   empty' },
        },
      },
      TRAILER_YARD : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a TRAILER_YARD ' },
          notEmpty: { msg: 'TRAILER_YARD   empty' },
        },
      },
      CROSS_DOCK : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a CROSS_DOCK ' },
          notEmpty: { msg: 'CROSS_DOCK   empty' },
        },
      },
      Anz_Frachtbriefe : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a Anz_Frachtbriefe ' },
          notEmpty: { msg: 'Anz_Frachtbriefe   empty' },
        },
      },
      EMPF_NR  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a EMPF_NR  ' },
          notEmpty: { msg: 'EMPF_NR    empty' },
        },
      },
      EMPF_NRI  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a EMPF_NRI  ' },
          notEmpty: { msg: 'EMPF_NRI    empty' },
        },
      },
      KONTO_NR  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a KONTO_NR  ' },
          notEmpty: { msg: 'KONTO_NR    empty' },
        },
      },
      KONTO_NRI  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a KONTO_NRI  ' },
          notEmpty: { msg: 'KONTO_NRI    empty' },
        },
      },
      LT_NR  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a LT_NR  ' },
          notEmpty: { msg: 'LT_NR    empty' },
        },
      },
      POS_TYP : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a POS_TYP  ' },
          notEmpty: { msg: 'POS_TYP    empty' },
        },
      },
      POS_TEXT  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a POS_TEXT   ' },
          notEmpty: { msg: 'POS_TEXT     empty' },
        },
      },
      MENGE_LT  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a MENGE_LT   ' },
          notEmpty: { msg: 'MENGE_LT     empty' },
        },
      },
      MENGE_GB  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a MENGE_GB ' },
          notEmpty: { msg: 'MENGE_GB     empty' },
        },
      },
      LM_POS  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a LM_POS ' },
          notEmpty: { msg: 'LM_POS     empty' },
        },
      },
      EILT_KZ  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a EILT_KZ   ' },
          notEmpty: { msg: 'EILT_KZ     empty' },
        },
      },
      BEM  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a BEM   ' },
          notEmpty: { msg: 'BEM     empty' },
        },
      },
      MENGE_SOLL  : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a MENGE_SOLL   ' },
          notEmpty: { msg: 'MENGE_SOLL     empty' },
        },
      },

    },
    {
      sequelize,
      tableName: 'ltm_empty_data',
      freezeTableName: true,

      modelName: 'Ltmempty',
    }
  )
  return Ltmempty
}