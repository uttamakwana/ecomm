import mongoose from "mongoose";

// created a connectDB function that will connect to the mongoDB database
export const connectDB = async () => {
  // as mongoose.connect is asynchronous so we have to wait till it give us the output
  const database = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("*****Database*****");
  console.log("Database connection successfull!");
  // host name
  console.log("Host name:", database.connection.host);
  // database name
  console.log("Database name:", database.connection.name);
};
