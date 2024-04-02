const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const swaggerJsdoc = require('swagger-jsdoc');
const SwaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const teacherRouter = require("./routes/teacherRoute");
const childRouter = require("./routes/childRoute");
const classRouter = require("./routes/classRoute");
const adminRouter = require("./routes/adminRoute");
const loginRoute = require("./routes/loginRoute");
const loginMW = require("./middleware/loginMiddleware");
const registerRoute = require("./routes/registerRoute");


// setting up server
const server = express();
const port = process.env.Port || process.env.LOCALPORT;

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("connected to DB .....");
    server.listen(port, () => {
      console.log("Server is listening .....");
    });
  })
  .catch((error) => console.log(`DB issue ..... ${error}`));



// Serve the Swagger UI at /api-docs
server.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));






//Logging Middleware
server.use(morgan("dev"));

//Endpoints Middleware
server.use(express.json());
server.use(loginRoute);
server.use(registerRoute);
server.use(loginMW);
server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);
server.use(adminRouter);

// Not Found MiddleWare

server.use((req, res, next) => {
  res.status(404).json({ data: "Not Found" });
});

//Error Middleware
server.use((error, req, res, next) => {
  res.status(500).json({ data: `From Error MW : ${error}` });
});
