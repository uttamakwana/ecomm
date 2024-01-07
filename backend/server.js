import app from "./app.js";
import { connectDB } from "./database/dbConnection.js";

// uncaugth error handing
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});

// server is started on the port 8080 and now we can listen any service that server provide on port 8080
const server = app.listen(process.env.PORT, () => {
  console.log("Server is started on port", process.env.PORT);
});

connectDB();


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});
