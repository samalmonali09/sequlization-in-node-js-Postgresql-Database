const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test2",
  password: "postgres",
  port: "5432"
});

// pool.query(
//   "INSERT INTO student(firstname, lastname, age, address, email)VALUES('Mary Ann', 'Wilters', 20, '74 S Westgate St', 'mroyster@royster.com')",
//   (err, res) => {
//     console.log(err, res);
//     pool.end();
//   }
// );

// create a string object for Postgres SQL statement
var queryString = `
INSERT INTO public.Ltm3_data_decode_rule (Feldname, start_pos, end_pos, total_length,typ,beschreibung,beispiel, created_timestamp, modified_timestamp, modified_user, 
created_user, status) VALUES ('DATEI-NR', 1, 5, 5, 'A','Dateinummer','SJ610', now(), now(), 'pltadmin', 'pltadmin', true);
`;

pool.query(queryString, (err, res) => {
  if (err !== undefined) {
    // log the error to console
    console.log("Postgres INSERT error:", err);

    // get the keys for the error
    var keys = Object.keys(err);
    console.log("\nkeys for Postgres error:", keys);
    // get the error position of SQL string
    console.log("Postgres error position:", err.position);
  }

  // check if the response is not 'undefined'
  if (res !== undefined) {
    // log the response to console
    console.log("Postgres response:", res);

    // get the keys for the response object
    var keys = Object.keys(res);

    // log the response keys to console
    console.log("\nkeys type:", typeof keys);
    console.log("keys for Postgres response:", keys);

    if (res.rowCount > 0) {
      console.log("# of records inserted:", res.rowCount);
    } else {
      console.log("No records were inserted.");
    }
  }
});