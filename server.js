const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./model");

var corsOptions = {
  origin: "http://localhost:8081"
};

var config = {
  "server": "localhost",
  "authentication": {
    "type": "default",
    "options": {
      "userName": "admin",
      "password": "ad"
    }
  },
  "options": {
    "port": 1433,
    "database": "jwt",
    "trustServerCertificate": true
  }
}



app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
require("./routes/tutorialRoutes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//database
const Request = require('tedious').Request;
        const Connection = require('tedious').Connection;
        const connection = new Connection(config);
        connection.on('connect', (err) => {
          if (err) {
            console.log('Connection Failed');
            throw err;
          }
          executeStatement();
        });
        connection.connect();
        function executeStatement() {
          const request = new Request("select 42, 'hello world'", (err, rowCount) => {
            if (err) {
              throw err;
            }
            console.log('DONE!');
            connection.close();
          });
          // Emits a 'DoneInProc' event when completed.
          request.on('row', (columns) => {
            columns.forEach((column) => {
              if (column.value === null) {
                console.log('NULL');
              } else {
                console.log(column.value);
              }
            });
          });
          // In SQL Server 2000 you may need: connection.execSqlBatch(request);
          connection.execSql(request);
        }

        db.sequelize.sync();
