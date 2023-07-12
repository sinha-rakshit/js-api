const express = require("express");
const Datastore = require("nedb");

const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("local_data.db");
database.loadDatabase();

app.post("/api", (request, response) => {
  console.log("I got a request");
  const data = request.body;

  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);

  response.json({
    status: "success",
    Time: timestamp,
    latitude: data.Lat,
    longitude: data.Lng,
  });
});
