


CREATE TABLE posts
(
	uuid bigserial NOT NULL,
	name varchar(50) NOT NULL,
      email varchar(255) NULL,
	role varchar(255) NULL,

	created_timestamp timestamp with time zone NOT NULL,
	modified_timestamp timestamp with time zone NOT NULL
);


