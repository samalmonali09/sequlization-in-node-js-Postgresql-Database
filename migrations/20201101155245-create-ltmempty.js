'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('ltm_empty_data', {
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
      AV_DISPO_BEREICH : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AV_JAHR : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AV_ZAEHLER : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LKW_NUMMER : {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
      BELADE_PLATZ : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      RF_LIEF : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      RF_POS : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      RF_LT_KOMP  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      VKZ  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SPED_NR  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SPED_NRI  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KFZ  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TRANSPORT  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      GEBIET  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DISPONENT  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LM  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ABHOL_DAT  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LKW_HOEHE  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      BORDERO_VORSATZ : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TRAILER_YARD  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CROSS_DOCK  : {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      Anz_Frachtbriefe : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      EMPF_NR  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      EMPF_NRI  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KONTO_NR  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      KONTO_NRI  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LT_NR  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      POS_TYP  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      POS_TEXT  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MENGE_LT  : {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      MENGE_GB  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LM_POS  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      EILT_KZ : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      BEM  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MENGE_SOLL  : {
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
    await queryInterface.dropTable('ltm_empty_data')
  },
}
