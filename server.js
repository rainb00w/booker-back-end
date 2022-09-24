require("dotenv").config();
const app = require("./src/app");
const { connectMongoose } = require("./src/db/connection");
const port = process.env.PORT || 3020;

const start = async () => {
  await connectMongoose();
  app.listen(port, () => {
    console.log(`Server running. Use our API on port: ${port}`);
  });
};

start();
