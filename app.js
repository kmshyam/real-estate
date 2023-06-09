const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./connection/connection");
const userRoute = require("./routes/user-route");
const propertyRoute = require("./routes/property-route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection()
  .then(() => {
    app.listen(8080, () => console.log("Server is running at port 8080..."));
  })
  .catch(() => {
    console.log("Failed to connect to database!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );

  next();
});

app.use("/api/users", userRoute);
app.use("/api/property", propertyRoute);
app.get("*", async (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "Page not found!",
  });
});
