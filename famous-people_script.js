const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user       : settings.user,
  password   : settings.password,
  database   : settings.database,
  host       : settings.hostname,
  port       : settings.port,
  ssl        : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    for (let element of result.rows) {
      console.log(`- ${element.id} : ${element.first_name} ${element.last_name}, born '${element.birthdate.toISOString().slice(0, 10)}'`);
    }
    //console.log("result", result.rows);
    client.end();
  });
});