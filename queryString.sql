-- DROP TABLE IF EXISTS ltm_data_decode_rule,

-- CREATE TABLE ltm_data_decode_rule
-- (
-- 	decode_feld_id bigserial NOT NULL,
-- 	Feldname varchar(255) NOT NULL,
-- 	start_pos integer NOT NULL   DEFAULT 0,
-- 	end_pos integer NOT NULL   DEFAULT 0,
-- 	total_length integer NOT NULL   DEFAULT 0,
--     typ varchar(255) NOT NULL,
--     beschreibung varchar(255) NOT NULL,
--     beispiel varchar(255)  NULL,
-- 	created_timestamp timestamp with time zone NOT NULL,
-- 	modified_timestamp timestamp with time zone NOT NULL,
-- 	created_user varchar(255) NOT NULL,
-- 	modified_user varchar(255) NOT NULL,
-- 	transfer_flag integer NOT NULL   DEFAULT 0,
-- 	obsolete_status boolean NOT NULL   DEFAULT false,
-- 	status boolean NOT NULL   DEFAULT false
-- );



INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('DATEI-NR', 1, 5, 5, 'A','Dateinummer','SJ610', now(), now(), 'pltadmin', 'pltadmin', true);


INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('FILLER',6, 6, 1, 'A','Leer','' ,now(), now(), 'pltadmin', 'pltadmin', true);



INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('TEXT',7, 19, 13, 'A', 'Datei-Inhalt', 'LT-STAMMDATEN' ,now(), now(), 'pltadmin', 'pltadmin', true);




INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('FILLER',20, 20, 1, 'A','Leer','' ,now(), now(), 'pltadmin', 'pltadmin', true);



INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('MODUS',21, 29, 9, 'A','Komplettabzug','KOMPLETT' ,now(), now(), 'pltadmin', 'pltadmin', true);

INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('FILLER',30, 30, 1, 'A','Leer','' ,now(), now(), 'pltadmin', 'pltadmin', true);

INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('ERST-DATUM',31, 38, 8, 'A','Erstelldatum JJJJMMTT','20020815' ,now(), now(), 'pltadmin', 'pltadmin', true);


INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('FILLER',39, 40, 2, 'A','Leer','' ,now(), now(), 'pltadmin', 'pltadmin', true);


INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('ERST-ZEIT',41, 44, 4, 'A','hhmm','1513' ,now(), now(), 'pltadmin', 'pltadmin', true);



INSERT INTO ltm_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('FILLER',45, 1000, 956, 'A','Leer','' ,now(), now(), 'pltadmin', 'pltadmin', true);


