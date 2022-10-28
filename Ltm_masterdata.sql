DROP TABLE IF EXISTS ltm_master_data CASCADE
;

CREATE TABLE masterdataltm
(
	id bigserial NOT NULL,
	lt_nr varchar(500) NOT NULL,
	ben varchar(500) NULL,
	t_gew varchar(1000) NULL,
	bem varchar(1000) NULL,
	abrech_klasse varchar(1000)NULL,
	klasse varchar(1000) NULL,
	rfid_kz varchar(1000) NULL,
	created_timestamp timestamp with time zone NOT NULL,
	modified_timestamp timestamp with time zone NOT NULL
);




CREATE TABLE ltm_empty_data2
(
	id bigserial NOT NULL,
	AV_DISPO_BEREICH varchar(255)  NULL,
	AV_JAHR varchar(255) NULL,
	AV_ZAEHLER varchar(1000) NULL,
	LKW_NUMMER varchar(1000)NULL,
	BELADE_PLATZ varchar(1000)NULL,
    RF_LIEF varchar(1000)NULL,
	RF_POS varchar(1000)NULL,
    RF_LT_KOMP varchar(1000)NULL,
     VKZ varchar(1000)NULL,
	 SPED_NR varchar(1000)NULL,
    SPED_NRI varchar(1000)NULL,
    KFZ varchar(1000)NULL,
    TRANSPORT varchar(1000)NULL,
    GEBIET varchar(1000)NULL,
    DISPONENT varchar(1000)NULL,
	LM varchar(1000)NULL,
    ABHOL_DAT  varchar(1000)NULL,
    LKW_HOEHE varchar(1000)NULL,
    BORDERO_VORSATZ varchar(1000)NULL,
    TRAILER_YARD varchar(1000)NULL,
	CROSS_DOCK varchar(1000)NULL,
	Anz_Frachtbriefe varchar (1000)NULL,
	EMPF_NR varchar(1000)NULL,
    EMPF_NRI varchar(1000)NULL,
    KONTO_NR varchar(1000)NULL,
    KONTO_NRI varchar(1000)NULL,
	LT_NR varchar(1000)NULL,
    POS_TYP varchar(1000)NULL,
	POS_TEXT varchar(1000)NULL,
	MENGE_LT varchar(1000)NULL,
    MENGE_GB varchar(1000)NULL,
    LM_POS varchar(1000)NULL,
    EILT_KZ varchar(1000)NULL,
	BEM varchar(1000)NULL,
    MENGE_SOLL varchar(1000) NULL,
	created_timestamp timestamp with time zone NOT NULL,
	modified_timestamp timestamp with time zone NOT NULL
);





