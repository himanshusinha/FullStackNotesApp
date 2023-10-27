const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");
// middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

dotenv.config();

// mongo db connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo db database connected ");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8000, () => {
  console.log(" app is listening on PORT " + 8000);
});
