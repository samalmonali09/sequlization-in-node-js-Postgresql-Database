/* Replace with your SQL commands */


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
